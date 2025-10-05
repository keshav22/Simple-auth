import { getAllTasksForProject, getAllTasksForProjectAdmin } from "@/app/backend/api/tasks";
import { user } from "@/app/backend/api/users";
import { authenticateTokenCookie } from "@/app/backend/jwt";

export async function GET(request: Request) {
  try {
    const response = await authenticateTokenCookie();

    if (response instanceof Response) {
      return response;
    }

    const { searchParams } = new URL(request.url);

    const projectId = searchParams.get("projectId");

    if (!Number.isInteger(Number(projectId))) {
      return new Response(JSON.stringify({ error: "invalid projectId" }), {
        status: 400,
      });
    }

    let result: any = undefined;

    if (response.role === "admin") {
      result = await getAllTasksForProjectAdmin(Number(projectId));
    }
    else {
      result = await getAllTasksForProject(response.userId, Number(projectId));
    }

    return new Response(JSON.stringify(result), { status: result.status });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
