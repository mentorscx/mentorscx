import React from "react";
import { EditBioAction } from "./edit-profile-action";
import { Separator } from "@/components/ui/separator";

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
      <div className="max-w-4xl mx-auto w-full p-3 bg-background mt-4 shadow border rounded-lg">
        <div className="max-w-4xl mx-auto space-y-3 p-3">
          <div className="flex justify-between items-center">
            <h3 className="h3 ml-3">Bio</h3>
            {canEdit && <EditBioAction id={id} bio={bio} dataType={dataType} />}
          </div>
          <hr className="my-3 h-[1px]" />
          <p className="text-base text-slate-800 pl-3">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBioPage;
