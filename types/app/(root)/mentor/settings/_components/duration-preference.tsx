"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

import { saveDurationPreference } from "@/lib/actions/user.action";

interface DurationPreferenceProps {
  user: string;
}

const DurationPreference = ({ user }: DurationPreferenceProps) => {
  const router = useRouter();
  const parsedUser = JSON.parse(user);

  const { duration: initialDurationPreference } = parsedUser;

  const [durationPreference, setDurationPreference] = useState(
    initialDurationPreference.toString()
  );

  useEffect(() => {
    setDurationPreference(durationPreference);
  }, [durationPreference]);

  const handleDurationChange = async (e: any) => {
    try {
      await saveDurationPreference(Number(e), parsedUser.id);

      setDurationPreference(e);
      toast.success("Duration Preference updated");
      router.refresh();
    } catch (err) {
      toast.error("Failed to update duration preference");
    }
  };

  return (
    <div className="mt-6 border rounded-md p-4 space-y-4">
      <p className="large">
        Duration Preference{" "}
        <span className="inline md:hidden small">(in min)</span>
      </p>

      <ToggleGroup
        type="single"
        className="flex justify-start gap-4"
        onValueChange={handleDurationChange}
        defaultValue={durationPreference}
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
    </div>
  );
};

export default DurationPreference;
