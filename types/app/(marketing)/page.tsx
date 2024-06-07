import type { Metadata } from "next";

import Faqs from "@/components/home/faq";
import Clients from "@/components/home/clients";
import CtaHome from "@/components/home/cta-home";
import HeroHome from "@/components/home/HeroHome";
import FeaturesHome from "@/components/home/features-main";
import Companies from "@/components/home/companies";
import News from "./news";

export const metadata: Metadata = {
  title: "Customer Experience Mentorship Platform | Mentors CX",
  description:
    "Join Mentors CX for expert customer experience mentorship. Access top mentors and elevate your CX skills. Start your journey today!",
};

export default async function IndexPage() {
  return (
    <>
      <HeroHome />
      <FeaturesHome />
      <Companies />
      <Clients />
      <News />
      <Faqs />
      <CtaHome />
    </>
  );
}
