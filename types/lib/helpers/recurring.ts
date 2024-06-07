import { v4 as uuidv4 } from "uuid";
import { addWeeks, parseISO, formatISO } from "date-fns";

type ScheduleItem = {
  day: string;
  endTime: string; // These are expected to be ISO strings
  startTime: string;
};

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

// Helper function to generate events for the next year
export const generateEventsForNextYear = (
  schedule: ScheduleItem[] = []
): Event[] => {
  const events: Event[] = [];
  const numberOfWeeks = 52; // Approximate number of weeks in a year

  schedule.forEach((item) => {
    // Parsing ISO strings to Date objects
    const startTime = parseISO(item.startTime);
    const endTime = parseISO(item.endTime);

    for (let week = 0; week < numberOfWeeks; week++) {
      // Adding weeks to the initial start and end dates
      const eventStart = addWeeks(startTime, week);
      const eventEnd = addWeeks(endTime, week);

      events.push({
        id: uuidv4(),
        title: `CX Availability`,
        start: eventStart,
        end: eventEnd,
      });
    }
  });

  return events;
};
