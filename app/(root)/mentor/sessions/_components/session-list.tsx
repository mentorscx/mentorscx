import React from "react";
import { SessionCard } from "@/components/shared/sessions/session-card";
import { Session, Role, User } from "@prisma/client";
type TSession = Session & {
  mentor: Pick<User, "id" | "role" | "timeZone">;
} & {
  mentee: Pick<User, "username" | "imageUrl">;
};

type SessionListProps = {
  sessions: TSession[];
};

const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <div>
      {sessions.map((session: TSession) => (
        <div key={session.id}>
          <SessionCard
            session={session}
            currUser={session.mentor}
            otherUser={session.mentee}
          />
        </div>
      ))}
    </div>
  );
};

export default SessionList;
