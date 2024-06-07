"use client";

import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

import React, { Fragment, useState, useCallback, useMemo } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { addEvent, deleteEvent } from "@/lib/actions/event.action";
import { isEventInThePast, isEventOverlapping } from "@/lib/utils";
import { m } from "framer-motion";
import { formattedStringToDDMonthYearTime } from "@/lib/format";
import { Alert } from "@/components/ui/alert";
import { AlertPopup } from "@/components/shared/alert-popup";
import { set } from "mongoose";

const now = new Date();

// Type definitions
type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
};

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function isLessThanTwelveHours(start: string, end: string): boolean {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  const difference = endTime.getTime() - startTime.getTime();

  return difference <= twelveHoursInMilliseconds;
}

const events: Event[] = [];

const DragAndDropCalendar = withDragAndDrop(Calendar);

interface MyCalendarProps {
  user: string;
}

export const MyCalendar = ({ user }: MyCalendarProps) => {
  const { events } = JSON.parse(user);
  const result = events.map((event: any) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const [myEvents, setEvents] = useState<Event[]>(result);
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleSelectSlot = async ({ start, end }: any) => {
    const title = "Available";
    const addSlots: Boolean = isLessThanTwelveHours(start, end);
    if (addSlots) {
      const newEvent = { id: uuidv4(), title, start, end };
      if (
        !isEventInThePast(newEvent) &&
        isEventOverlapping(newEvent, myEvents)
      ) {
        try {
          await addEvent(newEvent);
          setEvents((prevEvents) => [...prevEvents, newEvent]);
          toast.success("Event has been created", {
            description: formattedStringToDDMonthYearTime(new Date(start)),
          });
        } catch (error) {
          toast.error("Event not created");
        }
      }
    }
  };

  console.log("rendered again");
  console.log(showDeleteAlert);

  const handleSelectEvent = async (event: Event) => {
    const { id } = event;
    setShowDeleteAlert(true);
    setCurrentEvent(event);
  };

  const handleDeleteEvent = async (curr: Event) => {
    try {
      await deleteEvent({ ...curr });
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== curr.id)
      );
      toast.success("Event has been deleted");
    } catch (error) {
      toast.error("Event not deleted");
    }
  };

  // const { defaultDate, scrollToTime } = useMemo(
  //   () => ({
  //     defaultDate: new Date(2023, 12, 19),
  //     scrollToTime: new Date(1970, 1, 1, 6),
  //   }),
  //   []
  // );

  return (
    <>
      <AlertPopup
        title="Are you  sure?"
        description="This event will be removed from your calendar."
        open={showDeleteAlert}
        onConfirm={() => {
          setShowDeleteAlert(false);
          if (currentEvent) handleDeleteEvent(currentEvent);
        }}
        onCancel={() => {
          setShowDeleteAlert(false);
        }}
      />
      <div className="h-[400px] md:h-[600px] max-w-5xl">
        <Calendar
          defaultView={Views.MONTH}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          step={30}
          timeslots={1}
        />
      </div>
    </>
  );
};
