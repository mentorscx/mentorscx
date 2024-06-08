import React from "react";

import ZoomLinkForm from "./ZoomLinkForm";
import GoogleMeetLinkForm from "./GoogleMeetLinkForm";
import CalendarTabHeading from "./CalendarTabHeading";

type CalendarTabContentProps = {
  id: string;
  zoomLink: string | null;
  googleMeetLink: string | null;
};

const CalendarTabContent = ({
  id,
  zoomLink,
  googleMeetLink,
}: CalendarTabContentProps) => {
  return (
    <div className="space-y-4 mt-6">
      <CalendarTabHeading />
      <ZoomLinkForm id={id} zoomLink={zoomLink} />
      <GoogleMeetLinkForm id={id} googleMeetLink={googleMeetLink} />
    </div>
  );
};

export default CalendarTabContent;
