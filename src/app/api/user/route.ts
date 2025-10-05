import { user } from "@/app/backend/api/users";
import { authenticateTokenCookie } from "@/app/backend/jwt";

export async function GET() {
  try {
    const response = await authenticateTokenCookie();

    if (response instanceof Response) {
      return response;
    }

    const result = await user(response.userId)

    return new Response(JSON.stringify(result), { status: result.status });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
