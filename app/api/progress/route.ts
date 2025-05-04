import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth.config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { taskId, completed } = await req.json();

    if (!taskId) {
      return NextResponse.json({ error: 'Missing taskId' }, { status: 400 });
    }

    const userId = session.user.id;

    // Upsert progress record
    const progress = await prisma.progress.upsert({
      where: {
        userId_taskId: { userId, taskId },
      },
      update: {
        completed,
      },
      create: {
        userId,
        taskId,
        completed,
      },
    });

    return NextResponse.json({ message: 'Progress updated', progress });
  } catch (error) {
    console.error('Progress update failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
