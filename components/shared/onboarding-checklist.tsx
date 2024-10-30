import { Check, Square, ChevronRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import {
  Experience,
  Expertise,
  Industry,
  Role,
  Tool,
  User,
} from "@prisma/client";
import { OnboardingChecklistActions } from "@/components/shared/onboarding-checklist-actions";
import { db } from "@/lib/db";

import OnboardingProgressBar from "./onboarding-progress";
import OnboardingCompleteButton from "./onboarding-complete-button";

type OnboardingChecklistProps = {
  user: User & {
    industries: Industry[];
    expertise: Expertise[];
    toolkit: Tool[];
    experiences: Experience[];
  };
  route?: string;
};

const ChecklistItem = ({
  isChecked,
  text,
  dataType,
  route,
  profileId,
}: {
  isChecked: boolean;
  text: string;
  dataType: string;
  route?: string;
  profileId: string;
}) => (
  <li className="flex items-center">
    <OnboardingChecklistActions
      dataType={dataType}
      route={route}
      profileId={profileId}
      isChecked={isChecked}
    >
      <div className="flex items-center text-base">
        {isChecked ? (
          <Check className="w-5 h-5 mr-2 text-emerald-400" />
        ) : (
          <Square className="w-5 h-5 mr-2 text-white" />
        )}
        <span
          className={cn(
            isChecked ? "text-slate-500 line-through" : "text-white",
            "text-base"
          )}
        >
          {text}
        </span>
        {!isChecked && <ChevronRight className="w-5 h-5 ml-2 text-base" />}
      </div>
    </OnboardingChecklistActions>
  </li>
);

export async function OnboardingChecklist({
  user,
  route,
}: OnboardingChecklistProps) {
  if (!user) return null;

  const sessionCount = await db.event.count({
    where: {
      userId: user.id,
    },
  });

  const hasSessions: boolean =
    sessionCount > 0 || user.weeklyAvailability !== null;
  const hasBio: boolean = Boolean(user.bio);
  const hasExpertise: boolean = user.expertise.length > 0;
  const hasIndustries: boolean = user.industries.length > 0;

  const hasProfession: boolean = Boolean(user.position);
  const hasOrganization: boolean = Boolean(user.organization);
  const hasMeetingLink: boolean = Boolean(user.googleMeetLink || user.zoomLink);
  const hasShortBio: boolean = Boolean(user.shortBio);

  let profileCompletionChecks: boolean[] = [
    hasBio,
    hasExpertise,
    hasIndustries,
    hasProfession && hasOrganization,
  ];

  // If route is mentor, add hasSessions and hasMeetingLink to the checklist
  if (route === "/mentor/dashboard") {
    profileCompletionChecks.push(hasSessions, hasMeetingLink, hasShortBio);
  }

  const completedItemsCount: number =
    profileCompletionChecks.filter(Boolean).length;
  const totalItemsCount: number = profileCompletionChecks.length;
  const completionPercentage: number = Math.round(
    (completedItemsCount / totalItemsCount) * 100
  );

  // List of all profile completion checks
  const checklist = [
    { isChecked: hasBio, label: "Add your Bio", dataType: "bio" },
    {
      isChecked: hasProfession && hasOrganization,
      label: "Add your current role",
      dataType: "profession",
    },
    {
      isChecked: hasExpertise,
      label: "Add your expertise",
      dataType: "expertise",
    },
    {
      isChecked: hasIndustries,
      label: "Add your industry",
      dataType: "industry",
    },
  ];

  // Only add these checklist items for mentors
  if (route === "/mentor/dashboard") {
    checklist.push(
      {
        isChecked: hasSessions,
        label: "Add your availability",
        dataType: "availability",
      },
      {
        isChecked: hasMeetingLink,
        label: "Add your meeting link",
        dataType: "meeting",
      },
      {
        isChecked: hasShortBio,
        label: "Add your short Bio",
        dataType: "shortBio",
      }
    );
  }

  if (completionPercentage === 100 && user.isActivated) return null;
  else if (completionPercentage === 100 && !user.isActivated)
    return (
      <section>
        <Card className="mt-4">
          <CardHeader className="w-full flex flex-row items-center justify-start gap-4">
            <OnboardingProgressBar
              completionPercentage={completionPercentage}
            />
            <div className="space-y-2">
              <p>
                Hurray! You have competed the profile, Click below to activate
                your profile
              </p>
              <OnboardingCompleteButton
                userId={user.id}
                isActivated={user.isActivated}
                role={user.role ?? Role.MENTEE}
              />
            </div>
          </CardHeader>
        </Card>
      </section>
    );

  return (
    <section>
      <Card className=" bg-blue-950 text-white mt-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <CardHeader>
              <AccordionTrigger className="w-full flex items-center justify-start gap-4">
                <OnboardingProgressBar
                  completionPercentage={completionPercentage}
                />

                <p className="text-base">
                  Complete your account to activate your profile
                </p>
              </AccordionTrigger>
            </CardHeader>

            <AccordionContent>
              <CardContent>
                <ul className="text-base space-y-3">
                  {checklist.map((item) => {
                    return (
                      <div key={item.label}>
                        <ChecklistItem
                          isChecked={item.isChecked}
                          text={item.label}
                          dataType={item.dataType}
                          route={route}
                          profileId={user.id}
                        />
                      </div>
                    );
                  })}
                </ul>
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </section>
  );
}
