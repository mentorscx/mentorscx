"use client";
import { Share2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { env } from "@/env";

import { useModal } from "@/hooks/use-modal-store";

type ShareOwnProfileProps = {
  path: string;
  title: string;
};

const ShareOwnProfile = ({ path, title }: ShareOwnProfileProps) => {
  const { onOpen } = useModal();

  const url = env.NEXT_PUBLIC_WEBSITE_URL + path;

  const handleClick = () => {
    onOpen("socialShare", {
      socialShare: {
        url,
      },
    });
  };
  return (
    <div>
      <Button variant="secondary" onClick={handleClick}>
        {title}
        <Share2Icon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

// Ensure you export the component
export default ShareOwnProfile;
