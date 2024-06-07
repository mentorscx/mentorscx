"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { saveUserReferenceById } from "@/lib/actions/user.action";

const options = [
  { value: "Google search", label: "Google search" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "TikTok", label: "TikTok" },
  { value: "Podcast", label: "Podcast" },
  { value: "Digital ads", label: "Digital ads" },
] as const;

const FormSchema = z.object({
  recommendedBy: z.string().min(2, {
    message: "Please choose an option",
  }),
  otherRecommendation: z.string().optional(),
});

interface RecommendedByFormProps {
  userId: string;
  recommendedBy: string | null;
  otherRecommendation: string | null;
}

export function RecommendedByForm({
  userId,
  recommendedBy,
  otherRecommendation,
}: RecommendedByFormProps) {
  const [otherLabelChecked, setOtherLabelChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recommendedBy: recommendedBy || undefined,
      otherRecommendation: otherRecommendation || undefined,
    },
  });

  useEffect(() => {
    if (recommendedBy === "Other") {
      setOtherLabelChecked(true);
    }
  }, [recommendedBy]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      await saveUserReferenceById({
        userId,
        recommendedBy: data.recommendedBy,
        otherRecommendation:
          data.recommendedBy === "Other" ? data?.otherRecommendation || "" : "",
      });
      router.push("/onboard/code-of-conduct");
      toast.success("Details submitted successfully.");
    } catch (err) {
      toast.error("Unexpected error, Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="recommendedBy"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {options.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem
                            value={option.value}
                            onClick={() => setOtherLabelChecked(false)}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <>
                          <RadioGroupItem
                            value="Other"
                            onClick={() => setOtherLabelChecked(true)}
                          />
                        </>
                      </FormControl>
                      <FormLabel className="font-normal ">Other</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {otherLabelChecked && (
          <FormField
            control={form.control}
            name="otherRecommendation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-2/3"
                    {...field}
                    defaultValue={otherRecommendation || ""}
                  />
                </FormControl>
                <FormDescription>How do you know about us?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-start justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px] rounded-full"
          >
            <span>Next</span>
            <span>
              {isSubmitting ? (
                <Loader2Icon className="animate-spin h-4 w-4 ml-1" />
              ) : (
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              )}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
