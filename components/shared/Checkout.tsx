"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getStripeSession } from "@/lib/actions/stripe.action";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

type CheckoutProps = {
  plan: string;
  amount: number;
  credits: number;
  buyerId?: string;
  planEnabled: boolean;
  priceId: string;
  email?: string;
  buttonLabel?: string;
};

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
  planEnabled,
  priceId,
  email,
  buttonLabel,
}: CheckoutProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }, []);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      toast({
        title: "Order placed!",
        description: "You will receive an email confirmation",
        duration: 5000,
        className: "success-toast",
      });
    }

    if (query.get("cancelled")) {
      toast({
        title: "Order cancelled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    setIsLoading(true);
    try {
      const subscriptionUrl = await getStripeSession({
        customerId: buyerId,
        domainUrl: process.env.NEXT_PUBLIC_WEBSITE_URL as string,
        priceId: priceId,
        credits: credits,
        email: email,
      });

      // Use window.location.href for client-side navigation
      window.location.href = subscriptionUrl;
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <section>
      <Button
        type="submit"
        role="link"
        className=" bg-blue-600 hover:bg-blue-700 w-full hover:text-white mt-4"
        disabled={!planEnabled}
        onClick={onCheckout}
      >
        {isLoading ? (
          <Loader2Icon className="w-5 h-5 animate-spin" />
        ) : (
          buttonLabel
        )}
      </Button>
    </section>
  );
};

export default Checkout;
