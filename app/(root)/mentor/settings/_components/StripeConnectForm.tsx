"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { fetchStripeConnectAccount } from "@/lib/actions/helper.action";
import { createStripeAccountLink } from "@/lib/actions/stripe.action";

import { useRouter } from "next/navigation";

const StripeConnectForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isStripeConnected, setIsStripeConnected] = useState(false);

  useEffect(() => {
    const checkStripeConnection = async () => {
      const connected = await fetchStripeConnectAccount(userId);
      setIsStripeConnected(connected);
    };

    checkStripeConnection();
  }, [userId]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const stripeUrl = await createStripeAccountLink(userId);
      router.push(stripeUrl);
    } catch (error) {
      console.error("Error creating Stripe account link:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle>Connect your Stripe Account</CardTitle>
        <CardDescription>You can receive payments from Mentee</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        {isStripeConnected ? (
          <Button variant="outline" disabled>
            Stripe connected
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Connect Stripe Account
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Connect Stripe Account"
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StripeConnectForm;
