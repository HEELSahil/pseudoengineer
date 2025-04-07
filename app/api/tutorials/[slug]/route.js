import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { slug } = params;
  const pseudoUserId = request.headers.get('x-user-id') || '';

  try {
    const tutorial = await prisma.tutorial.findUnique({
      where: { slug },
      include: {
        sections: {
          include: {
            lectures: {
              include: {
                tasks: {
                  include: {
                    progress: {
                      where: {
                        pseudoUserId,
                      },
                    },
                  },
                },
              },
            },
            // 👇 include tasks directly under section (if any)
            tasks: {
              include: {
                progress: {
                  where: {
                    pseudoUserId,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!tutorial) {
      return new Response(JSON.stringify({ error: 'Tutorial not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(tutorial), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500,
    });
  }
}
