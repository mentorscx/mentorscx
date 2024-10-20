import ProfileList from "./_components/profile-list";
import ProfileFilters from "./_components/profile-filters";
import { getUsersWithProfileFilters } from "@/lib/actions/user.action";
import ProfileSearchFilters from "./_components/profile-search-filters";
import MentorRedirectDialog from "@/components/modals/redirect-mentors-modal";

import type { Metadata } from "next";
import ProfileEmptyList from "./_components/profile-empty-list";

export const metadata: Metadata = {
  title: "Search Mentors | Mentors CX",
  description:
    "Find the perfect mentor for your customer experience needs. Browse our curated list of expert mentors on Mentors CX.",
};

interface Option {
  id: string;
  label: string;
  value: string;
}

interface Column {
  id: string;
  name: string;
}

interface ProfilesPageProps {
  searchParams: {
    countries?: string;
    industries?: string;
    languages?: string;
    tools?: string;
    price?: string;
  };
}

const searchPage = async ({ searchParams }: ProfilesPageProps) => {
  const users = await getUsersWithProfileFilters(searchParams);

  const industriesSet = new Set<string>();
  const expertiseSet = new Set<string>();
  const toolkitSet = new Set<string>();
  const languagesSet = new Set<string>();
  const countriesSet = new Set<string>();

  users.forEach((user) => {
    user.industries?.forEach((industry) => industriesSet.add(industry.name));
    user.expertise?.forEach((exp) => expertiseSet.add(exp.name));
    user.toolkit?.forEach((tool) => toolkitSet.add(tool.name));
    user.languages?.forEach((lang) => languagesSet.add(lang.name));
    if (user.country) countriesSet.add(user.country);
  });

  const createOptions = (set: Set<string>): Option[] =>
    Array.from(set)
      .sort((a, b) => a.localeCompare(b))
      .map((value, index) => ({
        id: (index + 1).toString(),
        label: value,
        value: value,
      }));

  const industryFilters = createOptions(industriesSet);
  const expertiseFilters = createOptions(expertiseSet);
  const toolsFilters = createOptions(toolkitSet);
  const languagesFilters = createOptions(languagesSet);
  const countryFilters = createOptions(countriesSet);

  return (
    <div className="max-w-7xl mx-auto pt-16 px-3">
      <div className="flex">
        <section className="max-w-7xl mt-6 hidden lg:block">
          <ProfileFilters
            tools={toolsFilters}
            industries={industryFilters}
            expertise={expertiseFilters}
            countries={countryFilters}
            languages={languagesFilters}
          />
        </section>
        <div className="w-full">
          <section className="w-full ">
            <ProfileSearchFilters
              tools={toolsFilters}
              industries={industryFilters}
              expertise={expertiseFilters}
              countries={countryFilters}
              languages={languagesFilters}
            />
          </section>
          <section className="mt-6">
            {users.length === 0 && <ProfileEmptyList />}
            {users.length > 0 ? (
              <ProfileList users={JSON.stringify(users)} />
            ) : null}
          </section>
        </div>
      </div>
    </div>
  );
};

export default searchPage;
