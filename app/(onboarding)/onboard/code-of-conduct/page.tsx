"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

const Onboard5Page = () => {
  const router = useRouter();
  const [role, setRole] = React.useState("mentor");

  const handleToggleRole = () => {
    if (role === "mentor") {
      setRole("mentee");
    } else {
      setRole("mentor");
    }
  };

  const handleClick = () => {
    if (role === "mentee") {
      router.push("/pricing");
    } else {
      router.push("/dashboard/search");
    }
  };

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="form-container pt-10">
        <div className="card-block space-y-4">
          {/* Heading */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 justify-start">
              <HeartHandshake className="w-10 h-10" />
              <h3 className="h3">Code of conduct</h3>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="role">Mentor</Label>
              <Switch id="role" onCheckedChange={handleToggleRole} />
              <Label htmlFor="role">Mentee</Label>
            </div>
          </div>
          {/* Body */}
          {role === "mentee" && (
            <div className="bg-secondary-100 p-6 rounded-md">
              <div>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-secondary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Share team inboxes
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-secondary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Deliver instant answers
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-secondary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Manage your team with reports
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-secondary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Connect with customers
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-secondary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Connect the tools you already use
                  </li>
                </ul>
              </div>
            </div>
          )}

          {role === "mentor" && (
            <div className="bg-primary-100 p-6 rounded-md">
              <div>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-primary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Share team inboxes
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-primary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Deliver instant answers
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-primary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Manage your team with reports
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-primary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Connect with customers
                  </li>
                  <li className="flex gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="h-5 w-5  shrink-0 text-primary-500"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    Connect the tools you already use to the mentors
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <Link href="/onboarding/5" className="muted underline">
              Learn more about the code of conduct
            </Link>
            <Button
              type="submit"
              className="rounded-full"
              onClick={handleClick}
            >
              {" "}
              Yes, I agree!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard5Page;
