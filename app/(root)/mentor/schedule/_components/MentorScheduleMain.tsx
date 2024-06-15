import React, { Suspense } from "react";
import { currentUser } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

import RecurPage from "./MentorScheduleRecurring";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";
import { listEvents } from "@/lib/actions/google-calandar.action";
import { MentorsCalendar } from "./mentors-calendar";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import MentorEmailsList from "./MentorEmailsList";
import { EmailAddress } from "@clerk/nextjs/server";

const MentorScheduleMain = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
    include: {
      events: true,
    },
  });

  if (!user) {
    return <div>You cannot access this page!</div>;
  }

  if (user.role !== Role.MENTOR) {
    redirect("/");
  }

  let externalEvents = await listEvents(user.calendarEmails);
  const weeklyAvailability = user?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const events = generateEventsForNextYear(schedule);

  if (externalEvents === undefined || externalEvents === null) {
    externalEvents = [];
  }

  const connectedEmails = clerkUser.emailAddresses?.map(
    (email) => email.emailAddress
  );

  return (
    <>
      <RecurPage user={JSON.stringify(user)} />

      <MentorEmailsList
        userId={user.id}
        emails={user.calendarEmails}
        connectedEmails={connectedEmails}
      />

      <MentorsCalendar
        user={JSON.stringify(user)}
        externalEvents={JSON.stringify(externalEvents)}
        regularEvents={JSON.stringify(events)}
      />
    </>
  );
};

export default MentorScheduleMain;
