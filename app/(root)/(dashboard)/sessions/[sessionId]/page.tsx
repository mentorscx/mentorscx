import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import SessionDetailsCard from "@/components/shared/sessions/session-details-card";
import SessionHeader from "@/components/shared/sessions/session-header";
import SessionChatLayout from "@/components/chats/SessionChatLayout";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptyDataCard from "@/components/shared/empty-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SessionPageProps {
  params: {
    sessionId: string;
  };
}

const SessionPage = async ({ params }: SessionPageProps) => {
  const { sessionId } = params;

  const { userId: clerkId } = auth();

  if (!clerkId) return redirect("/sign-in");

  const session = await db.session.findUnique({
    where: {
      id: sessionId,
      mentee: {
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
      mentor: {
        select: {
          id: true,
          clerkId: true,
          username: true,
          imageUrl: true,
          position: true,
          organization: true,
          meetingPreference: true,
          zoomLink: true,
          googleMeetLink: true,
        },
      },
      mentee: {
        select: {
          id: true,
          timeZone: true,
        },
      },
    },
  });

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen flex-col gap-4">
        <EmptyDataCard description="Session doesn't exist!" />
        <Button variant="link" size="lg" asChild>
          <Link href="/sessions">Take me to my sessions!</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto h-full max-w-5xl p-3 md:p-6 mt-16">
      {/* SESSION HEADER */}
      <SessionHeader
        sessionId={session.id}
        role={Role.MENTEE}
        status={session.status}
        declinedBy={session.declinedBy}
        otherUserId={session.mentor.clerkId}
      />

      {/* SESSION DETAILS */}
      <SessionDetailsCard
        roleLabel="Mentor"
        profileUrl={`/profile/${session.mentor.id}`}
        session={session}
        otherUser={session.mentor}
        currentUser={session.mentee}
        meetingPreference={session.mentor.meetingPreference}
        meetingUrl={
          session.mentor.meetingPreference === "zoom"
            ? session.mentor.zoomLink
            : session.mentor.googleMeetLink
        }
      />

      <SessionChatLayout otherUserId={session.mentor.clerkId} />
    </div>
  );
};

export default SessionPage;
