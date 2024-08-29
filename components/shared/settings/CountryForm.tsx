"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import Select from "react-select";

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
import { Input } from "@/components/ui/input";
import {
  saveUserBasicDetailsById,
  updateUser,
} from "@/lib/actions/user.action";
import { Language } from "@prisma/client";
import { COUNTRIES, languageData } from "@/constants/data";

interface CountryFormProps {
  userId: string;
  country: string | null;
}

const FormSchema = z.object({
  country: z.object({
    label: z.string().min(1, "Country label is required"),
    value: z.string().min(1, "Country value is required"),
  }),
});

const CountryForm = ({ userId, country }: CountryFormProps) => {
  const router = useRouter();

  let initialLocation = {};
  if (country !== null) {
    initialLocation = { label: country, value: country };
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      country: initialLocation,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await saveUserBasicDetailsById({
        userId,
        country: values.country.value,
      });
      toast.success("Country details updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Country </CardTitle>
        <CardDescription>
          This is used to display in your profile and search dashboard.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      {...field}
                      isMulti={false}
                      options={COUNTRIES}
                      className="md:w-1/2"
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
};

export default CountryForm;
