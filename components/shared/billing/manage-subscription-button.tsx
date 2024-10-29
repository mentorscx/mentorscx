"use client";
import React, { useState } from "react";
import { Loader2Icon } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);

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
      className="min-w-[250px] mt-4"
      disabled={isLoading}
    >
      Manage my subscription
      {isLoading && <Loader2Icon className="w-4 h-4 ml-2 animate-spin" />}
    </Button>
  );
};

export default ManageSubscriptionButton;
