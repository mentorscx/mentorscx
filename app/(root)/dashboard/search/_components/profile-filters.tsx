import FilterMultiSelect from "@/components/filter-multi-select";
import FilterSingleSelect from "@/components/filter-single-select";
import Filter from "@/components/filter-button";

import React from "react";
import { Card } from "@/components/ui/card";

export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Size {
  id: number;
  name: string;
  value: string;
}

export interface Price {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}

export interface Country {
  id: string;
  label: string;
  value: string;
}

export interface Language {
  id: string;
  label: string;
  value: string;
}

export interface Industry {
  id: string;
  label: string;
  value: string;
}

const prices: Price[] = [
  {
    id: "Free",
    name: "Free",
    value: "Free",
  },
  {
    id: "Paid",
    name: "Paid",
    value: "Paid",
  },
];

const sizes: Size[] = [
  {
    id: 1,
    name: "Small",
    value: "sm",
  },
  {
    id: 2,
    name: "Medium",
    value: "md",
  },
  {
    id: 3,
    name: "Large",
    value: "lg",
  },
];

const colors: Color[] = [
  {
    id: "1",
    name: "Red",
    value: "red",
  },
  {
    id: "2",
    name: "Blue",
    value: "blue",
  },
  {
    id: "3",
    name: "Green",
    value: "green",
  },
];

const countries: Country[] = [
  {
    id: "1",
    label: "United States",
    value: "United States",
  },
  {
    id: "2",
    label: "Turkey",
    value: "Turkey",
  },
  {
    id: "3",
    label: "Germany",
    value: "Germany",
  },
  {
    id: "4",
    label: "India",
    value: "India",
  },
];

const products: any[] = [];

const languages: Language[] = [
  {
    id: "1",
    label: "English",
    value: "English",
  },
  {
    id: "2",
    label: "Spanish",
    value: "Spanish",
  },
  {
    id: "3",
    label: "French",
    value: "French",
  },
  {
    id: "3",
    label: "Telugu",
    value: "Telugu",
  },
];

const industries: Industry[] = [
  {
    id: "1",
    label: "Automotive",
    value: "Automotive",
  },
  {
    id: "2",
    label: "Ecommerce",
    value: "Ecommerce",
  },
  {
    id: "3",
    label: "Biotechnology",
    value: "Biotechnology",
  },
];

interface Skill {
  id: string;
  label: string;
  value: string;
}

const skills: Skill[] = [
  {
    id: "1",
    label: "HelpScout",
    value: "HelpScout",
  },
  {
    id: "2",
    label: "Zendesk",
    value: "Zendesk",
  },
  {
    id: "3",
    label: "Freshdesk",
    value: "Freshdesk",
  },
  {
    id: "4",
    label: "Talkdesk",
    value: "Talkdesk",
  },
];

const expertise: Skill[] = [
  {
    id: "1",
    label: "Building a Team",
    value: "Building a Team",
  },
  {
    id: "2",
    label: "Remote Work",
    value: "Remote Work",
  },
  {
    id: "3",
    label: "User Experience (UX) Design",
    value: "User Experience (UX) Design",
  },
];

interface Option {
  id: string;
  label: string;
  value: string;
}

type ProfileFilters = {
  tools: Option[];
  industries: Option[];
  expertise: Option[];
  countries: Option[];
  languages: Option[];
};

const ProfileFilters = (props: ProfileFilters) => {
  return (
    <Card className="min-h-screen w-[250px]">
      <div className="hidden lg:block px-3">
        <FilterSingleSelect
          valueKey="countries"
          name="Country"
          data={props.countries}
        />
        <FilterMultiSelect
          valueKey="languages"
          name="Languages"
          data={props.languages}
        />
        <FilterMultiSelect
          valueKey="industries"
          name="Industries"
          data={props.industries}
        />
        <FilterMultiSelect
          valueKey="expertise"
          name="Expertise"
          data={props.expertise}
        />
        <FilterMultiSelect valueKey="tools" name="Tools" data={props.tools} />
        <Filter data={prices} name="Price" valueKey="price" />
      </div>
    </Card>
  );
};

export default ProfileFilters;
