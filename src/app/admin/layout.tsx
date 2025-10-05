"use client";

import currentUserService from "@/app/lib/currentUser";
import { useEffect, useState } from "react";
import { UserData } from "../lib/types_interfaces/user";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    currentUserService.getUser().then((value: UserData | null) => {
      setUser(value);
    });
  }, []);

  return (
    <html lang="en">
      <body className="p-4 bg-gray-50 min-h-screen">
        <nav className="flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-3 mb-6">
          <div className="flex gap-4">
            <div className="text-xl font-semibold text-gray-800">Auth App</div>
            <Link
              href={`/admin/users`}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition inline-flex items-center justify-center"
            >
              Users
            </Link>
            <Link
              href={`/admin/logs`}
              className="px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition inline-flex items-center justify-center"
            >
              Logs
            </Link>
            
          </div>

          <div>
            {" "}
            Logged in as <strong>{user?.email} </strong>
          </div>
          <form action="/api/logout" method="post">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </form>
        </nav>

        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
