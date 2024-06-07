import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ValueLabelPair = {
  value: string;
  label: string;
};

export function arrayToValuesString(arr: ValueLabelPair[]): string {
  return arr && arr.map((pair) => pair.label).join(", ");
}

export function formatDateToMonthYear(dateString: string): string {
  // Create a Date object from the dateString
  const date = new Date(dateString);

  // Array of abbreviated month names
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month and year from the Date object
  const month = monthAbbreviations[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Return the formatted string
  return `${month}, ${year}`;
}

interface TimeInterval {
  id: number;
  title: string;
  start: string;
  end: string;
}

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

export function isEventOverlapping(
  newEvent: Event,
  existingEvents: Event[]
): boolean {
  for (const event of existingEvents) {
    if (
      (newEvent.start < event.end && newEvent.end > event.start) ||
      (event.start < newEvent.end && event.end > newEvent.start)
    ) {
      // There is an overlap
      return false;
    }
  }

  // No overlap found
  return true;
}

export function isEventInThePast(event: Event): boolean {
  const currentTime = new Date();
  return event.start < currentTime;
}

export function splitEventToSessions(
  start: string,
  end: string,
  interval: number
): { start: string; end: string }[] {
  // Convert start and end times to Date objects
  const startTime: Date = new Date(start);
  const endTime: Date = new Date(end);

  // Convert interval to milliseconds
  const durationInMilliseconds: number = interval * 60000;

  const intervals: { start: string; end: string }[] = [];
  let currentStartTime: Date = startTime;

  while (currentStartTime < endTime) {
    const currentEndTime: Date = new Date(
      currentStartTime.getTime() + durationInMilliseconds
    );

    // Make sure the current end time does not exceed the actual end time
    const intervalEnd = currentEndTime < endTime ? currentEndTime : endTime;

    intervals.push({
      start: currentStartTime.toISOString(),
      end: intervalEnd.toISOString(),
    });

    // Update currentStartTime for the next iteration
    currentStartTime = intervalEnd;
  }

  return intervals;
}

export function getInitials(fullName: string): string {
  // Split the name into parts based on spaces
  const parts = fullName.trim().split(" ");

  // Ensure there are at least two parts for first and last name
  if (parts.length < 2) {
    throw new Error("Please provide both first and last names.");
  }

  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  return (firstInitial + lastInitial).toUpperCase();
}
