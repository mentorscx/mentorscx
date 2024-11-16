import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import PricingTables from "@/components/shared/pricing/pricing-tables";
import { isProUser } from "@/lib/utils";
import { pricingPlans } from "@/constants/data";

import PricingTable from "@/components/shared/pricing/pricing-table";
import ManageSubscriptionButton from "@/components/shared/billing/manage-subscription-button";

const getUserDetails = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      Subscription: true,
    },
  });

  return user;
};

const Credits = async () => {
  const user = await getUserDetails();

  if (!user) {
    return null;
  }

  const currentPlan = pricingPlans.find(
    (plan) =>
      plan.annualPriceId === user.Subscription?.planId ||
      plan.monthlyPriceId === user.Subscription?.planId
  );
  const hasProAccess = isProUser(user?.Subscription);

  if (hasProAccess && currentPlan) {
    return (
      <div className="h-1/2 flex flex-col items-center justify-center pt-32 p-3 space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold ">
          Your current plan!
        </h2>
        <PricingTable
          plan={{
            ...currentPlan,
            highlight: false,
            comingSoon: true,
            buttonLabel: "cool!",
          }}
          annual={false}
          showPricing={false}
          isLoggedIn={true}
        >
          <ManageSubscriptionButton email={user.email} userId={user.id} />
        </PricingTable>
      </div>
    );
  }

  if (hasProAccess) {
    <div className="h-1/2 flex flex-col items-center justify-center pt-32 p-3 space-y-4">
      <h2 className="text-2xl md:text-3xl font-semibold ">
        Your current plan!
      </h2>

      <ManageSubscriptionButton email={user.email} userId={user.id} />
    </div>;
  }

  return <PricingTables showHeader={false} />;
};

export default Credits;
