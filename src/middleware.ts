import { NextResponse, type NextRequest } from "next/server";
import { authMiddleware } from "./middlewares/authMiddleware";
import { roleMiddleware } from "./middlewares/roleMiddleware";

export async function middleware(req: NextRequest) {

  let response = await authMiddleware(req);
  if (response) {
    if (req.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.next();
    }
    return response;
  }

  response = await roleMiddleware(req);
  if (response) return response;

  const role = req.headers.get('x-user-role');
  if (req.nextUrl.pathname.startsWith('/projects')) {
    if (role == 'admin') {
      return NextResponse.redirect(new URL('/admin/users', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/login')) {
    if (role == 'admin') {
      return NextResponse.redirect(new URL('/admin/users', req.url));
    }
    else {
      return NextResponse.redirect(new URL('/projects', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/admin/:path*", "/projects/:path*", "/api/admin/:path*", "/api/projects/:path*", "/api/tasks/:path*"],
};
