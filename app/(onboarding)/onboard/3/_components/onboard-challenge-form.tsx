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

import { useRouter } from "next/navigation";
import { saveUserChallengeById } from "@/lib/actions/user.action";

import { TIMEZONES } from "@/constants/data";

const FormSchema = z.object({
  timeZone: z.string({
    required_error: "Please select a timeZone.",
  }),
});

interface RecommendedByFormProps {
  userId: string;
  timeZone: string | null;
}

export function OnboardChallengeForm({
  userId,
  timeZone,
}: RecommendedByFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      timeZone: timeZone || undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await saveUserChallengeById({
        userId,
        timeZone: data.timeZone,
      });
      toast.success("Meeting preference saved successfully.");
      router.push("/onboard/4");
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error, Please try again.");
    }

    router.refresh();
  }

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
