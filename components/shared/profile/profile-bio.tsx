import React from "react";
import { EditBioAction } from "./edit-profile-action";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SelectSeparator } from "@/components/ui/select";

interface ProfileBioPageProps {
  canEdit: boolean;
  id: string;
  bio: string | null;
  dataType: string;
}
const ProfileBioPage = ({
  canEdit,
  id,
  bio,
  dataType,
}: ProfileBioPageProps) => {
  return (
    <div id="bio">
      <Card className="max-w-4xl mx-auto mt-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h3 className="text-xl">Bio</h3>
            {canEdit && <EditBioAction id={id} bio={bio} dataType={dataType} />}
          </CardTitle>
        </CardHeader>

        <Separator className="mb-3" />

        <CardContent>
          {!bio || bio?.length === 0 ? (
            <div className="flex justify-center items-center flex-col gap-4">
              <Image
                src="/no_data.svg"
                alt="avatar"
                width={100}
                height={100}
                className="object-cover"
              />
              <p className="text-muted-foreground text-sm">
                Share a bit about yourself 🙂
              </p>
            </div>
          ) : (
            <p className="text-base text-slate-800 whitespace-pre-line">
              {bio}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBioPage;
