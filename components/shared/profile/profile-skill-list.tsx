import React from "react";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Industry, Expertise, Tool, Experience } from "@prisma/client";

import AddItemAction from "./add-item-action";
import ProfileSkillItem from "./profile-skill-item";
import { Separator } from "@/components/ui/separator";
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
    <Card className="max-w-4xl mx-auto mt-4">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h3 className="text-xl">{name}</h3>
          {canEdit && <AddItemAction dataType={dataType} />}
        </CardTitle>
      </CardHeader>
      <Separator />
      {data.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-4 my-3">
          <Image src="/no_data.svg" alt="avatar" width={100} height={100} />
          {dataType === "experience" ? (
            <p className="text-muted-foreground text-sm">
              No data yet. Let others know about your experience.
            </p>
          ) : (
            <p className="text-muted-foreground text-sm">No data yet.</p>
          )}
        </div>
      )}

      <section>
        <ul>
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
                <Separator />
              </div>
            ))}
        </ul>
      </section>
    </Card>
  );
};

export default ProfileSkillList;
