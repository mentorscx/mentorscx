"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
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
import Select from "react-select";

import { useRouter } from "next/navigation";
import { saveUserCompanyAndRoleById } from "@/lib/actions/user.action";

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
    .refine((value) => !value || value.length >= 2, {
      message: "Please enter a company name",
    }),
  companySize: z.string().optional(),
  role: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 2, {
      message: "Please enter your current role",
    }),
  linkedinProfile: z
    .string()
    .optional()
    .refine((value) => !value || z.string().url().safeParse(value).success, {
      message: "Please enter a valid URL.",
    }),
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
        company: data.company,
        companySize: data.companySize,
        currentRole: data.role,
        linkedinProfile: data.linkedinProfile,
      });

      router.push("/onboard/3");
      toast.success("Company and role details saved!");
    } catch (e) {
      console.log(e);
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your current role</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input placeholder="" {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
