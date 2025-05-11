import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/emailVerificationToken';

export async function POST(req: Request) {
  const { token } = await req.json();

  const result = await verifyToken(token);

  if (result) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
