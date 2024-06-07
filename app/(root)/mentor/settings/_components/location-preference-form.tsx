"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const timeZones = [
  { label: "America/New_York (Eastern Time)", value: "America/New_York" },
  { label: "Europe/London (Greenwich Mean Time)", value: "Europe/London" },
  { label: "Asia/Tokyo (Japan Standard Time)", value: "Asia/Tokyo" },
  { label: "Europe/Berlin (Central European Time)", value: "Europe/Berlin" },
  { label: "America/Los_Angeles (Pacific Time)", value: "America/Los_Angeles" },
  {
    label: "Australia/Sydney (Australian Eastern Time)",
    value: "Australia/Sydney",
  },
  { label: "Asia/Shanghai (China Standard Time)", value: "Asia/Shanghai" },
  { label: "Asia/Dubai (Gulf Standard Time)", value: "Asia/Dubai" },
  { label: "Asia/Kolkata (India Standard Time)", value: "Asia/Kolkata" },
] as const;

const FormSchema = z.object({
  timeZone: z.string({
    required_error: "Please select a timeZone.",
  }),
});

interface LocationPreferenceProps {
  user: string;
}

export function LocationPreferenceForm({ user }: LocationPreferenceProps) {
  const parsedUser = JSON.parse(user);
  const { timeZone: initialTimeZone } = parsedUser;
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      timeZone: initialTimeZone || "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updateUser({ ...data, id: parsedUser.id });
      toast.success("Time zone preference updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border rounded-md p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="timeZone"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="large">Time Zone</FormLabel>
                <Popover>
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
                          ? timeZones.find(
                              (timeZone) => timeZone.value === field.value
                            )?.label
                          : "Select timeZone"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput placeholder="Search timeZone..." />
                      <CommandEmpty>No time zone found.</CommandEmpty>
                      <CommandGroup>
                        {timeZones.map((timeZone) => (
                          <CommandItem
                            value={timeZone.label}
                            key={timeZone.value}
                            onSelect={() => {
                              form.setValue("timeZone", timeZone.value);
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
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
