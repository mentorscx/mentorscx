import React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";

import ProfileSkeleton from "@/components/shared/skeletons/ProfileSkeleton";

import { db } from "@/lib/db";
import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";
import { addProfileViewCount } from "@/lib/actions/helper.action";

export async function generateMetadata({
  params,
}: {
  params: { profileId: string };
}): Promise<Metadata> {
  try {
    const { profileId } = params;
    const user = await db.user.findUnique({
      where: {
        id: profileId,
      },
      select: {
        username: true,
        imageUrl: true,
      },
    });
    const imageUrl = user?.imageUrl || "/mentors-cx.png";
    return {
      title: `${user?.username} profile | Mentors CX`,
      description: `Book an appointment with ${user?.username}`,
      openGraph: {
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Profile | Mentors CX",
      description: "Mentor profile page",
      openGraph: {
        images: ["/mentors-cx.png"],
      },
    };
  }
}

interface Props {
  params: {
    profileId: string;
  };
}

const page = async ({ params }: Props) => {
  const { profileId } = params;

  addProfileViewCount({ profileId }).catch((err) =>
    console.error("Failed to update view count:", err)
  );

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDisplayPage
        isMentorRoute={false}
        isOwnProfile={false}
        profileId={profileId}
      />
    </Suspense>
  );
};

export default page;
