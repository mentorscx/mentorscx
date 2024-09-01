import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardLayout;
