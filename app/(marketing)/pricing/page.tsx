import type { Metadata } from "next";

import PricingDiscount from "@/components/home/pricing-discount";
import PricingTables from "@/components/home/pricing-table";

export const metadata: Metadata = {
  title: "Pricing | Mentors CX",
  description:
    "Explore our flexible pricing plans. Choose the right mentorship subscription to access top customer experience professionals.",
};

export default function Pricing() {
  return (
    <>
      <PricingTables />
      <div className="m-3 sm:mb-6">
        <PricingDiscount />
      </div>
    </>
  );
}
