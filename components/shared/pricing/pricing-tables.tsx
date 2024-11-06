"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import PricingTable from "@/components/shared/pricing/pricing-table";
import PricingToggle from "@/components/shared/pricing/pricing-toggle";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/constants/data";

import { useSearchParams } from "next/navigation";

export default function PricingTables({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const searchParams = useSearchParams();
  const initialAnnual = searchParams.get("annual") === "true" ?? false;
  const [annual, setAnnual] = useState<boolean>(initialAnnual && true);

  return (
    <section className="bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div
          className={cn(
            "pt-32 pb-12 md:pt-40 md:pb-20",
            !showHeader && "!pt-0"
          )}
        >
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h3 className="h3 mb-4">Plans & pricing</h3>
            <Separator className="mb-3" />
            {showHeader && (
              <>
                <h1 className="h1 mb-4" data-aos="zoom-y-out">
                  Continue growing your career
                </h1>
                <p
                  className="text-xl text-gray-600"
                  data-aos="zoom-y-out"
                  data-aos-delay="150"
                >
                  Our plans are simple, transparent, and fair. Switch at any
                  time.
                </p>
              </>
            )}
          </div>
          <PricingToggle annual={annual} setAnnual={setAnnual} />
          <h2
            className="h4 mb-6 text-center"
            data-aos="zoom-y-out"
            data-aos-delay="150"
          >
            Enroll in any plan and get two extra months on your first purchase.
          </h2>
          <div className="max-w-sm md:max-w-2xl xl:max-w-none mx-auto grid gap-8 md:grid-cols-3 xl:gap-6 items-start">
            {pricingPlans.map((plan) => (
              <PricingTable key={plan.id} plan={plan} annual={annual} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
