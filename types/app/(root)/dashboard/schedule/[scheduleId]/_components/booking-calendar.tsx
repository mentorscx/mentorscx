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
import { useRouter } from "next/navigation";

import React, { Fragment, useState, useCallback, useMemo } from "react";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { db } from "@/lib/db";

const now = new Date();

// Type definitions
type Event = {
  id: string;
  title?: string;
  start: Date;
  end: Date;
};

function isLessThanTwelveHours(start: string, end: string): boolean {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const twelveHoursInMilliseconds = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  const difference = endTime.getTime() - startTime.getTime();

  return difference <= twelveHoursInMilliseconds;
}

const events: Event[] = [];

const DragAndDropCalendar = withDragAndDrop(Calendar);

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

interface BookingCalendarProps {
  sessions: string;
  mentor: string;
}

export const BookingCalendar = async ({
  sessions,
  mentor,
}: BookingCalendarProps) => {
  const sessionsArray = JSON.parse(sessions);
  const mentorJSON = JSON.parse(mentor);

  const { duration } = mentorJSON;

  // Filter available session
  const availableSessions = sessionsArray.filter((session: any) => {
    return session.status === "AVAILABLE";
  });
  const result = availableSessions.map((event: any) => ({
    id: event.id,
    start: new Date(event.start),
    end: new Date(event.end),
    title: "Available",
  }));

  const [myEvents, setEvents] = useState<Event[]>(result);
  const router = useRouter();

  const handleSelectEvent = useCallback(
    async (event: Event) => {
      const { id } = event;
      router.push(`/dashboard/session/${id}`);
    },
    [myEvents]
  );

  return (
    <div className="h-[400px] md:h-[600px] max-w-5xl">
      <Calendar
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        selectable
        step={duration}
        timeslots={1}
      />
    </div>
  );
};
