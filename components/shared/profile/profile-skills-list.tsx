import { Separator } from "@/components/ui/separator";
import React from "react";

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";

interface Props {
  heading: string;
}

export default function ListLeadingImageThreeLines({ heading }: Props) {
  return (
    <div className="max-w-5xl mx-auto w-full m-3 bg-white mt-6">
      <div className="border border-gray-200 shadow p-6">
        {/*<!-- Component: Leading Image Three Line List --> */}
        <h3 className="h3 ml-6">{heading}</h3>
        <Separator className="h-[2px] my-3" />
        <ul className="divide-y divide-slate-100">
          <li className="flex items-start gap-4 px-4 py-3">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindmix.b-cdn.net/products/product-shoe-01.jpeg"
                alt="product image"
                className="w-16 rounded"
              />
            </div>
            <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
              <h4 className="text-base text-slate-700 ">
                Velocity Boost 2023{" "}
              </h4>
              <p className="w-full text-sm text-slate-500">
                Designed for speed and agility, perfect for runners.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 px-4 py-3">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindmix.b-cdn.net/products/product-shoe-02.jpeg"
                alt="product image"
                className="w-16 rounded"
              />
            </div>
            <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
              <h4 className="text-base text-slate-700 ">Gravity Glide v2 </h4>
              <p className="w-full text-sm text-slate-500">
                A shoe for superior cushioning and support.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 px-4 py-3">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindmix.b-cdn.net/products/product-shoe-03.jpeg"
                alt="product image"
                className="w-16 rounded"
              />
            </div>
            <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
              <h4 className="text-base text-slate-700 ">S4 Turbo Charge </h4>
              <p className="w-full text-sm text-slate-500">
                A lightweight shoe for all kinds of athletes.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 px-4 py-3">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindmix.b-cdn.net/products/product-shoe-04.jpeg"
                alt="product image"
                className="w-16 rounded"
              />
            </div>
            <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
              <h4 className="text-base text-slate-700 ">Flex Fit </h4>
              <p className="w-full text-sm text-slate-500">
                Flexible & adaptive support for a range of activities.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 px-4 py-3">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindmix.b-cdn.net/products/product-shoe-05.jpeg"
                alt="product image"
                className="w-16 rounded"
              />
            </div>
            <div className="flex min-h-[2rem] w-full min-w-0 flex-col items-start justify-center gap-0">
              <h4 className="text-base text-slate-700 ">Endurance Pro </h4>
              <p className="w-full text-sm text-slate-500">
                A durable shoe that is built to last and long-distance.
              </p>
            </div>
          </li>
        </ul>
      </div>
      {/*<!-- End Leading Image Three Line List --> */}
    </div>
  );
}
