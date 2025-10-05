import { loginUser } from "@/app/backend/api/login";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await loginUser(payload);

    if (result.status != 200) {
      return new Response(JSON.stringify(result), {
        status: result.status,
      });
    }

    const response = NextResponse.json({
      user_data: result.user_data,
      success: true,
    });

    response.cookies.set({
      name: "token",
      value: result.accessToken!,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    console.log(result.accessToken);
    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
