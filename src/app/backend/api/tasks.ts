import { supabase } from "../supabase";

export async function getAllTasksForProject(userId: number, projectId: number) {
  const { data: project, error: errorProject } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("owner_id", userId)
    .single();

  if (errorProject || !project) {
    return { error: "Project not accisible", status: 403 };
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("id, title, status, created_at")
    .eq("project_id", projectId);

  if (error || !tasks) {
    return { error: "Tasks not found", status: 404 };
  }

  return {
    tasks,
    status: 200,
  };
}

export async function getAllTasksForProjectAdmin(projectId: number) {
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("id, title, status, created_at")
    .eq("project_id", projectId);

  if (error || !tasks) {
    return { error: "Tasks not found", status: 404 };
  }

  return {
    tasks,
    status: 200,
  };
}
