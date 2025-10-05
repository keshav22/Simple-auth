import { NextResponse, type NextRequest } from 'next/server';

export async function logMiddleware(req: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.nextUrl.pathname}`);
  return null;
}
