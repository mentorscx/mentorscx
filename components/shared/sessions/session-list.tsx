import React from "react";
import { SessionCard } from "@/components/shared/sessions/session-card";
import { TSession } from "@/types";
import { Role } from "@prisma/client";

type SessionListProps = {
  sessions: TSession[];
  currentView: Role;
};

export const SessionList = (props: SessionListProps) => {
  return (
    <div className="space-y-4">
      {props.sessions.map((s: TSession) => (
        <div key={s.session.id}>
          <SessionCard
            session={s.session}
            currentUser={s.currentUser}
            otherUser={s.otherUser}
            currentView={props.currentView}
          />
        </div>
      ))}
    </div>
  );
};
