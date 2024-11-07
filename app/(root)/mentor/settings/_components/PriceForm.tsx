"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
import { useState } from "react";
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

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { updateUser } from "@/lib/actions/user.action";
import { User } from "@prisma/client";
import { getCompletedSessionsCount } from "@/lib/actions/helper.action";

interface PriceFormProps {
  id: string;
  price: number;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

const PriceForm = ({ id, price }: PriceFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: price || 0,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const completedSessions = (await getCompletedSessionsCount(id)) ?? 0;

      if (completedSessions < 4) {
        toast.warning("Please complete 4 sessions to update the price!");
        return;
      }
      await updateUser({ ...values, id });
      toast.success("Price updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly rate</CardTitle>
        <CardDescription>
          This is used to calculate price per session
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="0"
                      className="w-32"
                      {...field}
                    /> */}

                    <div className="relative w-32">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                        $
                      </div>

                      <Input
                        type="number"
                        step="1"
                        className="block w-full rounded-md px-8 "
                        placeholder="0"
                        disabled={isSubmitting}
                        {...field}
                      />
                    </div>
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
};

export default PriceForm;
