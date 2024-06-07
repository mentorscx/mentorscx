import { AdminNav, AdminNavLink } from "./_components/AdminNav";
import React from "react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminNav>
        <AdminNavLink href="/admin">Dashboard</AdminNavLink>
        <AdminNavLink href="/admin/mentor/applications">
          Applications
        </AdminNavLink>
      </AdminNav>
      <div className="container my-6">{children}</div>
    </>
  );
}
