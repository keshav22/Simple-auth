import { NextResponse, type NextRequest } from 'next/server';

export async function roleMiddleware(req: NextRequest) {
  const role = req.headers.get('x-user-role');

  if (req.nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return null;
}
