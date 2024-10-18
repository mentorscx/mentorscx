"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";
import { addCardToCustomer } from "@/lib/actions/stripe.action";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CardFormProps {
  onSuccess: (paymentMethod: any) => void;
  onClose: () => void;
}

const CardForm = ({ onSuccess, onClose }: CardFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { onClose: modalOnClose } = useModal();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    const cardElement = elements.getElement(CardElement);

    try {
      if (!cardElement) throw new Error("Card element not found");

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      await addCardToCustomer(paymentMethod.id);
      toast.success("Card added successfully");
      onSuccess(paymentMethod);
      onClose();
    } catch (error) {
      console.error("Error adding card:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add card"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        type="submit"
        disabled={isLoading || !stripe}
        className="mt-4 w-full"
      >
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add Card"
        )}
      </Button>
    </form>
  );
};

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentMethod: any) => void;
}

export function AddCardModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCardModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new card</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CardForm onSuccess={onSuccess} onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
