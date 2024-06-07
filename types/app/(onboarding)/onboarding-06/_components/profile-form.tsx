"use client";
import Link from "next/link";

import OnboardingImage from "../../onboarding-image";
import OnboardingProgress from "../../onboarding-progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

import { updateUserOnboarding06 } from "@/lib/actions/user.action";
import { Onboarding06Schema } from "@/lib/validation";

interface Props {
  user: string;
}

export default function Onboarding06({ user }: Props) {
  const parsedUser = JSON.parse(user);
  const { duration, price } = parsedUser;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof Onboarding06Schema>>({
    resolver: zodResolver(Onboarding06Schema),
    defaultValues: {
      duration: (duration && duration.toString()) || "30",
      price: (price && price.toString()) || "0",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof Onboarding06Schema>) {
    const { duration, price } = values;

    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const data = await updateUserOnboarding06({
        duration: parseInt(duration),
        price: parseInt(price),
        id: parsedUser.id,
      });
      if (!data) {
        toast.error("Something went wrong, please try again");
      }
      router.push("/dashboard/search");
      toast.success("Onboarding completed successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-white dark:bg-slate-900 h-screen min-h-screen">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-col after:flex-1">
            <div className="flex-1">
              {/* <OnboardingHeader /> */}
              <OnboardingProgress step={6} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto ">
                <h3 className="h3 mb-6">Almost there, just one final step..</h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-12"
                  >
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="duration"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>
                              Select the duration duration...
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-3"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="15" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    15min
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="30" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    30min
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="60" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    60min
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="49"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormDescription>
                              Please enter the price
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-12">
                      <div className="flex justify-between">
                        <Link href="/onboarding-05">
                          <Button type="button" variant="outline">
                            Back
                          </Button>
                        </Link>
                        <Button type="submit" disabled={isSubmitting}>
                          {" "}
                          {isSubmitting ? "Saving..." : "Complete your profile"}
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <OnboardingImage />
      </div>
    </section>
  );
}
