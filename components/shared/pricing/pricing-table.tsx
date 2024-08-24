import React from "react";

import Checkout from "@/components/shared/Checkout";

export type PricingPlan = {
  id: number;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  buttonLabel: string;
  highlight: boolean;
  comingSoon: boolean;
  monthlyPriceId: string;
  annualPriceId: string;
  credits: number;
};

type PricingTableProps = {
  plan: PricingPlan;
  annual: boolean;
  showPricing?: boolean;
  children?: React.ReactNode;
};

const PricingFeatures = ({ features }: { features: string[] }) => {
  return (
    <ul className="text-gray-600 -mb-2 grow">
      {features.map((feature, index) => (
        <li className="flex items-center mb-2" key={index}>
          <svg
            className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
          </svg>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

const PricingDetails = ({
  plan,
  annual,
  showPricing = true,
}: {
  plan: PricingPlan;
  annual: boolean;
  showPricing?: boolean;
}) => {
  return (
    <div className="mb-4">
      <div className="text-lg font-bold mb-1">{plan.name}</div>
      {showPricing && (
        <div className="inline-flex items-baseline mb-2">
          <span className="text-3xl font-bold">$</span>

          <span className="text-4xl font-bold">
            {annual ? plan.annualPrice : plan.monthlyPrice}
          </span>

          <span className="text-gray-600 pl-2">/month</span>
        </div>
      )}
      <div className="text-lg text-gray-800">{plan.description}</div>
    </div>
  );
};

const PricingHighlightBadge = () => {
  return (
    <div className="absolute top-0 right-0 mr-5 p-3 -mt-5 bg-yellow-500 rounded-full">
      <svg
        className="w-4 h-4 fill-current text-white"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15.145 5.05l-4.316-.627L8.898.513c-.338-.684-1.456-.684-1.794 0l-1.93 3.91-4.317.627a1.002 1.002 0 00-.554 1.707l3.124 3.044-.737 4.3a1 1 0 001.45 1.053L8 13.125l3.862 2.03c.728.381 1.59-.234 1.45-1.054l-.736-4.299L15.7 6.758a1.003 1.003 0 00-.555-1.708z" />
      </svg>
    </div>
  );
};

type CheckoutProps = {
  plan: string;
  amount: number;
  credits: number;
  buyerId?: string;
  planEnabled: boolean;
  priceId: string;
  email?: string;
};

const PricingTable = ({
  plan,
  annual,
  showPricing = true,
  children,
}: PricingTableProps) => {
  return (
    <div
      className={`relative flex flex-col h-full py-5 px-6 rounded shadow-xl border-2 ${
        plan.highlight ? "bg-blue-100 border-blue-500" : "bg-white"
      }`}
      data-aos="zoom-y-out"
      data-aos-delay="450"
    >
      {plan.highlight && <PricingHighlightBadge />}
      <PricingDetails plan={plan} annual={annual} showPricing={showPricing} />
      <PricingFeatures features={plan.features} />

      {showPricing && (
        <Checkout
          plan={plan.name}
          amount={annual ? plan.annualPrice : plan.monthlyPrice}
          credits={plan.credits}
          priceId={annual ? plan.annualPriceId : plan.monthlyPriceId}
          buttonLabel={plan.buttonLabel}
          planEnabled={!plan.comingSoon}
        />
      )}
      {children}
    </div>
  );
};

export default PricingTable;
