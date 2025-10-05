import { insertLog } from "@/app/backend/api/logs";
import { unBlockUser } from "@/app/backend/api/users";
import { authenticateTokenCookie } from "@/app/backend/jwt";

export async function POST(request: Request) {
  try {
    const response = await authenticateTokenCookie(true);

    if (response instanceof Response) {
      return response;
    }

    const payload = await request.json();
    if (!payload || !payload.userId) {
      return new Response(JSON.stringify({ error: "payload is wrong" }), {
        status: 400,
      });
    }

    const result = await unBlockUser(payload.userId);

    const ip = request.headers.get("x-real-ip");

    if (result.status == 200) {
      insertLog({
        actor_user_id: response.userId,
        action: "admin.user.unblock",
        entity_type: "user",
        entity_id: payload.userId,
        result: "success",
        ip: ip ?? "",
      });
    } else {
      insertLog({
        actor_user_id: response.userId,
        action: "admin.user.unblock",
        entity_type: "user",
        entity_id: payload.userId,
        result: "fail",
        ip: ip ?? "",
      });
    }

    return new Response(JSON.stringify(result), { status: result.status });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
