"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import React, { useEffect, useState } from "react";
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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage, useIsClient } from "usehooks-ts";

import { toast } from "sonner";
const FormSchema = z.object({
  currentPosition: z.string().min(2, {
    message: "Please choose an option.",
  }),
  motivation: z.string().min(20, {
    message: "Please enter atleast 20 letters.",
  }),
  chargesForMentorship: z.string().min(2, {
    message: "Please choose an option.",
  }),
});

const emptyData = {
  currentPosition: "",
  motivation: "",
  chargesForMentorship: "",
};

const ProfileInfoPage = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mentorOnboardData, setMentorOnboardData] = useLocalStorage(
    "mentorOnboardingData",
    emptyData
  );

  // Inside your component
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPosition: mentorOnboardData?.currentPosition || "",
      motivation: mentorOnboardData?.motivation || "",
      chargesForMentorship: mentorOnboardData?.chargesForMentorship || "",
    },
  });

  const watchedFields = useWatch({ control: form.control });

  useEffect(() => {
    setMentorOnboardData({ ...mentorOnboardData, ...watchedFields });
  }, [watchedFields]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      setMentorOnboardData({ ...mentorOnboardData, ...data });
      const chargesForMentorship = data?.chargesForMentorship;
      chargesForMentorship === "no"
        ? router.push("/application/mentor/4")
        : router.push("/application/mentor/3");
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
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className="card-block !bg-primary ">
              <p className="text-white font-bold text-lg">Motive</p>
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="currentPosition"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      What describes you best?
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
                            <RadioGroupItem value="I'm a business owner" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a business owner
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="I'm a paid employee" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a paid employee
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="I'm a freelancer or consultant" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a freelancer or consultant
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="I'm a CX influencer/content creator" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m a CX influencer/content creator
                          </FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Other" />
                          </FormControl>
                          <FormLabel className="font-normal">Other</FormLabel>
                        </FormItem>
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
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Why would you like to become a CX mentor? (one sentence)
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full min-h-[150px]"
                      />
                    </FormControl>
                    <FormDescription>
                      {form.getValues("motivation").length} characters (20
                      minimum)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="chargesForMentorship"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Are you planning on charging for your mentorship?{" "}
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
                            <RadioGroupItem value="Maybe later" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Maybe later
                          </FormLabel>
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
                  <Link href="/application/mentor/1">Back</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px]"
                >
                  <span>Next</span>
                  <span>
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-4 w-4 ml-1" />
                    ) : (
                      <ArrowRight className="h-4 w-4 ml-1" />
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
