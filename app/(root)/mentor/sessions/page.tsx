import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { db } from "@/lib/db";
import { Role, SessionStatus } from "@prisma/client";
import SessionMain from "@/components/shared/sessions/session-main";
import { TSession } from "@/types";
import MentorSubscribeModal from "@/components/modals/mentor-membership-modal";

// Page metadata
export const metadata: Metadata = {
  title: "Sessions | Mentors CX",
  description:
    "Manage your mentorship sessions. View upcoming and past sessions on Mentors CX.",
};

type TabValue = "requested" | "upcoming" | "completed" | "archived";

const isValidTab = (tab: string | undefined): tab is TabValue =>
  tab !== undefined &&
  ["requested", "upcoming", "completed", "archived"].includes(tab);

// Function to fetch session data for a given user
const fetchSessionsData = async (clerkId: string): Promise<TSession[]> => {
  const userWithSessions = await db.user.findUnique({
    where: { clerkId },
    include: {
      sessionsGiven: {
        orderBy: {
          start: "desc",
        },
        include: {
          mentor: { select: { id: true, role: true, timeZone: true } },
          mentee: { select: { username: true, imageUrl: true } },
        },
      },
    },
  });

  return (
    userWithSessions?.sessionsGiven.map((session) => ({
      session,
      otherUser: session.mentee,
      currentUser: session.mentor,
    })) || []
  );
};

// Utility function to filter sessions based on their status
const filterSessionsByStatus = (
  sessions: TSession[],
  status: SessionStatus[]
): TSession[] => {
  return sessions.filter((session) => status.includes(session.session.status));
};

// Main component for rendering the mentee sessions page
const MenteeSessionsPage = async ({
  searchParams,
}: {
  searchParams: { tab?: string };
}) => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return redirect("/sign-in");
  }

  const tab = searchParams.tab;
  const activeTab: TabValue = isValidTab(tab) ? tab : "upcoming";

  const user = await db.user.findUnique({
    where: { clerkId },
    select: {
      role: true,
    },
  });

  if (!user || user.role !== Role.MENTOR) {
    return <MentorSubscribeModal isDialogOpen={true} />;
  }

  const sessions = await fetchSessionsData(clerkId);

  // Organizing sessions based on their status
  const sessionTypes = {
    requested: filterSessionsByStatus(sessions, [SessionStatus.AWAITING_HOST]),
    upcoming: filterSessionsByStatus(sessions, [SessionStatus.ACCEPTED]),
    completed: filterSessionsByStatus(sessions, [
      SessionStatus.COMPLETED,
      SessionStatus.DONE,
      SessionStatus.REVIEWED,
    ]),
    archived: filterSessionsByStatus(sessions, [
      SessionStatus.DECLINED,
      SessionStatus.CANCELLED,
      SessionStatus.RESCHEDULED,
      SessionStatus.INCOMPLETE,
    ]),
  };

  return (
    <div className="mx-auto max-w-5xl pt-16">
      <section>
        <SessionMain
          sessions={sessionTypes}
          currentView={Role.MENTOR}
          activeTab={activeTab}
        />
      </section>
    </div>
  );
};

export default MenteeSessionsPage;
