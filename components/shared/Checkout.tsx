"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";
import { redirect } from "next/navigation";

import { getStripeSession } from "@/lib/actions/stripe.action";

import { Button } from "@/components/ui/button";

type CheckoutProps = {
  plan: string;
  amount: number;
  credits: number;
  buyerId: string;
  planEnabled: boolean;
  priceId: string;
  email: string;
};

const Checkout = ({
  plan,
  amount,
  credits,
  buyerId,
  planEnabled,
  priceId,
  email,
}: CheckoutProps) => {
  const { toast } = useToast();

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

    if (query.get("canceled")) {
      toast({
        title: "Order canceled!",
        description: "Continue to shop around and checkout when you're ready",
        duration: 5000,
        className: "error-toast",
      });
    }
  }, []);

  const onCheckout = async () => {
    const subscriptionUrl = await getStripeSession({
      customerId: buyerId,
      domainUrl:
        process.env.NODE_ENV == "production"
          ? (process.env.PRODUCTION_URL as string)
          : (process.env.NEXT_PUBLIC_WEBSITE_URL as string),
      priceId: priceId,
      credits: credits,
      email: email,
    });

    return redirect(subscriptionUrl);
  };

  return (
    <form action={onCheckout} method="POST">
      <section>
        <Button
          type="submit"
          role="link"
          className="w-full rounded-full bg-blue-gradient text-blue-500 bg-cover hover:text-white"
          disabled={!planEnabled}
        >
          Buy Credit
        </Button>
      </section>
    </form>
  );
};

export default Checkout;
