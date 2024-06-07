import { StarFilledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { LinkedInShareButton } from "./dashboard-actions";
import { getInitials } from "@/lib/utils";
import { ShareButton } from "@/components/shared/profile/profile-share";
import ShareOwnProfile from "@/components/shared/profile/share-my-profile";
import { Eye, User } from "lucide-react";

type DashBoardProfileCardProps = {
  userId: string;
  userImage: string;
  userName: string;
  rating: number;
  sessions: number;
  reviews: number;
};

const DashBoardProfileCard = ({
  userId,
  userImage,
  userName,
  rating,
  sessions,
  reviews,
}: DashBoardProfileCardProps) => {
  return (
    <section className="lg:mt-4 p-6 border shadow rounded-lg bg-background md:pl-6 col-span-1">
      <div className="flex items-center justify-center flex-col gap-1">
        <Avatar className="w-20 h-20">
          <AvatarImage src={userImage} alt={userName} />
          <AvatarFallback>{getInitials(userName)}</AvatarFallback>
        </Avatar>
        <p className="large flex items-center gap-2 !text-2xl">
          <StarFilledIcon className="w-5 h-5 text-yellow-500" /> NA
        </p>

        <p className="muted">0 reviews</p>

        <div className="w-full flex flex-col md:flex-row justify-between gap-2 items-center my-2">
          <Button
            variant="outline"
            asChild
            className="min-w-[150px] md:w-fit flex items-center"
          >
            <Link href={`/mentor/profile/${userId}`}>
              View your profile
              <User className="w-5 h-5 ml-1" />
            </Link>
          </Button>

          <ShareOwnProfile
            path={`dashboard/profile/${userId}`}
            title="Share your profile"
          />
        </div>
      </div>
    </section>
  );
};

export default DashBoardProfileCard;
