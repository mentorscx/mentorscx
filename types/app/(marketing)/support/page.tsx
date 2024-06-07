import type { Metadata } from "next";
import React from "react";

import SupportForm from "./_components/support-form";

export const metadata: Metadata = {
  title: "Support Center | Mentors CX",
  description:
    "Need help? Visit the Mentors CX Support Center for assistance with your mentorship journey and platform questions.",
};

const SupportPage = () => {
  return (
    <main>
      <SupportForm />
    </main>
  );
};

export default SupportPage;
