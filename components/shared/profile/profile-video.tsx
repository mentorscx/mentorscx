// components/YouTubeVideo.tsx
import { Card } from "@/components/ui/card";
import React from "react";

interface YouTubeVideoProps {
  videoURL: string;
}

const YouTubeVideo = ({ videoURL }: YouTubeVideoProps) => {
  return (
    <Card className="max-w-4xl mx-auto mt-4 rounded-full">
      <iframe
        className="w-full aspect-video min-h-[200px] md:h-[400px] rounded-lg"
        src={videoURL}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Card>
  );
};

export default YouTubeVideo;
