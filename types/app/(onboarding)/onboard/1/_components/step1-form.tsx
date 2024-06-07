"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";

import { COUNTRIES, languageData } from "@/constants/data";
import Select from "react-select";
import { saveUserBasicDetailsById } from "@/lib/actions/user.action";

const FormSchema = z.object({
  city: z.string().min(2, "Please enter a city name"),
  country: z.object({
    label: z.string().min(1, "Country label is required"),
    value: z.string().min(1, "Country value is required"),
  }),
  languages: z
    .array(
      z.object({
        label: z.string().min(1, "Language label is required"),
        value: z.string().min(1, "Language value is required"),
      })
    )
    .min(1, "At least one language must be selected"),
});

interface Props {
  user: string;
}

export function OnboardStepOneForm({ user }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, city, country, languages } = JSON.parse(user);
  let initialLocation = {};
  let initialLanguages = [];
  if (country !== null) {
    initialLocation = { label: country, value: country };
  }
  if (languages !== null) {
    initialLanguages = languages.map((language: any) => ({
      label: language.name,
      value: language.name,
    }));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city,
      country: initialLocation,
      languages: initialLanguages,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      await saveUserBasicDetailsById({
        userId: id,
        city: data.city,
        country: data.country.value,
        languages: data.languages,
      });

      router.push("/onboard/2");
      toast.success("Basic details saved successfully.");
    } catch (error) {
      toast.error("Unexpected error, Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div>
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  City <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Select {...field} isMulti={false} options={COUNTRIES} />
                </FormControl>
                <FormDescription>
                  Type a city name in the above and select from the dropdown
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Languages <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Select {...field} isMulti={true} options={languageData} />
                </FormControl>
                <FormDescription>
                  Type a language name in the above and select languages from
                  the dropdown
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
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
