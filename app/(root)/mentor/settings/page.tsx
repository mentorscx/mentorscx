import React, { Suspense } from "react";
import type { Metadata } from "next";

import MentorSettingsTabs from "./_components/MentorSettingsTabs";
import { SettingsSkelton } from "@/components/shared/skeletons/SettingsSkeleton";
import { MENTOR_SETTINGS_METADATA } from "@/constants/metadata";

export const metadata: Metadata = MENTOR_SETTINGS_METADATA;

type TabValue = "account" | "session" | "integrations";

const isValidTab = (tab: string | undefined): tab is TabValue =>
  tab !== undefined && ["account", "sessions", "integrations"].includes(tab);

const MentorSettingsPage = ({
  searchParams,
}: {
  searchParams: { tab?: string };
}) => {
  const tab = searchParams.tab;
  const activeTab: TabValue = isValidTab(tab) ? tab : "account";

  return (
    <Suspense fallback={<SettingsSkelton />}>
      <MentorSettingsTabs activeTab={activeTab} />
    </Suspense>
  );
};

export default MentorSettingsPage;
