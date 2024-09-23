import React, { Suspense, ReactNode } from "react";
import CityForm from "@/components/shared/settings/CityForm";
import CountryForm from "@/components/shared/settings/CountryForm";
import LanguagesForm from "@/components/shared/settings/LanguagesForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SettingsIcon } from "lucide-react";
import TimeZoneForm from "@/components/shared/settings/TimeZoneForm";
import { MenteeSettingsSkeleton } from "@/components/shared/skeletons/SettingsSkeleton";
import { Role } from "@prisma/client";

const fetchUserSettings = async (clerkId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { clerkId },
      include: { languages: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Failed to fetch user settings:", error);
    throw error;
  }
};

const MenteeSettings = async () => {
  const { userId: clerkId } = auth();

  if (!clerkId) redirect("/sign-in");

  const user = await fetchUserSettings(clerkId);

  return (
    <>
      <CityForm id={user.id} city={user.city} />
      <CountryForm userId={user.id} country={user.country} />
      <LanguagesForm userId={user.id} languages={user.languages} />
      <div className="mt-4">
        <TimeZoneForm
          id={user.id}
          timeZone={user.timeZone}
          route={Role.MENTEE}
        />
      </div>
    </>
  );
};

interface HeaderWithIconProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const HeaderWithIcon: React.FC<HeaderWithIconProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div>
        <h2 className="text-xl tracking-tight font-semibold">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};

const MenteeSettingsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl py-16">
      <section className="my-4 lg:my-8 p-3">
        <HeaderWithIcon
          icon={<SettingsIcon className="h-10 w-10" />}
          title="Settings"
          description="Please modify your settings"
        />
        <Suspense fallback={<MenteeSettingsSkeleton />}>
          <MenteeSettings />
        </Suspense>
      </section>
    </div>
  );
};

export default MenteeSettingsPage;
