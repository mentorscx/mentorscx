"use server";

import { auth } from "@clerk/nextjs";
import { db } from "../db";

export async function getSelfId() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not logged in");
    }
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      select: {
        id: true,
        clerkId: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("GET_SELF_ERROR, " + error);
  }
}

export async function getSelf() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not logged in");
    }
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("GET_SELF_ERROR, " + error);
  }
}

export async function getUsersWithProfileFilters(searchParams: any) {
  try {
    const countryFilter: string = searchParams.countries;
    const languageFilter: string = searchParams.languages;
    const industryFilter: string = searchParams.industries;
    const expertiseFilter: string = searchParams.expertise;
    const toolFilter: string = searchParams.tools;
    const priceFilter: string = searchParams.price;
    const sortFilter: string = searchParams.sort;
    const searchQuery: string = searchParams.search;
    console.log("searchParams", searchParams);

    let query: any = {};
    const filters: any = [];

    if (countryFilter) {
      const countries: string[] = countryFilter.split(",");
      const filter = countries.map((country: string) => ({
        country: {
          equals: country,
        },
      }));

      filters.push(...filter);
    }

    if (languageFilter) {
      const languages: string[] = languageFilter.split(",");
      const filter = languages.map((language: string) => ({
        languages: {
          some: {
            name: {
              equals: language,
            },
          },
        },
      }));

      filters.push(...filter);
    }

    if (industryFilter) {
      const industries: string[] = industryFilter.split(",");
      const filter = industries.map((industry: string) => ({
        industries: {
          some: {
            name: {
              equals: industry,
            },
          },
        },
      }));
      filters.push(...filter);
    }

    if (toolFilter) {
      const tools: string[] = toolFilter.split(",");
      const filter = tools.map((tool: string) => ({
        toolkit: {
          some: {
            name: {
              equals: tool,
            },
          },
        },
      }));

      filters.push(...filter);
    }

    if (expertiseFilter) {
      const expertise: string[] = expertiseFilter.split(",");
      const filter = expertise.map((expert: string) => ({
        expertise: {
          some: {
            name: {
              equals: expert,
            },
          },
        },
      }));
      filters.push(...filter);
    }

    query = {
      ...query,
      AND: filters,
    };

    query = {
      ...query,
      role: {
        equals: "MENTOR",
      },
    };

    // All filters
    if (priceFilter) {
      query = {
        ...query,
        price: {
          ...(priceFilter.match("Free") ? { equals: 0 } : { gt: 0 }),
        },
      };
    }

    // Sort
    let sortBy = {};
    if (sortFilter === "Price: high to low") {
      sortBy = {
        price: "desc",
      };
    } else if (sortFilter === "Price: low to high") {
      sortBy = {
        price: "asc",
      };
    }

    // Search
    let search = {};
    if (searchQuery) {
      search = {
        OR: [
          {
            username: {
              search: searchQuery,
            },
          },
          {
            bio: {
              search: searchQuery,
            },
          },
          {
            shortBio: {
              search: searchQuery,
            },
          },
        ],
      };

      query = {
        ...query,
        ...search,
      };
    }

    const users = await db.user.findMany({
      where: query,
      orderBy: sortBy,
      include: {
        industries: true,
        languages: true,
        toolkit: true,
        expertise: true,
      },
    });

    return users;
  } catch (error) {
    console.log(error);
    throw Error("GET_PROFILES_WITH_FILTERS_ERROR, " + error);
  }
}

export async function getSelfWithEvents() {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error("User not logged in");
    }
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        events: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("GET_SELF_ERROR, " + error);
  }
}

export async function getUserByclerkId(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.log(error);
    throw Error("GET_USER_BY_CLERK_ID_ERROR, " + error);
  }
}

interface IOnboarding01User {
  id: string;
  position: string;
  organization: string;
  shortBio: string;
  bio: string;
  portfolioWebsite: string;
}

export async function updateUserOnboarding01(data: IOnboarding01User) {
  try {
    const { id, position, organization, shortBio, bio, portfolioWebsite } =
      data;
    if (!id) throw new Error("User id is required");

    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        position,
        organization,
        shortBio,
        bio,
        portfolioWebsite,
      },
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR_ONBOARING01, " + error);
  }
}

export async function updateUserOnboarding02(user: any) {
  try {
    const { id } = user;

    if (!id) throw new Error("User id is required");

    const { city, country, languages, role } = user;

    const deleteLanguages = await db.language.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const insertLanguages = await db.language.createMany({
      data: languages.map((language: any) => ({
        name: language.value,
        userId: user.id,
      })),
    });

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        city,
        country,
        role,
      },
    });
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR_ONBOARING02, " + error);
  }
}

interface IOnboarding03User {
  id: string;
  name: string;
  description: string;
}

export async function updateUserOnboarding03(data: IOnboarding03User) {
  try {
    const { id, name, description } = data;
    if (!id) throw new Error("User id is required");

    await db.industry.deleteMany({
      where: {
        userId: id,
      },
    });

    await db.industry.create({
      data: {
        name,
        description,
        userId: id,
        imageUrl: "",
      },
    });
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR_ONBOARING03, " + error);
  }
}

interface IOnboarding04User {
  id: string;
  name: string;
  description: string;
}

