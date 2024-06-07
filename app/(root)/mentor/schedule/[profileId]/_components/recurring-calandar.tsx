"use client";
import React from "react";
import {
  useForm,
  useFieldArray,
  useWatch,
  Control,
  Controller,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, PlusIcon } from "lucide-react";
import { TrashIcon } from "@radix-ui/react-icons";

import { updateUser } from "@/lib/actions/user.action";

type FormValues = {
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
};

type ScheduleItem = {
  day: string;
  startTime: string;
  endTime: string;
};

/**
 * Finds the next occurrence of a specified weekday from a reference date.
 *
 * @param {string} dayName - The name of the day to find the next occurrence of ("Sunday", "Monday", etc.).
 * @param {Date} [referenceDate=new Date()] - The date from which to find the next occurrence. Defaults to today.
 * @returns {Date} The date of the next occurrence of the specified day.
 */
function findNextDay(dayName: any, referenceDate = new Date()) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = referenceDate.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
  const targetDay = daysOfWeek.indexOf(dayName);

  if (targetDay === -1) {
    throw new Error("Invalid day name");
  }

  // Calculate the number of days to add to the current date to reach the next occurrence of the target day
  let daysToAdd = targetDay - currentDay;
  if (daysToAdd <= 0) {
    daysToAdd += 7; // If it's today or a past day in the week, add a week
  }

  const nextDay = new Date(referenceDate);
  nextDay.setDate(referenceDate.getDate() + daysToAdd);

  return nextDay;
}

// Converts the entire schedule from the local timezone to UTC
const convertScheduleToUTC = (
  schedule: ScheduleItem[],
  timeZone: string
): ScheduleItem[] => {
  return schedule.map((item) => {
    const dayDate = findNextDay(item.day);
    const localStartDatetime = new Date(
      dayDate.setHours(
        Number(item.startTime.split(":")[0]),
        Number(item.startTime.split(":")[1]),
        0,
        0
      )
    );
    const localEndDatetime = new Date(
      dayDate.setHours(
        Number(item.endTime.split(":")[0]),
        Number(item.endTime.split(":")[1]),
        0,
        0
      )
    );

    // Adjust for end time being earlier than start time, indicating it's actually the next day
    if (item.endTime <= item.startTime) {
      localEndDatetime.setDate(localEndDatetime.getDate() + 1);
    }

    const utcStartDatetime = zonedTimeToUtc(localStartDatetime, timeZone);
    const utcEndDatetime = zonedTimeToUtc(localEndDatetime, timeZone);

    return {
      ...item,
      startTime: utcStartDatetime.toISOString(),
      endTime: utcEndDatetime.toISOString(),
    };
  });
};

const convertScheduleFromUTC = (
  schedule: ScheduleItem[],
  timeZone: string
): ScheduleItem[] => {
  return schedule.map((item) => {
    const utcStartDatetime = new Date(item.startTime);
    const utcEndDatetime = new Date(item.endTime);

    const zonedStartDatetime = utcToZonedTime(utcStartDatetime, timeZone);
    const zonedEndDatetime = utcToZonedTime(utcEndDatetime, timeZone);

    // Direct comparison of ISO strings won't work due to different dates, compare times instead
    const startTimeString = format(zonedStartDatetime, "HH:mm");
    const endTimeString = format(zonedEndDatetime, "HH:mm");
    const startDateTimeParts = startTimeString.split(":");
    const endDateTimeParts = endTimeString.split(":");
    const startTimeMinutes =
      parseInt(startDateTimeParts[0]) * 60 + parseInt(startDateTimeParts[1]);
    const endTimeMinutes =
      parseInt(endDateTimeParts[0]) * 60 + parseInt(endDateTimeParts[1]);

    // Adjust if the endTime is less than startTime, indicating it ends the next day
    const adjustedEndTime = endTimeString;
    if (endTimeMinutes < startTimeMinutes) {
      // Since endTime is for the next day, and we're only showing HH:mm, no date adjustment is needed here
      // If you wish to show that it ends the next day, additional UI logic might be required
    }

    return {
      ...item,
      startTime: startTimeString,
      endTime: adjustedEndTime,
    };
  });
};

