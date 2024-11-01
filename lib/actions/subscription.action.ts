"use server";

import { pricingPlans } from "@/constants/data";
import { db } from "@/lib/db";

type SubscriptionDetails = {
  credits: number;
  planName: string | undefined;
};

export async function getSubscriptionDetails(
  menteeId: string
): Promise<SubscriptionDetails | undefined> {
  try {
    const subscription = await db.subscription.findUnique({
      where: {
        userId: menteeId,
      },
    });

    const planName = pricingPlans.find(
      (plan) =>
        plan.monthlyPriceId === subscription?.planId ||
        plan.annualPriceId === subscription?.planId
    )?.name;

    return {
      credits: subscription?.credits ?? 0,
      planName: planName ?? undefined,
    };
  } catch (error) {
    console.error("ERROR_GET_SUBSCRIPTION_DETAILS:", error);
    return undefined;
  }
}
