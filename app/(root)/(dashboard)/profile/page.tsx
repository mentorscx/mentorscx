import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";
import ProfileSkeleton from "@/components/shared/skeletons/ProfileSkeleton";

import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile | Mentors CX",
  description:
    "Update and personalize your Mentors CX profile. Ensure your information is up-to-date.",
};

const MenteeProfilePage = async () => {
  return (
    <>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileDisplayPage isMentorRoute={false} isOwnProfile={true} />
      </Suspense>
    </>
  );
};

export default MenteeProfilePage;
