"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Link from "next/link";

import OnboardingImage from "../../onboarding-image";
import OnboardingProgress from "../../onboarding-progress";

import Select from "react-select";
import { TOOLS } from "@/constants/data";

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
import { updateUserOnboarding05 } from "@/lib/actions/user.action";

const FormSchema = z.object({
  toolkit: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

interface Props {
  user: string;
}

export default function Onboarding05({ user }: Props) {
  const parsedUser = JSON.parse(user);
  const { toolkit } = parsedUser;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Convert the toolkit to match the select input
  const initialToolkit = toolkit.map((tool: any) => ({
    label: tool.name,
    value: tool.name,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      toolkit: initialToolkit || [],
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await updateUserOnboarding05({
        id: parsedUser.id,
        toolkit: values.toolkit,
      });
      router.refresh();
      router.push("/onboarding-06");
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
              <OnboardingProgress step={5} />
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">
                  Tools ✨
                </h1>
                {/* htmlForm */}
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="toolkit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Toolkit:</FormLabel>
                          <FormControl>
                            <Select
                              options={TOOLS}
                              classNamePrefix="select"
                              {...field}
                              isMulti
                            />
                          </FormControl>
                          <FormDescription>
                            Please select the tool
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-between">
                      <Link href="/onboarding-04">
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
