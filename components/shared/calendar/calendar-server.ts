import { Session } from "@prisma/client";
import { startOfWeek, endOfWeek } from "date-fns";
import moment from "moment-timezone";
import { createTimeSlots } from "@/lib/helpers/calendar";

type Event = {
  start: Date;
  end: Date;
};

export const getAvailableSlots = (params: {
  individualEvents: Event[];
  timeZone: string;
  mentorTimeZone: string;
  weeklyEvents: Event[];
  externalEvents: Event[];
  duration: number;
  maxSessions: number | null;
  sessions: Pick<Session, "start" | "end" | "status">[];
}) => {
  // Merge both of the events
  const allAvailableEvents = [
    ...params.individualEvents,
    ...params.weeklyEvents,
  ];

  // Based on the duration, the slots are created
  const availableTimeSlots = createTimeSlots(
    allAvailableEvents,
    params.duration
  );

  // Get the booked slots -> ACCEPTED, AWAITING_HOST
  let bookedSlots = params.sessions
    .filter((s) => s.status === "ACCEPTED" || s.status === "AWAITING_HOST")
    .map((s) => ({
      start: s.start,
      end: s.end,
    }));

  bookedSlots = [...bookedSlots];

  // Remove the  BookedSlots
  const uniqueSlots = new Set<string>();
  bookedSlots.forEach((slot) => {
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

  // Filter out slots that overlap with external events
  uniqueAvailableTimeSlots = uniqueAvailableTimeSlots.filter(
    (availableSlot) => {
      return !params.externalEvents.some((externalEvent) => {
        return (
          externalEvent.start < availableSlot.end &&
          externalEvent.end > availableSlot.start
        );
      });
    }
  );

  if (params.maxSessions !== null) {
    const mentorTimezone = params.mentorTimeZone;
    const weekMap = new Map<string, Event[]>();
    const maxSessions = params.maxSessions;

    // Helper function to get the start of the week in mentor's timezone
    const getWeekStart = (date: Date): moment.Moment => {
      return moment.tz(date, mentorTimezone).startOf("week");
    };

    // Helper function to get the end of the week in mentor's timezone
    const getWeekEnd = (date: Date): moment.Moment => {
      return moment.tz(date, mentorTimezone).endOf("week");
    };

    // Group booked slots by week in mentor's timezone
    bookedSlots.forEach((slot) => {
      const weekStart = getWeekStart(slot.start);
      const weekKey = weekStart.format("YYYY-MM-DD");

      if (!weekMap.has(weekKey)) {
        weekMap.set(weekKey, []);
      }
      weekMap.get(weekKey)?.push(slot);
    });

    // Filter out weeks with more than the max allowed sessions
    uniqueAvailableTimeSlots = uniqueAvailableTimeSlots.filter(
      (availableSlot) => {
        const weekStart = getWeekStart(availableSlot.start);
        const weekEnd = getWeekEnd(availableSlot.start);
        const weekKey = weekStart.format("YYYY-MM-DD");

        const bookedSlotsInWeek = weekMap.get(weekKey) || [];

        // Check if the slot is within the week and if the week hasn't reached max sessions
        return (
          moment
            .tz(availableSlot.start, mentorTimezone)
            .isBetween(weekStart, weekEnd, null, "[]") &&
          bookedSlotsInWeek.length < maxSessions
        );
      }
    );
  }

  return uniqueAvailableTimeSlots;
};

export const getEnabledAndDisabledDays = (
  events: Event[],
  timeZone: string
) => {
  // Set to hold unique dates of active days
  const activeDays = new Set();

  // Parse each event and add to the active days set
  events.forEach((event) => {
    const startTime = moment.tz(event.start, timeZone).format("YYYY-MM-DD");
    activeDays.add(startTime);
  });

  // Generate all dates for the next four months
  const startDate = moment().tz(timeZone).startOf("day");
  const endDate = moment(startDate).add(4, "months");
  const allDays = [];
  const enabledDays = [];
  const disabledDays = [];

  // Iterate over each day from start date to end date
  while (startDate.isBefore(endDate)) {
    const currentDate = startDate.format("YYYY-MM-DD");
    allDays.push(currentDate);

    // Check if the current day is an active day
    if (activeDays.has(currentDate)) {
      enabledDays.push(currentDate);
    } else {
      disabledDays.push(currentDate);
    }

    // Move to the next day
    startDate.add(1, "days");
  }

  // Return both enabled and disabled days
  return { enabledDays, disabledDays };
};

export const filterTimeSlotsByDate = (
  timeSlots: Event[],
  selectedDate: Date | null
): Event[] => {
  if (!selectedDate) {
    return [];
  }

  // Calculate the end of the 24-hour period from the selected date
  const endDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);

  // Filter time slots that start within the selected date's 24-hour window
  const filteredTimeSlots = timeSlots.filter((timeSlot) => {
    const startDateTime = new Date(timeSlot.start);
    return startDateTime >= selectedDate && startDateTime < endDate;
  });

  return filteredTimeSlots;
};
