"use client";
import React from "react";
import { utcToZonedTime } from "date-fns-tz";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

import { SessionDetailsForm } from "./session-details-form";
import { formatAMPM } from "@/lib/format";
import {
  convertEventsToTimezone,
  createTimeSlots,
  getDisabledDays,
} from "@/lib/helpers/calendar";

type Event = {
  start: Date;
  end: Date;
};

type BookingCalendarMainProps = {
  individualEvents: Event[];
  timeZone: string;
  weeklyEvents: Event[];
  duration: number;
  price: number;
  mentorId: string;
  expertise: { name: string }[];
};

type CalanderSidebarProps = {
  slots: Event[];
  selectedDay: Date | null;
  onSlotSelect: (slot: Event) => void;
  onOpenForm: () => void;
};

function filterTimeSlotsByDate(
  timeSlots: Event[],
  selectedDate: Date | null
): Event[] {
  if (!selectedDate) {
    return [];
  }
  return timeSlots.filter((timeSlot) => {
    const startDate = timeSlot.start.toString().slice(0, 10);
    const selectedDateStr = selectedDate.toString().slice(0, 10);
    return startDate === selectedDateStr;
  });
}

const CalanderSidebar = ({
  slots,
  selectedDay,
  onSlotSelect,
  onOpenForm,
}: CalanderSidebarProps) => {
  const [slotSelected, setSlotSelected] = React.useState<Event | null>(null);
  const [openForm, setOpenForm] = React.useState(false);

  const handleSlotSelect = (slot: Event) => {
    onSlotSelect(slot);
    setSlotSelected(slot);
  };

  const handleResetSlot = () => {
    setSlotSelected(null);
  };

  const handleOpenForm = () => {
    onOpenForm();
  };

  if (selectedDay === null) {
    return (
      <div className="flex items-start justify-center h-fit w-[200px] border-2 rounded p-3">
        <h1>Please choose a day based on the availability</h1>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px] w-[200px] border p-3">
        <h1>No slots available this day</h1>
      </div>
    );
  }
  return (
    <ScrollArea className="h-fit max-md:max-h-[300px] md:h-[400px] w-fit border p-3">
      <div className="flex items-center justify-center flex-col">
        <h1 className="my-2">{selectedDay?.toDateString()}</h1>
        <ul className="flex flex-col gap-4">
          {slotSelected && (
            <div>
              <Button className="w-full " variant="outline">
                {formatAMPM(slotSelected.start)}
              </Button>
              <div className="flex items-center gap-4 mt-3">
                <Button variant="secondary" onClick={handleResetSlot}>
                  Back
                </Button>
                <Button onClick={handleOpenForm}>Next</Button>
              </div>
            </div>
          )}
          {!slotSelected &&
            slots.map((slot, index) => (
              <li key={index}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-[200px]"
                  onClick={() =>
                    handleSlotSelect({ start: slot.start, end: slot.end })
                  }
                >
                  {formatAMPM(slot.start)}
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </ScrollArea>
  );
};

const BookingCalendarMain = ({
  individualEvents,
  timeZone,
  weeklyEvents,
  price,
  duration,
  mentorId,
  expertise,
}: BookingCalendarMainProps) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = React.useState<Event | null>(null);
  const [openForm, setOpenForm] = React.useState(false);

  const today = utcToZonedTime(new Date(), timeZone); // Getting today's date
  const threeMonthsLater = new Date(); // Copying today's date
  threeMonthsLater.setMonth(today.getMonth() + 3); // Setting it to three months from now

  const handleOpenForm = () => {
    setOpenForm(!openForm);
  };

  const handleSelectSlot = (slot: Event) => {
    setSelectedSlot(slot);
  };

  // Convert events to the specified timezone
  const convertedIndividualEvents = convertEventsToTimezone(
    individualEvents,
    timeZone
  );

  const convertedWeeklyEvents = convertEventsToTimezone(weeklyEvents, timeZone);

  const allAvailableEvents = [
    ...convertedIndividualEvents,
    ...convertedWeeklyEvents,
  ];

  const disabledDays = getDisabledDays(convertedIndividualEvents);
  const availableTimeSlots = createTimeSlots(allAvailableEvents, duration);

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

  const eventSlots = filterTimeSlotsByDate(uniqueAvailableTimeSlots, date);
  const availableSlots = [...eventSlots];

  const handleSelectDate = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  // Disabled dates for next 3months, which are not in the timeslots
  const disabledDates = getDisabledDays(uniqueAvailableTimeSlots);

  return (
    <div className="w-full">
      {!openForm && (
        <div className="w-full flex gap-4 flex-col md:flex-row justify-center items-center">
          <Calendar
            mode="single"
            selected={date || undefined}
            onDayClick={handleSelectDate}
            disabled={[{ before: today }, ...disabledDates]}
            defaultMonth={today}
            fromMonth={today}
            toMonth={threeMonthsLater}
            toDate={threeMonthsLater}
          />
          {/* Sidebar for slots */}
          <CalanderSidebar
            slots={availableSlots}
            selectedDay={date}
            onSlotSelect={handleSelectSlot}
            onOpenForm={handleOpenForm}
          />
        </div>
      )}
      {openForm && (
        <div className="w-full">
          <div>
            <Button onClick={handleOpenForm} variant="outline" className="mr-0">
              Back
            </Button>
          </div>

          <SessionDetailsForm
            session={{
              objective: "",
              category: "",
              outcome: "",
              menteeId: "",
              mentorId,
              start: selectedSlot?.start || new Date(),
              end: selectedSlot?.end || new Date(),
              price,
              duration,
              acceptTerms: false,
            }}
            timeZone={timeZone}
            expertise={expertise}
          />
        </div>
      )}
    </div>
  );
};

export default BookingCalendarMain;
