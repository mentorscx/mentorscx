"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { ROLES, companySizeOptions } from "@/constants/data";
import Select from "react-select";

import { useRouter } from "next/navigation";
import {
  saveUserCompanyAndRoleById,
  updateProfessionalUserByClerkId,
} from "@/lib/actions/user.action";

const FormSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(1, { message: "Company Name is required" }),
  companySize: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .refine((val) => val.value !== null, {
      message: "Please select companySize",
    }),
  role: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .refine((val) => val.value !== null, {
      message: "Please select a role",
    }),

  linkedinProfile: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

interface Props {
  user: string;
}

export function UserProfessionalInfoForm({ user }: Props) {
  const router = useRouter();

  const {
    id,
    organization,
    companySize,
    position,
    portfolioWebsite,
    industries,
  } = JSON.parse(user) || {};

  // convert the indutries to match the select input
  let initialRole = {};
  let initialIndustries = [];
  if (position) {
    initialRole = { label: position, value: position };
  }
  if (industries) {
    initialIndustries = industries.map((language: any) => ({
      label: language.name,
      value: language.name,
    }));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: organization || "",
      companySize: companySize || {},
      role: initialRole || {},
      linkedinProfile: portfolioWebsite || "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // console.log(data);

    alert(JSON.stringify(data));
    // updateProfessionalUserByClerkId(id, {
    //   companyName: data.companyName,
    //   companySize: data.companySize.value,
    //   position: data.role.value,
    //   portfolioWebsite: data.linkedinProfile,
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-3 divide-y divide-slate-100"
      >
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="flex justify-between gap-4 items-center">
              <div className="mt-2 basis-1/2">
                <p className="small text-black font-semibold">Company</p>
                <p className="muted !font-extralight">
                  Enter your company name
                </p>
              </div>
              <div className="basis-1/2">
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex justify-between gap-4 items-center">
              <div className="mt-2 basis-1/2">
                <p className="small text-black font-semibold">Role</p>
                <p className="muted !font-extralight text-xs">
                  Choose a role that is relavant to you
                </p>
              </div>
              <div className="basis-1/2">
                <FormControl>
                  <Select {...field} isMulti={false} options={ROLES} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div>
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => (
              <FormItem className="flex justify-between gap-4 items-center">
                <div className="mt-2 basis-1/2">
                  <p className="small text-black font-semibold">Company Size</p>
                  <p className="muted !font-extralight text-xs">
                    Choose your company size
                  </p>
                </div>
                <div className="basis-1/2">
                  <FormControl>
                    <Select
                      {...field}
                      isMulti={false}
                      options={companySizeOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="linkedinProfile"
          render={({ field }) => (
            <FormItem className="flex justify-between gap-4 items-center">
              <div className="mt-2 basis-1/2">
                <p className="small text-black font-semibold">Linkedin URL</p>
                <p className="muted !font-extralight text-xs">
                  Please add the Linkedin URL
                </p>
              </div>
              <div className="basis-1/2">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-start justify-end mt-3">
          <Button type="submit" className="rounded-full mt-3">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
