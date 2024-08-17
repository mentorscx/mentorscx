import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { db } from "@/lib/db";
import { Role, SessionStatus } from "@prisma/client";
import SessionMain from "@/components/shared/sessions/session-main";
import { TSession } from "@/types";

// Page metadata
export const metadata: Metadata = {
  title: "Sessions | Mentors CX",
  description:
    "Manage your mentorship sessions. View upcoming and past sessions on Mentors CX.",
};

// Function to fetch session data for a given user
const fetchSessionsData = async (clerkId: string): Promise<TSession[]> => {
  const userWithSessions = await db.user.findUnique({
    where: { clerkId },
    include: {
      sessionsGiven: {
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
const MenteeSessionsPage = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) {
    return redirect("/sign-in");
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
    ]),
  };

  return (
    <div className="mx-auto max-w-5xl pt-16">
      <section>
        <SessionMain sessions={sessionTypes} currentView={Role.MENTOR} />
      </section>
    </div>
  );
};

export default MenteeSessionsPage;
