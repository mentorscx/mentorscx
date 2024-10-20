"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { useLocalStorage, useIsClient } from "usehooks-ts";
import { toast } from "sonner";

import { saveMentorApplication } from "@/lib/actions/helper.action";
import { ArrowRight, Loader2 } from "lucide-react";

const FormSchema = z.object({
  lastname: z.string().min(2, { message: "Last name is required" }),
  firstname: z.string().min(2, { message: "First name is required" }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  hasEnoughExperience: z
    .string()
    .min(1, { message: "Please select an option." }),
});

const emptyData = {
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  linkedinUrl: undefined,
  hasEnoughExperience: undefined,
};

const ProfileInfoPage = () => {
  const router = useRouter();
  const isClient = useIsClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [mentorOnboardData, setMentorOnboardData] = useLocalStorage<z.infer<
    typeof FormSchema
  > | null>("mentorOnboardingData", null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: mentorOnboardData?.firstname || undefined,
      lastname: mentorOnboardData?.lastname || undefined,
      email: mentorOnboardData?.email || undefined,
      linkedinUrl: mentorOnboardData?.linkedinUrl || undefined,
      hasEnoughExperience: mentorOnboardData?.hasEnoughExperience || undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      if (data.hasEnoughExperience === "yes") {
        await setMentorOnboardData({ ...mentorOnboardData, ...data }); // Update only once here
        router.push("/application/mentor/2");
      } else {
        await saveMentorApplication({ ...data, applicationStatus: "DECLINED" });
        await setMentorOnboardData(null); // Clear data on successful submission

        withReactContent(Swal)
          .fire({
            title: "Thank you for your interest in becoming a mentor.",
            text: "Currently, we are seeking applicants with a minimum of 5 years of experience in customer experience, customer support, startups, or tech companies.",
            icon: "info",
            confirmButtonText: "I'll come back later!",
            confirmButtonColor: "#3b82f6",
          })
          .then((result) => {
            if (result.isConfirmed) {
              router.push("/");
            }
          });
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.message || "Submission Failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mb-12">
      <div className="form-container pt-10 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="card-block !bg-primary">
              <p className="text-white font-bold text-lg">Profile Info</p>
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your First Name"
                        {...field}
                        className="w-full md:w-1/2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Last Name"
                        {...field}
                        className="w-full md:w-1/2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Email <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        {...field}
                        className="w-full md:w-1/2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      What is your LinkedIn profile?
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Linkedin Profile"
                        {...field}
                        className="w-full md:w-1/2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="hasEnoughExperience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Do you have at least 5 years of experience working in
                      customer experience, customer support, with startups, or
                      in tech companies? <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
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
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="form-container mt-4 flex items-center justify-between p-3">
              <div className="space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-[100px]"
                >
                  <Link href="/application/mentor">Back</Link>
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
