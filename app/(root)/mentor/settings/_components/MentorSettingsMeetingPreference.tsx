"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";
import { user } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveMeetingPreference } from "@/lib/actions/user.action";
import { User } from "@prisma/client";

interface MentorSettingsMeetingPreferenceProps {
  user: User;
}

const MentorSettingsMeetingPreference = ({
  user,
}: MentorSettingsMeetingPreferenceProps) => {
  const router = useRouter();

  const [meetingPreference, setMeetingPreference] = useState<string | null>(
    user.meetingPreference
  );

  useEffect(() => {
    setMeetingPreference(meetingPreference);
  }, [meetingPreference]);

  const handleMeetingChange = async (e: any) => {
    try {
      await saveMeetingPreference(e, user.id);

      setMeetingPreference(e);
      toast.success("Meeting Preference updated");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update meeting preference");
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meeting Preference</CardTitle>
        <CardDescription>
          This is used to select the meeting provider during session
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ToggleGroup
          type="single"
          className="flex justify-start gap-4"
          onValueChange={handleMeetingChange}
          defaultValue={meetingPreference || ""}
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
      </CardContent>
    </Card>
  );
};

export default MentorSettingsMeetingPreference;
