import React from "react";
import DashboardInfoCard from "./dashboard-info-card";
import { getUniqueProfileViews } from "@/lib/actions/helper.action";

type TDashBoardProfileViewsProps = {
  userId: string;
};

const DashBoardProfileViews = async (props: TDashBoardProfileViewsProps) => {
  const { userId } = props;

  const viewCount = await getUniqueProfileViews(userId);

  return (
    <div>
      <DashboardInfoCard
        title="Profile Views"
        displayValue={viewCount?.toString() || "0"}
        footer="last 30 days"
      />
    </div>
  );
};

export default DashBoardProfileViews;
