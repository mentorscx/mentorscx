import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import SessionDetailsCard from "@/components/shared/sessions/session-details-card";
import SessionHeader from "@/components/shared/sessions/session-header";
import SessionChatLayout from "@/components/chats/SessionChatLayout";

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
      mentor: {
        select: {
          id: true,
          clerkId: true,
          username: true,
          imageUrl: true,
          position: true,
          organization: true,
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
    return null;
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
        profileUrl="/profile"
        session={session}
        otherUser={session.mentor}
        currentUser={session.mentee}
      />

      <SessionChatLayout otherUserId={session.mentor.clerkId} />
    </div>
  );
};

export default SessionPage;
