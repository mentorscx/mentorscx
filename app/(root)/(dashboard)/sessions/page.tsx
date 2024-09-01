import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { db } from "@/lib/db";
import { Role, SessionStatus } from "@prisma/client";
import SessionMain from "@/components/shared/sessions/session-main";
import { TSession } from "@/types";
import { isProUser } from "@/lib/utils";
import { ProAccessWrapper } from "@/components/wrappers/ProAccessWrapper";
import SessionsLoadingSkelton from "@/components/shared/skeletons/SessionsLoadingSkeleton";

// Page metadata as a constant object
export const metadata: Metadata = {
  title: "Sessions | Mentors CX",
  description:
    "Manage your mentorship sessions. View upcoming and past sessions on Mentors CX.",
};

// Function to fetch sessions based on clerk ID
const fetchSessionsData = async (
  clerkId: string
): Promise<{ sessions: TSession[]; proUser: boolean }> => {
  const userWithSessions = await db.user.findUnique({
    where: { clerkId },
    include: {
      sessionsReceived: {
        include: {
          mentee: { select: { id: true, role: true, timeZone: true } },
          mentor: { select: { username: true, imageUrl: true } },
        },
      },
      Subscription: true,
    },
  });
  const sessions =
    userWithSessions?.sessionsReceived.map((session) => ({
      session,
      otherUser: session.mentor,
      currentUser: session.mentee,
    })) || [];

  const proUser = isProUser(userWithSessions?.Subscription);

  return { sessions, proUser };
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

  const { sessions, proUser } = await fetchSessionsData(clerkId);
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

  console.log(proUser);

  return (
    <ProAccessWrapper active={proUser}>
      <div className="mx-auto max-w-5xl pt-16">
        <section>
          <SessionMain sessions={sessionTypes} currentView={Role.MENTEE} />
        </section>
      </div>
    </ProAccessWrapper>
  );
};

const MenteeSessionsPageWithSuspense = () => {
  return (
    <Suspense fallback={<SessionsLoadingSkelton />}>
      <MenteeSessionsPage />
    </Suspense>
  );
};

export default MenteeSessionsPageWithSuspense;
