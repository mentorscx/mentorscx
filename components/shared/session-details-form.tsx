"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { AddCardModal } from "@/components/modals/add-card-modal";
import { getCustomerCards } from "@/lib/actions/stripe.action";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import { Checkbox } from "@/components/ui/checkbox";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Session } from "@prisma/client";
import { createSession } from "@/lib/actions/session.action";
import { calculatePrice, formatAMPM } from "@/lib/format";
import { zonedTimeToUtc } from "date-fns-tz";
import { PaymentDetailsForm } from "./PaymentDetailsForm";
import { createPaymentIntent } from "@/lib/actions/stripe.action"; // You'll need to create this action

interface Card {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

interface SessionDetailsFormProps {
  session: Pick<
    Session,
    | "objective"
    | "category"
    | "outcome"
    | "outcome"
    | "start"
    | "end"
    | "menteeId"
    | "mentorId"
    | "price"
    | "duration"
    | "acceptTerms"
  >;
  timeZone: string;
  expertise: { name: string }[];
}

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const FormSchema = z.object({
  objective: z.string().min(10, {
    message: "Objective should be at least 10 characters.",
  }),
  category: z.array(optionSchema).min(1),
  outcome: z.string().min(60, {
    message: "Outcome must be at least 60 characters.",
  }),
  acceptTerms: z.boolean().default(false).optional(),
  paymentDetails: z.any(),
});

export function SessionDetailsForm({
  session,
  timeZone,
  expertise,
}: SessionDetailsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const router = useRouter();

  const start = new Date(session.start);
  const end = new Date(session.end);

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      objective: "",
      category: [],
      outcome: "",
      acceptTerms: false,
    },
  });

  // Convert the expertise into Option format
  const OPTIONS: Option[] = expertise.map((obj) => ({
    label: obj.name,
    value: obj.name,
    disable: false,
  }));

  const handleCardsUpdate = useCallback((updatedCards: Card[]) => {
    setCards(updatedCards);
  }, []);

  const handleSelectedCardChange = useCallback((card: Card | null) => {
    setSelectedCard(card);
  }, []);

  const handleAddCard = useCallback((paymentMethod: any) => {
    const newCard: Card = {
      id: paymentMethod.id,
      brand: paymentMethod.card.brand,
      last4: paymentMethod.card.last4,
      expMonth: paymentMethod.card.exp_month,
      expYear: paymentMethod.card.exp_year,
    };
    setCards((prevCards) => [...prevCards, newCard]);
    setSelectedCard(newCard);
    setIsAddCardModalOpen(false);
  }, []);

  const fetchCards = useCallback(async () => {
    try {
      const customerCards = await getCustomerCards();
      setCards(customerCards);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to fetch cards");
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const newSession = await createSession({
        ...session,
        objective: values.objective,
        category: values.category.map((cat) => cat.value)[0],
        outcome: values.outcome,
        start: zonedTimeToUtc(start, timeZone),
        end: zonedTimeToUtc(end, timeZone),
        price: calculatePrice(session.duration, session.price), // Use the price prop here
        acceptTerms: values.acceptTerms || false,
      });

      if (newSession) {
        if (session.price && session.price > 0 && selectedCard) {
          // Only process payment if there's a price and a selected card
          const { clientSecret, paymentIntentId } = await createPaymentIntent({
            amount: session.price * 100, // Convert to cents
            currency: "usd",
            paymentMethodId: selectedCard.id,
          });

          const stripe = await stripePromise;
          if (!stripe) {
            throw new Error("Stripe failed to initialize");
          }

          const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: selectedCard.id,
            }
          );

          if (error) {
            console.error("Error confirming payment:", error);
            toast.error("Payment failed: " + error.message);
            // You might want to delete the session here if payment fails
            // await deleteSession(newSession.id);
          } else if (paymentIntent.status === "requires_action") {
            const { error: actionError, paymentIntent: finalPaymentIntent } =
              await stripe.confirmCardPayment(clientSecret);
            if (actionError) {
              console.error("Error after additional action:", actionError);
              toast.error(
                "Payment failed after additional action: " + actionError.message
              );
            } else {
              toast.success("Payment successful and session created");
              // await updateSessionPaymentStatus(newSession.id, finalPaymentIntent.id);
              router.push("/dashboard");
            }
          } else {
            toast.success("Payment successful and session created");
            // await updateSessionPaymentStatus(newSession.id, paymentIntent.id);
            router.push("/dashboard");
          }
        } else {
          // If no price or price is 0, just create the session without payment
          toast.success("Session created successfully");
          router.push("/dashboard");
        }
      } else {
        toast.error("Session creation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Error...");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="flex gap-2 items-center mt-4">
            <Badge variant="outline">
              {formatAMPM(start)} - {formatAMPM(end)}
            </Badge>
          </div>

          <FormField
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objective (in one short sentence)</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-background" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill category you need help with</FormLabel>
                <FormControl>
                  <MultipleSelector
                    value={field.value}
                    onChange={field.onChange}
                    maxSelected={1}
                    defaultOptions={OPTIONS}
                    placeholder="Select category"
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="outcome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What is your main challenge and your expected outcome of the
                  call?
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-[150px]" />
                </FormControl>
                <FormDescription>
                  {form.getValues("outcome").length} characters (60 minimum)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    <span>I followed </span>
                    <Link
                      href="/docs/writing-an-effective-session-request"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      these tips{" "}
                    </Link>
                    <span>
                      to fill out the request & commit to joining my call on
                      time.
                    </span>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {session.price !== 0 && session.price !== undefined && (
            <FormItem>
              <FormLabel>Payment Details</FormLabel>
              <PaymentDetailsForm
                onCardsUpdate={handleCardsUpdate}
                onSelectedCardChange={handleSelectedCardChange}
                price={session.price}
                onAddCardClick={() => setIsAddCardModalOpen(true)}
                cards={cards}
                selectedCard={selectedCard}
              />
            </FormItem>
          )}

          <LoadingButton
            loading={isSubmitting}
            disabled={
              !form.getValues("acceptTerms") ||
              (!!session.price && session.price > 0 && !selectedCard)
            }
          >
            Submit session request
          </LoadingButton>
        </form>
      </Form>

      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onSuccess={(paymentMethod) => {
          handleAddCard(paymentMethod);
          fetchCards(); // Refetch cards after adding a new one
        }}
      />
    </div>
  );
}
