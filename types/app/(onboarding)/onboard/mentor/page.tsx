"use client";

import React from "react";
import Link from "next/link";
import { useLocalStorage, useReadLocalStorage, useIsClient } from "usehooks-ts";

import { Button } from "@/components/ui/button";
const OnboardingMentorPage = () => {
  const isClient = useIsClient();

  return (
    <div className="min-h-screen  bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]">
      {/* Form content here */}
      <div className="form-container pt-10 space-y-4 text-slate-700">
        <div className="card-block">
          <h1 className="text-3xl md:text-4xl font-bold">Becoming a mentor</h1>
          <p className="large">
            Here are a few important things you should know before filling out
            the application form.
          </p>
          <ul className="my-6 ml-6 list-decimal [&>li]:mt-2 text-base md:text-lg">
            <li>
              <p>
                Our main differentiator is a thorough “recruiting-like” process
                to keep our platform curated with top mentors.
              </p>
            </li>
            <li>
              <p>
                The best mentors believe in Kaizen, therefore we encourage
                mentors to also be mentees and we provide free session bookings
                (one for one model).
              </p>
            </li>
            <li>
              <p>
                Remember to treat mentees the same way you’d like to be treated
                - it’s key for the health of our community.
              </p>
            </li>
            <li>
              <p>
                If you decide to charge, we suggest keeping your rates
                affordable. Also, we collect 12% of your fee due to processing
                and maintenance.
              </p>
            </li>
            <li>
              <p>
                <>
                  <span>
                    {" "}
                    As a community-first mindset platform, you’ll have to mentor
                    for free until you have four reviews.
                  </span>
                  <Button variant="link" asChild className="text-base px-1">
                    <Link href="/">Read about our GBC philosophy.</Link>
                  </Button>
                </>
              </p>
            </li>
          </ul>

          <p className="large">
            We hope these are aligned with what you were looking for and you’re
            ready to join the best CX leaders who are passionate about sharing
            their knowledge and helping others evolve.{" "}
          </p>
        </div>
      </div>

      {/* Form footer */}
      <div className="form-container mt-4 flex items-center justify-center p-3">
        <Button
          asChild
          className="rounded-full animate-buttonheartbeat"
          size="lg"
        >
          <Link href="/onboard/mentor/1" className="text-base">
            Fill Application
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OnboardingMentorPage;
