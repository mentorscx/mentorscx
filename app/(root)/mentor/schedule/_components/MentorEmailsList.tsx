import React from "react";

import { CheckboxReactHookFormMultiple } from "./MentorEmailForm";

type MentorEmailsListProps = {
  userId: string;
  emails: string[];
  connectedEmails: string[];
};

const MentorEmailsList = ({
  userId,
  emails,
  connectedEmails,
}: MentorEmailsListProps) => {
  return (
    <section className="mt-4">
      <CheckboxReactHookFormMultiple
        userId={userId}
        emails={emails}
        connectedEmails={connectedEmails}
      />
    </section>
  );
};

export default MentorEmailsList;
