import React from "react";
import { UserIcon, BellIcon, ClockIcon, CalendarIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DisplayForm } from "./notification-form";
import SessionTabContent from "./SessionTabContent";
import { AccountForm } from "./account-form";
import CalendarTabContent from "./CalendarTabContent";

import { User } from "@prisma/client";

type MentorSettingsTabsProps = {
  user: User;
};

const tabConfig = [
  {
    value: "sessions",
    label: "Sessions",
    Icon: ClockIcon,
    ContentComponent: SessionTabContent,
  },
  {
    value: "account",
    label: "Account",
    Icon: UserIcon,
    ContentComponent: AccountForm,
  },
  {
    value: "notifications",
    label: "Notifications",
    Icon: BellIcon,
    ContentComponent: DisplayForm,
  },
  {
    value: "calendar", // Corrected spelling
    label: "Calendar Integration",
    Icon: CalendarIcon,
    ContentComponent: CalendarTabContent,
  },
];

const MentorSettingsTabs = ({ user }: MentorSettingsTabsProps) => {
  return (
    <div className="mx-auto max-w-5xl pt-[80px]">
      <section className="my-4 lg:my-8 p-3 border shadow rounded bg-background">
        <Tabs defaultValue="sessions" className="p-6">
          <TabsList>
            {tabConfig.map(({ value, label, Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center"
              >
                <Icon className="mr-1 h-4 w-4 text-blue-600" />
                <p className="hidden md:block">{label}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabConfig.map(({ value, ContentComponent }) => (
            <TabsContent key={value} value={value}>
              <ContentComponent user={user} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </div>
  );
};

export default MentorSettingsTabs;
