import { getAllProjectsForAdmin, getAllProjectsForUser } from "@/app/backend/api/projects";
import { authenticateTokenCookie } from "@/app/backend/jwt";

export async function GET(request: Request) {
  try {
    const response = await authenticateTokenCookie();

    if (response instanceof Response) {
      return response;
    }
    
    let result: any = undefined;
    const url = new URL(request.url);

    const userId = url.searchParams.get('userId'); 
    if(response.role == "admin") {
        result = await getAllProjectsForAdmin(Number(userId));
    }
    else {
        result = await getAllProjectsForUser(response.userId);
    }
    

    return new Response(JSON.stringify(result), { status: result.status });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
