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

import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { saveUserChallengeById } from "@/lib/actions/user.action";
import { Input } from "@/components/ui/input";

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
  { label: "Europe/Moscow (Moscow Standard Time)", value: "Europe/Moscow" },
  { label: "Asia/Seoul (Korea Standard Time)", value: "Asia/Seoul" },
  { label: "America/Sao_Paulo (Brasilia Time)", value: "America/Sao_Paulo" },
  {
    label: "Africa/Johannesburg (South Africa Standard Time)",
    value: "Africa/Johannesburg",
  },
  { label: "America/Mexico_City (Central Time)", value: "America/Mexico_City" },
  { label: "Asia/Jakarta (Indonesia Western Time)", value: "Asia/Jakarta" },
  { label: "Europe/Paris (Central European Time)", value: "Europe/Paris" },
  { label: "Europe/Istanbul (Turkey Time)", value: "Europe/Istanbul" },
  { label: "America/Toronto (Eastern Time)", value: "America/Toronto" },
  { label: "Asia/Singapore (Singapore Time)", value: "Asia/Singapore" },
  { label: "Europe/Rome (Central European Time)", value: "Europe/Rome" },
  {
    label: "America/Buenos_Aires (Argentina Time)",
    value: "America/Buenos_Aires",
  },
  { label: "Europe/Athens (Eastern European Time)", value: "Europe/Athens" },
  { label: "Asia/Bangkok (Indochina Time)", value: "Asia/Bangkok" },
  { label: "Africa/Cairo (Eastern European Time)", value: "Africa/Cairo" },
  { label: "America/Vancouver (Pacific Time)", value: "America/Vancouver" },
  { label: "Africa/Nairobi (East Africa Time)", value: "Africa/Nairobi" },
  { label: "Europe/Madrid (Central European Time)", value: "Europe/Madrid" },
  { label: "Asia/Kuala_Lumpur (Malaysia Time)", value: "Asia/Kuala_Lumpur" },
  {
    label: "Europe/Amsterdam (Central European Time)",
    value: "Europe/Amsterdam",
  },
  { label: "Asia/Manila (Philippine Time)", value: "Asia/Manila" },
  {
    label: "Europe/Stockholm (Central European Time)",
    value: "Europe/Stockholm",
  },
  { label: "America/Lima (Peru Time)", value: "America/Lima" },
  { label: "Asia/Hong_Kong (Hong Kong Time)", value: "Asia/Hong_Kong" },
  { label: "Asia/Taipei (Taiwan Time)", value: "Asia/Taipei" },
  { label: "America/Bogota (Colombia Time)", value: "America/Bogota" },
  { label: "Europe/Zurich (Central European Time)", value: "Europe/Zurich" },
  { label: "America/Denver (Mountain Time)", value: "America/Denver" },
  { label: "Asia/Beirut (Eastern European Time)", value: "Asia/Beirut" },
  {
    label: "Australia/Perth (Australian Western Standard Time)",
    value: "Australia/Perth",
  },
  { label: "Asia/Karachi (Pakistan Standard Time)", value: "Asia/Karachi" },
  { label: "America/Chicago (Central Time)", value: "America/Chicago" },
  { label: "Europe/Lisbon (Western European Time)", value: "Europe/Lisbon" },
  { label: "Asia/Dhaka (Bangladesh Standard Time)", value: "Asia/Dhaka" },
  { label: "Asia/Riyadh (Arabian Standard Time)", value: "Asia/Riyadh" },
  { label: "Europe/Oslo (Central European Time)", value: "Europe/Oslo" },
  { label: "Asia/Tehran (Iran Standard Time)", value: "Asia/Tehran" },
  { label: "America/Montreal (Eastern Time)", value: "America/Montreal" },
  {
    label: "Europe/Brussels (Central European Time)",
    value: "Europe/Brussels",
  },
  { label: "Asia/Amman (Eastern European Time)", value: "Asia/Amman" },
  { label: "Asia/Ho_Chi_Minh (Indochina Time)", value: "Asia/Ho_Chi_Minh" },
  {
    label: "America/Phoenix (Mountain Standard Time)",
    value: "America/Phoenix",
  },
  {
    label: "Europe/Helsinki (Eastern European Time)",
    value: "Europe/Helsinki",
  },
  { label: "America/Caracas (Venezuela Time)", value: "America/Caracas" },
  { label: "Asia/Yakutsk (Yakutsk Time)", value: "Asia/Yakutsk" },
  { label: "Pacific/Auckland (New Zealand Time)", value: "Pacific/Auckland" },
  { label: "America/Anchorage (Alaska Time)", value: "America/Anchorage" },
  { label: "Asia/Calcutta (India Standard Time)", value: "Asia/Calcutta" },
  { label: "Europe/Vienna (Central European Time)", value: "Europe/Vienna" },
  { label: "America/Halifax (Atlantic Time)", value: "America/Halifax" },
  { label: "Asia/Muscat (Gulf Standard Time)", value: "Asia/Muscat" },
  { label: "Europe/Kiev (Eastern European Time)", value: "Europe/Kiev" },
  { label: "Asia/Magadan (Magadan Time)", value: "Asia/Magadan" },
  { label: "Europe/Warsaw (Central European Time)", value: "Europe/Warsaw" },
  {
    label: "America/Guatemala (Central America Time)",
    value: "America/Guatemala",
  },
  { label: "Asia/Qatar (Arabian Standard Time)", value: "Asia/Qatar" },
  {
    label: "Europe/Bucharest (Eastern European Time)",
    value: "Europe/Bucharest",
  },
  {
    label: "Pacific/Honolulu (Hawaii-Aleutian Standard Time)",
    value: "Pacific/Honolulu",
  },
  { label: "Africa/Lagos (West Africa Time)", value: "Africa/Lagos" },
  { label: "Asia/Jerusalem (Israel Standard Time)", value: "Asia/Jerusalem" },
  { label: "America/Winnipeg (Central Time)", value: "America/Winnipeg" },
  { label: "Europe/Prague (Central European Time)", value: "Europe/Prague" },
  {
    label: "America/El_Salvador (Central America Time)",
    value: "America/El_Salvador",
  },
  { label: "Asia/Baku (Azerbaijan Standard Time)", value: "Asia/Baku" },
  {
    label: "Europe/Belgrade (Central European Time)",
    value: "Europe/Belgrade",
  },
  { label: "America/Regina (Central Standard Time)", value: "America/Regina" },
  {
    label: "America/Newfoundland (Newfoundland Time)",
    value: "America/St_Johns",
  },
  { label: "Asia/Almaty (East Kazakhstan Time)", value: "Asia/Almaty" },
  {
    label: "Europe/Budapest (Central European Time)",
    value: "Europe/Budapest",
  },
  { label: "America/Santiago (Chile Time)", value: "America/Santiago" },
  { label: "Asia/Colombo (India Standard Time)", value: "Asia/Colombo" },
  {
    label: "Europe/Copenhagen (Central European Time)",
    value: "Europe/Copenhagen",
  },
  { label: "America/Panama (Eastern Time)", value: "America/Panama" },
  { label: "Europe/Oslo (Central European Time)", value: "Europe/Oslo" },
  { label: "Asia/Ulaanbaatar (Ulaanbaatar Time)", value: "Asia/Ulaanbaatar" },
  { label: "Asia/Damascus (Eastern European Time)", value: "Asia/Damascus" },
  { label: "America/Asuncion (Paraguay Time)", value: "America/Asuncion" },
  { label: "Europe/Dublin (Greenwich Mean Time)", value: "Europe/Dublin" },
  { label: "Asia/Yerevan (Armenia Time)", value: "Asia/Yerevan" },
  {
    label: "America/Tegucigalpa (Central America Time)",
    value: "America/Tegucigalpa",
  },
  { label: "Asia/Urumqi (China Time)", value: "Asia/Urumqi" },
  { label: "America/Managua (Central America Time)", value: "America/Managua" },
  { label: "Asia/Kabul (Afghanistan Time)", value: "Asia/Kabul" },
  { label: "America/Dominica (Atlantic Time)", value: "America/Dominica" },
  { label: "Asia/Omsk (Omsk Time)", value: "Asia/Omsk" },
  {
    label: "Europe/Luxembourg (Central European Time)",
    value: "Europe/Luxembourg",
  },
  { label: "America/Montevideo (Uruguay Time)", value: "America/Montevideo" },
  { label: "Asia/Novosibirsk (Novosibirsk Time)", value: "Asia/Novosibirsk" },
  { label: "Europe/Malta (Central European Time)", value: "Europe/Malta" },
  { label: "Asia/Sanaa (Arabian Standard Time)", value: "Asia/Sanaa" },
  { label: "Asia/Thimphu (Bhutan Time)", value: "Asia/Thimphu" },
  { label: "Europe/Riga (Eastern European Time)", value: "Europe/Riga" },
  { label: "Asia/Chita (Yakutsk Time)", value: "Asia/Chita" },
  {
    label: "America/Curacao (Atlantic Standard Time)",
    value: "America/Curacao",
  },
] as const;

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
      router.push("/onboard/4");
      toast.success("Meeting preference saved successfully.");
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
              <Popover>
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
                        ? timeZones.find(
                            (timeZone) => timeZone.value === field.value
                          )?.label
                        : "select time zone"}
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
