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
import { updateUser } from "@/lib/actions/user.action";
import { Language } from "@prisma/client";
import { languageData } from "@/constants/data";

interface LanguagesFormProps {
  userId: string;
  languages: Language[];
}

const FormSchema = z.object({
  languages: z
    .array(
      z.object({
        label: z.string().min(1, "Language label is required"),
        value: z.string().min(1, "Language value is required"),
      })
    )
    .min(1, "At least one language must be selected"),
});

const LanguagesForm = ({ userId, languages }: LanguagesFormProps) => {
  const router = useRouter();

  const initialLanguages = languages?.map((language) => ({
    label: language.name,
    value: language.name,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      languages: initialLanguages,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await updateUser({ ...values, id: userId });
      toast.success("Price updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Languages</CardTitle>
        <CardDescription>
          This is used to display in your profile and search dashboard
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select {...field} isMulti={true} options={languageData} />
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

export default LanguagesForm;
