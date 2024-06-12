import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

import RecurPage from "./MentorScheduleRecurring";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";
import { listEvents } from "@/lib/actions/google-calandar.action";
import { MentorsCalendar } from "./mentors-calendar";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const MentorScheduleMain = async () => {
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
    <>
      <RecurPage user={JSON.stringify(user)} />

      <MentorsCalendar
        user={JSON.stringify(user)}
        externalEvents={JSON.stringify(externalEvents)}
        regularEvents={JSON.stringify(events)}
      />
    </>
  );
};

export default MentorScheduleMain;
