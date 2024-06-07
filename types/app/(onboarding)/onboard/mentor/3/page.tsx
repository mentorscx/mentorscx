"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage, useReadLocalStorage, useIsClient } from "usehooks-ts";

const financialMotivationFactorOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

const anticipatedSessionRateOptions = [
  { label: "Free", value: "Free" },
  { label: "1-25", value: "1-25" },
  { label: "26-50", value: "26-50" },
  { label: "51-75", value: "51-75" },
  { label: "76-100", value: "76-100" },
  { label: "100+", value: "100+" },
];

// Define your Zod schema for the form
const FormSchema = z.object({
  anticipatedSessionRate: z.string().nonempty("Please select a rate."),
  financialMotivationFactor: z.string().nonempty("Please select a factor."),
  feePolicyAcceptance: z.string().nonempty("Please select an option."),
});

const emptyFormValues = {
  anticipatedSessionRate: "",
  financialMotivationFactor: "",
  feePolicyAcceptance: "",
};

const ProfileInfoPage = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mentorOnboardData, setMentorOnboardData] = useLocalStorage(
    "mentorOnboardingData",
    emptyFormValues
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      financialMotivationFactor:
        mentorOnboardData?.financialMotivationFactor || undefined,
      anticipatedSessionRate:
        mentorOnboardData?.anticipatedSessionRate || undefined,
      feePolicyAcceptance: mentorOnboardData?.feePolicyAcceptance || "yes",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      setMentorOnboardData({ ...mentorOnboardData, ...data });
      router.push("/onboard/mentor/4");
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isClient) return null;

  return (
    <div className="min-h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mb-12">
      {/* Form content here */}
      <div className="form-container pt-10 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="card-block !bg-primary ">
              <p className="text-white font-bold text-lg">Financial talk</p>
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="anticipatedSessionRate"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      {" "}
                      What hourly rate do you anticipate setting for your
                      mentoring sessions on Mentors CX? ($USD){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row gap-4 flex-wrap "
                      >
                        {anticipatedSessionRateOptions.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-1 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="financialMotivationFactor"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      {" "}
                      How much does the financial incentive of compensated
                      mentoring sessions serve as a motivating factor for you to
                      become a CX mentor?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-3"
                      >
                        {financialMotivationFactorOptions.map((option) => (
                          <FormItem
                            key={option.value}
                            className="flex items-center space-x-1 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}

                        {/* <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Unsure" />
                          </FormControl>
                          <FormLabel className="font-normal">Unsure</FormLabel>
                        </FormItem> */}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="feePolicyAcceptance"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      <span>
                        You won&apos;t have the ability to set a fee until you
                        receive your initial four reviews. Additionally, you
                        won&apos;t be able to charge more than $120 per hour
                        until you accumulate ten reviews. Is this acceptable to
                        you?
                      </span>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Unsure" />
                          </FormControl>
                          <FormLabel className="font-normal">Unsure</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form footer */}
            <div className="form-container mt-4 flex items-center justify-between p-3">
              <div className="space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-[100px]"
                  asChild
                >
                  <Link href="/onboard/2">Back</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px]"
                >
                  <span>Next</span>
                  <span>
                    {isSubmitting && (
                      <Loader2 className="animate-spin h-4 w-4 ml-1" />
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileInfoPage;
