import React from "react";

import { SearchInput } from "./search-input";
import FilterSingleSelect from "@/components/filter-single-select";
import MobileFilters from "@/components/mobile-filters";
import { industryData, languageData } from "@/constants/data";
import { Card } from "@/components/ui/card";

interface Option {
  id?: string;
  value: string;
  label: string;
  name?: string;
}
export interface Country {
  id: string;
  label: string;
  value: string;
}

const sortData: Option[] = [
  {
    value: "asc",
    label: "Price: low to high",
  },
  {
    value: "desc",
    label: "Price: high to low",
  },
  {
    value: "Total sessions",
    label: "Total sessions",
  },
];

const prices: Option[] = [
  {
    id: "Free",
    name: "Free",
    value: "Free",
    label: "Free",
  },
  {
    id: "Paid",
    name: "Paid",
    value: "Paid",
    label: "Paid",
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
    label: "Canada",
    value: "Canada",
  },
  {
    id: "3",
    label: "Mexico",
    value: "Mexico",
  },
  {
    id: "4",
    label: "Afghanistan",
    value: "Afghanistan",
  },
];

const languages: Option[] = [
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
    id: "4",
    label: "Telugu",
    value: "Telugu",
  },
];

const skills: Option[] = [
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
];

const expertise: Option[] = [
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

const industries: Option[] = [
  {
    id: "1",
    label: "Industry1",
    value: "Industry1",
  },
  {
    id: "2",
    label: "Industry2",
    value: "Industry2",
  },
  {
    id: "3",
    label: "Industry3",
    value: "Industry3",
  },
];

type ProfileSearchFiltersProps = {
  tools: Option[];
  industries: Option[];
  expertise: Option[];
  countries: Option[];
  languages: Option[];
};

const ProfileSearchFilters = (props: ProfileSearchFiltersProps) => {
  return (
    <Card className=" max-w-[1100px] md:mx-6 mt-3 md:mt-6 p-3">
      <div className="md:flex items-center justify-between space-y-3">
        <div className="w-full md:w-[400px]">
          <SearchInput />
        </div>
        <div className="flex md:block justify-between items-center p-1 h-fit ">
          <MobileFilters
            languages={props.languages}
            countries={props.countries}
            expertise={props.expertise}
            skills={props.tools}
            prices={prices}
            industries={props.industries}
          />

          <div className="w-[200px]">
            <FilterSingleSelect
              name="Sort"
              valueKey="sort"
              data={sortData}
              displayLabel={false}
              placeholder="Sort by"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileSearchFilters;
