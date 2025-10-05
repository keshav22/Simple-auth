import { supabase } from "../supabase";

export async function getAllProjectsForUser(userId: number) {

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, created_at")
    .eq("owner_id", userId);

  if (error || !projects) {
    return { error: "Projects not found", status: 404 };
  }

  return {
    projects,
    status: 200,
  };
}

export async function getAllProjectsForAdmin(userId: number) {

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, created_at")
    .eq("owner_id", userId);

  if (error || !projects) {
    return { error: "Projects not found", status: 404 };
  }

  return {
    projects,
    status: 200,
  };
}
