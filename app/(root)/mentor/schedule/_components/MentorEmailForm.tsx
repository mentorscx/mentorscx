"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { updateUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const FormSchema = z.object({
  emails: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select atleast one email",
  }),
});

type CheckboxReactHookFormMultipleProps = {
  userId: string;
  emails: string[];
  connectedEmails: string[];
};

export function CheckboxReactHookFormMultiple({
  userId,
  emails,
  connectedEmails,
}: CheckboxReactHookFormMultipleProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      emails: emails || [],
    },
  });

  const items = connectedEmails.map((e) => ({
    id: e,
    label: e,
  }));

  const { isSubmitting, isValid, isDirty } = form.formState;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await updateUser(
        { id: userId, calendarEmails: data.emails },
        "/mentor/schedule"
      );
      toast.success("Email preferences updated");
    } catch (err) {
      toast.error("Failed to sync, Please try again");
    }
  };

  return (
    <Card>
      <Form {...form}>
        <CardHeader>
          <CardTitle className="text-2xl">Emails</CardTitle>
          <CardDescription>Select and sync your calendars</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="emails"
              render={() => (
                <FormItem>
                  {items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="emails"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-base">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting || !isValid || !isDirty}
            >
              <span>Sync now</span>
              {isSubmitting ? (
                <Loader2 className="animate-spin w-4 h-4 ml-1" />
              ) : (
                <ReloadIcon className="w-4 h-4 ml-1" />
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
