"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { User } from "@prisma/client";

const FormSchema = z.object({
  portfolioWebsite: z.string(),
});

interface PersonalWebsiteFormProps {
  id: string;
  portfolioWebsite: string | null;
}

export function PersonalWebsiteForm({
  id,
  portfolioWebsite,
}: PersonalWebsiteFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      portfolioWebsite: portfolioWebsite || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateUser({ ...data, id });
      toast.success("Details updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal website</CardTitle>
        <CardDescription>
          Add your personal or portfolio website to show case to users
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="portfolioWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Your website url goes here."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button
              disabled={!isDirty || isSubmitting || !isValid}
              type="submit"
            >
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
