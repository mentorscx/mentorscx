import React from "react";
import type { Metadata } from "next";

import { getCurrentUser } from "@/lib/actions/user.action";
import MentorSettingsTabs from "./_components/MentorSettingsTabs";
import { MENTOR_SETTINGS_METADATA } from "@/constants/metadata";

export const metadata: Metadata = MENTOR_SETTINGS_METADATA;

const SettingsPage = async () => {
  const user = await getCurrentUser({ isMentorRoute: true });

  if (!user) return <div>User not found</div>;
  return <MentorSettingsTabs user={user} />;
};

export default SettingsPage;
