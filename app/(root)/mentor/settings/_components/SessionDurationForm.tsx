"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

import { saveDurationPreference } from "@/lib/actions/user.action";
import { User } from "@prisma/client";

interface SessionDurationProps {
  id: string;
  durationPreference: number | null;
}

const SessionDuration = ({
  id,
  durationPreference: initialDuartionPreference,
}: SessionDurationProps) => {
  const router = useRouter();

  const [durationPreference, setDurationPreference] = useState(
    initialDuartionPreference?.toString()
  );

  useEffect(() => {
    setDurationPreference(durationPreference);
  }, [durationPreference]);

  const handleDurationChange = async (e: any) => {
    try {
      await saveDurationPreference(Number(e), id);

      setDurationPreference(e);
      toast.success("Duration Preference updated");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update duration preference");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Duration</CardTitle>
        <CardDescription>This is used to set session duration</CardDescription>
      </CardHeader>

      <CardContent>
        <ToggleGroup
          type="single"
          className="flex justify-start gap-4"
          onValueChange={handleDurationChange}
          defaultValue={initialDuartionPreference?.toString()}
        >
          <ToggleGroupItem
            value="15"
            aria-label="Toggle underline"
            size="lg"
            className="border"
          >
            15<span className="hidden md:block">min</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="30"
            aria-label="Toggle underline"
            size="lg"
            className="border"
          >
            30<span className="hidden md:block">min</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="45"
            aria-label="Toggle underline"
            size="lg"
            className="border"
          >
            45<span className="hidden md:block">min</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="60"
            aria-label="Toggle underline"
            size="lg"
            className="border"
          >
            60<span className="hidden md:block">min</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </CardContent>
    </Card>
  );
};

export default SessionDuration;
