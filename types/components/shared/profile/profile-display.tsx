import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
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

import { getSelfId } from "@/lib/actions/user.action";
import { formatMonthYear } from "@/lib/format";
import { RequestCallButton } from "./profile-item-action";
import ProfileSkillList from "./profile-skill-list";
import {
  EditProfileAction,
  EditProfileDetailsAction,
  EditSocialsAction,
} from "./edit-profile-action";
import { OnboardingChecklist } from "@/components/shared/onboarding-checklist";

import {
  User,
  Industry,
  Expertise,
  Tool,
  Experience,
  Language,
} from "@prisma/client";
import ProfileBioPage from "./profile-bio";
import ProfileLinks from "./profile-links";
import ShareOwnProfile from "./share-my-profile";

type ProfileDisplayPageProps = {
  profileId: string;
  user: User & {
    industries: Industry[];
    expertise: Expertise[];
    toolkit: Tool[];
    experiences: Experience[];
    languages: Language[];
  };
};

export const ProfileDisplayPage = async ({
  user,
  profileId,
}: ProfileDisplayPageProps) => {
  const {
    id,
    username,
    location,
    bio,
    city,
    country,
    imageUrl,
    position,
    organization,
    languages,
    industries,
    expertise,
    toolkit,
    experiences,
    linkedinProfile,
    twitterProfile,
    facebookProfile,
    tiktokProfile,
    joinedAt,
    price,
    duration,
    portfolioWebsite,
  } = user;

  // Get the self account
  const selfAccount = await getSelfId();
  if (!selfAccount) {
    return null;
  }

  // Check if the person can edit the profile
  const canEdit = profileId === selfAccount.id;

  return (
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
                src={imageUrl}
                alt="avatar"
                width={100}
                height={100}
                className="h-32 w-32 rounded-full object-cover overflow-hidden"
              />
              <div>
                {canEdit ? (
                  <ShareOwnProfile
                    path={`dashboard/profile/${id}`}
                    title="Share your profile"
                  />
                ) : null}
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="h3">{username}</h3>
              <h4 className="large text-slate-800">
                {position} @ {organization}
              </h4>
            </div>
            {canEdit && (
              <EditProfileDetailsAction
                position={position}
                organization={organization}
                id={id}
              />
            )}
          </div>

          <div className="flex flex-col items-center gap-4 mt-4">
            {/* Location and Joined Date */}
            <div className="flex flex-col items-center lg:flex-row lg:space-x-6 max-lg:space-y-4">
              <p className="text-base flex items-center">
                <Languages className="h-4 w-4 text-blue-500 mr-1" />
                {languages.map((language: any) => language.name).join(", ")}
              </p>
              <p className="text-base flex items-center">
                <MapPin className="h-4 w-4 text-blue-500 mr-1" />
                {city}, {country}
              </p>
              <p className="text-base flex items-center">
                <BuildingIcon className="h-4 w-4 text-blue-500 mr-1" />
                Joined {formatMonthYear(joinedAt?.toString())}
              </p>
            </div>

            {/* Reviews and Available Information */}
            <div className="w-fit mx-auto border-2 border-slate-400 p-4 px-6 lg:px-12 rounded-lg lg:rounded-full">
              <div className="flex flex-col items-center space-y-1 lg:flex-row lg:space-x-12 gap-4">
                <div className="flex flex-col items-center muted">
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <p className="text-xl font-bold text-black">NA</p>
                  </div>
                  <div>0 reviews</div>
                </div>
                <Separator className="h-[2px] lg:hidden" />
                <div className="flex flex-col items-center muted">
                  {price === 0 ? (
                    <p className="font-bold text-2xl text-green-600">Free</p>
                  ) : (
                    <p className="font-bold text-2xl text-slate-800">
                      {price}$
                    </p>
                  )}
                  <p className="text-sm">Price per hour</p>
                </div>
                <Separator className="h-[2px] lg:hidden" />
                <div className="flex flex-col items-center muted">
                  <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold text-sm">
                    <p className="text-sm">{duration} min</p>
                  </div>
                  <div>Time blocks Available</div>
                </div>
                <Separator className="h-[2px] lg:hidden" />
                <div className="flex flex-col items-center muted">
                  <div className="flex items-center">
                    <p className="text-xl font-bold text-black">Soon.</p>
                  </div>
                  <div>Next Available day</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social and Invites */}
        <div className="lg:h-24 flex flex-col lg:flex-row items-center justify-between w-full mt-8 p-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-center w-full space-x-3 lg:justify-start">
            <RequestCallButton id={id} />
            <Button className="rounded-full" variant="outline">
              <MessageCircleIcon className="w-5 h-5 mr-1" />
              Message me
            </Button>
          </div>

          {portfolioWebsite && (
            <Button variant="link" className="max-lg:mt-4" asChild>
              <Link
                href={portfolioWebsite}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-base">Personal website</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          )}

          <div className="max-lg:mt-6 flex items-center justify-center">
            {facebookProfile && (
              <Button variant="link" size="icon" asChild>
                <Link
                  href={facebookProfile}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LucideFacebook className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                </Link>
              </Button>
            )}
            {linkedinProfile && (
              <Button variant="link" size="icon" asChild>
                <Link
                  href={linkedinProfile}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <LinkedInLogoIcon className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                </Link>
              </Button>
            )}
            {twitterProfile && (
              <Button variant="link" size="icon" asChild>
                <Link
                  href={twitterProfile}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <TwitterLogoIcon className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                </Link>
              </Button>
            )}
            {tiktokProfile && (
              <Button variant="link" size="icon" asChild>
                <Link
                  href={tiktokProfile}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaTiktok className="w-6 h-6 hover:scale-125 transition-colors duration-700" />
                </Link>
              </Button>
            )}

            <EditSocialsAction
              dataType="socials"
              id={id}
              portfolioWebsite={portfolioWebsite ?? ""}
              linkedinProfile={linkedinProfile ?? ""}
              twitterProfile={twitterProfile ?? ""}
              facebookProfile={facebookProfile ?? ""}
              tiktokProfile={tiktokProfile ?? ""}
            />
          </div>
        </div>

        {/* PROFILE LINKS */}
        <ProfileLinks />
      </div>

      {/* Onboarding Checklist */}
      <div className="max-w-4xl mx-auto mt-4">
        {canEdit ? <OnboardingChecklist user={user} /> : null}
      </div>

      <div id="bio"></div>
      <ProfileBioPage canEdit={canEdit} bio={bio} dataType="bio" id={id} />

      <div id="experience"></div>
      <ProfileSkillList
        data={experiences}
        canEdit={canEdit}
        dataType="experience"
        name="Experience"
      />

      <div id="expertise"></div>
      <ProfileSkillList
        data={expertise}
        canEdit={canEdit}
        dataType="expertise"
        name="Expertise"
      />

      <div id="industry"></div>
      <ProfileSkillList
        data={industries}
        canEdit={canEdit}
        dataType="industry"
        name="Industry"
      />

      <div id="toolkit"></div>
      <ProfileSkillList
        data={toolkit}
        canEdit={canEdit}
        dataType="tool"
        name="Toolkit"
      />

      {/* <div id="reviews"></div> */}
      {/* <ProfileTestmonialPage title="Reviews (5)" /> */}

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};
