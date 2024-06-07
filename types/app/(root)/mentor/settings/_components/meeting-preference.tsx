"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { user } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveMeetingPreference } from "@/lib/actions/user.action";

interface MeetingPreferenceProps {
  user: string;
}

const MeetingPreference = ({ user }: MeetingPreferenceProps) => {
  const router = useRouter();
  const parsedUser = JSON.parse(user);

  const { meetingPreference: initialMeetingPreference } = parsedUser;
  console.log(initialMeetingPreference);

  const [meetingPreference, setMeetingPreference] = useState(
    initialMeetingPreference
  );

  useEffect(() => {
    setMeetingPreference(meetingPreference);
  }, [meetingPreference]);

  const handleMeetingChange = async (e: any) => {
    try {
      await saveMeetingPreference(e, parsedUser.id);

      setMeetingPreference(e);
      toast.success("Meeting Preference updated");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update meeting preference");
    }
  };
  return (
    <div className="mt-6 border rounded-md p-4 space-y-4">
      <p className="large"> Meeting Preference</p>

      <ToggleGroup
        type="single"
        className="flex justify-start gap-4"
        onValueChange={handleMeetingChange}
        defaultValue={meetingPreference}
      >
        <ToggleGroupItem
          value="google-meet"
          aria-label="Toggle underline"
          className="h-20 w-40 border-1 px-3 py-1 large"
          size="lg"
        >
          Google Meet
        </ToggleGroupItem>
        <ToggleGroupItem
          value="zoom"
          aria-label="Toggle underline"
          className="h-20 w-40 px-3 py-1 large bg-white border-1"
          size="lg"
        >
          Zoom
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default MeetingPreference;
