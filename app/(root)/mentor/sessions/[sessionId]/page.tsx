import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import SessionDetailsCard from "@/components/shared/sessions/session-details-card";
import SessionHeader from "@/components/shared/sessions/session-header";
import SessionChat from "@/components/shared/sessions/session-chat";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import EmptyDataCard from "@/components/shared/empty-data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SessionPageProps {
  params: {
    sessionId: string;
  };
}

const SessionPage = async ({ params }: SessionPageProps) => {
  const { userId: clerkId } = auth();

  if (!clerkId) return redirect("/sign-in");

  const { sessionId } = params;
  const session = await db.session.findUnique({
    where: {
      id: sessionId,
      mentor: {
        clerkId: clerkId,
      },
    },
    select: {
      id: true,
      objective: true,
      category: true,
      outcome: true,
      start: true,
      end: true,
      duration: true,
      price: true,
      status: true,
      declinedBy: true,
      mentee: {
        select: {
          id: true,
          username: true,
          imageUrl: true,
          position: true,
          organization: true,
          clerkId: true,
        },
      },
      mentor: {
        select: {
          id: true,
          timeZone: true,
          meetingPreference: true,
          zoomLink: true,
          googleMeetLink: true,
        },
      },
    },
  });

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4  ">
        <EmptyDataCard description="Session doesn't exist!" />
        <Button variant="link" size="lg" asChild>
          <Link href="/mentor/sessions">Take me to my sessions!</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto h-full max-w-5xl p-3 md:p-6 mt-16">
      {/* SESSION HEADER */}
      <SessionHeader
        sessionId={session.id}
        role={Role.MENTOR}
        status={session.status}
        declinedBy={session.declinedBy}
        otherUserId={session.mentee.clerkId}
      />

      {/* SESSION DETAILS */}
      <SessionDetailsCard
        roleLabel="Mentee"
        profileUrl={`/profile/${session.mentee.id}`}
        session={session}
        otherUser={session.mentee}
        currentUser={session.mentor}
        meetingPreference={session.mentor.meetingPreference}
        meetingUrl={
          session.mentor.meetingPreference === "zoom"
            ? session.mentor.zoomLink
            : session.mentor.googleMeetLink
        }
      />

      {/* SESSION CHAT*/}
      <SessionChat otherUserId={session.mentee.clerkId} />
    </div>
  );
};

export default SessionPage;
