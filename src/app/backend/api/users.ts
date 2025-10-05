import { supabase } from "../supabase";

export async function user(userId: number) {

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, role")
    .eq("id", userId)
    .single();

  if (error || !user) {
    return { error: "User not found", status: 404 };
  }

  return {
    user_data: { role: user.role, email: user.email },
    status: 200,
  };
}

export async function getAllUsers(userId: number) {

  const { data: users, error } = await supabase
  .from("users")
  .select("id, email, status")
  .neq("id", userId);

  if (error || !users) {
    return { error: "User not found", status: 404 };
  }

  return {
    users,
    status: 200,
  };
}

export async function blockUser(userId: number) {
  const { error } = await supabase
  .from("users")
  .update({ status: "blocked" })
  .eq("id", userId);

  if (error) {
    return { error: "User not found", status: 404 };
  }

  return {
    status: 200,
  };
}

export async function unBlockUser(userId: number) {
  const { error } = await supabase
  .from("users")
  .update({ status: "active" })
  .eq("id", userId);

  if (error) {
    return { error: "User not found", status: 404 };
  }

  return {
    status: 200,
  };
}
