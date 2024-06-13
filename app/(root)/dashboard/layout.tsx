import React from "react";

import MentorRedirectDialog from "@/components/modals/redirect-mentors-modal";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MentorRedirectDialog isOpen={true} />
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
