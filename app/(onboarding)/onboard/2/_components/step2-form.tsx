"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, ArrowRightIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ROLES, industryData } from "@/constants/data";

import { useRouter } from "next/navigation";
import { saveUserCompanyAndRoleById } from "@/lib/actions/user.action";
import Link from "next/link";

const rangeOptions = [
  { label: "Solo", value: "Solo" },
  { label: "2-5", value: "2-5" },
  { label: "6-20", value: "6-20" },
  { label: "21-50", value: "21-50" },
  { label: "50+", value: "50+" },
];

const FormSchema = z.object({
  company: z
    .string()
    .optional()
    .nullable()
    .refine((value) => !value || value.length >= 2, {
      message: "Please enter a company name",
    }),
  companySize: z.string().min(1, "Please choose an option"),
  role: z
    .string()
    .optional()
    .nullable()
    .refine((value) => !value || value.length >= 2, {
      message: "Please enter your current role",
    }),
  linkedinProfile: z.string().url().nullable().optional(),
});

interface Props {
  user: string;
}

export function OnboardStepTwoForm({ user }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, organization, companySize, position, linkedinProfile } =
    JSON.parse(user);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: organization,
      companySize,
      role: position,
      linkedinProfile,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsSubmitting(true);
      await saveUserCompanyAndRoleById({
        userId: id,
        company: data.company || undefined,
        companySize: data.companySize,
        currentRole: data.role || undefined,
        linkedinProfile: data.linkedinProfile || undefined,
      });

      toast.success("Company and role details saved!");
      router.push("/onboard/3");
    } catch (e) {
      console.log(e);
      toast.error("Unexpected error, Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your current role</FormLabel>
              <FormControl>
                <Input {...field} value={form.getValues("role") || undefined} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your current organization</FormLabel>
              <FormControl>
                <Input
                  placeholder=""
                  {...field}
                  value={form.getValues("company") || undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companySize"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>How big is your company?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-4 flex-wrap "
                >
                  {rangeOptions.map((option) => (
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

        <FormField
          control={form.control}
          name="linkedinProfile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin profile</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={form.getValues("linkedinProfile") || undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-start justify-between pt-4">
          <Button
            asChild
            variant="outline"
            className="min-w-[100px] rounded-full"
          >
            <Link href="/onboard/1">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
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
