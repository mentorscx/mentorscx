"use client";
import React from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

import { createCustomerPortal } from "@/lib/actions/stripe.action";

const ManageSubscriptionButton = ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  const handleManageSubscription = async () => {
    try {
      const manageSubscriptionUrl = await createCustomerPortal(email, userId);
      redirect(manageSubscriptionUrl);
    } catch (error) {
      console.error("Failed to create Stripe Customer Portal session:", error);
    }
  };

  return (
    <Button
      variant="outline"
      role="link"
      onClick={handleManageSubscription}
      className="min-w-[250px]"
    >
      Manage my subscription
    </Button>
  );
};

export default ManageSubscriptionButton;
