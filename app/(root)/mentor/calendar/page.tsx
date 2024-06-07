import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import type { Metadata } from "next";

import { db } from "@/lib/db";

import { Role } from "@prisma/client";
import BookingCalendarDetails from "@/components/shared/booking-calendar-details";
import BookingCalendarMain from "@/components/shared/booking-calendar-main";
import { generateEventsForNextYear } from "@/lib/helpers/recurring";

export const metadata: Metadata = {
  title: "Calendar | Mentors CX",
  description:
    "Keep track of your mentorship appointments. Sync and manage your calendar on Mentors CX.",
};

const CalendarPage = async () => {
  // Get clerk Auth return if nothing
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }

  // Get user details from database
  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      imageUrl: true,
      username: true,
      timeZone: true,
      meetingPreference: true,
      duration: true,
      price: true,
      weeklyAvailability: true,
      role: true,
      expertise: {
        select: {
          name: true,
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

  if (!user) return null;
  // Redirect if the user is not MENTOR
  if (user.role !== Role.MENTOR) {
    redirect("/dashboard/search");
  }

  // Get rrule for next one year recurring events
  // Get Available events from the database

  // Combine recurring events and available events
  const individualEvents = await db.event.findMany({
    where: {
      userId: user.id,
      start: {
        gte: new Date(), // This compares against the current date and time
      },
    },
    select: {
      start: true,
      end: true,
    },
  });

  const weeklyAvailability = user?.weeklyAvailability || {};
  const { schedule } = JSON.parse(JSON.stringify(weeklyAvailability)) || [];
  const weeklyEvents = generateEventsForNextYear(schedule);
  //TODO: SET DEFAULT TIMEZONE IN PRISMA
  const timeZone = user?.timeZone || "America/New_York";

  return (
    <div className="pt-[80px] min-h-screen p-3">
      <div className="w-full mt-4 max-w-5xl mx-auto p-3 border shadow rounded bg-background md:pl-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4">
            <Image
              src="/assets/schedule_tab.svg"
              alt="alt"
              width={50}
              height={50}
              className="shrink-0 object-fill w-24 h-24"
            />
            <div className="my-4">
              <h3 className="h3 flex items-center gap-2">
                Your Calendar{" "}
                <span className="text-sm text-primary-600 border-1 px-3 py-1 rounded-full border-primary-600">
                  Preview
                </span>
              </h3>
              <p className="muted font-semibold">
                This is how mentees will see your availability when they try to
                request a session with you
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 max-w-5xl mx-auto p-3 bg-background rounded border shadow">
        <div className="w-full flex flex-col md:flex-row">
          {/* Right Side: Details */}
          <div className="mt-4  basis-1/4 w-full flex p-3 justify-start">
            <BookingCalendarDetails
              imageUrl={user.imageUrl}
              username={user.username}
              timeZone={timeZone}
              meetingPreference={user.meetingPreference || "zoom"}
              duration={user.duration}
            />
          </div>
          <hr className="h-[1px]" />
          {/* Main Calendar */}
          <div className="w-full basis-3/4">
            <BookingCalendarMain
              individualEvents={individualEvents}
              weeklyEvents={weeklyEvents}
              timeZone={timeZone}
              duration={user.duration}
              mentorId={user.id}
              price={user.price}
              expertise={user.expertise}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
