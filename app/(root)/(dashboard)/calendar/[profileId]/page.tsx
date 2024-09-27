import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

import BookingCalendarTemplate from "@/components/shared/calendar/booking-calendar-template";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MenteeCalendarPage = async (props: {
  params: {
    profileId: string;
  };
}) => {
  // Auth
  const { userId: clerkId } = auth();
  if (!clerkId) {
    redirect("/sign-in");
  }

  // Get the mentee details
  const mentee = await db.user.findUnique({
    where: {
      clerkId,
    },
  });

  // Get the mentor details
  const mentor = await db.user.findUnique({
    where: {
      id: props.params.profileId,
    },
    select: {
      id: true,
      clerkId: true,
      imageUrl: true,
      username: true,
      timeZone: true,
      meetingPreference: true,
      duration: true,
      price: true,
      weeklyAvailability: true,
      maxSessions: true,
      role: true,
      isOnboarded: true,
      expertise: {
        select: {
          name: true,
        },
      },
      sessionsGiven: {
        select: {
          start: true,
          end: true,
          status: true,
        },
      },
      events: {
        select: {
          start: true,
          end: true,
        },
      },
    },
  });

  if (!mentor || !mentee) return null;

  if (!mentee.isOnboarded) redirect("/onboard/1");

  // Combine recurring events and available events
  const individualEvents = await db.event.findMany({
    where: {
      userId: mentor.id,
      start: {
        gte: new Date(), // This compares against the current date and time
      },
    },
    select: {
      start: true,
      end: true,
    },
  });

  return (
    <BookingCalendarTemplate
      mentor={mentor}
      mentee={mentee}
      individualEvents={individualEvents}
    />
  );
};

export default MenteeCalendarPage;
