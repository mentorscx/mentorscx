import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  BuildingIcon,
  LucideFacebook,
  MapPin,
  MessageCircleIcon,
  StarIcon,
  UserPlus as UserRoundPlus,
  ExternalLink,
  Languages,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import {
  LinkedInLogoIcon,
  Share2Icon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer";

import { calculatePrice, formatMonthYear } from "@/lib/format";
import { RequestCallButton } from "./profile-item-action";
import ProfileSkillList from "./profile-skill-list";
import {
  EditProfileAction,
  EditProfileDetailsAction,
  EditSocialsAction,
} from "./edit-profile-action";
import { OnboardingChecklist } from "@/components/shared/onboarding-checklist";

import { Role } from "@prisma/client";
import ProfileBioPage from "./profile-bio";
import ProfileLinks from "./profile-links";
import ShareOwnProfile from "./share-my-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import YouTubeVideo from "./profile-video";
import NextAvailableSlot from "./next-available-day";
import MessageMe from "../message-me";
import ProfileReviews from "./profile-reviews";
import { getMentorReviewStats } from "@/lib/actions/helper.action";
import MentorSubscribeModal from "@/components/modals/mentor-membership-modal";

type ProfileDisplayPageProps = {
  isMentorRoute: boolean;
  isOwnProfile: boolean;
  profileId?: string;
};

export const ProfileDisplayPage = async ({
  isMentorRoute = false,
  isOwnProfile = false,
  profileId = undefined,
}: ProfileDisplayPageProps) => {
  const { userId } = auth();

  if (isOwnProfile && !userId) {
    redirect("/login");
  }

  const user = await db.user.findUnique({
    where: {
      id: profileId,
      clerkId: isOwnProfile && userId ? userId : undefined,
    },
    include: {
      experiences: true,
      expertise: true,
      industries: true,
      languages: true,
      toolkit: true,
    },
  });

  if (!user) {
    return <div>Profile not found!</div>;
  }

  if (isOwnProfile && userId) {
    if (!user.isOnboarded) redirect("/onboard/1");
  }

  if (isMentorRoute) {
    if (user.role !== Role.MENTOR) {
      return <MentorSubscribeModal isDialogOpen={true} />;
    }
  }

  const { averageRating, totalReviews } = await getMentorReviewStats(user.id);

  // Check if the person can edit the profile
  const canEdit = isOwnProfile || userId === user.clerkId;

  return (
    <div className="pt-16">
      <div className="max-lg:p-3">
        <div className="relative flex flex-col items-center justify-center space-y-3 bg-background rounded border shadow p-3">
          {canEdit && (
            <div className="absolute right-8 top-8">
              <EditProfileAction />
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            {/* Profile Image & Reviews */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-4 items-center justify-center">
                <Image
                  src={user.imageUrl}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="h-32 w-32 rounded-full object-cover overflow-hidden"
                />
                <div>
                  {canEdit ? (
                    <ShareOwnProfile
                      path={`/profile/${user.id}`}
                      title="Share your profile"
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="h3">{user.username}</h3>
                <h4 className="large text-slate-800">
                  {user.position} @ {user.organization}
                </h4>
              </div>
              {canEdit && (
                <EditProfileDetailsAction
                  position={user.position}
                  organization={user.organization}
                  id={user.id}
                />
              )}
            </div>

            <div className="flex flex-col items-center gap-4 mt-4">
              {/* Location and Joined Date */}
              <div className="flex flex-col items-center lg:flex-row lg:space-x-6 max-lg:space-y-4">
                <p className="text-base flex items-center">
                  <Languages className="h-4 w-4 text-blue-500 mr-1" />
                  {user.languages
                    .map((language: any) => language.name)
                    .join(", ")}
                </p>
                <p className="text-base flex items-center">
                  <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                  {user.city}, {user.country}
                </p>
                <p className="text-base flex items-center">
                  <BuildingIcon className="h-4 w-4 text-blue-500 mr-1" />
                  Joined {formatMonthYear(user.joinedAt?.toString())}
                </p>
              </div>

              {/* Reviews and Available Information */}
              <div className="w-fit mx-auto border-2 border-slate-200 p-4 px-6 lg:px-12 rounded-lg lg:rounded-full">
                <div className="flex flex-col items-center space-y-1 lg:flex-row lg:space-x-12 gap-4">
                  <div className="flex flex-col items-center muted">
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <p className="text-xl font-bold text-black">
                        {averageRating}
                      </p>
                    </div>
                    <div>{totalReviews} reviews</div>
                  </div>
                  <Separator className="h-[2px] lg:hidden" />
                  <div className="flex flex-col items-center muted">
                    {user.price === 0 ? (
                      <p className="font-bold text-2xl text-green-600">Free</p>
                    ) : (
                      <p className="font-bold text-2xl text-slate-800">
                        {calculatePrice(user.duration, user.price)}$
                      </p>
                    )}
                    <p className="text-sm">Price per session</p>
                  </div>
                  <Separator className="h-[2px] lg:hidden" />
                  <div className="flex flex-col items-center muted">
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold text-sm">
                      <p className="text-sm">{user.duration} min</p>
                    </div>
                    <div>Call duration</div>
                  </div>
                  <Separator className="h-[2px] lg:hidden" />
                  <NextAvailableSlot userId={user.id} />
                </div>
              </div>
            </div>
          </div>

          {/* Social and Invites */}
          <div className="flex flex-col lg:flex-row items-center justify-between w-full py-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center w-full space-x-3 lg:justify-start">
              <RequestCallButton
                id={user.id}
                currentUserClerkId={userId}
                otherUserClerkId={user.clerkId}
              />

              <MessageMe
                currentUserClerkId={userId}
                otherUserClerkId={user.clerkId}
                redirectUrl={"/mentor/chats"}
              />
            </div>

            {user.portfolioWebsite && (
              <Button variant="link" className="max-lg:mt-4" asChild>
                <Link
                  href={user.portfolioWebsite}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="text-base">Personal website</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            )}

            <div className="max-lg:mt-6 flex items-center justify-center">
              {user.facebookProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={user.facebookProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LucideFacebook className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                  </Link>
                </Button>
              )}
              {user.linkedinProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={user.linkedinProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <LinkedInLogoIcon className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                  </Link>
                </Button>
              )}
              {user.twitterProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={user.twitterProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <TwitterLogoIcon className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                  </Link>
                </Button>
              )}
              {user.tiktokProfile && (
                <Button variant="link" size="icon" asChild>
                  <Link
                    href={user.tiktokProfile}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FaTiktok className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                  </Link>
                </Button>
              )}

              {canEdit && (
                <EditSocialsAction
                  dataType="socials"
                  id={user.id}
                  portfolioWebsite={user.portfolioWebsite ?? ""}
                  linkedinProfile={user.linkedinProfile ?? ""}
                  twitterProfile={user.twitterProfile ?? ""}
                  facebookProfile={user.facebookProfile ?? ""}
                  tiktokProfile={user.tiktokProfile ?? ""}
                />
              )}
            </div>
          </div>

          {/* PROFILE LINKS */}
          <ProfileLinks />
        </div>

        {/* Onboarding Checklist */}
        <div className="max-w-4xl mx-auto mt-4">
          {canEdit ? <OnboardingChecklist user={user} /> : null}
        </div>

        <YouTubeVideo videoURL={user.videoUrl} />

        <div id="bio"></div>
        <ProfileBioPage
          canEdit={canEdit}
          bio={user.bio}
          dataType="bio"
          id={user.id}
        />

        <div id="experience"></div>
        <ProfileSkillList
          data={user.experiences}
          canEdit={canEdit}
          dataType="experience"
          name="Experience"
        />

        <div id="expertise"></div>
        <ProfileSkillList
          data={user.expertise}
          canEdit={canEdit}
          dataType="expertise"
          name="Expertise"
        />

        <div id="industry"></div>
        <ProfileSkillList
          data={user.industries}
          canEdit={canEdit}
          dataType="industry"
          name="Industry"
        />

        <div id="toolkit"></div>
        <ProfileSkillList
          data={user.toolkit}
          canEdit={canEdit}
          dataType="tool"
          name="Toolkit"
        />

        <div id="reviews"></div>
        <ProfileReviews canEdit={canEdit} id={user.id} />
      </div>
    </div>
  );
};
