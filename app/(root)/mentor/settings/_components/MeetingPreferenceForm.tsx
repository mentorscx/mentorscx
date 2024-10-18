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

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveMeetingPreference } from "@/lib/actions/user.action";

interface MentorSettingsMeetingPreferenceProps {
  id: string;
  meetingPreference: string | null;
  zoomLink: string | null;
  googleMeetLink: string | null;
}

const MentorSettingsMeetingPreference = ({
  id,
  meetingPreference: initialMeetingPreference,
  zoomLink,
  googleMeetLink,
}: MentorSettingsMeetingPreferenceProps) => {
  const router = useRouter();

  const [meetingPreference, setMeetingPreference] = useState<
    string | null | undefined
  >(initialMeetingPreference);

  useEffect(() => {
    setMeetingPreference(meetingPreference);
  }, [meetingPreference]);

  const handleMeetingChange = async (e: any) => {
    try {
      if (e === "zoom" && !zoomLink) {
        toast.error("Please add your Zoom link first");
        setMeetingPreference(undefined);
        return;
      } else if (e === "google-meet" && !googleMeetLink) {
        toast.error("Please add your Google Meet link first");
        setMeetingPreference(undefined);
        return;
      }
      // Only update meeting preference after the checks pass
      await saveMeetingPreference(e, id);
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
          This is used to select the meeting provider during session. To add
          your meeting links, go to the{" "}
          <span className="font-semibold text-slate-800">Integrations</span> tab
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ToggleGroup
          type="single"
          className="flex justify-start gap-4"
          onValueChange={handleMeetingChange}
          defaultValue={meetingPreference || undefined}
        >
          <ToggleGroupItem
            value="google-meet"
            aria-label="Toggle underline"
            className="h-10 w-40 border-1 px-3 py-1 font-semibold"
            size="lg"
            disabled={meetingPreference === "google-meet"}
          >
            Google Meet
          </ToggleGroupItem>
          <ToggleGroupItem
            value="zoom"
            aria-label="Toggle underline"
            className="h-10 w-40 px-3 py-1 bg-white border-1 font-semibold"
            size="lg"
            disabled={meetingPreference === "zoom"}
          >
            Zoom
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};

export default MentorSettingsMeetingPreference;
