import { supabase } from "../supabase";
import { signToken, TokenPayload } from "../jwt";
import { comparePassword } from "../auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function loginUser(payload: LoginPayload) {
  const { email, password } = payload;

  if (!email || !password) {
    return { error: "Email and password are required", status: 400 };
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, status, password_hash, role")
    .eq("email", email)
    .single();

  if (error || !user) {
    return { error: "User not found", status: 404 };
  }

  if(user.status === "blocked") {
    return { error: "User is blocked", status: 403 };
  }

  const compareResult = await comparePassword(password, user.password_hash);

  if (!compareResult) {
    return { error: "Invalid password", status: 401 };
  }

  const tokenPayload: TokenPayload = { userId: user.id, role: user.role };
  const accessToken = signToken(tokenPayload);

  return {
    accessToken,
    user_data: { role: user.role, email: user.email },
    status: 200,
  };
}
