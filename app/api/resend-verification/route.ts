import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createVerificationToken } from '@/lib/emailVerificationToken';
import { sendVerificationEmail } from '@/lib/email';
import { normalizeEmail } from '@/lib/validators';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ success: false, message: 'Email is required.' });
  }

  const normalizedEmail = normalizeEmail(email);

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found.' });
  }

  if (user.emailVerified) {
    return NextResponse.json({
      success: false,
      message: 'Email already verified. Please sign in.',
    });
  }

  // Delete existing tokens for this user (for cleanup)
  await prisma.verificationToken.deleteMany({
    where: { userId: user.id },
  });

  // Use the shared token creation function
  const token = await createVerificationToken(user.id);
  await sendVerificationEmail(user.email!, token);

  return NextResponse.json({
    success: true,
    message: 'Verification email sent successfully.',
  });
}
