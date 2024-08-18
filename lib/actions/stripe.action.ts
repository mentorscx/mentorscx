"use server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

export const getStripeSession = async ({
  priceId,
  domainUrl,
  customerId,
  credits,
  email,
}: {
  priceId: string;
  domainUrl: string;
  customerId: string;
  credits: number;
  email: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    metadata: {
      buyerId: customerId,
      credits: credits,
      email: email,
    },
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${domainUrl}/dashboard/payment/success`,
    cancel_url: `${domainUrl}/dashboard/payment/cancelled`,
  });

  return session.url as string;
};
