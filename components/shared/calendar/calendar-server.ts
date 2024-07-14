import { Session } from "@prisma/client";
import { startOfWeek, endOfWeek } from "date-fns";

type Event = {
  start: Date;
  end: Date;
};

import {
  convertEventsToTimezone,
  createTimeSlots,
} from "@/lib/helpers/calendar";

export const getAvailableSlots = (params: {
  individualEvents: Event[];
  timeZone: string;
  weeklyEvents: Event[];
  duration: number;
  maxSessions: number | null;
  sessions: Pick<Session, "start" | "end" | "status">[];
}) => {
  // Convert events to the specified timezone
  const convertedIndividualEvents = convertEventsToTimezone(
    params.individualEvents,
    params.timeZone
  );

  // convert recurring events to timezone
  const convertedWeeklyEvents = convertEventsToTimezone(
    params.weeklyEvents,
    params.timeZone
  );

  // Merge both of the events
  const allAvailableEvents = [
    ...convertedIndividualEvents,
    ...convertedWeeklyEvents,
  ];

  // Based on the duration, the slots are created
  const availableTimeSlots = createTimeSlots(
    allAvailableEvents,
    params.duration
  );

  // Get the booked slots -> ACCEPTED, AWAITING_HOST
  const bookedSlots = params.sessions
    .filter((s) => s.status === "ACCEPTED" || s.status === "AWAITING_HOST")
    .map((s) => ({
      start: s.start,
      end: s.end,
    }));

  // Convert to user timezone
  const convertedBookedSlots = convertEventsToTimezone(
    bookedSlots,
    params.timeZone
  );

  // Remove the  BookedSlots
  const uniqueSlots = new Set<string>();
  convertedBookedSlots.forEach((slot) => {
    const slotStr = `${slot.start.getTime()}-${slot.end.getTime()}`;
    uniqueSlots.add(slotStr);
  });

  let uniqueAvailableTimeSlots = availableTimeSlots.filter((slot) => {
    const slotStr = `${slot.start.getTime()}-${slot.end.getTime()}`;
    if (uniqueSlots.has(slotStr)) {
      return false;
    }
    uniqueSlots.add(slotStr);
    return true;
  });

  if (params.maxSessions !== null) {
    // Group slots by week
    const weekMap = new Map();
    convertedBookedSlots.forEach((slot) => {
      const weekStart = startOfWeek(slot.start, { weekStartsOn: 1 });
      const weekKey = weekStart.toISOString();
      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, []);
      }
      weekMap.get(weekKey).push(slot);
    });

    // Filter out weeks with more than the max allowed sessions
    weekMap.forEach((slots, week) => {
      if (params.maxSessions && slots.length >= params.maxSessions) {
        // Remove all slots in this week from `uniqueAvailableTimeSlots`
        const startOfWeekDate = new Date(week);
        const endOfWeekDate = endOfWeek(startOfWeekDate, { weekStartsOn: 1 });
        uniqueAvailableTimeSlots = uniqueAvailableTimeSlots.filter((slot) => {
          return slot.start < startOfWeekDate || slot.start > endOfWeekDate;
        });
      }
    });
  }
  return uniqueAvailableTimeSlots;
};
