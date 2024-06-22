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

  // Get all externalEmails accounts
  const externalEmails = clerkUser.externalAccounts?.map(
    (email) => email.emailAddress
  );

  // Get all connected emails
  const connectedEmails = clerkUser.emailAddresses?.map(
    (email) => email.emailAddress
  );

  // Filter out the gmail connected emails
  const googleConnectedEmails = connectedEmails.filter((email) =>
    email.endsWith("@gmail.com")
  );

  let externalEvents = await listEvents(googleConnectedEmails);
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
