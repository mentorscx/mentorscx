import { db } from "@/lib/db";
import {
  convertEventsToTimezone,
  createTimeSlots,
  findEarliestDate,
} from "@/lib/helpers/calendar";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type NextAvailableDayProps = {
  userId: string;
};

const NextAvailableDay = async (props: NextAvailableDayProps) => {
  // TODO: Optimize the Query to get only future events

  const { userId: currentUserId } = auth();

  if (!currentUserId) redirect("/sign-in");

  const currentUser = await db.user.findUnique({
    where: {
      clerkId: currentUserId,
    },
    select: {
      timeZone: true,
    },
  });

  if (!currentUser) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      id: props.userId,
    },
    select: {
      timeZone: true,
      duration: true,
      weeklyAvailability: true,
      events: true,
    },
  });

  if (!user) return null;

  const weeklyAvailability = user?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const recurringEvents = generateEventsForNextYear(schedule);

  // Get the next available events
  const individualEvents = user.events;

  // Convert events to the specified timezone
  const convertedIndividualEvents = convertEventsToTimezone(
    individualEvents,
    user.timeZone || "UTC"
  );

  const convertedWeeklyEvents = convertEventsToTimezone(
    recurringEvents,
    user.timeZone || "UTC"
  );

  const allAvailableEvents = [
    ...convertedIndividualEvents,
    ...convertedWeeklyEvents,
  ];

  const availableTimeSlots = createTimeSlots(allAvailableEvents, user.duration);

  // Remove duplicate slots in available time slots
  const uniqueSlots = new Set<string>();
  const uniqueAvailableTimeSlots = availableTimeSlots.filter((slot) => {
    const slotStr = `${slot.start.getTime()}-${slot.end.getTime()}`;
    if (uniqueSlots.has(slotStr)) {
      return false;
    }
    uniqueSlots.add(slotStr);
    return true;
  });

  const earliestDate =
    findEarliestDate(uniqueAvailableTimeSlots, currentUser.timeZone) ??
    "No slots";

  return (
    <div className="flex flex-col items-center muted">
      <div className="flex items-center">
        <p className="text-xl font-bold text-black">{earliestDate}</p>
      </div>
      <div>Next Available Day</div>
    </div>
  );
};

export default NextAvailableDay;
