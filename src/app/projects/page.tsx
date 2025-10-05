"use client";

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
import { UserData } from "../lib/types_interfaces/user";
import { Project } from "../lib/types_interfaces/project";
import { useRouter } from "next/navigation";
import currentUserService from "@/app/lib/currentUser";
import Link from "next/link";

export default function Projects() {
  const [projects, setProjects] = useState<Array<Project>>([]);

  const router = useRouter();

  useEffect(() => {
    async function getProjects() {
      const resp = await fetch("/api/projects", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (resp.status == 401) {
        router.replace("/login");
        return ;
      }

      const data: { projects: Project[] } = await resp.json();

      setProjects(data.projects);
    }

    getProjects();
  }, []);

  const handleDelete = (projectId: number) => {};

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
        <div className="mb-4 text-center text-gray-700">
          <h2 className="text-lg font-semibold">
            List of projects
          </h2>
        </div>

        <Table className="w-full text-center">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="w-[100px] text-center">ID</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Created At</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project: Project) => (
              <TableRow
                key={project.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <TableCell className="font-medium text-gray-800 text-center">
                  {project.id}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {project.name}
                </TableCell>
                <TableCell className="text-gray-500 text-center">
                  {new Date(project.created_at).toDateString()}
                </TableCell>
                

                <TableCell className="text-center flex justify-center gap-2">
                  <button
                    className="px-3 py-1.5 text-sm rounded-md bg-red-200 text-red-800 hover:bg-red-300 transition cursor-pointer"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>

                  <Link
                    href={`/projects/${project.id}/tasks`}
                    className="px-3 py-1.5 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition inline-flex items-center justify-center"
                  >
                    Tasks
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
