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
  currentView: Role;
};

const SessionList = (props: SessionListProps) => {
  return (
    <div>
      {props.sessions.map((session: TSession) => (
        <div key={session.id}>
          <SessionCard
            session={session}
            currentUser={session.mentor}
            otherUser={session.mentee}
            currentView={props.currentView}
          />
        </div>
      ))}
    </div>
  );
};

export default SessionList;
