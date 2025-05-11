'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '@/lib/email';
import { createVerificationToken } from '@/lib/emailVerificationToken';

export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { success: false, message: 'User already exists. Please sign in.' };
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = await createVerificationToken(user.id);
  await sendVerificationEmail(user.email!, token);

  return {
    success: true,
    message:
      'Account created successfully. Please verify your email to continue.',
  };
}
