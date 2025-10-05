import { Log } from "@/app/lib/types_interfaces/log";
import { supabase } from "../supabase";

export async function insertLog(log: Log) {
  const { error } = await supabase
    .from("audit_logs")
    .insert([
      log
    ]);

    console.log(error);
  if (error) {
    return { error: error.message, status: 500 };
  }

  return {
    status: 201
  };
}

export async function getAlllogs(userId: number) {

  const { data: logs, error } = await supabase
  .from("audit_logs")
  .select("*");

  if (error || !logs) {
    return { error: "Logs not found", status: 404 };
  }

  return {
    logs,
    status: 200,
  };
}


