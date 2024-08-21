"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

import moment from "moment-timezone";

import { SessionDetailsForm } from "../session-details-form";

import { formatAMPM } from "@/lib/format";

import { Session } from "@prisma/client";
import {
  filterTimeSlotsByDate,
  getAvailableSlots,
  getEnabledAndDisabledDays,
} from "./calendar-server";

import { utcToZonedTime } from "date-fns-tz";

type Event = {
  start: Date;
  end: Date;
};

type BookingCalendarMainProps = {
  individualEvents: Event[];
  timeZone: string;
  weeklyEvents: Event[];
  externalEvents: Event[];
  duration: number;
  price: number;
  mentorId: string;
  expertise: { name: string }[];
  maxSessions: number | null;
  sessions: Pick<Session, "start" | "end" | "status">[];
};

type CalanderSidebarProps = {
  slots: Event[];
  selectedDay: Date | null;
  onSlotSelect: (slot: Event) => void;
  onOpenForm: () => void;
  timeZone: string;
};

const CalanderSidebar = ({
  slots,
  selectedDay,
  onSlotSelect,
  onOpenForm,
  timeZone,
}: CalanderSidebarProps) => {
  const [slotSelected, setSlotSelected] = React.useState<Event | null>(null);

  const handleResetSlot = () => setSlotSelected(null);
  const handleOpenForm = () => onOpenForm();
  const handleSlotSelect = (slot: Event) => {
    onSlotSelect(slot);
    setSlotSelected(slot);
  };
  const getFormattedTime = (date: Date) => {
    const localDate = utcToZonedTime(date, timeZone);
    return formatAMPM(localDate);
  };

  // Sort slots by start date ascending
  const sortedSlots = slots.sort(
    (a, b) => +new Date(a.start) - +new Date(b.start)
  );

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
        <h1 className="my-2">
          {utcToZonedTime(selectedDay, timeZone)?.toDateString()}
        </h1>
        <ul className="flex flex-col gap-4">
          {slotSelected && (
            <div>
              <Button className="w-full " variant="outline">
                {getFormattedTime(slotSelected.start)}
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
            sortedSlots.map((slot, index) => {
              const formattedTime = getFormattedTime(slot.start);
              return formattedTime.includes("AM") ? (
                <li key={index}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-[200px]"
                    onClick={() =>
                      handleSlotSelect({ start: slot.start, end: slot.end })
                    }
                  >
                    {formattedTime}
                  </Button>
                </li>
              ) : null;
            })}
          {!slotSelected &&
            sortedSlots.map((slot, index) => {
              const formattedTime = getFormattedTime(slot.start);
              return formattedTime.includes("PM") ? (
                <li key={index}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-[200px]"
                    onClick={() =>
                      handleSlotSelect({ start: slot.start, end: slot.end })
                    }
                  >
                    {formattedTime}
                  </Button>
                </li>
              ) : null;
            })}
        </ul>
      </div>
    </ScrollArea>
  );
};

const BookingCalendarMain = (props: BookingCalendarMainProps) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [localDate, setLocalDate] = React.useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = React.useState<Event | null>(null);
  const [openForm, setOpenForm] = React.useState(false);

  const handleOpenForm = () => setOpenForm(!openForm);
  const handleSelectSlot = (slot: Event) => setSelectedSlot(slot);
  const handleSelectDate = (selectedDate: Date) => {
    // Ensure the date selected is stripped of its time component, to start at midnight

    const momentDate = moment(selectedDate);

    // Create a moment object from the date with no time and convert it to the specified timezone

    const localDate = momentDate
      .tz(props.timeZone, true)
      .startOf("day")
      .toDate();

    // Assuming setDate and setLocalDate are hooks to set state
    setDate(selectedDate);
    setLocalDate(localDate);
  };

  // Get today's date in timezone and convert to ET 12:00AM
  const today = moment.tz(new Date(), props.timeZone);
  const todayDate = today.format("YYYY-MM-DD");
  const [year, month, dayOfMonth] = todayDate.split("-").map(Number);
  const todayDateToET = new Date(year, month - 1, dayOfMonth);

  // Get today's date at 12:00 AM in the specified timezone
  const todayAtMidnight = moment().tz(props.timeZone).startOf("day").toDate();
  const threeMonthsLater = new Date(todayAtMidnight.getTime()); // Copying today's date
  threeMonthsLater.setMonth(todayAtMidnight.getMonth() + 3); // Setting it to three months from now

  // Get Unique available slots
  // Filter based on the selected day
  const uniqueAvailableSlots = getAvailableSlots(props);
  const eventSlots = filterTimeSlotsByDate(uniqueAvailableSlots, localDate);
  const availableSlots = [...eventSlots];

  // Get disabled days and convert to ET
  // convert disable days to ET
  const { disabledDays } = getEnabledAndDisabledDays(
    uniqueAvailableSlots,
    props.timeZone
  );

  // Convert disabledDays strings to Date objects
  const disabledDates = disabledDays.map((day) => {
    const [year, month, dayOfMonth] = day.split("-").map(Number);
    return new Date(year, month - 1, dayOfMonth);
  });

  return (
    <div className="w-full">
      {!openForm && (
        <div className="w-full flex gap-4 flex-col md:flex-row justify-center items-center">
          <Calendar
            mode="single"
            selected={date || undefined}
            onDayClick={handleSelectDate}
            disabled={[{ before: todayDateToET }, ...disabledDates]}
            defaultMonth={todayDateToET}
            fromMonth={todayDateToET}
            toMonth={threeMonthsLater}
            toDate={threeMonthsLater}
            today={todayDateToET}
          />
          {/* Sidebar for slots */}
          <CalanderSidebar
            slots={availableSlots}
            selectedDay={localDate}
            onSlotSelect={handleSelectSlot}
            onOpenForm={handleOpenForm}
            timeZone={props.timeZone}
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
              mentorId: props.mentorId,
              start:
                (selectedSlot?.start &&
                  utcToZonedTime(selectedSlot?.start, props.timeZone)) ||
                new Date(),
              end:
                (selectedSlot?.end &&
                  utcToZonedTime(selectedSlot?.end, props.timeZone)) ||
                new Date(),
              price: props.price,
              duration: props.duration,
              acceptTerms: false,
            }}
            timeZone={props.timeZone}
            expertise={props.expertise}
          />
        </div>
      )}
    </div>
  );
};

export default BookingCalendarMain;
