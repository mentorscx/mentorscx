import React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import ProfileSkeleton from "@/components/shared/skeletons/ProfileSkeleton";

import { db } from "@/lib/db";
import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";

export async function generateMetadata({
  params,
}: {
  params: { profileId: string };
}): Promise<Metadata> {
  // read route params
  const { profileId } = params;

  // fetch data
  const user = await db.user.findUnique({
    where: {
      id: profileId,
    },
    select: {
      username: true,
      imageUrl: true,
    },
  });

  // Get image or default to Parent metadata
  const imageUrl = user?.imageUrl || "/mentors-cx.png";

  return {
    title: `${user?.username} profile | Mentors CX`,
    description: `Book an appointment with ${user?.username}`,
    openGraph: {
      images: [imageUrl],
    },
  };
}

interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDisplayPage
        isMentorRoute={true}
        isOwnProfile={false}
        profileId={profileId}
      />
    </Suspense>
  );
};

export default page;
