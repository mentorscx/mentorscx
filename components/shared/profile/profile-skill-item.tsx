import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { id } from "date-fns/locale";

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
    <div>
      <ul className="divide-y divide-slate-100">
        <li className="flex items-start gap-4 px-4 py-3">
          <div className="flex shrink-0 items-center ">
            <Image
              src={imageUrl}
              alt="image"
              width={20}
              height={20}
              className="w-20 object-cover overflow-hidden"
            />
          </div>
          <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-start gap-0">
            <h4 className="large text-slate-800 ">{name} </h4>
            <p className="w-full text-base text-slate-700">{description}</p>
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
      </ul>
    </div>
  );
};

export default ProfileSkillItem;
