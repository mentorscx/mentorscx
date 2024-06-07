"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

import OnboardingImage from "../../onboarding-image";
import OnboardingProgress from "../../onboarding-progress";

import Select from "react-select";
import { EXPERTISE } from "@/constants/data";

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

import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserOnboarding04 } from "@/lib/actions/user.action";
import RichTextEditor from "@/components/ui/rich-texteditor";
import { draftToMarkdown } from "markdown-draft-js";

const FormSchema = z.object({
  expertise: z.object({
    label: z.string(),
    value: z.string(),
  }),
  description: z.string(),
});

interface Props {
  user: string;
}

export default function Onboarding04({ user }: Props) {
  const parsedUser = JSON.parse(user);
  const { expertise } = parsedUser;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Convert the expertise to match the select input
  const initialExpertise = expertise.length > 0 && {
    value: expertise[0].name,
    label: expertise[0].name,
  };
  const initialDescription = expertise.length > 0 && expertise[0].description;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      expertise: initialExpertise || {},
      description: initialDescription || "",
    },
  });

  const { setFocus } = form;

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateUserOnboarding04({
        id: parsedUser.id,
        name: values.expertise.value,
        description: values.description,
      });

      router.refresh();
      router.push("/onboarding-05");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-white dark:bg-slate-900 min-h-screen">
      <div className="relative flex">
        {/* Content */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-col after:flex-1">
            <div className="flex-1">
              {/* <OnboardingHeader /> */}
              <OnboardingProgress step={4} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                  Expertise ✨
                </h1>
                {/* htmlForm */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="expertise"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expertise:</FormLabel>
                          <FormControl>
                            <Select
                              options={EXPERTISE}
                              classNamePrefix="select"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Select your expertise
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel onClick={() => setFocus("description")}>
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell more about the experience"
                              className="h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Link href="/onboarding-03">
                        <Button type="button" variant="outline">
                          Back
                        </Button>
                      </Link>
                      <Button type="submit" disabled={isSubmitting}>
                        {" "}
                        {isSubmitting ? "Saving..." : "Next"}
                      </Button>
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
