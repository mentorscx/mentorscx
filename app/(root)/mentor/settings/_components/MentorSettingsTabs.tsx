import React from "react";
import { UserIcon, BellIcon, ClockIcon, CalendarIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SessionTabContent from "./SessionTabContent";
import PersonalWebsiteForm from "./PersonalWebsiteForm";
import CalendarTabContent from "./CalendarTabContent";
import NotificationForm from "./notification-form1";

import { Role } from "@prisma/client";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

const tabConfig = [
  {
    value: "sessions",
    label: "Sessions",
    Icon: ClockIcon,
  },
  {
    value: "account",
    label: "Account",
    Icon: UserIcon,
  },
  {
    value: "notifications",
    label: "Notifications",
    Icon: BellIcon,
  },
  {
    value: "calendar",
    label: "Calendar Integration",
    Icon: CalendarIcon,
  },
] as const;

const MentorSettingsTabs = async () => {
  const user = await getCurrentUser({ isMentorRoute: true });

  if (!user) {
    return <div>Profile not found</div>;
  }

  if (!user.isOnboarded) redirect("/onboard/1");

  if (user.role !== Role.MENTOR) {
    redirect("/");
  }

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

          <TabsContent key="sessions" value="sessions">
            <SessionTabContent
              id={user.id}
              price={user.price}
              duration={user.duration}
              meetingPreference={user.meetingPreference}
              maxSessions={user.maxSessions}
              timeZone={user.timeZone}
            />
          </TabsContent>
          <TabsContent key="account" value="account">
            <PersonalWebsiteForm
              id={user.id}
              portfolioWebsite={user.portfolioWebsite}
            />
          </TabsContent>
          <TabsContent key="notifications" value="notifications">
            <NotificationForm />
          </TabsContent>
          <TabsContent key="calendar" value="calendar">
            <CalendarTabContent
              id={user.id}
              zoomLink={user.zoomLink}
              googleMeetLink={user.googleMeetLink}
            />
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default MentorSettingsTabs;
