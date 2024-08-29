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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { updateUser } from "@/lib/actions/user.action";

const FormSchema = z.object({
  city: z.string().min(1, "Please enter city details"),
});

interface CityFormProps {
  id: string;
  city: string | null;
}

export default function CityForm({ id, city }: CityFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      city: city || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateUser({ ...data, id });
      toast.success("city updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>City</CardTitle>
        <CardDescription>
          This will be used to display in the profile.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="md:w-1/2" />
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
