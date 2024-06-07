import type { Metadata } from "next";

import Intro from "./intro";
import LogoStory from "./logo-story";
import HealthValues from "./health-values";
import Story from "./story";
import CoreValues from "./values";

export const metadata: Metadata = {
  title: "About Us | Mentors CX",
  description:
    "Learn about Mentors CX, our story, our values, our health pillars, and our commitment to enhancing customer experience through expert mentorship.",
};

export default function About() {
  return (
    <>
      <Intro />
      <Story />
      <CoreValues />
      <LogoStory />
      <HealthValues />
    </>
  );
}
