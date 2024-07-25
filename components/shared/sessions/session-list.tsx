import React from "react";
import { SessionCard } from "@/components/shared/sessions/session-card";
import { TSession } from "@/types";

type SessionListProps = {
  sessions: TSession[];
};

export const SessionList = ({ sessions }: SessionListProps) => {
  return (
    <div>
      {sessions.map((s: TSession) => (
        <div key={s.session.id} className="space-y-4">
          <SessionCard
            session={s.session}
            currentUser={s.currentUser}
            otherUser={s.otherUser}
          />
        </div>
      ))}
    </div>
  );
};
