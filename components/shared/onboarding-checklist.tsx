import { Check, Square } from "lucide-react";
import { Gauge } from "@suyalcinkaya/gauge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Experience, Expertise, Industry, Tool, User } from "@prisma/client";
import { OnboardingChecklistActions } from "@/components/shared/onboarding-checklist-actions";
import { db } from "@/lib/db";
import { Button } from "../ui/button";
import OnboardingProgressBar from "./onboarding-progress";

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
    <div className="flex items-center text-base">
      {isChecked ? (
        <Check className="w-5 h-5 mr-2 text-emerald-400" />
      ) : (
        <Square className="w-5 h-5 mr-2 text-white" />
      )}
      <span
        className={cn(isChecked ? "text-slate-500 line-through" : "text-white")}
      >
        {text}
      </span>
    </div>
    {!isChecked && (
      <OnboardingChecklistActions
        dataType={dataType}
        route={route}
        profileId={profileId}
      />
    )}
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

  const profileCompletionChecks: boolean[] = [
    hasBio,
    hasExpertise,
    hasIndustries,
    hasProfession && hasOrganization,
    hasSessions,
  ];

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
      label: "Add your Expertise",
      dataType: "expertise",
    },
    {
      isChecked: hasIndustries,
      label: "Add your Industry",
      dataType: "industry",
    },
    {
      isChecked: hasSessions,
      label: "Add your availability",
      dataType: "availability",
    },
  ];

  if (completionPercentage === 100) return null;

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
                <div>
                  <p className="text-base">
                    Complete your account to activate your profile
                  </p>
                </div>
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
