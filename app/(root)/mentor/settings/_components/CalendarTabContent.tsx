import React from "react";

import ZoomLinkForm from "./ZoomLinkForm";
import GoogleMeetLinkForm from "./GoogleMeetLinkForm";
import CalendarTabHeading from "./CalendarTabHeading";
import SyncGoogleCalendar from "./SyncGoogleCalendar";
import { isConnectedWithGoogleEvents } from "@/lib/actions/clerk.action";

type CalendarTabContentProps = {
  id: string;
  zoomLink: string | null;
  googleMeetLink: string | null;
};

const CalendarTabContent = async ({
  id,
  zoomLink,
  googleMeetLink,
}: CalendarTabContentProps) => {
  const isGoogleCalendarConnected = await isConnectedWithGoogleEvents();

  return (
    <div className="space-y-4 mt-6">
      <CalendarTabHeading />
      <SyncGoogleCalendar
        isGoogleCalendarConnected={isGoogleCalendarConnected}
      />
      <ZoomLinkForm id={id} zoomLink={zoomLink} />
      <GoogleMeetLinkForm id={id} googleMeetLink={googleMeetLink} />
    </div>
  );
};

export default CalendarTabContent;
