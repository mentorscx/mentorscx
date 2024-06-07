"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

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

import { Session } from "@prisma/client";
import { createSession } from "@/lib/actions/session.action";
import { calculatePrice, formatAMPM } from "@/lib/format";
import { zonedTimeToUtc } from "date-fns-tz";

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
});

export function SessionDetailsForm({
  session,
  timeZone,
  expertise,
}: SessionDetailsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      const newSession = await createSession({
        ...session,
        ...values,
        start: zonedTimeToUtc(start, timeZone),
        end: zonedTimeToUtc(end, timeZone),
        price: calculatePrice(session.duration, session.price),
        category: values.category.map((cat) => cat.value)[0],
      });

      if (newSession) {
        toast.success("Session created successfully");
      }
      router.push("/mentor/dashboard");
    } catch (error) {
      console.log(error);
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
                    I followed{" "}
                    <Link
                      href="/examples/forms"
                      className="text-blue-600 hover:underline"
                    >
                      these tips{" "}
                    </Link>
                    to fill out the request & commit to joining my call on time.
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Submit button */}
          {}
          <LoadingButton
            loading={isSubmitting}
            disabled={!form.getValues("acceptTerms")}
          >
            Submit session request
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
