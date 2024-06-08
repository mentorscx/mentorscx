import React, { Suspense } from "react";
import type { Metadata } from "next";

import MentorSettingsTabs from "./_components/MentorSettingsTabs";
import SettingsSkelton from "@/components/shared/skeletons/SettingsSkeleton";
import { MENTOR_SETTINGS_METADATA } from "@/constants/metadata";

export const metadata: Metadata = MENTOR_SETTINGS_METADATA;

const MentorSettingsPage = () => {
  return (
    <Suspense fallback={<SettingsSkelton />}>
      <MentorSettingsTabs />
    </Suspense>
  );
};

export default MentorSettingsPage;
