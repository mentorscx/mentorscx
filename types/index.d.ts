import { User, Session } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export type TSession = {
  session: Session;
  otherUser: Pick<User, "username" | "imageUrl">;
  currentUser: Pick<User, "id" | "role" | "timeZone">;
};

declare module "react-rating" {
  import * as React from "react";

  interface RatingProps {
    initialRating?: number;
    onChange?: (value: number) => void;
    onBlur?: () => void;
    emptySymbol?: React.ReactNode | string;
    fullSymbol?: React.ReactNode | string;
    readonly?: boolean;
    fractions?: number;
    placeholderRating?: number;
    placeholderSymbol?: React.ReactNode | string;
  }

  class Rating extends React.Component<RatingProps> {}
  export default Rating;
}
