import ProfileList from "./_components/profile-list";
import ProfileFilters from "./_components/profile-filters";
import { getUsersWithProfileFilters } from "@/lib/actions/user.action";
import ProfileSearchFilters from "./_components/profile-search-filters";

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

const getOptions = (arr: Column[][]) => {
  const flattenedArray: Column[] = ([] as Column[]).concat(...arr);

  // Step 2: Extract the 'name' properties and get unique names
  const uniqueNamesObj: { [key: string]: boolean } = {};
  for (const item of flattenedArray) {
    uniqueNamesObj[item.name] = true;
  }
  const uniqueNames: string[] = Object.keys(uniqueNamesObj);

  // Step 3: Map unique names to the desired structure
  const options: Option[] = uniqueNames.map((name, index) => ({
    id: (index + 1).toString(),
    label: name,
    value: name,
  }));

  return options;
};

const searchPage = async ({ searchParams }: ProfilesPageProps) => {
  const users = await getUsersWithProfileFilters(searchParams);

  const industriesArray = users
    .map((user) => user.industries)
    .filter((industries) => industries.length !== 0);

  const expertiseArray = users
    .map((user) => user.expertise)
    .filter((expertise) => expertise.length !== 0);

  const toolkitArray = users
    .map((user) => user.toolkit)
    .filter((toolkit) => toolkit.length !== 0);

  const languagesArray = users
    .map((user) => user.languages)
    .filter((languages) => languages.length !== 0);

  const countryFilters = users
    .filter((user) => user.country !== null || user.country !== undefined) // Filter out users without a country
    .map((user, index) => ({
      id: (index + 1).toString(),
      label: user.country,
      value: user.country,
    })) as Option[];

  const industryFilters = getOptions(industriesArray);
  const expertiseFilters = getOptions(expertiseArray);
  const toolsFilters = getOptions(toolkitArray);
  const languagesFilters = getOptions(languagesArray);

  return (
    <div className="max-w-7xl mx-auto pt-[80px] px-3">
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
