"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User } from "@prisma/client";
import { TIMEZONES } from "@/constants/data";

const FormSchema = z.object({
  timeZone: z.string({
    required_error: "Please select a timeZone.",
  }),
});

interface TimeZoneProps {
  id: string;
  timeZone: string | null;
}

export default function TimeZoneForm({ id, timeZone }: TimeZoneProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [valueChanged, setValueChange] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      timeZone: timeZone || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      withReactContent(Swal)
        .fire({
          text: "Changing timezone will rest your weekly schedule, you need to set again.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "I understand!",
          confirmButtonColor: "#3b82f6",
          cancelButtonText: "cancel",
          cancelButtonColor: "#ef4444",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await updateUser({ ...data, id, weeklyAvailability: null });
            toast.success("Time zone preference updated");
          }
        });

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time zone</CardTitle>
        <CardDescription>
          This is used to show session times based on the location
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[400px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? TIMEZONES.find(
                                (timeZone) => timeZone.value === field.value
                              )?.label
                            : "Select timeZone"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 max-h-[300px] overflow-y-auto">
                      <Command>
                        <CommandInput placeholder="Search timeZone..." />
                        <CommandEmpty>No time zone found.</CommandEmpty>
                        <CommandGroup>
                          {TIMEZONES.map((timeZone) => (
                            <CommandItem
                              value={timeZone.label}
                              key={timeZone.value}
                              onSelect={() => {
                                form.setValue("timeZone", timeZone.value);
                                setValueChange(true);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  timeZone.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {timeZone.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button disabled={isSubmitting || !valueChanged} type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
