import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

const ProfileSkeleton = () => {
  return (
    <div className="pt-16">
      <div className="max-lg:p-3">
        <div className="relative flex flex-col items-center justify-center space-y-3 bg-background rounded border shadow p-3">
          <div className="flex flex-col items-center justify-center">
            {/* Profile Image & Reviews */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-4 items-center justify-center">
                <Skeleton className="h-32 w-32 rounded-full object-cover overflow-hidden" />
                <div></div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-8 w-32"></Skeleton>
                <Skeleton className="h-6 w-48"></Skeleton>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mt-4">
              {/* Location and Joined Date */}
              <div className="flex flex-col items-center lg:flex-row lg:space-x-6 max-lg:space-y-4">
                <Skeleton className="text-base flex items-center h-4 w-32"></Skeleton>
                <Skeleton className="text-base flex items-center h-4 w-32"></Skeleton>
                <Skeleton className="text-base flex items-center h-4 w-32"></Skeleton>
              </div>

              {/* Reviews and Available Information */}
              <Skeleton className="w-fit mx-auto  p-4 px-6 lg:px-12 md:rounded-full ">
                <Skeleton className="flex flex-col items-center space-y-1 lg:flex-row lg:space-x-12 gap-4 invisible">
                  <div className="flex flex-col items-center muted">
                    <div className="flex items-center">
                      <Skeleton className="text-xl font-bold text-black">
                        <span className="invisible">NA</span>
                      </Skeleton>
                    </div>
                    <Skeleton>
                      <span className="invisible">0 reviews</span>
                    </Skeleton>
                  </div>

                  <div className="flex flex-col items-center muted">
                    <Skeleton>
                      <span className="invisible">Free</span>
                    </Skeleton>

                    <Skeleton className="text-sm">
                      <span className="invisible">Price per hour</span>
                    </Skeleton>
                  </div>

                  <div className="flex flex-col items-center muted">
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full font-semibold text-sm">
                      <Skeleton className="text-sm">
                        <span className="invisible">min</span>
                      </Skeleton>
                    </div>
                    <Skeleton>
                      <span className="invisible">Call duration</span>
                    </Skeleton>
                  </div>

                  <div className="flex flex-col items-center muted">
                    <div className="flex items-center">
                      <Skeleton className="text-xl font-bold text-black">
                        <span className="invisible">Soon.</span>
                      </Skeleton>
                    </div>

                    <Skeleton>
                      <span className="invisible">Next Available day </span>
                    </Skeleton>
                  </div>
                </Skeleton>
              </Skeleton>
            </div>
          </div>

          {/* Social and Invites */}
          <div className="lg:h-24 flex flex-col lg:flex-row items-center justify-between w-full mt-8 p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center w-full space-x-3 lg:justify-start">
              <Skeleton className="w-24 h-8"></Skeleton>
              <Skeleton className="w-24 h-8"></Skeleton>
              <Skeleton className="w-24 h-8"></Skeleton>
            </div>

            <Skeleton className="w-24 h-8 mr-4  hidden lg:visible"></Skeleton>

            <div className="max-lg:mt-6 flex items-center justify-center gap-2 mx-auto w-full ">
              <Skeleton className="w-8 h-8"></Skeleton>
              <Skeleton className="w-8 h-8"></Skeleton>
              <Skeleton className="w-8 h-8"></Skeleton>

              <Skeleton className="w-8 h-8 hidden lg:block"></Skeleton>
            </div>
          </div>

          {/* PROFILE LINKS */}
          <div className="flex flex-col lg:flex-row w-full max-w-3xl mx-auto p-3 flex-wrap gap-4 invisible lg:visible">
            <Skeleton className="w-24 h-8 mr-4"></Skeleton>
            <Skeleton className="w-24 h-8 mr-4"></Skeleton>
            <Skeleton className="w-24 h-8 mr-4"></Skeleton>
            <Skeleton className="w-24 h-8 mr-4"></Skeleton>
            <Skeleton className="w-24 h-8 mr-4"></Skeleton>
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 mt-4">
          <Skeleton className="h-48 max-w-3xl w-full mx-auto mt-4"></Skeleton>
          <Skeleton className="h-48 max-w-3xl w-full mx-auto mt-4"></Skeleton>
          <Skeleton className="h-48  max-w-3xl w-full mx-auto mt-4"></Skeleton>
          <Skeleton className="h-48  max-w-3xl w-full mx-auto mt-4"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
