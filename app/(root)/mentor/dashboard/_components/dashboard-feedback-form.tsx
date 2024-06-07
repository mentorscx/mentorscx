"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { createFeatureRequest } from "@/lib/actions/support.action";

interface DashboardFeedbackFormProps {
  userId: string;
}

const formSchema = z.object({
  description: z.string().min(10, "Must be at least 10 characters"),
});

export const DashboardFeedbackForm = ({
  userId,
}: DashboardFeedbackFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await createFeatureRequest({
        ...values,
        userId,
        featureType: "DASHBOARD",
      });
      if (result) {
        toast.success("Request submitted successfully!");
        router.refresh();
      } else {
        throw new Error("Failed to submit request");
      }
      form.reset();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="my-4 p-3 md:px-6 border shadow rounded-lg bg-background">
      <div className="font-medium flex items-center justify-between">
        <p className="large">
          What else would you like to see in your dashboard?
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="Type your request here..."
                    {...field}
                    className="h-[150px] md:h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button disabled={!isValid || isSubmitting} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
