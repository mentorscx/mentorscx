import { utcToZonedTime } from "date-fns-tz";
import { format, min } from "date-fns";

type Event = {
  start: Date;
  end: Date;
};

export function getDisabledDays(events: Event[]): Date[] {
  const toDateString = (date: Date) => date.toISOString().split("T")[0];

  // Define the 6 months period
  const today = new Date();
  const sixMonthsLater = new Date(today);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 4);

  const enabledDates = new Set<string>();

  // Populate enabledDates with dates from all events, adjusted to the 6 months range
  events.forEach((event) => {
    const eventStart = new Date(
      Math.max(event.start.getTime(), today.getTime())
    ); // Ensure event starts today or in the future
    const eventEnd = new Date(
      Math.min(event.end.getTime(), sixMonthsLater.getTime())
    ); // Limit to 6 months range

    for (
      let d = new Date(eventStart);
      d <= eventEnd;
      d = new Date(d.setDate(d.getDate() + 1))
    ) {
      enabledDates.add(toDateString(d));
    }
  });

  // Iterate through the 6 month period to find disabled dates
  const disabledDates: Date[] = [];
  for (
    let d = new Date(today);
    d <= sixMonthsLater;
    d = new Date(d.setDate(d.getDate() + 1))
  ) {
    const dateString = toDateString(d);

    if (!enabledDates.has(dateString)) {
      disabledDates.push(new Date(d));
    }
  }

  return disabledDates;
}

export function convertEventsToTimezone(
  events: Event[],
  timezone: string
): Event[] {
  return events.map((event) => {
    // Assuming the original event times are in UTC, we convert them to the specified timezone.
    // If they are not in UTC, adjust this part of the code accordingly.
    const startInTimezone = utcToZonedTime(event.start, timezone);
    const endInTimezone = utcToZonedTime(event.end, timezone);

    return {
      start: startInTimezone,
      end: endInTimezone,
    };
  });
}

export function createTimeSlots(
  events: Event[],
  durationMinutes: number
): Event[] {
  const timeSlots: Event[] = [];

  events.forEach((event) => {
    let startTime = event.start;
    let endTime = new Date(startTime.getTime() + durationMinutes * 60000); // 60000ms = 1 minute

    while (endTime <= event.end) {
      timeSlots.push({ start: new Date(startTime), end: new Date(endTime) });

      // Move to the next slot
      startTime = new Date(startTime.getTime() + durationMinutes * 60000);
      endTime = new Date(endTime.getTime() + durationMinutes * 60000);
    }
  });

  return timeSlots;
}

export function findEarliestDate(
  events: Event[],
  timezone: string | null
): string | null {
  const now = new Date();
  const currentDate = timezone ? utcToZonedTime(now, timezone) : now;

  const futureEvents = events.filter((event) => event.start >= currentDate);
  if (futureEvents.length === 0) return null;

  const earliestDate = min(futureEvents.map((event) => event.start));

  // Convert the earliest date to the specified timezone, or use UTC by default
  const zonedDate = timezone
    ? utcToZonedTime(earliestDate, timezone)
    : earliestDate;

  // Format the zoned date
  return format(zonedDate, "MMM do");
}
