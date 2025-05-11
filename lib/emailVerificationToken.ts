import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '@/lib/logger';

export const createVerificationToken = async (userId: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes expiry

  await prisma.verificationToken.deleteMany({
    where: { userId },
  });

  try {
    await prisma.verificationToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    logger.info(`Created verification token for user ${userId}`);
    return token;
  } catch (error) {
    logger.error('Failed to create verification token', error);
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const record = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!record || record.expiresAt < new Date()) {
      logger.info(`Invalid or expired token: ${token}`);
      return null;
    }

    await prisma.user.update({
      where: { id: record.userId },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({ where: { token } });
    logger.info(`Email verified for user with token ${token}`);

    return true;
  } catch (error) {
    logger.error('Error verifying token', error);
    return null;
  }
};
