import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { db } from "@/lib/db";
import { SessionStatus } from "@prisma/client";
import SessionMain from "@/components/shared/sessions/session-main";
import { TSession } from "@/types";

// Page metadata as a constant object
export const metadata: Metadata = {
  title: "Sessions | Mentors CX",
  description:
    "Manage your mentorship sessions. View upcoming and past sessions on Mentors CX.",
};

// Function to fetch sessions based on clerk ID
const fetchSessionsData = async (clerkId: string): Promise<TSession[]> => {
  const userWithSessions = await db.user.findUnique({
    where: { clerkId },
    include: {
      sessionsReceived: {
        include: {
          mentor: { select: { id: true, role: true, timeZone: true } },
          mentee: { select: { username: true, imageUrl: true } },
        },
      },
    },
  });

  return (
    userWithSessions?.sessionsReceived.map((session) => ({
      session,
      otherUser: session.mentee,
      currentUser: session.mentor,
    })) || []
  );
};

// Utility function to filter sessions by their status
const filterSessionsByStatus = (
  sessions: TSession[],
  status: SessionStatus[]
): TSession[] => {
  return sessions.filter((session) => status.includes(session.session.status));
};

// Main component for rendering the sessions page
const MenteeSessionsPage = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) {
    throw redirect("/sign-in");
  }

  const sessions = await fetchSessionsData(clerkId);
  const sessionTypes = {
    requested: filterSessionsByStatus(sessions, [SessionStatus.AWAITING_HOST]),
    upcoming: filterSessionsByStatus(sessions, [SessionStatus.ACCEPTED]),
    completed: filterSessionsByStatus(sessions, [SessionStatus.COMPLETED]),
    cancelled: filterSessionsByStatus(sessions, [
      SessionStatus.REJECTED,
      SessionStatus.CANCELLED,
    ]),
  };

  return (
    <div className="mx-auto max-w-5xl pt-[80px]">
      <section>
        <SessionMain sessions={sessionTypes} />
      </section>
    </div>
  );
};

export default MenteeSessionsPage;
