import Stripe from "stripe";
import { db } from "@/lib/db";
import { pricingPlans } from "@/constants/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

function getSubscriptionPeriod(interval: "month" | "year" = "month") {
  const now = new Date();
  const start = Math.floor(now.getTime() / 1000);

  const end = new Date(now);
  interval === "month"
    ? end.setMonth(end.getMonth() + 1)
    : end.setFullYear(end.getFullYear() + 1);

  return {
    start,
    end: Math.floor(end.getTime() / 1000),
  };
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error: unknown) {
    console.error(error);
    return new Response("stripe webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (!session.metadata?.buyerId) {
      console.error("Missing buyerId in session metadata:", {
        sessionId: session.id,
        metadata: session.metadata,
      });
      throw new Error(
        "Failed to process subscription: Missing buyer information"
      );
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Get correct period using current time
    const period = getSubscriptionPeriod(
      subscription.items.data[0].plan.interval as "month" | "year"
    );

    await db.subscription.upsert({
      where: {
        userId: session.metadata?.buyerId || "",
      },
      update: {
        stripeSubscriptionId: subscription.id,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        planId: subscription.items.data[0].plan.id,
        interval: String(subscription.items.data[0].plan.interval),
        credits: Number(session.metadata?.credits) || 0,
      },
      create: {
        stripeSubscriptionId: subscription.id,
        userId: session.metadata?.buyerId || "",
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        planId: subscription.items.data[0].plan.id,
        interval: String(subscription.items.data[0].plan.interval),
        credits: Number(session.metadata?.credits) || 0,
      },
    });
  } else if (event.type === "invoice.payment_succeeded") {
    // Get invoice and subscription data (no change)
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = invoice.subscription as string;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price"],
    });

    // Get the price and plan (no change)
    const currentPriceId = subscription.items.data[0].price.id;
    const plan = pricingPlans.find(
      (p) =>
        p.monthlyPriceId === currentPriceId ||
        p.annualPriceId === currentPriceId
    );

    if (!plan) {
      console.error("Price ID not found in plans:", currentPriceId);
      throw new Error(`No plan found for price: ${currentPriceId}`);
    }

    // 3. Calculate correct period
    const period = getSubscriptionPeriod(
      subscription.items.data[0].plan.interval as "month" | "year"
    );

    await db.subscription.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        planId: currentPriceId,
        currentPeriodStart: subscription.current_period_start,
        currentPeriodEnd: subscription.current_period_end,
        status: subscription.status,
        credits: plan.credits || 0,
      },
    });
  }

  return new Response(null, { status: 200 });
}
