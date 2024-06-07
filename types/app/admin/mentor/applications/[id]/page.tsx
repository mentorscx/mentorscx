import React from "react";
import { notFound, redirect } from "next/navigation";

import { auth, clerkClient } from "@clerk/nextjs";

import { db } from "@/lib/db";
import {
  AcceptApplicationButton,
  RejectApplicationButton,
} from "../../_components/application-actions";

type TMentorApplicationPageProps = {
  params: {
    id: string;
  };
};

type TFieldDisplay = { label: string; value: string };

const fields = [
  { label: "First Name", key: "firstname" },
  { label: "Last Name", key: "lastname" },
  { label: "Email", key: "email" },
  { label: "LinkedIn URL", key: "linkedinUrl" },
  { label: "Has Enough Experience", key: "hasEnoughExperience" },
  { label: "Current Position", key: "currentPosition" },
  { label: "Motivation", key: "motivation" },
  { label: "Anticipated Session Rate", key: "anticipatedSessionRate" },
  { label: "Financial Motivation Factor", key: "financialMotivationFactor" },
  { label: "Fee Policy Acceptance", key: "feePolicyAcceptance" },
  { label: "Prefer Video Sharing", key: "preferVideoSharing" },
  { label: "Weekly Sessions", key: "weeklySessions" },
  { label: "Prior Mentorship Experience", key: "priorMentorshipExperience" },
  { label: "Profile Statement", key: "profileStatement" },
  {
    label: "Description Customer Experience",
    key: "descriptionCustomerExperience",
  },
  { label: "Challenge Solved", key: "challengeSolved" },
  { label: "Interests", key: "interests" },
  { label: "Application Status", key: "applicationStatus" },
  { label: "Application Notes", key: "applicationNotes" },
] as const;

// Component to display each field
const FieldDisplay = ({ label, value }: TFieldDisplay) => {
  if (value === "NA") {
    return null;
  }
  return (
    <div className="border border-slate-300 p-3 md:px-6 space-y-2 rounded">
      <h3 className="text-2xl font-bold text-slate-900">{label}</h3>
      <p className="text-base">{value}</p>
    </div>
  );
};

const MentorApplicationPage = async ({
  params,
}: TMentorApplicationPageProps) => {
  const { id } = params;

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await clerkClient.users.getUser(userId);
  const isAdmin = user.privateMetadata?.admin;

  if (!isAdmin) {
    throw notFound();
  }

  const application = await db.mentorApplication.findUnique({
    where: {
      id: Number(id) || undefined,
    },
  });

  if (!application) {
    return <div>Application not found</div>;
  }

  console.log(application);

  return (
    <div className="max-w-5xl mx-auto px-3 md:px-6 ">
      {/* Application fields */}
      <section className="space-y-4">
        {fields.map((field) => (
          <FieldDisplay
            key={field.key}
            label={field.label}
            value={application[field.key]?.toString() || "NA"}
          />
        ))}
      </section>

      {/* Accept and Reject buttons */}
      <div className="flex items-center justify-center gap-4 mt-8 border-slate-400 px-6 py-3 border-1 rounded">
        {application.applicationStatus !== "ACCEPTED" && (
          <AcceptApplicationButton id={application.id} />
        )}
        {application.applicationStatus !== "DECLINED" && (
          <RejectApplicationButton id={application.id} />
        )}
      </div>
    </div>
  );
};

export default MentorApplicationPage;
