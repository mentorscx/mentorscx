"use client";
import { Gauge } from "@suyalcinkaya/gauge";
import React from "react";

type OnboardingProgressBarProps = {
  completionPercentage: number;
};

const OnboardingProgressBar = ({
  completionPercentage,
}: OnboardingProgressBarProps) => {
  return (
    <div>
      <Gauge value={completionPercentage} showAnimation showValue />
    </div>
  );
};

export default OnboardingProgressBar;
