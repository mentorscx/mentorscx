import React from "react";
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Clock, LayoutList, Calendar } from "lucide-react";
import {
  getCurrentUser,
  getSelf,
  getSelfWithEvents,
} from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Role } from "@prisma/client";

import { DisplayForm } from "./_components/notification-form";
import SessionForm from "./_components/SessionTabContent";
import { CalandarForm } from "./_components/calandar-form";
import { AccountForm } from "./_components/account-form";
import { GoogleCalandarForm } from "./_components/google-calendar-form";
import { db } from "@/lib/db";
import MentorSettingsTabs from "./_components/MentorSettingsTabs";

export const metadata: Metadata = {
  title: "Settings | Mentors CX",
  description:
    "Customize your Mentors CX experience. Access and update your account settings and preferences.",
};

const SettingsPage = async () => {
  const user = await getCurrentUser({
    isMentorRoute: true,
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return <MentorSettingsTabs user={user} />;
};

export default SettingsPage;
