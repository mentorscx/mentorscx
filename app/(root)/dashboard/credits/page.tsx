import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { plans } from "@/constants/data";
import Checkout from "@/components/shared/Checkout";
import { db } from "@/lib/db";
import { CheckIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const Credits = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    return null;
  }

  return (
    <div className="mt-16 p-3 md:p-6">
      <h2 className="h2-bold text-dark-600">Buy Credits</h2>
      <p className="text-xl text-muted-foreground">
        Choose a credit package that suits your needs!
      </p>

      <section>
        <ul className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-9 xl:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="w-full p-8  lg:max-w-none">
              <div className="flex-center flex-col gap-3">
                {/* <Image src={plan.icon} alt="check" width={50} height={50} /> */}
                <p className="font-semibold text-xl mt-2 text-blue-500">
                  {plan.name}
                </p>
                <p className="h1 text-dark-600">${plan.price}</p>
                <p className="large text-slate-600">{plan.description}</p>
              </div>

              {/* Inclusions */}
              <ul className="flex flex-col gap-5 py-9">
                {plan.inclusions.map((inclusion) => (
                  <li
                    key={plan.name + inclusion.label}
                    className="flex items-center gap-4"
                  >
                    <CheckIcon
                      className={`w-6 h-6 text-green-600 ${
                        !inclusion.isIncluded ? "invisible" : ""
                      }`}
                    />
                    <p>{inclusion.label}</p>
                  </li>
                ))}
              </ul>

              {plan.name === "Free" ? (
                <Button
                  variant="outline"
                  className="w-full rounded-full bg-blue-100 bg-cover text-blue-500 hover:text-blue-500"
                >
                  Free Consumable
                </Button>
              ) : (
                <Checkout
                  plan={plan.name}
                  amount={plan.price}
                  credits={plan.credits}
                  buyerId={user.id}
                  planEnabled={plan.planEnabled}
                  priceId={plan.priceId}
                  email={user.email}
                />
              )}
            </Card>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Credits;
