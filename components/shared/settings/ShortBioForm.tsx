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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateUser } from "@/lib/actions/user.action";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  shortBio: z
    .string()
    .min(40, "Please enter bio atleast 40 characters")
    .max(220, "Please keep it short"),
});

interface ShortBioFormProps {
  id: string;
  shortBio: string | null;
}

export default function ShortBioForm({ id, shortBio }: ShortBioFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shortBio: shortBio || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateUser({ ...data, id });
      toast.success("short bio updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Short bio</CardTitle>
        <CardDescription>
          This will be used to display in the search profile.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="shortBio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} className="h-20" />
                  </FormControl>
                  <FormDescription>
                    {form.getValues("shortBio")?.length || 0} characters (40 to
                    100 characters)
                  </FormDescription>
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
