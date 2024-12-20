import * as React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { formUserSchema } from "@/lib/schemas";
import { addSubscribeUser } from "@/lib/actions/subscribe.action";

interface SubscribeFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SubscribeForm({ className, ...props }: SubscribeFormProps) {
  // 1. Define your form.

  const form = useForm<z.infer<typeof formUserSchema>>({
    resolver: zodResolver(formUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: undefined,
    },
  });

  const { formState } = form;
  const { isSubmitting } = formState;
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formUserSchema>) {
    try {
      const result = await addSubscribeUser(
        values.firstName,
        values.lastName,
        values.email,
        values.role
      );

      if (!result) {
        toast.error("Something went wrong. Please try again.");
      } else {
        withReactContent(Swal).fire({
          title: "Added to the waitlist!",
          text: "You have been added. We will get back to you shortly.",
          icon: "success",
          confirmButtonText: "Cool!",
          confirmButtonColor: "#3b82f6",
        });
        form.reset();
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Alex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Gomez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@mentorscx.com" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I'm interested in being a</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MENTOR">Mentor</SelectItem>
                    <SelectItem value="MENTEE">Mentee</SelectItem>
                    <SelectItem value="BOTH">Both</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select a role you are interested in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={isSubmitting}>
              Reserve my spot on the waitlist
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1 text-white"></span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
