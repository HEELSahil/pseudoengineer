import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { slug } = params;
  const pseudoUserId = request.headers.get('x-user-id'); // We’ll pass this from frontend using fetch headers

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
                        pseudoUserId: pseudoUserId || '', // fallback if not sent
                      },
                    },
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
