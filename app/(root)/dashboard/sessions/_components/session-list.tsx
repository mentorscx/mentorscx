import React from "react";
import { SessionCard } from "@/components/shared/sessions/session-card";
import { Session, Role, User } from "@prisma/client";

type TSession = Session & {
  mentee: Pick<User, "id" | "role" | "timeZone">;
} & {
  mentor: Pick<User, "username" | "imageUrl">;
};

type SessionListProps = {
  sessions: TSession[];
};

export const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <div>
      {sessions.map((session: TSession) => (
        <div key={session.id}>
          <SessionCard
            session={session}
            currUser={session.mentee}
            otherUser={session.mentor}
          />
        </div>
      ))}
    </div>
  );
};
