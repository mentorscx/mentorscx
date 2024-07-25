import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import SessionDetailsCard from "@/components/shared/sessions/session-details-card";
import SessionHeader from "@/components/shared/sessions/session-header";
import SessionChat from "@/components/shared/sessions/session-chat";

interface SessionPageProps {
  params: {
    sessionId: string;
  };
}

const SessionPage = async ({ params }: SessionPageProps) => {
  const { sessionId } = params;
  const session = await db.session.findUnique({
    where: {
      id: sessionId,
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
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  return (
    <div className="mx-auto h-full max-w-5xl p-3 md:p-6 mt-[80px]">
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
        profileUrl="/dashboard/profile"
        session={session}
        otherUser={session.mentee}
        currentUser={session.mentor}
      />

      {/* SESSION CHAT*/}
      <SessionChat otherId={session.mentee.clerkId} />
    </div>
  );
};

export default SessionPage;
