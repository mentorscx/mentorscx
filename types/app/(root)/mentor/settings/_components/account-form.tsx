"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { Switch } from "@/components/ui/switch";
import { updateUser } from "@/lib/actions/user.action";

const FormSchema = z.object({
  portfolioWebsite: z.string(),
});

interface AccountFormProps {
  user: string;
}

export function AccountForm({ user }: AccountFormProps) {
  const parsedUser = JSON.parse(user);
  const { portfolioWebsite: initialWebsite } = parsedUser;
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      portfolioWebsite: initialWebsite || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateUser({ ...data, id: parsedUser.id });
      toast.success("Details updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border  rounded-md p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <p className="large">Please Enter your Account Details</p>
            <p className="muted">
              You can enter the details. Please refer
              <Link href="/" className="text-blue-400 underline ">
                (Learn more)
              </Link>
            </p>
          </div>

          {/* <FormField
          control={form.control}
          name="mentors_url"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="large">
                  CX Video Room{" "}
                  <span className="text-green-700">[Coming soon...]</span>
                </FormLabel>
                <FormDescription className="muted">
                  Allow in-app video call option, If not activated, atleast add
                  one option below.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        /> */}

          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personal Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your website goes here.."
                    {...field}
                    className="w-full p-regular-16 bg-gray-50 px-4 py-3 placeholder:text-gray-500 focus-visible:ring-transparent focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!isValid || isSubmitting || !isDirty}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