const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "schedule",
    control,
  });

  // Assuming startTime and endTime are strings in "HH:mm" format, we calculate the total duration
  const total = formValues.reduce((acc, current) => {
    const startTime = current.startTime.split(":");
    const endTime = current.endTime.split(":");
    const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
    const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);
    const duration = endMinutes - startMinutes;
    return acc + duration;
  }, 0);

  // Format total minutes back into hours and minutes
  const totalHours = Math.floor(total / 60);
  const totalMinutes = total % 60;

  return (
    <p className="small !text-base">
      Your weeekly availability: {totalHours}h {totalMinutes}min
    </p>
  );
};

interface RecurPageProps {
  user: string;
}

const RecurPage = ({ user }: RecurPageProps) => {
  const router = useRouter();
  const parsedUser = JSON.parse(user);
  const { duration, timeZone, weeklyAvailability } = parsedUser;

  const defaultWeeklyAvailability = weeklyAvailability || {
    schedule: [
      // { day: "Monday", startTime: "18:17", endTime: "20:19" },
      // { day: "Tuesday", startTime: "18:18", endTime: "20:40" },
    ],
  };
  const defaultWeeklyInTimezone = convertScheduleFromUTC(
    defaultWeeklyAvailability.schedule,
    timeZone
  );
  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<FormValues>({
    defaultValues: { schedule: defaultWeeklyInTimezone },
    mode: "onBlur",
  });
  const { fields, append, remove, swap } = useFieldArray({
    name: "schedule",
    control,
  });
  const onSubmit = async (data: FormValues) => {
    try {
      const scheduleUTC = convertScheduleToUTC(data.schedule, timeZone);
      const currentDateISO = new Date().toISOString(); // Current datetime in ISO format

      // Update the user with the UTC schedule and the current datetime
      await updateUser({
        id: parsedUser.id,
        weeklyAvailability: { schedule: scheduleUTC },
      });

      toast.success("Weekly schedule updated successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update the weekly schedule.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-3">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">Weekly Recurrence</h3>
        <p className="muted">
          Set up your recurrent availability - set times repeat weekly
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <section className="flex gap-4 flex-wrap" key={field.id}>
            {/* <Input
              placeholder="name"
              {...register(`schedule.${index}.name` as const, {
                required: "This field is required",
              })}
              className="w-[200px]"
              defaultValue={field.name}
            /> */}

            <Controller
              control={control}
              name={`schedule.${index}.day`}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monday">Monday</SelectItem>
                    <SelectItem value="Tuesday">Tuesday</SelectItem>
                    <SelectItem value="Wednesday">Wednesday</SelectItem>
                    <SelectItem value="Thursday">Thursday</SelectItem>
                    <SelectItem value="Friday">Friday</SelectItem>
                    <SelectItem value="Saturday">Saturday</SelectItem>
                    <SelectItem value="Sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <div className="flex gap-4">
              <Input
                placeholder="Start Time"
                type="time"
                {...register(`schedule.${index}.startTime` as const, {
                  required: "Start time is required",
                })}
                className="min-w-[125px] w-fit"
                defaultValue={field.startTime}
              />
              <Input
                placeholder="End Time"
                type="time"
                {...register(`schedule.${index}.endTime` as const, {
                  required: "End time is required",
                })}
                className="min-w-[125px] w-fit"
                defaultValue={field.endTime}
              />
              {/*FUTURE: Ref to order*/}
              {/* <Button
              type="button"
              onClick={() => {
                if (index > 0) swap(index, index - 1);
              }}
              variant="outline"
              size="icon"
            >
              <ChevronUp />
            </Button>
            <Button
              type="button"
              onClick={() => {
                if (index < fields.length - 1) swap(index, index + 1);
              }}
              variant="outline"
              size="icon"
            >
              <ChevronDown />
            </Button> */}
              <Button
                type="button"
                onClick={() => remove(index)}
                variant="outline"
                size="icon"
              >
                <TrashIcon className="w-4 h-4 text-danger" />
              </Button>
            </div>
          </section>
        ))}

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="flex gap-4">
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                append({
                  day: "Monday",
                  startTime: "09:00",
                  endTime: "18:00",
                })
              }
            >
              ADD <PlusIcon className="w-4 h-4 ml-1" />
            </Button>
            <Button type="submit" disabled={!isDirty}>
              Save
            </Button>
          </div>

          <Total control={control} />
        </div>
      </form>
    </div>
  );
};

export default RecurPage;
