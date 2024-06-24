import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import ProfileItemAction from "./profile-item-action";
import { EXPERTISE, INDUSTRIES, TOOLS, industryData } from "@/constants/data";

interface ProfileSkillItemProps {
  dataType: string;
  imageUrl: string | null;
  name: string;
  description: string;
  id: string;
  canEdit: boolean;
}

const getImage = (label: string, dataType: string) => {
  if (dataType === "expertise") {
    return EXPERTISE.find((item) => item.label === label)?.filePath;
  } else if (dataType === "industry") {
    return industryData.find((item) => item.label === label)?.filePath;
  } else if (dataType === "tool") {
    return TOOLS.find((item) => item.label === label)?.filePath;
  }
};

const ProfileSkillItem = ({
  id,
  imageUrl,
  name,
  description,
  canEdit,
  dataType,
}: ProfileSkillItemProps) => {
  if (!name || !description || !id) {
    return null;
  }

  if (!imageUrl) {
    imageUrl = getImage(name, dataType) || "/planet.png";
  }
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
        <h4 className="large text-slate-800 ">{name} </h4>
        <p className="w-full text-base text-slate-700 whitespace-pre-line">
          {description}
        </p>
      </div>
      <div>
        {canEdit && (
          <ProfileItemAction
            data={{
              id,
              name,
              description,
              imageUrl,
            }}
            dataType={dataType}
          />
        )}
      </div>
    </li>
  );
};

export default ProfileSkillItem;
