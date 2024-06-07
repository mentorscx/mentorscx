import React from "react";

import Image from "next/image";
import { Industry, Expertise, Tool, Experience } from "@prisma/client";

import AddItemAction from "./add-item-action";
import ProfileSkillItem from "./profile-skill-item";
interface ProfileSkillListProps {
  dataType: string;
  name: string;
  canEdit: boolean;
  data: Industry[] | Expertise[] | Tool[] | Experience[];
}
const ProfileSkillList = ({
  name,
  dataType,
  canEdit,
  data,
}: ProfileSkillListProps) => {
  return (
    <div className="max-w-4xl mx-auto w-full p-3 bg-background mt-4 shadow border rounded-lg">
      <div className="max-w-4xl mx-auto space-y-3 p-3">
        <div className="flex justify-between items-center">
          <h3 className="h3 ml-3">{name}</h3>
          {canEdit && <AddItemAction dataType={dataType} />}
        </div>
        <hr className="my-3 h-[1px]" />

        {data.length === 0 && (
          <div className="flex justify-center items-center flex-col gap-4">
            <Image
              src="/assets/waiting.svg"
              alt="avatar"
              width={100}
              height={100}
            />
            <p>{name} will be added!</p>
          </div>
        )}

        {data.length !== 0 &&
          data.map((industry: Industry) => (
            <div key={industry?.id}>
              <ProfileSkillItem
                imageUrl={industry.imageUrl}
                name={industry.name}
                description={industry.description}
                key={industry.id}
                id={industry.id}
                canEdit={canEdit}
                dataType={dataType}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileSkillList;
