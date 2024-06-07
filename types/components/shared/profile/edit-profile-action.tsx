"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEditProfileStore } from "@/hooks/use-edit-profile-store";

import { useModal } from "@/hooks/use-modal-store";
import { ImportIcon, PencilIcon, XIcon } from "lucide-react";
import { UserProfile } from "@clerk/nextjs";

interface EditBioActionProps {
  dataType: string;
  bio: string | null;
  id: string;
}

interface EditSocialActionProps {
  dataType: string;
  id: string;
  portfolioWebsite: string;
  linkedinProfile: string;
  twitterProfile: string;
  facebookProfile: string;
  tiktokProfile: string;
}

export function EditProfileAction() {
  const { isActive, toggleActive } = useEditProfileStore();
  const { onOpen } = useModal();

  const handleChange = () => {
    // onOpen("editProfile");
    toggleActive();
  };
  return (
    <Button variant="outline" onClick={handleChange}>
      {isActive ? (
        <div className="flex items-center ">
          <XIcon className="mr-1 w-4 h-4" /> Cancel
        </div>
      ) : (
        <div className="flex items-center ">
          <PencilIcon className="mr-1 w-4 h-4" /> Edit
        </div>
      )}
    </Button>
  );
}

export function EditBioAction({ dataType, id, bio }: EditBioActionProps) {
  const { onOpen } = useModal();
  const { isActive } = useEditProfileStore();

  const handleClick = () => {
    onOpen("editBio", {
      user: {
        bio,
        id,
      },
    });
  };

  if (!isActive) {
    return null;
  }
  return (
    <Button
      variant="outline"
      className="flex items-center"
      onClick={handleClick}
      size="sm"
    >
      <PencilIcon className="w-4 h-4 mr-1" />
      Edit Bio
    </Button>
  );
}

export function EditSocialsAction({
  dataType,
  id,
  portfolioWebsite,
  linkedinProfile,
  twitterProfile,
  facebookProfile,
  tiktokProfile,
}: EditSocialActionProps) {
  const { onOpen } = useModal();
  const { isActive } = useEditProfileStore();

  const handleClick = () => {
    onOpen("editSocials", {
      user: {
        id,
        portfolioWebsite,
        linkedinProfile,
        twitterProfile,
        facebookProfile,
        tiktokProfile,
      },
    });
  };

  if (!isActive) {
    return null;
  }
  return (
    <Button
      variant="outline"
      className="flex items-center"
      onClick={handleClick}
      size="sm"
    >
      <PencilIcon className="w-4 h-4 mr-1" />
      Edit Socials
    </Button>
  );
}

interface EditProfileDetailsActionProps {
  id: string;
  position: string | null;
  organization: string | null;
}

export function EditProfileDetailsAction({
  id,
  position,
  organization,
}: EditProfileDetailsActionProps) {
  const { onOpen } = useModal();
  const { isActive } = useEditProfileStore();

  const handleClick = () => {
    onOpen("editProfession", {
      user: {
        id,
        position,
        organization,
      },
    });
  };

  if (!isActive) {
    return null;
  }
  return (
    <Button
      variant="outline"
      className="flex items-center m-2"
      onClick={handleClick}
    >
      <PencilIcon className="w-4 h-4 mr-1" /> Edit Title
    </Button>
  );
}
