"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard } from "lucide-react";
import Select from "react-select";

import { Button } from "@/components/ui/button";
import { SessionStatus } from "@prisma/client";
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
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

import { industryData } from "@/constants/data";
import { updateSession } from "@/lib/actions/session.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  objective: z.string().min(20, {
    message: "object must be at least 20 characters.",
  }),
  category: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine((data) => data.value, {
      message: "Category is required.",
    }),
  description: z.string().min(20, {
    message: "description must be at least 20 characters.",
  }),
  outcome: z.string().min(20, {
    message: "outcome must be at least 20 characters.",
  }),
});

interface SessionFormProps {
  session: string;
  user: string;
}

export function SessionForm({ session, user }: SessionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const sessionJSON = JSON.parse(session);
  const userJSON = JSON.parse(user);
  const {
    objective,
    category,
    description,
    outcome,
    start,
    id: sessionId,
    status,
  } = sessionJSON;
  const { id: userId } = userJSON;

  useEffect(() => {
    //Runs only on the first render
    if (status === SessionStatus.AVAILABLE) {
      setEnableEdit(true);
    }
  }, [status]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objective: objective || "",
      category: {
        label: category || "",
        value: category || "",
      },
      description: description || "",
      outcome: outcome || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateSession({
        ...values,
        id: sessionId,
        status: SessionStatus.AWAITING_HOST,
        menteeId: userId,
        category: values.category.value,
      });
      setEnableEdit(false);
      router.push("/dashboard/session");
      toast.success("Request submitted");
    } catch (error) {
      console.log(error);
      toast.error("Session request failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto flex max-w-5xl flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your objective"
                  {...field}
                  className="bg-gray-50 placeholder:text-gray-500 p-regular-16 px-4 py-3 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  disabled={!enableEdit}
                />
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
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  isMulti={false}
                  options={industryData}
                  isDisabled={!enableEdit}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please enter the challenge.."
                  {...field}
                  className="bg-gray-50 placeholder:text-gray-500 p-regular-16  flex flex-1 px-5 py-3 focus-visible:ring-transparent"
                  disabled={!enableEdit}
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
              <FormLabel>Desired outcome of the call..</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please enter the outcome.."
                  {...field}
                  className="bg-gray-50 placeholder:text-gray-500 p-regular-16  flex flex-1 px-5 py-3 focus-visible:ring-transparent"
                  disabled={!enableEdit}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/*TODO: Payment details Popup will be added here */}
        {/* <p>Payment Details</p>
        <Button className="w-40 rounded-full bg-blue-300 text-primary-600">
          <CreditCard className="mr-2 h-4 w-4" /> Add new card
        </Button> */}

        {enableEdit && (
          <>
            <Separator />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4"
                onChange={() => setChecked(!checked)}
              />
              <div>
                I have properly formatted as per the best practices and will
                show up in a timely fashion for the call
              </div>
            </div>
          </>
        )}

        {enableEdit && (
          <Button
            className="w-fit rounded-full"
            type="submit"
            disabled={isSubmitting || !checked}
          >
            {" "}
            {isSubmitting
              ? "Submitting the request"
              : "Confirm session Request"}
          </Button>
        )}
      </form>
    </Form>
  );
}
