import React from "react";
import { UserIcon, BellIcon, ClockIcon, CalendarIcon } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SessionTabContent from "./SessionTabContent";
import PersonalWebsiteForm from "./PersonalWebsiteForm";
import CalendarTabContent from "./CalendarTabContent";
import NotificationForm from "./notification-form1";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import LanguagesForm from "@/components/shared/settings/LanguagesForm";
import CityForm from "@/components/shared/settings/CityForm";
import CountryForm from "@/components/shared/settings/CountryForm";
import MentorSubscribeModal from "@/components/modals/mentor-membership-modal";
import ShortBioForm from "@/components/shared/settings/ShortBioForm";

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
    value: "integrations",
    label: "Integrations",
    Icon: CalendarIcon,
  },
] as const;

type MentorSettingsTabs = "account" | "session" | "integrations";

interface MentorSettingsTabsProps {
  activeTab: MentorSettingsTabs;
}

const MentorSettingsTabs = async ({ activeTab }: MentorSettingsTabsProps) => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: { clerkId },
    include: {
      languages: true,
    },
  });

  if (!user) {
    return null;
  }

  if (user.role !== Role.MENTOR) {
    return <MentorSubscribeModal isDialogOpen={true} />;
  }

  if (!user) {
    return <div>Profile not found</div>;
  }

  if (!user.isOnboarded) redirect("/onboard/1");

  if (user.role !== Role.MENTOR) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-5xl pt-16">
      <section className="my-4 lg:my-8 p-3 border shadow rounded bg-background">
        <Tabs defaultValue={activeTab} className="p-6">
          <TabsList>
            {tabConfig.map(({ value, label, Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center"
              >
                <Icon className="mr-1 h-4 w-4 text-blue-600" />
                <p className="hidden sm:block">{label}</p>
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
              zoomLink={user.zoomLink}
              googleMeetLink={user.googleMeetLink}
            />
          </TabsContent>
          <TabsContent key="account" value="account">
            <ShortBioForm id={user.id} shortBio={user.shortBio} />
            <CityForm id={user.id} city={user.city} />
            <CountryForm userId={user.id} country={user.country} />
            <LanguagesForm userId={user.id} languages={user?.languages} />
          </TabsContent>
          <TabsContent key="notifications" value="notifications">
            <NotificationForm />
          </TabsContent>
          <TabsContent key="integrations" value="integrations">
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
