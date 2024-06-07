import React from "react";
import { PriceForm } from "./price-form";
import { WeeklySessionForm } from "./weekly-sessions-form";
import DurationPreference from "./duration-preference";
import MeetingPreference from "./meeting-preference";
import { LocationPreferenceForm } from "./location-preference-form";

interface SessionFormProps {
  user: string;
}

const SessionForm = ({ user }: SessionFormProps) => {
  return (
    <>
      <div className="w-full md:w-3/4">
        <PriceForm user={user} />
      </div>

      <div className="w-full md:w-3/4">
        <WeeklySessionForm user={user} />
      </div>

      <div className="w-full md:w-3/4">
        <DurationPreference user={user} />
      </div>

      <div className="w-full md:w-3/4">
        <MeetingPreference user={user} />
      </div>

      <div className="w-full md:w-3/4">
        <LocationPreferenceForm user={user} />
      </div>
    </>
  );
};

export default SessionForm;
