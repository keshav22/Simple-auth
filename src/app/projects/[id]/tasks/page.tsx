"use client";

import { use, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/app/lib/types_interfaces/tasks";
import { useRouter } from "next/navigation";

interface ProjectsPageProps {
  id: string;
}

export default function Tasks({
  params,
}: {
  params: Promise<ProjectsPageProps>;
}) {
  const { id } = use(params);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const router = useRouter();

  useEffect(() => {
    async function getTasks() {
      const resp = await fetch(`/api/tasks?projectId=${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (resp.status == 401) {
        router.replace("/login");
        return;
      }

      const data: { tasks: Task[] } = await resp.json();

      setTasks(data.tasks);
    }

    getTasks();
  }, []);

  const handleDelete = (projectId: number) => {};

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
        <div className="mb-4 text-center text-gray-700">
          <h2 className="text-lg font-semibold">List of Tasks of project id : {id}</h2>
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
            {tasks.map((task: Task) => (
              <TableRow
                key={task.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <TableCell className="font-medium text-gray-800 text-center">
                  {task.id}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {task.title}
                </TableCell>
                <TableCell className="text-gray-500 text-center">
                  {new Date(task.created_at).toDateString()}
                </TableCell>

                <TableCell className="text-center flex justify-center gap-2">
                  <button
                    className="px-3 py-1.5 text-sm rounded-md bg-red-200 text-red-800 hover:bg-red-300 transition cursor-pointer"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
