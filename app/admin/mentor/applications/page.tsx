import Link from "next/link";
import { auth, clerkClient } from "@clerk/nextjs";
import { MoreVertical } from "lucide-react";

import { redirect, notFound } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { db } from "@/lib/db";
import {
  AcceptApplicationDropdownItem,
  RejectApplicationDropDownItem,
} from "../_components/application-actions";

function getMentorApplications() {
  return db.mentorApplication.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      applicationStatus: true,
    },
  });
}

const ApplicationTable = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await clerkClient.users.getUser(userId);
  const isAdmin = user.privateMetadata?.admin;

  if (!isAdmin) {
    throw notFound();
  }
  const applications = await getMentorApplications();

  if (applications.length === 0) {
    return <p>No applications found</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell>{application.firstname}</TableCell>
            <TableCell>{application.lastname}</TableCell>
            <TableCell>{application.email}</TableCell>
            <TableCell>{application?.applicationStatus}</TableCell>
            <TableCell className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="border p-1 border-blue-500 rounded-md">
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/mentor/applications/${application.id}`}>
                      View
                    </Link>
                  </DropdownMenuItem>

                  <AcceptApplicationDropdownItem id={application.id} />
                  <DropdownMenuSeparator />
                  <RejectApplicationDropDownItem id={application.id} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default function MentorsApplicationPage() {
  return (
    <>
      <h1 className="h2 my-4">Mentor Applications</h1>
      <ApplicationTable />
    </>
  );
}
