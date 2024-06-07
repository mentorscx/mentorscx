"use client";
import { useState, useEffect } from "react";
import {
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookShareButton,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  LinkedinIcon,
  FacebookIcon,
} from "react-share";

// Define types for the property object
interface Property {
  name?: string;
  description?: string;
  type?: string;
}

// Define the props interface for the ShareButton component
interface ShareButtonProps {
  property: Property;
}

export const ShareButton = ({ property }: ShareButtonProps) => {
  property = {
    name: "MentorsCX",
    description: "MentorsCX is a platform that connects mentors with mentees.",
    type: "Mentorship",
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const shareUrl = `https://mentorscx.vercel.app/`;

  return (
    <>
      <section className="flex gap-3 justify-center py-4">
        <LinkedinShareButton
          url={shareUrl}
          title={property.name}
          summary={property.description}
        >
          <div className="flex flex-col items-center gap-2">
            <LinkedinIcon size={40} round />
            <p className="muted">LinkedIn</p>
          </div>
        </LinkedinShareButton>

        <FacebookShareButton url={shareUrl} hashtag="#MentorsCX">
          <div className="flex flex-col items-center gap-2">
            <FacebookIcon size={40} round />
            <p className="muted">Facebook</p>
          </div>
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type}ForCall`, `Mentorship`]}
        >
          <div className="flex flex-col items-center gap-2">
            <TwitterIcon size={40} round />
            <p className="muted">Twitter</p>
          </div>
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator=":: "
        >
          <div className="flex flex-col items-center gap-2">
            <WhatsappIcon size={40} round />
            <p className="muted">WhatsApp</p>
          </div>
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Check out this property: ${shareUrl}`}
        >
          <div className="flex flex-col items-center gap-2">
            <EmailIcon size={40} round />
            <p className="muted">Email</p>
          </div>
        </EmailShareButton>
      </section>
    </>
  );
};
