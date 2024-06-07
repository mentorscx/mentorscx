import React from "react";
import { notFound, redirect } from "next/navigation";
import { auth, clerkClient } from "@clerk/nextjs";

const AdminPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await clerkClient.users.getUser(userId);
  const isAdmin = user.privateMetadata?.admin;

  if (!isAdmin) {
    throw notFound();
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex items-center justify-center flex-col">
        This is the dashboard!
      </div>
    </div>
  );
};

export default AdminPage;
