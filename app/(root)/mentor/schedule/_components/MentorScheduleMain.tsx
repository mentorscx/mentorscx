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
import MentorSubscribeModal from "@/components/modals/mentor-membership-modal";

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
    return <MentorSubscribeModal isDialogOpen={true} />;
  }

  // Get all external accounts
  const externalAccounts = clerkUser.externalAccounts || [];

  // Filter for Google accounts with the required scope
  const googleAccounts = externalAccounts.filter(
    (account) =>
      account.approvedScopes?.includes(
        "https://www.googleapis.com/auth/calendar.events"
      ) && account.emailAddress
  );

  if (googleAccounts.length === 0) {
    return [];
  }

  // Extract email addresses from Google accounts
  const googleConnectedEmails = googleAccounts.map(
    (account) => account.emailAddress!
  );

  let externalEvents = await listEvents(googleConnectedEmails, clerkUser.id);
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
