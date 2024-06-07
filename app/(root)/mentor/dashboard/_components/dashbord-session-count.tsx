import React from "react";

import DashboardInfoCard from "./dashboard-info-card";
import { getSessionsCompletedLastMonth } from "@/lib/actions/helper.action";

type TDashBoardSessionCount = {
  userId: string;
};

const DashBoardSessionCount = async (props: TDashBoardSessionCount) => {
  const { userId } = props;

  const sessionsCompleted = await getSessionsCompletedLastMonth(userId);

  return (
    <section>
      <DashboardInfoCard
        title="Sessions Done"
        displayValue={sessionsCompleted?.toString() || "0"}
        footer="last 30 days"
      />
    </section>
  );
};

export default DashBoardSessionCount;
