import type { Metadata } from "next";
import { Suspense } from "react";

import { ProfileDisplayPage } from "@/components/shared/profile/profile-display";
import ProfileSkeleton from "@/components/shared/skeletons/ProfileSkeleton";

export const metadata: Metadata = {
  title: "Profile | Mentors CX",
  description:
    "Update and personalize your Mentors CX profile. Ensure your information is up-to-date.",
};

const MentorProfilePage = async () => {
  return (
    <div className="pt-[80px]">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileDisplayPage isMentorRoute={true} isOwnProfile={true} />
      </Suspense>
    </div>
  );
};

export default MentorProfilePage;
