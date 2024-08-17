import { Liveblocks } from "@liveblocks/node";
import { getUserColor } from "@/lib/utils";
import { NextRequest } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(request: NextRequest) {
  // Get the current user's unique id and info from your database
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  const user = {
    id,
    organization: "mentorscx",
    info: {
      id,
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    },
  };

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(id, {
    userInfo: user.info,
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  // TODO: come up with some solution for the Room
  session.allow(`mentorscx`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
