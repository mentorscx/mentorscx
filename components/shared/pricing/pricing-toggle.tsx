import React from "react";

interface PricingToggleProps {
  annual: boolean;
  setAnnual: React.Dispatch<React.SetStateAction<boolean>>;
}

const PricingToggle = ({ annual, setAnnual }: PricingToggleProps) => {
  return (
    <div
      className="flex justify-center max-w-xs m-auto mb-16"
      data-aos="zoom-y-out"
      data-aos-delay="300"
    >
      <div className="relative flex w-full mx-6 p-1 bg-gray-200 rounded">
        <span
          className="absolute inset-0 m-1 pointer-events-none"
          aria-hidden="true"
        >
          <span
            className={`absolute inset-0 w-1/2 bg-white rounded shadow transform transition duration-150 ease-in-out ${
              annual ? "translate-x-0" : "translate-x-full"
            }`}
          ></span>
        </span>
        <button
          className={`relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out ${
            !annual && "text-gray-500"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setAnnual(true);
          }}
        >
          Bill Yearly <span className="text-green-500">-20%</span>
        </button>
        <button
          className={`relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out ${
            annual && "text-gray-500"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setAnnual(false);
          }}
        >
          Bill Monthly
        </button>
      </div>
    </div>
  );
};

export default PricingToggle;
