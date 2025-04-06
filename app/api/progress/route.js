import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { taskId, pseudoUserId, completed } = await req.json();

    if (!taskId || !pseudoUserId) {
      return new Response(
        JSON.stringify({ error: 'Missing taskId or pseudoUserId' }),
        { status: 400 }
      );
    }

    // Upsert: insert if not exists, update if it does
    const progress = await prisma.progress.upsert({
      where: {
        pseudoUserId_taskId: {
          pseudoUserId,
          taskId,
        },
      },
      update: {
        completed,
      },
      create: {
        pseudoUserId,
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
