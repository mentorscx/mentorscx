"use client";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { parseISO } from "date-fns";
import enUS from "date-fns/locale/en-US";
import React, { useState, useMemo } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment-timezone";
import { v4 as uuidv4 } from "uuid";

import { toast } from "sonner";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { addEvent, deleteEvent } from "@/lib/actions/event.action";
import { isEventInThePast, isEventOverlapping } from "@/lib/utils";
import { AlertPopup } from "@/components/shared/alert-popup";

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

function splitEventsAtMidnight(events: Event[]): Event[] {
  const splitEvents: Event[] = [];
  events.forEach((event) => {
    const start = moment(event.start);
    const end = moment(event.end);

    // Check if the event spans across midnight
    if (!start.isSame(end, "day")) {
      // Split the event into two parts
      const endOfStartDay = start.clone().endOf("day");
      const startOfEndDay = end.clone().startOf("day");

      // First part: From event start to the end of the start day
      splitEvents.push({
        ...event,
        end: endOfStartDay.toDate(),
      });

      // Second part: From the start of the end day to the event end
      splitEvents.push({
        id: event.id,
        title: event.title,
        start: startOfEndDay.toDate(),
        end: event.end,
      });
    } else {
      // If the event does not span across midnight, add it as is
      splitEvents.push(event);
    }
  });

  return splitEvents;
}

function isLessThanTwelveHours(start: string, end: string): boolean {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  const difference = endTime.getTime() - startTime.getTime();

  return difference <= twelveHoursInMilliseconds;
}

function isExternalEvent(event: Event, externalEvents: Event[]): boolean {
  return externalEvents.some((externalEvent) => event.id === externalEvent.id);
}

const events: Event[] = [];

const DnDCalendar = withDragAndDrop(Calendar);

interface MyCalendarProps {
  user: string;
  externalEvents: string;
  regularEvents: string;
}

export const MentorsCalendar = ({
  user,
  externalEvents,
  regularEvents,
}: MyCalendarProps) => {
  const { events } = user !== null ? JSON.parse(user) : [];
  const { timeZone } = JSON.parse(user);

  moment.tz.setDefault(timeZone);
  const localizer = momentLocalizer(moment);
  const splitEvents = splitEventsAtMidnight(events);
  const result = splitEvents.map((event) => ({
    id: event.id,
    title: event.title,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const backgroundEventsArray =
    externalEvents !== undefined ? JSON.parse(externalEvents) : [];
  const backgroundEvents = backgroundEventsArray.map((event: any) => ({
    id: event.id,
    title: event.summary,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
  }));

  const regularEventsArray =
    regularEvents !== undefined ? JSON.parse(regularEvents) : [];

  const recurringEvents = regularEventsArray.map((event: any) => ({
    id: event.id,
    title: event.title,
    start: parseISO(event.start),
    end: parseISO(event.end),
  }));

  const unmodifiedEvents = [...backgroundEvents, ...recurringEvents];

  const [myEvents, setEvents] = useState<Event[]>(result);
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleSelectSlot = async (event: any) => {
    const { start, end } = event;
    const title = "Available";
    const addSlots: Boolean = isLessThanTwelveHours(start, end);
    if (addSlots) {
      const newEvent = { id: uuidv4(), title, start, end };
      if (isEventInThePast(newEvent)) {
        toast.error("Event cannot be in the past");
      } else if (
        !isEventInThePast(newEvent) &&
        isEventOverlapping(newEvent, myEvents)
      ) {
        try {
          await addEvent(newEvent);
          setEvents((prevEvents) => [...prevEvents, newEvent]);
          toast.success("Event has been created");
        } catch (error) {
          toast.error("Event not created");
        }
      }
    }
  };

  const handleSelectEvent = async (event: any) => {
    const { id } = event;
    if (isExternalEvent(event, backgroundEvents)) {
      return;
    }
    setShowDeleteAlert(true);
    setCurrentEvent(event);
  };

  const handleResizeEvent = async (event: any) => {
    alert("resize event" + JSON.stringify(event));
  };

  const handleDeleteEvent = async (curr: any) => {
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

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <div className="p-3">
      <section className="flex items-start justify-between flex-col md:flex-row gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Specific Availability</h3>
          <p className="muted">Add specific dates and times to your calendar</p>
        </div>
        <div>
          <p className="muted !font-semibold">
            *click or drag to set a timeslot
          </p>
          <p className="muted !font-semibold">*right click to delete event</p>
        </div>
      </section>
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
        <DnDCalendar
          defaultView={Views.WEEK}
          events={myEvents}
          localizer={localizer}
          views={["day", "week"]}
          defaultDate={defaultDate}
          scrollToTime={scrollToTime}
          backgroundEvents={unmodifiedEvents}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          step={30}
          timeslots={1}
          onEventResize={handleResizeEvent}
          resizable
          selectable
          popup
        />
      </div>
    </div>
  );
};
