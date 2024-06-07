import React from "react";

const OnboardingLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <section className="min-h-screen">{children}</section>;
};

export default OnboardingLayout;
