"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { LinkedinShareButton } from "react-share";
interface LinkedInShareButtonProps {
  property: any;
}

export const LinkedInShareButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button variant="outline" size="sm" className="w-[150px] md:w-fit">
        Share on Linkedin
      </Button>
    );
  }

  const shareUrl = `https://mentorscx.vercel.app/`;

  //TODO:  Take care of layouts in the medium screen
  return (
    <>
      <LinkedinShareButton
        url={shareUrl}
        title="TODO: title"
        summary="TODO: summary"
      >
        <Button variant="outline" size="sm" className="w-[150px] md:w-fit">
          Share on Linkedin
        </Button>
      </LinkedinShareButton>
    </>
  );
};
