import React from "react";

import { User, Expertise, Session, Event } from "@prisma/client";

import BookingCalendarDetails from "./booking-calendar-details";
import BookingCalendarMain from "./booking-calendar-main";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";
import BookingCalendarHeader from "./booking-calendar-header";

import { fetchExternalEvents } from "@/lib/actions/clerk.action";

type TMentor = Pick<
  User,
  | "imageUrl"
  | "username"
  | "duration"
  | "meetingPreference"
  | "timeZone"
  | "id"
  | "clerkId"
  | "price"
  | "maxSessions"
  | "weeklyAvailability"
> & { expertise: Pick<Expertise, "name">[] } & {
  sessionsGiven: Pick<Session, "start" | "end" | "status">[];
};

type BookingCalendarTemplateProps = {
  mentor: TMentor;
  mentee: Pick<User, "timeZone" | "id">;
  individualEvents: Pick<Event, "start" | "end">[];
};

const BookingCalendarTemplate = async (props: BookingCalendarTemplateProps) => {
  // Generate the weekly available slots
  const weeklyAvailability = props.mentor?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const weeklyEvents = generateEventsForNextYear(schedule);

  const calendarEvents = await fetchExternalEvents(props.mentor.clerkId);

  return (
    <div className="pt-16 min-h-screen p-3">
      <BookingCalendarHeader />

      <div className="w-full mt-4 max-w-5xl mx-auto p-3 bg-background rounded border shadow">
        <div className="w-full flex flex-col md:flex-row">
          {/* Right Side: Details */}
          <div className="mt-4  basis-1/4 w-full flex p-3 justify-start">
            <BookingCalendarDetails
              imageUrl={props.mentor.imageUrl}
              username={props.mentor.username}
              timeZone={props.mentee.timeZone || "America/New_York"}
              meetingPreference={props.mentor.meetingPreference || "zoom"}
              duration={props.mentor.duration}
            />
          </div>
          <hr className="h-[1px]" />
          {/* Main Calendar */}
          <div className="w-full basis-3/4">
            <BookingCalendarMain
              individualEvents={props.individualEvents}
              weeklyEvents={weeklyEvents}
              externalEvents={calendarEvents}
              timeZone={props.mentee.timeZone || "America/New_York"}
              mentorTimeZone={props.mentor.timeZone || "America/New_York"}
              duration={props.mentor.duration}
              mentorId={props.mentor.id}
              menteeId={props.mentee.id}
              price={props.mentor.price}
              expertise={props.mentor.expertise}
              sessions={props.mentor.sessionsGiven}
              maxSessions={props.mentor.maxSessions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendarTemplate;
