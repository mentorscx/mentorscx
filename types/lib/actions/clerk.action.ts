import { auth, clerkClient } from "@clerk/nextjs";

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

    if (!clerkResponse || clerkResponse.length === 0) {
      console.error("No OAuth token found for the user");
      return undefined;
    }

    const accessToken = clerkResponse[0]?.token;

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
