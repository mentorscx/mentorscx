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
    if (!menteeId?.trim()) {
      console.error("ERROR_GET_SUBSCRIPTION_DETAILS: Invalid menteeId");
      return undefined;
    }
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

/**
 * Updates user subscription credits by incrementing or decrementing by 1
 * Safe to use in production with proper error handling and db constraints
 */
const CreditOperation = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
} as const;

type CreditOperationType =
  (typeof CreditOperation)[keyof typeof CreditOperation];

type UpdateCreditsInput = {
  userId: string;
  operation: CreditOperationType;
};

/**
 * Updates user subscription credits by incrementing or decrementing by 1
 * Assumes validation of userId and subscription existence is done before calling
 */
export async function updateCredits({
  userId,
  operation,
}: UpdateCreditsInput): Promise<{
  success: boolean;
  credits?: number;
  error?: string;
}> {
  try {
    const updated = await db.subscription.update({
      where: { userId },
      data: {
        credits: {
          [operation === CreditOperation.INCREMENT ? "increment" : "decrement"]:
            1,
        },
      },
      select: { credits: true },
    });

    return {
      success: true,
      credits: updated.credits,
    };
  } catch (error) {
    console.error("[UPDATE_CREDITS_ERROR]", error);
    return {
      success: false,
      error: "Failed to update credits",
    };
  }
}
