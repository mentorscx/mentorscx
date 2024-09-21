import React from "react";

import PriceForm from "./PriceForm";
import MaxSessions from "./MaxSessionsForm";
import SessionDuration from "./SessionDurationForm";
import MeetingPreference from "./MeetingPreferenceForm";
import TimeZone from "@/components/shared/settings/TimeZoneForm";

interface SessionTabContentProps {
  id: string;
  price: number;
  maxSessions: number | null;
  duration: number | null;
  meetingPreference: string | null;
  timeZone: string | null;
  zoomLink: string | null;
  googleMeetLink: string | null;
}

const SessionTabContent = ({
  id,
  price,
  maxSessions,
  duration,
  meetingPreference,
  timeZone,
  zoomLink,
  googleMeetLink,
}: SessionTabContentProps) => {
  return (
    <div className="space-y-4 mt-6">
      <PriceForm id={id} price={price} />

      <MaxSessions id={id} maxSessions={maxSessions} />

      <SessionDuration id={id} durationPreference={duration} />

      <MeetingPreference
        id={id}
        meetingPreference={meetingPreference}
        zoomLink={zoomLink}
        googleMeetLink={googleMeetLink}
      />

      <TimeZone id={id} timeZone={timeZone} />
    </div>
  );
};

export default SessionTabContent;
