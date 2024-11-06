import Stripe from "stripe";
import { db } from "@/lib/db";
import { pricingPlans } from "@/constants/data";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

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
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.subscription.create({
      data: {
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
  }

  if (event.type === "invoice.payment_succeeded") {
    // We need to get subscription ID from the invoice object
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId = invoice.subscription as string;

    // 2. Retrieve subscription with expanded price data
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price"],
    });

    // 3. Get the current price ID from subscription
    const currentPriceId = subscription.items.data[0].price.id;

    // 4. Find the matching plan based on price ID
    const plan = pricingPlans.find(
      (p) =>
        p.monthlyPriceId === currentPriceId ||
        p.annualPriceId === currentPriceId
    );

    if (!plan) {
      console.error("Price ID not found in plans:", currentPriceId);
      throw new Error(`No plan found for price: ${currentPriceId}`);
    }

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
