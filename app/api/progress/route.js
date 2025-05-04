import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { taskId, userId, completed } = await req.json();

    if (!taskId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing taskId or userId' }),
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      // Create the user first
      await prisma.user.create({
        data: {
          id: userId,
          name: `Anonymous ${userId.substring(0, 6)}`,
        },
      });
    }

    // Upsert: insert if not exists, update if it does
    const progress = await prisma.progress.upsert({
      where: {
        userId_taskId: {
          userId,
          taskId,
        },
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

    return new Response(
      JSON.stringify({ message: 'Progress updated', progress }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
