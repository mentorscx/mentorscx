import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export function formatMonthYear(dateString: string): string {
  const date = new Date(dateString);
  const formattedDate = format(date, "MMMM, yyyy", { locale: enUS });
  return formattedDate;
}

export function calculatePrice(
  duration: number = 0,
  price: number = 0
): number {
  if (duration === 15) {
    return +(price / 4).toFixed(2);
  } else if (duration === 30) {
    return +(price / 2).toFixed(2);
  } else {
    return +price.toFixed(2);
  }
}

export function formattedStringToDDMonthYearTime(input: Date): string {
  const formattedDate = format(input, "dd MMMM yyyy h:mma");

  return formattedDate;
}

export function formatDateToWeekDDMonth(startdate: Date): string {
  const formattedDateString = format(startdate, "EEEE, d MMMM", {
    useAdditionalWeekYearTokens: false,
    useAdditionalDayOfYearTokens: false,
  });
  return formattedDateString;
}

export function formatDateToHHMMToHHMM(start: Date, end: Date): string {
  const startFormatted = format(start, "h:mm a", {
    useAdditionalWeekYearTokens: false,
    useAdditionalDayOfYearTokens: false,
  });
  const endFormatted = format(end, "h:mm a", {
    useAdditionalWeekYearTokens: false,
    useAdditionalDayOfYearTokens: false,
  });

  const formattedRangeString = `${startFormatted} - ${endFormatted}`;
  return formattedRangeString;
}

export function formatAMPM(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours || 12; // the hour '0' should be '12'
  const minutesStr =
    minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  const strTime = `${hours}:${minutesStr} ${ampm}`;
  return strTime;
}
