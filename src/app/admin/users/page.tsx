"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserData } from "@/app/lib/types_interfaces/user";
import { Project } from "@/app/lib/types_interfaces/project";
import { useRouter } from "next/navigation";

export default function AdminUsers() {
  const [users, setUsers] = useState<Array<UserData>>([]);

  const router = useRouter();

  useEffect(() => {
    async function getAllUsers() {
      const resp = await fetch("/api/admin/users", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (resp.status === 401) {
        router.replace("/login");
        return;
      }

      if (resp.status == 403) {
        // add a route and trasition showing forbidden
      }

      const data: { users: UserData[] } = await resp.json();

      setUsers(data.users);
    }

    getAllUsers();
  }, []);

  const handleBlock = async (userId: number) => {
    const res = await fetch(`/api/admin/user/block`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      return;
    }

    const userIndex = users.findIndex((user: UserData) => user.id === userId);
    users[userIndex].status = "blocked";

    setUsers([...users]);
  };

  const handleUnBlock = async (userId: number) => {
    const res = await fetch(`/api/admin/user/unblock`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (!res.ok) {
      return;
    }

    const userIndex = users.findIndex((user: UserData) => user.id === userId);
    users[userIndex].status = "active";

    setUsers([...users]);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
        <Table className="w-full text-center">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="w-[100px] text-center">ID</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user: UserData) => (
              <TableRow
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <TableCell className="font-medium text-gray-800 text-center">
                  {user.id}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {user.email}
                </TableCell>
                <TableCell className="text-gray-500 text-center">
                  {user.status}
                </TableCell>
                <TableCell className="text-center flex justify-center gap-2">
                  <button
                    className="px-3 py-1.5 text-sm rounded-md bg-red-200 text-red-800 hover:bg-red-300 transition cursor-pointer"
                    onClick={() => {
                      if (user.status == "active") {
                        handleBlock(user.id!);
                      } else {
                        handleUnBlock(user.id!);
                      }
                    }}
                  >
                    {user.status === "active" ? "Block" : "Unblock"}
                  </button>

                  <Link
                    href={`/admin/users/${user.id}/projects`}
                    className="px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition inline-flex items-center justify-center"
                  >
                    Projects
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
