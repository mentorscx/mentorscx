import { Badge } from "@/components/ui/badge";
import React from "react";

const ProfileExperience = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto p-3 bg-white shadow mt-6">
        <h2 className="h2 ml-3">Experience</h2>

        <div className="mt-3 space-y-3 ml-3 rounded-md border border-gray-200 shadow-sm p-6">
          <div className="flex space-x-3 items-center justify-start">
            <div className="w-16 h-16">
              {" "}
              <img
                src="https://tailwindmix.b-cdn.net/products/product-shoe-01.jpeg"
                alt="product image"
                className="w-16 rounded"
              />
            </div>
            <div>
              <p className="large">Nike Foundation</p>
              <p className="muted !text-lg">Founder</p>
              <p className="muted">September 2018 - present•nike.com</p>
            </div>
          </div>

          <div className="p">
            GrowthMentor spawned out of a desire to scratch my own itch. I
            wanted a better way to connect and talk with people about the kind
            of stuff I was working on.
          </div>

          <div className="space-x-2">
            <Badge variant="outline" className="rounded-full bg-gray-100">
              MarTech
            </Badge>
            <Badge variant="outline" className="rounded-full bg-gray-100">
              EdTech
            </Badge>
          </div>
        </div>
        <div className="mt-3 space-y-3 ml-3 rounded-md border border-gray-200 shadow-sm p-6">
          <div className="flex space-x-3 items-center justify-start">
            <div className="w-16 h-16">
              {" "}
              <img
                src="https://tailwindmix.b-cdn.net/products/product-shoe-02.jpeg"
                alt="product image"
                className="w-16 rounded"
              />
            </div>
            <div>
              <p className="large">VPS Foundation</p>
              <p className="muted !text-lg">Founder</p>
              <p className="muted">September 2018 - 2022.VPS.com</p>
            </div>
          </div>

          <div className="p">
            At VPS I am responsible for creating and managing the execution of
            customer acquisition, engagement and retention strategies.
          </div>

          <div className="space-x-2">
            <Badge variant="outline" className="rounded-full bg-gray-100">
              MarTech
            </Badge>
            <Badge variant="outline" className="rounded-full bg-gray-100">
              EdTech
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileExperience;
