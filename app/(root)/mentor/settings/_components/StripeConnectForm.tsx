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
import {
  createStripeAccountLink,
  GetStripeDashboardLink,
} from "@/lib/actions/stripe.action";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StripeConnectForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [isFetchingStripeStatus, setIsFetchingStripeStatus] = useState(true);

  useEffect(() => {
    const checkStripeConnection = async () => {
      try {
        const connected = await fetchStripeConnectAccount(userId);
        setIsStripeConnected(connected);
      } catch (error) {
        toast.error("Error fetching Stripe connection status");
        console.error("Error fetching Stripe connection status:", error);
      } finally {
        setIsFetchingStripeStatus(false);
      }
    };

    checkStripeConnection();
  }, [userId]);

  const handleConnectStripeAccount = async () => {
    setIsLoading(true);

    try {
      const stripeUrl = await createStripeAccountLink(userId);
      router.push(stripeUrl);
    } catch (error) {
      toast.error("Error connecting Stripe account");
      console.error("Error creating Stripe account link:", error);
      setIsLoading(false);
    }
  };

  const handleGetStripeDashboardLink = async () => {
    setIsLoading(true);
    try {
      const stripeUrl = await GetStripeDashboardLink(userId);
      router.push(stripeUrl);
    } catch (error) {
      toast.error("Error getting Stripe dashboard");
      console.error("Error getting Stripe dashboard link:", error);
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
        {isFetchingStripeStatus ? (
          <Button
            className="flex items-center"
            variant="outline"
            disabled={true}
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking Stripe connection
          </Button>
        ) : isStripeConnected ? (
          <Button
            variant="outline"
            onClick={handleGetStripeDashboardLink}
            disabled={isLoading}
          >
            View stripe Dashboard
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>
        ) : (
          <Button
            variant="secondary"
            onClick={handleConnectStripeAccount}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Loading
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              <>
                Connect Stripe Account
                {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default StripeConnectForm;
