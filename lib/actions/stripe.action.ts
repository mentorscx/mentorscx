"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

type GetStripeSessionParams = {
  priceId: string;
  domainUrl: string;
  customerId?: string;
  credits: number;
  email?: string;
};

type CreateStripeSessionParams = {
  priceId: string;
  domainUrl: string;
  customerId: string;
  credits: number;
  email: string;
};

export async function createCustomerPortal(email: string, userId: string) {
  const stripeCustomerId = await createOrRetrieveCustomer(email, userId);
  const domainUrl = process.env.NEXT_PUBLIC_WEBSITE_URL as string;

  const session = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${domainUrl}/dashboard/billing`,
  });

  return redirect(session.url);
}

const createStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
  credits,
  email,
}: CreateStripeSessionParams): Promise<
  Stripe.Response<Stripe.Checkout.Session>
> => {
  return await stripe.checkout.sessions.create({
    metadata: {
      buyerId: customerId,
      credits: credits.toString(),
      email: email,
    },
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${domainUrl}/dashboard/payment/success`,
    cancel_url: `${domainUrl}/dashboard/payment/cancelled`,
  });
};

const createOrRetrieveCustomer = async (
  email: string,
  userId: string
): Promise<string> => {
  // Attempt to find an existing customer in Stripe
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    // Return the ID of the existing customer
    return existingCustomers.data[0].id;
  }

  // Create a new customer in Stripe
  const newCustomer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  });

  return newCustomer.id;
};

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
  credits,
  email,
}: GetStripeSessionParams): Promise<string> => {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      redirect("/sign-in");
      return ""; // Safeguard for redirect, although it won't execute further
    }

    // If the email or customerId is not provided, we need to get it from the database
    if (!email || !customerId) {
      const dbUser = await db.user.findUnique({
        where: {
          clerkId: clerkId,
        },
        select: {
          id: true,
          email: true,
        },
      });

      if (!dbUser) {
        throw new Error("User not found");
      }

      email = dbUser.email;
      customerId = await createOrRetrieveCustomer(email, dbUser.id);
    }

    // Create the Stripe session
    const session = await createStripeSession({
      priceId,
      domainUrl,
      customerId,
      credits,
      email,
    });

    // Return the URL of the Stripe session
    return session.url as string;
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    throw new Error("Failed to create Stripe session. Please try again.");
  }
};
