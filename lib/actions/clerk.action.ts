import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function getOauthToken(): Promise<string | undefined> {
  try {
    const { userId } = auth();

    if (!userId) {
      console.error("No user ID found");
      return undefined;
    }

    // Define the OAuth provider
    const provider = "oauth_google";

    // Fetch the OAuth access token for the user
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
      userId,
      provider
    );
    if (!clerkResponse || clerkResponse.totalCount === 0) {
      console.error("No OAuth token found for the user");
      return undefined;
    }

    const accessToken = clerkResponse.data[0]?.token;

    if (!accessToken) {
      console.error("Access token is undefined");
      return undefined;
    }

    return accessToken;
  } catch (error) {
    console.error("An error occurred while fetching the OAuth token:", error);
    return undefined;
  }
}

export async function isOnboardingDone(clerkId: string) {
  try {
    const user = await clerkClient.users.getUser(clerkId);
    const isOnboardingDone = user?.publicMetadata?.isOnboardingDone as boolean;
    return isOnboardingDone;
  } catch (error: any) {
    console.error(`User is not onboarded with ID ${clerkId}:`, error);
  }
}

export async function markOnboardingComplete(clerkId: string) {
  try {
    await clerkClient.users.updateUserMetadata(clerkId, {
      publicMetadata: {
        isOnboardingDone: true,
      },
    });
  } catch (error: any) {
    console.error(
      `Failed to mark onboarding complete for ID ${clerkId}`,
      error
    );
    throw new Error("Failed to mark onboarding complete", error);
  }
}

export async function isConnectedWithGoogleEvents() {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return redirect("/signin");
    }

    console.log(clerkUser?.externalAccounts);

    const eventsScopeApproved = clerkUser.externalAccounts?.some((e) =>
      e.approvedScopes.includes(
        "https://www.googleapis.com/auth/calendar.events"
      )
    );

    return eventsScopeApproved;
  } catch (error: any) {
    throw new Error("Failed to connect the calendar");
  }
}
