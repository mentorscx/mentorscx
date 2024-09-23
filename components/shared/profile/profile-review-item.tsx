import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import { ShareIcon } from "lucide-react";
import ShareOwnProfile from "./share-my-profile";
import { StarRating } from "../star-rating";

type ProfileSkillItemProps = {
  imageUrl: string;
  username: string;
  feedback: string | undefined;
  id: string;
  canEdit: boolean;
  rating: number | undefined;
};

const ProfileReviewItem = ({
  id,
  imageUrl,
  username,
  feedback,
  canEdit,
  rating,
}: ProfileSkillItemProps) => {
  if (!rating || !feedback) return null;
  return (
    <li className="flex items-start gap-3 md:gap-6 p-3 px-6">
      <div className="w-24 h-24 flex items-start">
        <AspectRatio ratio={16 / 16} className="bg-muted rounded-lg">
          <Image
            src={imageUrl}
            alt="image"
            fill
            className="object-fit overflow-hidden rounded-md"
          />
        </AspectRatio>
      </div>
      <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-start">
        <h4 className="large text-slate-800 ">{username} </h4>
        <StarRating rating={rating} />

        <p className="w-full text-base text-slate-700 whitespace-pre-line mt-2">
          {feedback}
        </p>
      </div>
      <div>
        {canEdit && (
          <Button variant="outline" size="icon">
            <ShareOwnProfile path={`/reviews/${id}`} />
          </Button>
        )}
      </div>
    </li>
  );
};

export default ProfileReviewItem;
