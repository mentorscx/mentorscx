// components/YouTubeVideo.tsx
import { Card } from "@/components/ui/card";
import React from "react";

interface YouTubeVideoProps {
  videoURL: string | null;
}

const YouTubeVideo = ({ videoURL }: YouTubeVideoProps) => {
  if (videoURL === null) return null;

  return (
    <Card className="max-w-4xl mx-auto mt-4 rounded-full">
      <iframe
        className="w-full aspect-video min-h-[250px] md:h-[480px] rounded-lg"
        src={videoURL}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Card>
  );
};

export default YouTubeVideo;
