"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

// Helper function to get the base URL
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.startsWith("http")
      ? process.env.NEXT_PUBLIC_APP_URL
      : `https://${process.env.NEXT_PUBLIC_APP_URL}`;
  }
  // Fallback for local development
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://your-production-domain.com";
}

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
    return_url: `${domainUrl}/billing`,
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
  const metadata = {
    buyerId: userId,
    credits: credits.toString(),
    email,
  };

  return await stripe.checkout.sessions.create({
    metadata,
    customer: customerId,
    mode: "subscription",
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
    subscription_data: {
      metadata,
    },
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

export async function createStripeAccountLink(userId: string) {
  try {
    // Authenticate the user
    const { userId: clerkId } = auth();
    if (!clerkId) {
      throw new Error("User is not authenticated");
    }

    // Fetch user data from the database
    const user = await db.user.findUnique({
      where: { clerkId, id: userId },
      select: {
        id: true,
        email: true,
        stripeConnectedAccount: {
          select: {
            stripeConnectedLinked: true,
            connectedAccountId: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let stripeConnectID = user.stripeConnectedAccount?.connectedAccountId;

    if (!stripeConnectID) {
      // TODO: Add the ability to create a new Stripe account
      // TODO: Using the best industry standards
      const account = await stripe.accounts.create({
        email: user.email as string,

        controller: {
          losses: {
            payments: "application",
          },
          fees: {
            payer: "application",
          },
          stripe_dashboard: {
            type: "express",
          },
        },
      });

      // Save the new Stripe account ID to the database
      const updatedUser = await db.stripeConnectedAccount.create({
        data: {
          connectedAccountId: account.id,
          userId: user.id,
        },
      });

      stripeConnectID = updatedUser.connectedAccountId;
    }

    // Determine the appropriate URLs based on the environment
    const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

    // Create a Stripe account link
    const accountLink = await stripe.accountLinks.create({
      account: stripeConnectID,
      refresh_url: `${baseUrl}/mentor/settings`,
      return_url: `${baseUrl}/mentor/settings`,
      type: "account_onboarding",
    });

    // Redirect to the Stripe onboarding page
    return accountLink.url;
  } catch (error) {
    console.error("Error creating Stripe account link:", error);
    // Handle specific error types
    if (error instanceof Error) {
      throw new Error(`Failed to create Stripe account link: ${error.message}`);
    }
    // Generic error
    throw new Error(
      "An unexpected error occurred while creating Stripe account link"
    );
  }
}

export async function getCustomerCards() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      throw new Error("User is not authenticated");
    }

    const user = await db.user.findUnique({
      where: { clerkId },
      select: { id: true, email: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const customerId = await createOrRetrieveCustomer(user.email, user.id);
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });

    return paymentMethods.data.map((pm) => ({
      id: pm.id,
      brand: pm.card!.brand,
      last4: pm.card!.last4,
      expMonth: pm.card!.exp_month,
      expYear: pm.card!.exp_year,
    }));
  } catch (error) {
    console.error("Error fetching customer cards:", error);
    throw new Error("Failed to fetch customer cards");
  }
}

export async function addCardToCustomer(
  paymentMethodId: string
): Promise<void> {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      throw new Error("User is not authenticated");
    }

    const user = await db.user.findUnique({
      where: { clerkId },
      select: { email: true, id: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const customerId = await createOrRetrieveCustomer(user.email, user.id);

    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    await stripe.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });
  } catch (error) {
    console.error("Error adding card to customer:", error);
    throw new Error("Failed to add card to customer");
  }
}

async function getOrCreateCustomer(
  email: string,
  userId: string
): Promise<string> {
  // Check if customer already exists
  const existingCustomer = await stripe.customers.list({ email, limit: 1 });
  if (existingCustomer.data.length > 0) {
    return existingCustomer.data[0].id;
  }

  // If not, create a new customer
  const newCustomer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  return newCustomer.id;
}

export async function createPaymentIntent({
  amount,
  currency,
  paymentMethodId,
}: {
  amount: number;
  currency: string;
  paymentMethodId: string;
}): Promise<{ clientSecret: string; paymentIntentId: string }> {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: { email: true, id: true },
    });

    if (!user || !user.email) {
      throw new Error("User not found or email missing");
    }

    const customerId = await getOrCreateCustomer(user.email, user.id);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      payment_method: paymentMethodId,
      automatic_payment_methods: {
        enabled: true,
      },
      setup_future_usage: "off_session", // This allows the payment method to be reused
    });

    return {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

export async function GetStripeDashboardLink(userId: string) {
  const { userId: clerkId } = auth();

  if (!clerkId || !userId) {
    throw new Error("User not authenticated");
  }

  const data = await db.user.findUnique({
    where: {
      clerkId: clerkId,
      id: userId,
    },
    select: {
      id: true,
      stripeConnectedAccount: {
        select: {
          connectedAccountId: true,
        },
      },
    },
  });

  if (data === null || data.id === null) {
    throw new Error("User not found");
  }

  const loginLink = await stripe.accounts.createLoginLink(
    data.stripeConnectedAccount?.connectedAccountId as string
  );

  return redirect(loginLink.url);
}
