"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const scrollToElement = (
  elementId: string,
  offset: number = 0
): void => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const ProfileLinks = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToElement(id, 80); // Adjust the offset value as needed
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-3xl mx-auto p-3 flex-wrap gap-4">
      <Button variant="link">
        <Link
          href="#bio"
          className="text-lg"
          onClick={(e) => handleScroll(e, "bio")}
        >
          Bio
        </Link>
      </Button>
      <Button variant="link">
        <Link
          href="#experience"
          className="text-lg"
          onClick={(e) => handleScroll(e, "experience")}
        >
          Experience
        </Link>
      </Button>
      <Button variant="link">
        <Link
          href="#expertise"
          className="text-lg"
          onClick={(e) => handleScroll(e, "expertise")}
        >
          Expertise
        </Link>
      </Button>
      <Button variant="link">
        <Link
          href="#industry"
          className="text-lg"
          onClick={(e) => handleScroll(e, "industry")}
        >
          Industry
        </Link>
      </Button>
      <Button variant="link">
        <Link
          href="#toolkit"
          className="text-lg"
          onClick={(e) => handleScroll(e, "toolkit")}
        >
          Toolkit
        </Link>
      </Button>
      <Button variant="link">
        <Link href="#reviews" className="text-lg">
          Reviews
        </Link>
      </Button>
    </div>
  );
};

export default ProfileLinks;
