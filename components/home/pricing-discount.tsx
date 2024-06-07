import React from "react";
import { Button } from "@/components/ui/button";
import { Book, CircleDollarSign, MapPinned, ArrowDownUp } from "lucide-react";

const PricingDiscount = () => {
  return (
    <div className="max-w-3xl mx-auto flex items-center justify-center ">
      <div
        className="bg-white relative flex flex-col h-full py-5 px-6 rounded shadow-xl border-2 "
        data-aos="zoom-y-out"
        data-aos-delay="450"
      >
        <div className="mb-4">
          <div className="text-lg font-bold mb-1">Get up to 100% off</div>

          <div className="text-lg text-gray-800">Apply for a discount if:</div>
        </div>
        <ul className="text-gray-600 -mb-2 grow">
          <li className="flex items-center mb-2 justify-start">
            <Book className="mr-2" />
            <span>You are a student</span>
          </li>
          <li className="flex items-center mb-2 justify-start">
            <CircleDollarSign className="mr-2" />
            <span>You are part of a non-profit</span>
          </li>
          <li className="flex items-center mb-2 justify-start">
            <MapPinned className="mr-2" />
            <span>You have low income (based on location)</span>
          </li>
          <li className="flex items-center mb-2 justify-start">
            <ArrowDownUp className="mr-2" />
            <span>
              You are changing careers (getting started in the CX space)
            </span>
          </li>
        </ul>
        <div className="border-t border-gray-200 pt-5 mt-6">
          <a
            className="btn-sm text-white bg-blue-600 hover:bg-blue-700 w-full"
            href="https://forms.gle/XdTkWBYvqpyjFojF8"
            target="_blank"
          >
            Apply now 😊
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingDiscount;
