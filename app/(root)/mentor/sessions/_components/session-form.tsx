"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { toast } from "sonner";

import { updateSession } from "@/lib/actions/session.action";
import { useRouter } from "next/navigation";
import { SessionStatus } from "@prisma/client";
import { useModal } from "@/hooks/use-modal-store";

import { scheduleMeeting } from "@/lib/actions/google-calandar.action";

const formSchema = z.object({
  objective: z.string().min(20, {
    message: "object must be at least 20 characters.",
  }),
  category: z.string().min(20, {
    message: "category must be at least 20 characters.",
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
  menteeEmail: string;
}

export function SessionForm({ session, user, menteeEmail }: SessionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);
  const router = useRouter();

  const sessionJSON = JSON.parse(session);
  const userJSON = JSON.parse(user);
  const {
    objective,
    category,
    description,
    outcome,
    id: sessionId,
    start,
    end,
    status,
  } = sessionJSON;
  const { id: userId, email: mentorEmail } = userJSON;

  console.log({ mentorEmail, sessionId, start, end });

  if (status === "AVAILABLE") {
    setEnableEdit(true);
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objective: objective || "",
      category: category || "",
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
        status: "REQUESTED",
        menteeId: userId,
      });

      setEnableEdit(false);
      router.refresh();
      toast.success("Declined the session ");
      router.push("/dashboard/session");
    } catch (error) {
      console.log(error);
      toast("Unexpected Error...");
    } finally {
      setIsSubmitting(false);
    }
  }

  // 2. Define a submit handler.
  const acceptSession = async () => {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateSession({
        id: sessionId,
        status: "ACCEPTED",
        mentorId: userId,
      });

      toast.success(" Accepted the session");
      router.push("/mentor/session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error...");
    } finally {
      setIsSubmitting(false);
    }
  };

  const declineSession = async () => {
    setIsSubmitting(true);

    try {
      await updateSession({
        id: sessionId,
        status: SessionStatus.REJECTED,
        mentorId: userId,
      });
      toast.success("Declined the session");
      router.push("/mentor/session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexpcted Error...");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelSession = async () => {
    setIsSubmitting(true);

    try {
      await updateSession({
        id: sessionId,
        status: SessionStatus.CANCELLED,
        mentorId: userId,
      });
      toast.success("Booking has been cancelled");
      router.push("/mentor/session");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Unexepcted Error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  {...field}
                  className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  disabled={!enableEdit}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="category"
                  {...field}
                  className="p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  disabled={!enableEdit}
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

        <Separator />

        <div className="mb-12 mt-3 flex justify-around">
          {status === SessionStatus.AWAITING_HOST && (
            <>
              <Button
                className="w-fit md:w-[200px]  rounded-full"
                disabled={isSubmitting}
                variant="outline"
                onClick={declineSession}
              >
                {" "}
                {isSubmitting ? "Loading" : "Decline Session"}
              </Button>
              <Button
                className="w-fit md:w-[200px] rounded-full "
                disabled={isSubmitting}
                onClick={acceptSession}
              >
                {" "}
                {isSubmitting ? "Loading" : "Accept Session"}
              </Button>
            </>
          )}
          {status === SessionStatus.ACCEPTED && (
            <Button
              className="w-fit md:w-[200px] rounded-full mx-auto md:ml-auto"
              variant="destructive"
              disabled={isSubmitting}
              onClick={cancelSession}
            >
              {" "}
              {isSubmitting ? "Loading" : "Cancel Session"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
