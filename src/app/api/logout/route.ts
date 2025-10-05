import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete('token');

  const response = NextResponse.redirect(new URL('/login', process.env.FE_URL));
  
  return response;
}
