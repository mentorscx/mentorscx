import React from "react";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

import RecurPage from "./_components/MentorScheduleRecurring";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";
import { listEvents } from "@/lib/actions/google-calandar.action";
import { MentorsCalendar } from "./_components/mentors-calendar";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

import MentorCalendarHeader from "./_components/MentorScheduleHeader";

const MentorSchedulePage = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      events: true,
    },
  });

  if (!user) {
    return <div>You cannot access this page!</div>;
  }

  if (user.role !== Role.MENTOR) {
    redirect("/dashboard/search");
  }

  let externalEvents = await listEvents(user?.email);
  const weeklyAvailability = user?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const events = generateEventsForNextYear(schedule);

  if (externalEvents === undefined || externalEvents === null) {
    externalEvents = [];
  }

  return (
    <div className="max-w-5xl mx-auto pt-[80px] p-3">
      <MentorCalendarHeader />

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
