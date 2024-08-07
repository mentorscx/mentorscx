"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useLocalStorage, useIsClient } from "usehooks-ts";

import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { MentorApplication } from "@prisma/client";

import { saveMentorApplication } from "@/lib/actions/helper.action";

const interests = [
  {
    id: "First-time founders",
    label: "First-time founders",
  },
  {
    id: "VC backed founders",
    label: "VC backed founders",
  },
  {
    id: "Bootstrapped founders",
    label: "Bootstrapped founders",
  },
  {
    id: "CX roles",
    label: "CX roles",
  },
  {
    id: "Customer support roles",
    label: "Customer support roles",
  },
  {
    id: "Customer success roles",
    label: "Customer success roles",
  },
  {
    id: "Technical support roles",
    label: "Technical support roles",
  },
  {
    id: "Onboarding specialist",
    label: "Onboarding specialist",
  },
  {
    id: "Customer lifecycle managers",
    label: "Customer lifecycle managers",
  },
  {
    id: "Customer retention leads",
    label: "Customer retention leads",
  },
  {
    id: "Women in tech",
    label: "Women in tech",
  },
  {
    id: "Career switchers in tech",
    label: "Career switchers in tech",
  },
] as const;

const sessionOptions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
  {
    label: "6",
    value: "6",
  },
  {
    label: "7",
    value: "7",
  },
  {
    label: "8",
    value: "8",
  },
  {
    label: "9",
    value: "9",
  },
  {
    label: "10",
    value: "10",
  },
] as const;

const FormSchema = z.object({
  preferVideoSharing: z.string().min(2, {
    message: "Please choose an option.",
  }),
  weeklySessions: z.string().min(1, {
    message: "Please enter a valid option.",
  }),
  priorMentorshipExperience: z
    .string()
    .min(2, { message: "Please choose an option." }),
  profileStatement: z
    .string()
    .min(60, { message: "Please enter atleast 60 characters." }),
  descriptionCustomerExperience: z
    .string()
    .min(60, { message: "Please enter atleast 60 characters." }),
  challengeSolved: z
    .string()
    .min(60, { message: "Please enter atleast 60 characters." }),

  interests: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

const emptyFormValues = {
  preferVideoSharing: "",
  weeklySessions: "",
  priorMentorshipExperience: "",
  profileStatement: "",
  descriptionCustomerExperience: "",
  challengeSolved: "",
  interests: [],
};

type TMentor = Omit<MentorApplication, "id">;

const ProfileInfoPage = () => {
  const isClient = useIsClient();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccessSubmit, setIsSuccessSubmit] = React.useState(false);

  const [mentorOnboardData, setMentorOnboardData] =
    useLocalStorage<TMentor | null>("mentorOnboardingData", null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      preferVideoSharing: mentorOnboardData?.preferVideoSharing || undefined,
      weeklySessions:
        mentorOnboardData?.weeklySessions?.toString() || undefined,
      priorMentorshipExperience:
        mentorOnboardData?.priorMentorshipExperience || undefined,
      profileStatement: mentorOnboardData?.profileStatement || undefined,
      descriptionCustomerExperience:
        mentorOnboardData?.descriptionCustomerExperience || undefined,
      challengeSolved: mentorOnboardData?.challengeSolved || undefined,
      interests: mentorOnboardData?.interests || [],
    },
  });

  const watchedFields = useWatch({ control: form.control });

  useEffect(() => {
    if (!isSuccessSubmit) {
      const updatedData = { ...mentorOnboardData, ...watchedFields };
      setMentorOnboardData(updatedData as TMentor);
    }
  }, [watchedFields, isSuccessSubmit]);

  const handleClickClearStorage = () => {
    form.reset();
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const applicationData = {
      ...mentorOnboardData,
      ...data,
    };

    try {
      setIsSubmitting(true);
      await saveMentorApplication(applicationData);
      setIsSuccessSubmit(true);
      form.reset();
      await setMentorOnboardData(null);

      toast.success("Application submitted!");
      router.push("/application/mentor/thankyou");
    } catch (error: any) {
      toast.error(error?.message || "Submission failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] mb-12">
      {/* Form content here */}
      <div className="form-container pt-10 space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <div className="card-block !bg-primary ">
              <p className="text-white font-bold text-lg">Final Step</p>
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="preferVideoSharing"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      Creating video profile introductions is strongly
                      recommended for new mentors. Are you comfortable with
                      this? <span className="text-red-500">*</span>
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
                name="weeklySessions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      <span></span>Ideally, how many 30-minute mentorship weekly
                      sessions would you aim to conduct each week?{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      {/* <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row flex-wrap gap-4"
                      >
                        {sessionOptions.map((option) => (
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
                      </RadioGroup> */}
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sessionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="priorMentorshipExperience"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="md:text-base">
                      <span>
                        Have you had any prior experience mentoring others?
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
                name="profileStatement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      <span>
                        Please share a brief self-description in a few sentences
                        (in first person).{" "}
                      </span>
                      <span>
                        If you become a mentor, your response to this question
                        will be added to your mentor profile{" "}
                      </span>
                      <span>(you’ll be able to edit it later). </span>
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full h-[150px]"
                      />
                    </FormControl>
                    <FormDescription>
                      {form.getValues("profileStatement")?.length || 0}{" "}
                      characters (60 minimum)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="descriptionCustomerExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      In your own words, please describe what good CX means to
                      you. <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full h-[150px]"
                      />
                    </FormControl>
                    <FormDescription>
                      {form.getValues("descriptionCustomerExperience")
                        ?.length || 0}{" "}
                      characters (60 minimum)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block ">
              <FormField
                control={form.control}
                name="challengeSolved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="md:text-base">
                      Share an inventive solution to a challenging problem that
                      you came up with, leaving you with a sense of confidence
                      and thinking "hey, I&apos;m pretty good at this!" (this
                      won't be added to your profile){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your answer"
                        {...field}
                        className="w-full h-[150px]"
                      />
                    </FormControl>
                    <FormDescription>
                      {form.getValues("challengeSolved")?.length || 0}{" "}
                      characters (60 minimum)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="card-block">
              <FormField
                control={form.control}
                name="interests"
                render={() => (
                  <FormItem className="space-y-3">
                    <div className="mb-4">
                      <FormLabel className="md:text-base">
                        <span>
                          Which groups of people looking for guidance are you
                          most excited to support as a mentor?{" "}
                        </span>
                        <span className="text-red-500">*</span>
                      </FormLabel>
                    </div>
                    {interests.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
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
                  <Link
                    href={
                      mentorOnboardData?.chargesForMentorship === "no"
                        ? "/application/mentor/2"
                        : "/application/mentor/3"
                    }
                  >
                    Back
                  </Link>
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[100px]"
                >
                  <span>Submit</span>
                  <span>
                    {isSubmitting ? (
                      <Loader2 className="animate-spin h-4 w-4 ml-1" />
                    ) : (
                      <ArrowRight className="h-4 w-4 ml-1" />
                    )}
                  </span>
                </Button>
              </div>

              <Button
                variant="link"
                type="button"
                onClick={handleClickClearStorage}
                className="invisible"
              >
                Clear form
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileInfoPage;
