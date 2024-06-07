import React from "react";

import DashboardInfoCard from "./dashboard-info-card";
import { getUniqueBookedSessions } from "@/lib/actions/helper.action";

type TDashBoardUsersBookedProps = {
  userId: string;
};

const DashBoardUsersBooked = async (props: TDashBoardUsersBookedProps) => {
  const { userId } = props;

  const sessionCountLastMonth = await getUniqueBookedSessions(userId);

  return (
    <div>
      <DashboardInfoCard
        title="Users Booked"
        displayValue={sessionCountLastMonth?.toString() || "0"}
        footer="last 30 days"
      />
    </div>
  );
};

export default DashBoardUsersBooked;