export async function updateUserOnboarding04(data: IOnboarding04User) {
  try {
    const { id, name, description } = data;
    if (!id) throw new Error("User id is required");

    await db.expertise.deleteMany({
      where: {
        userId: id,
      },
    });

    await db.expertise.create({
      data: {
        name,
        description,
        userId: id,
        imageUrl: "",
      },
    });
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR_ONBOARING04, " + error);
  }
}

export async function updateUserOnboarding05(values: any) {
  try {
    const { id, toolkit } = values;
    if (!id) throw new Error("User id is required");

    await db.tool.deleteMany({
      where: {
        userId: id,
      },
    });

    await db.tool.createMany({
      data: toolkit.map((tool: any) => ({
        name: tool.value,
        userId: id,
      })),
    });
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR_ONBOARING03, " + error);
  }
}

export async function updateUserOnboarding06(values: any) {
  try {
    const { id, price, duration } = values;
    if (!id) throw new Error("User id is required");

    const updatedUser = await db.user.update({
      where: {
        id: values.id,
      },
      data: {
        price,
        duration,
        isOnboarded: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR_ONBOARING06, " + error);
  }
}

export async function updateUser(user: any) {
  try {
    const { id } = user;

    console.log(user);

    if (!id) throw new Error("User id is required");

    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });
    console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_ERROR, " + error);
  }
}

export async function getAllMentors() {
  try {
    const mentors = await db.user.findMany({
      where: {
        role: "MENTOR" || "BOTH",
      },
    });
    return mentors;
  } catch (error) {
    console.log(error);
    throw Error("GET_ALL_MENTORS_ERROR, " + error);
  }
}

interface IsaveUserReferenceById {
  userId: string;
  recommendedBy: string;
  otherRecommendation?: string;
}

export async function saveUserReferenceById({
  userId,
  recommendedBy,
  otherRecommendation,
}: IsaveUserReferenceById) {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        recommendedBy,
        otherRecommendation,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("SAVE_USER_REFERENCE_ERROR, " + error);
  }
}

interface IsaveUserChallengeById {
  userId: string;
  timeZone?: string;
  meetingPreference?: string;
  meetingURL?: string;
}

export async function saveUserChallengeById({
  userId,
  timeZone,
  meetingPreference,
  meetingURL,
}: IsaveUserChallengeById) {
  try {
    const updateData: {
      timeZone?: string;
      meetingPreference?: string;
      zoomLink?: string | null;
      googleMeetLink?: string | null;
    } = {
      timeZone,
      meetingPreference,
    };

    if (meetingPreference === "zoom") {
      updateData.zoomLink = meetingURL || null;
    } else if (meetingPreference === "google-meet") {
      updateData.googleMeetLink = meetingURL || null;
    }

    console.log(meetingURL);

    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    return user;
  } catch (error) {
    console.error("Error updating user challenge:", error);
    throw new Error("SAVE_USER_CHALLENGE_ERROR, " + error);
  }
}

interface ISaveUserBasicDetailsById {
  userId: string;
  city: string;
  country: string;
  languages: any;
}

export async function saveUserBasicDetailsById({
  userId,
  city,
  country,
  languages,
}: ISaveUserBasicDetailsById) {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        city,
        country,
      },
    });

    await db.language.deleteMany({
      where: {
        userId,
      },
    });

    await db.language.createMany({
      data: languages.map((language: any) => ({
        name: language.value,
        userId,
      })),
    });

    return user;
  } catch (error) {
    console.log(error);
    throw Error("SAVE_USER_BASIC_DETAILS_ERROR, " + error);
  }
}

interface ISaveUserCompanyAndRoleById {
  userId: string;
  company: string | undefined;
  companySize: string | undefined;
  currentRole: string | undefined;
  linkedinProfile: string | undefined;
}

export async function saveUserCompanyAndRoleById({
  userId,
  company,
  companySize,
  currentRole,
  linkedinProfile,
}: ISaveUserCompanyAndRoleById) {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        organization: company,
        companySize,
        position: currentRole,
        linkedinProfile,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    throw Error("SAVE_USER_COMPANY_AND_ROLE_ERROR, " + error);
  }
}

interface IUpdateProfessionalUserByClerkId {
  companyName: string;
  companySize: string;
  role: string;
  linkedinProfile: string;
}

export async function updateProfessionalUserByClerkId(
  clerkId: string,
  data: IUpdateProfessionalUserByClerkId
) {
  try {
    const user = await db.user.update({
      where: {
        clerkId,
      },
      data: {
        organization: data.companyName,
        companySize: data.companySize,
        position: data.role,
        linkedinProfile: data.linkedinProfile,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("UPDATE_USER_BY_CLERK_ID_ERROR, " + error);
  }
}

export async function saveDurationPreference(duration: number, id: string) {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        duration: Number(duration),
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("SAVE_DURATION_PREFERENCE_ERROR, " + error);
  }
}

export async function saveMeetingPreference(
  meetingPreference: string,
  id: string
) {
  try {
    const user = await db.user.update({
      where: {
        id,
      },
      data: {
        meetingPreference,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw Error("SAVE_MEETING_PREFERENCE_ERROR, " + error);
  }
}
