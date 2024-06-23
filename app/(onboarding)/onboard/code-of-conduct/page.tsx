"use client";
import React from "react";

import { CheckIcon, HeartHandshake, Loader2Icon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const ConductItem = ({ text }: { text: string }) => (
  <li className="flex items-center gap-4">
    <CheckIcon className="h-5 w-5 shrink-0 text-primary-500" />
    <span> {text}</span>
  </li>
);

const Onboard5Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    router.push("/dashboard/search");
  };

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          <h3 className="h3 flex items-center gap-4 justify-start">
            <HeartHandshake className="w-10 h-10" />
            Code of conduct
          </h3>
          <p className="large">
            A lot of things are obvious and won’t even write them here (like
            respect). But here is a quick reminder of some things to keep in
            mind:
          </p>

          <div className="p-6 rounded-md">
            <ul className="space-y-3">
              <ConductItem
                text="Be attentive and engaged during sessions and aim to contribute
          positively to the conversation."
              />
              <ConductItem
                text="Add to the community’s good vibes by
          being communicating effectively."
              />
              <ConductItem text="Time is precious. Be punctual and prepared for your sessions." />

              <li className="flex items-center gap-4">
                <CheckIcon className="h-5 w-5 shrink-0 text-primary-500" />
                <span>
                  Reflect our shared core{" "}
                  <Link
                    href="https://mentorscx.com/about#core-values"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    values
                  </Link>{" "}
                  on your behavior: community-focused, lifelong learner,
                  humbleness, and own your growth.{" "}
                </span>
              </li>
              <ConductItem
                text="Just be a good human. Be kind, patient, and treat others the best
          way you can."
              />
            </ul>
          </div>
          <div className="flex justify-between ">
            <Link
              href="/onboarding/5"
              target="_blank"
              className="muted underline invisible"
            >
              Learn more about the code of conduct
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleClick}
              className="min-w-[100px] rounded-full"
            >
              {isLoading ? (
                <Loader2Icon className="animate-spin h-4 w-4 mr-1" />
              ) : (
                <CheckIcon className="h-4 w-4 mr-1" />
              )}
              Yes, I agree!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard5Page;
