import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

import Heading from "@/components/shared/heading";
import RecurPage from "./_components/recurring-calandar";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";
import { listEvents } from "@/lib/actions/google-calandar.action";
import { MentorsCalendar } from "./_components/mentors-calendar";
import { ArrowUpRight } from "lucide-react";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
interface MentorSchedulePageProps {
  params: {
    profileId: string;
  };
}
const MentorSchedulePage = async ({
  params: { profileId },
}: MentorSchedulePageProps) => {
  const user = await db.user.findUnique({
    where: {
      id: profileId,
    },
    select: {
      id: true,
      email: true,
      duration: true,
      timeZone: true,
      weeklyAvailability: true,
      role: true,
      events: {
        select: {
          id: true,
          title: true,
          start: true,
          end: true,
        },
      },
    },
  });

  // TODO: Add access error
  if (!user) {
    return <div>You cannot access this page!</div>;
  }

  // Redirect if the user is not MENTOR
  if (user.role !== Role.MENTOR) {
    redirect("/dashboard/search");
  }

  // TODO: Gmail and Outlook calendar sync
  const email = user?.email;
  let externalEvents = await listEvents(user?.email);
  const weeklyAvailability = user?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const events = generateEventsForNextYear(schedule);

  if (externalEvents === undefined || externalEvents === null) {
    externalEvents = [];
  }

  return (
    <div className="max-w-5xl mx-auto pt-[80px] p-3">
      <div className="mt-4 p-3 border shadow rounded bg-background md:pl-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Heading
            title="My Schedule"
            description="Manage your availability"
            imageUrl="/assets/schedule_tab.svg"
          />
          <Button asChild variant="link">
            <Link href="/">
              <>
                Sync your Google or Microsoft calendar
                <ArrowUpRight />
              </>
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-4 p-3 border shadow rounded bg-background">
        <RecurPage user={JSON.stringify(user)} />
      </div>

      <div className="mt-4 p-3 border shadow rounded bg-background">
        <MentorsCalendar
          user={JSON.stringify(user)}
          externalEvents={JSON.stringify(externalEvents)}
          regularEvents={JSON.stringify(events)}
        />
      </div>
    </div>
  );
};

export default MentorSchedulePage;
