"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { useForm } from "react-hook-form";
import {
  Check,
  ChevronsUpDown,
  ArrowRightIcon,
  Loader2Icon,
  ArrowLeft,
} from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

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

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { saveUserChallengeById } from "@/lib/actions/user.action";
import { Input } from "@/components/ui/input";
import { TIMEZONES } from "@/constants/data";

const FormSchema = z.object({
  timeZone: z.string({
    required_error: "Please select a timeZone.",
  }),
  meetingPreference: z.string({
    required_error: "Please select a meeting preference.",
  }),
  meetingURL: z
    .string()
    .optional()
    .refine(
      (data) => {
        // Validate as URL only if the field is not empty
        return data === "" || z.string().url().safeParse(data).success;
      },
      {
        message: "Please enter a valid URL.",
      }
    ),
});

interface RecommendedByFormProps {
  userId: string;
  timeZone: string | null;
  meetingPreference: string | null;
  googleMeetLink: string | null;
  zoomLink: string | null;
}

export function OnboardChallengeForm({
  userId,
  timeZone,
  meetingPreference,
  googleMeetLink,
  zoomLink,
}: RecommendedByFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const defaultMeetingURL =
    meetingPreference === "zoom" ? zoomLink : googleMeetLink;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      timeZone: timeZone || undefined,
      meetingPreference: meetingPreference || undefined,
      meetingURL: defaultMeetingURL || undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await saveUserChallengeById({
        userId,
        timeZone: data.timeZone,
        meetingPreference: data.meetingPreference,
        meetingURL: data.meetingURL,
      });
      toast.success("Meeting preference saved successfully.");
      router.push("/onboard/4");
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error, Please try again.");
    }

    router.refresh();
  }

  const meetingPref = form.watch("meetingPreference");
  const isMeetingOnline =
    meetingPref === "zoom" || meetingPref === "google-meet";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="timeZone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Time zone</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "max-w-[400px] justify-between hover:text-muted-foreground text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? TIMEZONES.find(
                            (timeZone) => timeZone.value === field.value
                          )?.label
                        : "select time zone"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0 h-[300px] overflow-y-auto">
                  <Command>
                    <CommandEmpty>No time zone found.</CommandEmpty>
                    <CommandGroup>
                      {TIMEZONES.map((timeZone) => (
                        <CommandItem
                          value={timeZone.label}
                          key={timeZone.value}
                          onSelect={() => {
                            form.setValue("timeZone", timeZone.value);
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
                    <CommandInput placeholder="Search timeZone..." />
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-[400px]">
          <FormField
            control={form.control}
            name="meetingPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting preference</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-muted-foreground">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="google-meet">Google Meet</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isMeetingOnline && (
          <FormField
            name="meetingURL"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {meetingPref === "zoom" ? "Zoom" : "Google Meet"} URL
                </FormLabel>
                <Input
                  {...field}
                  placeholder={`Enter ${
                    meetingPref === "zoom" ? "Zoom" : "Google Meet"
                  } url here`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-start justify-between pt-4">
          <Button
            asChild
            variant="outline"
            className="min-w-[100px] rounded-full"
          >
            <Link href="/onboard/2">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px] rounded-full"
          >
            <span>Next</span>
            <span>
              {isSubmitting ? (
                <Loader2Icon className="animate-spin h-4 w-4 ml-1" />
              ) : (
                <ArrowRightIcon className="h-4 w-4 ml-1" />
              )}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
