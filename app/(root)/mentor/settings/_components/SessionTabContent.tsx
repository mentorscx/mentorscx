import React from "react";
import { MentorSettingsPriceForm } from "./MentorSettingsPriceForm";
import { MentorSettingsMaxSessions } from "./MentorSettingsMaxSessions";
import MentorSettingsSessionDuration from "./MentorSettingsSessionDuration";
import MentorSettingsMeetingPreference from "./MentorSettingsMeetingPreference";
import MentorSettingsTimeZone from "./MentorSettingsTimeZone";
import { User } from "@prisma/client";
import TestForm from "./test-from";

interface SessionTabContentProps {
  user: User;
}

const FormSection = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full mt-4">{children}</div>
);

const SessionTabContent = ({ user }: SessionTabContentProps) => {
  return (
    <>
      <FormSection>
        <MentorSettingsPriceForm user={user} />
      </FormSection>
      <FormSection>
        <MentorSettingsMaxSessions user={user} />
      </FormSection>
      <FormSection>
        <MentorSettingsSessionDuration user={user} />
      </FormSection>
      <FormSection>
        <MentorSettingsMeetingPreference user={user} />
      </FormSection>
      <FormSection>
        <MentorSettingsTimeZone user={user} />
      </FormSection>
    </>
  );
};

export default SessionTabContent;
