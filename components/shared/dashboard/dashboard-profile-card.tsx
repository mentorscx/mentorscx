import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { LinkedInShareButton } from "./dashboard-actions";
import { getInitials } from "@/lib/utils";
import { ShareButton } from "@/components/shared/profile/profile-share";
import ShareOwnProfile from "@/components/shared/profile/share-my-profile";
import { EclipseIcon, Eye, MoonIcon, SunIcon, User } from "lucide-react";

type MentorDashBoardProfileCardProps = {
  userId: string;
  userImage: string;
  userName: string;
  rating: number;
  sessions: number;
  reviews: number;
};

type MenteeDashBoardProfileCardProps = {
  userId: string;
  userImage: string;
  userName: string;
  planName?: string;
};

// Reusable Avatar Component
const UserProfileAvatar = ({
  userImage,
  userName,
}: {
  userImage: string;
  userName: string;
}) => (
  <Avatar className="w-20 h-20">
    <AvatarImage src={userImage} alt={userName} />
    <AvatarFallback>{getInitials(userName)}</AvatarFallback>
  </Avatar>
);

// Reusable Profile Link Button
const ProfileLinkButton = ({ userId }: { userId: string }) => (
  <Button
    variant="secondary"
    asChild
    className="min-w-[150px] md:w-fit flex items-center"
  >
    <Link href={`/mentor/profile/${userId}`}>
      View your profile
      <User className="w-5 h-5 ml-1" />
    </Link>
  </Button>
);

// Mentor-specific details component
const MentorProfileDetails = ({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) => (
  <>
    <p className="large flex items-center gap-2 !text-2xl">
      <StarFilledIcon className="w-5 h-5 text-yellow-500" /> {rating ?? "NA"}
    </p>
    <p className="muted">{reviews ?? 0} reviews</p>
  </>
);

// Mentee-specific details component

const MenteeProfileDetails = ({
  planName,
}: {
  planName: string | undefined;
}) => {
  // Determine the booking limit and icon based on the plan name
  const { icon: PlanIcon, bookingLimit } = (() => {
    switch (planName) {
      case "Moon":
        return { icon: MoonIcon, bookingLimit: 2 };
      case "Eclipse":
        return { icon: EclipseIcon, bookingLimit: 4 };
      case "Sun":
        return { icon: SunIcon, bookingLimit: 4 };
      default:
        return { icon: null, bookingLimit: 0 };
    }
  })();

  return (
    <>
      {planName ? (
        <>
          <p className="large flex items-center gap-2 !text-2xl">
            {PlanIcon && <PlanIcon className="w-5 h-5 " />} {planName}
          </p>
          <p className="muted">{bookingLimit} Calls/month</p>
        </>
      ) : (
        <>
          <p className="muted">0 Calls/month</p>
          <Button asChild variant="link">
            <Link href="/dashboard/billing">Become a Pro Member</Link>
          </Button>
        </>
      )}
    </>
  );
};

// Mentor Dashboard Profile Card
export const MentorDashBoardProfileCard = ({
  userId,
  userImage,
  userName,
  rating,
  sessions,
  reviews,
}: MentorDashBoardProfileCardProps) => (
  <section className="p-6 border shadow rounded-lg bg-background md:pl-6 col-span-1 min-h-[250px] h-full">
    <div className="flex items-center justify-center flex-col gap-1">
      <UserProfileAvatar userImage={userImage} userName={userName} />
      <MentorProfileDetails rating={rating} reviews={reviews} />
      <div className="w-full flex flex-col md:flex-row justify-between gap-2 items-center my-2">
        <ProfileLinkButton userId={userId} />
        <ShareOwnProfile
          path={`dashboard/profile/${userId}`}
          title="Share your profile"
        />
      </div>
    </div>
  </section>
);

// Mentee Dashboard Profile Card
export const MenteeDashBoardProfileCard = ({
  userId,
  userImage,
  userName,
  planName,
}: MenteeDashBoardProfileCardProps) => (
  <section className="p-6 border shadow rounded-lg bg-background md:pl-6 col-span-1 min-h-[250px] h-full">
    <div className="flex items-center justify-center flex-col gap-1">
      <UserProfileAvatar userImage={userImage} userName={userName} />
      <MenteeProfileDetails planName={planName} />
      <div className="w-full flex flex-col md:flex-row justify-between gap-2 items-center my-2">
        <ProfileLinkButton userId={userId} />
        <ShareOwnProfile
          path={`dashboard/profile/${userId}`}
          title="Invite Friends"
        />
      </div>
    </div>
  </section>
);
