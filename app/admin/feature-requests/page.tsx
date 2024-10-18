import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect, notFound } from "next/navigation";

// Function to fetch feature requests
const fetchFeatureRequests = async () => {
  try {
    const requests = await db.featureRequest.findMany({
      select: {
        description: true,
        user: {
          select: {
            imageUrl: true,
            username: true,
          },
        },
      },
    });
    return requests;
  } catch (err) {
    console.error("Error in FETCH_FEATURE_REQUESTS: ", err);
    return [];
  }
};

// Feature requests component
export default async function FeatureRequests() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await clerkClient.users.getUser(userId);
  const isAdmin = user.privateMetadata?.admin;

  if (!isAdmin) {
    throw notFound();
  }
  const requests = (await fetchFeatureRequests()) || [];

  return (
    <div className="mx-auto p-4 sm:p-6 bg-gradient-to-br min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">
        Feature Requests
      </h1>
      <ScrollArea className="h-[calc(100vh-150px)] px-4 sm:px-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((request, index) => (
            <Card
              key={index}
              className="border-blue-200 shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={
                      request.user.imageUrl ||
                      "/placeholder.svg?height=40&width=40"
                    }
                    alt={request.user.username}
                  />
                  <AvatarFallback>
                    {request.user.username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg font-semibold text-blue-700">
                  {request.user.username}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600 line-clamp-3 transition-all duration-300 ease-in-out">
                  {request.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
