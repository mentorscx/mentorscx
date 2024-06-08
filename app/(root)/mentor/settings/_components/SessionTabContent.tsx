import React from "react";
import { MentorSettingsPriceForm } from "./MentorSettingsPriceForm";
import { MentorSettingsMaxSessions } from "./MentorSettingsMaxSessions";
import MentorSettingsSessionDuration from "./MentorSettingsSessionDuration";
import MentorSettingsMeetingPreference from "./MentorSettingsMeetingPreference";
import MentorSettingsTimeZone from "./MentorSettingsTimeZone";
import { User } from "@prisma/client";

const formComponents = {
  priceForm: MentorSettingsPriceForm,
  maxSessions: MentorSettingsMaxSessions,
  meetingPreference: MentorSettingsMeetingPreference,
  sessionDuration: MentorSettingsSessionDuration,
  timeZone: MentorSettingsTimeZone,
};

interface SessionTabContentProps {
  user: User;
}

const FormSection = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full mt-4">{children}</div>
);

const SessionTabContent = ({ user }: SessionTabContentProps) => {
  return (
    <>
      {Object.entries(formComponents).map(([key, Component]) => (
        <FormSection key={key}>
          <Component user={user} />
        </FormSection>
      ))}
    </>
  );
};

export default SessionTabContent;
