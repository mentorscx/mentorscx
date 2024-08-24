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
  buyerId?: string;
};

type CreateStripeSessionParams = {
  priceId: string;
  domainUrl: string;
  customerId: string;
  credits: number;
  email: string;
  userId: string;
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
  userId,
}: CreateStripeSessionParams): Promise<
  Stripe.Response<Stripe.Checkout.Session>
> => {
  return await stripe.checkout.sessions.create({
    metadata: {
      buyerId: userId,
      credits: credits.toString(),
      email: email,
    },
    customer: customerId,
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${domainUrl}/dashboard/payment/success`,
    cancel_url: `${domainUrl}/dashboard/payment/cancelled`,
  });
};

const createOrRetrieveCustomer = async (
  email: string,
  userId: string
): Promise<string> => {
  // If no customer is found by userId, fallback to searching by email
  const existingCustomersByEmail = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomersByEmail.data.length > 0) {
    // Check if this email belongs to a different user by examining metadata
    const customer = existingCustomersByEmail.data[0];
    if (customer.metadata.userId === userId) {
      // Return the existing customer if userId matches
      return customer.id;
    }
  }

  console.log("existingCustomersByEmail");

  // If no customer is found, or the email matches a different userId, create a new customer
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
  buyerId,
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
    if (!email || !buyerId) {
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

      buyerId = dbUser.id;
    }

    const customerId = await createOrRetrieveCustomer(email, buyerId);

    // Create the Stripe session
    const session = await createStripeSession({
      priceId,
      domainUrl,
      customerId,
      credits,
      email,
      userId: buyerId,
    });

    // Return the URL of the Stripe session
    return session.url as string;
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    throw new Error("Failed to create Stripe session. Please try again.");
  }
};
