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
import { Log } from "@/app/lib/types_interfaces/log";
import { useRouter } from "next/navigation";

export default function Logs() {
  const [logs, setLogs] = useState<Array<Log>>([]);

  const router = useRouter();

  useEffect(() => {
    async function getLogs() {
      const resp = await fetch(`/api/admin/logs`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (resp.status == 401) {
        router.replace("/login");
        return;
      }

      const data: { logs: Log[] } = await resp.json();

      setLogs(data.logs);
    }

    getLogs();
  }, []);

  const handleDelete = (projectId: number) => {};

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6">
        <div className="mb-4 text-center text-gray-700">
          <h2 className="text-lg font-semibold">List of all logs</h2>
        </div>

        <Table className="w-full text-center">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead className="w-[100px] text-center">ID</TableHead>
              <TableHead className="text-center">Action</TableHead>
              <TableHead className="text-center">Actor user id</TableHead>
              <TableHead className="text-center">Entity type</TableHead>
              <TableHead className="text-center">Entity Id</TableHead>
              <TableHead className="text-center">Result</TableHead>
              <TableHead className="text-center">Created at</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log: Log) => (
              <TableRow
                key={log.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <TableCell className="font-medium text-gray-800 text-center">
                  {log.id}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {log.action}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {log.actor_user_id}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {log.entity_type}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {log.entity_id}
                </TableCell>
                <TableCell className="text-gray-700 text-center">
                  {log.result}
                </TableCell>
                <TableCell className="text-gray-500 text-center">
                  {new Date(log.ts!).toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
