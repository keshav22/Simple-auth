import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET: string | undefined = process.env.JWT_SECRET;

export interface TokenPayload {
  userId: number;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  if(!SECRET) throw new Error("Secret not defined");
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string): TokenPayload | null {
  if(!SECRET) throw new Error("Secret not defined")
  try {
    return jwt.verify(token, SECRET) as unknown as TokenPayload;
  } catch(e: any) {
    console.log(e);
    return null;
  }
}

export async function authenticateTokenCookie(checkAdmin: boolean = false): Promise<Response | TokenPayload> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return new Response(JSON.stringify({error: 'No token found'}), { status: 401 });
    }

    const tokenPayload = verifyToken(token);

    if (!tokenPayload) {
      return new Response(JSON.stringify({error: 'Token is wrong'}), { status: 401 });
    }

    if(checkAdmin && tokenPayload.role !== "admin") {
      return new Response(JSON.stringify({error: 'Forbidden'}), { status: 403 });
    }

    return tokenPayload;
}