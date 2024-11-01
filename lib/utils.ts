import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Subscription } from "@prisma/client";
import { PLAN_BOOKING_LIMITS, PLAN_CREDIT_LIMITS } from "@/constants/data";

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
  if (parts.length < 1) {
    throw new Error("Please provide both first and last names.");
  }

  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];
  return (firstInitial + lastInitial).toUpperCase();
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Function to generate a random color in hex format, excluding specified colors
export function getRandomColor() {
  const avoidColors = ["#000000", "#FFFFFF", "#8B4513"]; // Black, White, Brown in hex format

  let randomColor;
  do {
    // Generate random RGB values
    const r = Math.floor(Math.random() * 256); // Random number between 0-255
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Convert RGB to hex format
    randomColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  } while (avoidColors.includes(randomColor));

  return randomColor;
}

export const brightColors = [
  "#2E8B57", // Darker Neon Green
  "#FF6EB4", // Darker Neon Pink
  "#00CDCD", // Darker Cyan
  "#FF00FF", // Darker Neon Magenta
  "#FF007F", // Darker Bright Pink
  "#FFD700", // Darker Neon Yellow
  "#00CED1", // Darker Neon Mint Green
  "#FF1493", // Darker Neon Red
  "#00CED1", // Darker Bright Aqua
  "#FF7F50", // Darker Neon Coral
  "#9ACD32", // Darker Neon Lime
  "#FFA500", // Darker Neon Orange
  "#32CD32", // Darker Neon Chartreuse
  "#ADFF2F", // Darker Neon Yellow Green
  "#DB7093", // Darker Neon Fuchsia
  "#00FF7F", // Darker Spring Green
  "#FFD700", // Darker Electric Lime
  "#FF007F", // Darker Bright Magenta
  "#FF6347", // Darker Neon Vermilion
];

export function getUserColor(userId: string) {
  let sum = 0;
  for (let i = 0; i < userId.length; i++) {
    sum += userId.charCodeAt(i);
  }

  const colorIndex = sum % brightColors.length;
  return brightColors[colorIndex];
}

export const isProUser = (
  subscription: Subscription | null | undefined
): boolean => {
  if (!subscription) return false;

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  return (
    subscription.status === "active" &&
    subscription.currentPeriodEnd > currentTime
  );
};

export const hasCredits = (
  subscription: Subscription | null | undefined
): boolean => {
  if (!subscription) return false;

  if (subscription.status !== "active") return false;
  if (subscription.credits < 0) return false;
  const currentTime = Math.floor(Date.now() / 1000);
  if (subscription.currentPeriodEnd <= currentTime) return false;

  return subscription.credits > 0;
};

/**
 * Formats a number to one decimal place
 * @param value The number to format
 * @returns The formatted number as a string, or null if input is invalid
 */
export const formatToOneDp = (
  value: number | null | undefined
): string | null => {
  if (value === null || value === undefined || isNaN(value)) {
    return null;
  }
  return (Math.round(value * 10) / 10).toFixed(1);
};

export const getBookingLimit = (planName: string | undefined): number => {
  switch (planName) {
    case "Moon":
      return PLAN_BOOKING_LIMITS.Moon;
    case "Eclipse":
      return PLAN_BOOKING_LIMITS.Eclipse;
    case "Sun":
      return PLAN_BOOKING_LIMITS.Sun;
    default:
      return PLAN_BOOKING_LIMITS.Default;
  }
};

export const getCreditLimit = (planName: string | undefined): number => {
  switch (planName) {
    case "Moon":
      return PLAN_CREDIT_LIMITS.Moon;
    case "Eclipse":
      return PLAN_CREDIT_LIMITS.Eclipse;
    case "Sun":
      return PLAN_CREDIT_LIMITS.Sun;
    default:
      return PLAN_CREDIT_LIMITS.Default;
  }
};
