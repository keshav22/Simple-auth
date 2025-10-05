import { NextResponse, type NextRequest } from "next/server";
import { TokenPayload, verifyToken } from "@/app/backend/jwt";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function authMiddleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify<TokenPayload>(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    req.headers.set("x-user-role", payload.role);
    req.headers.set("x-user-id", payload.userId.toString());

    return null;
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
