import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth.config';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;
  const { slug } = params;

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
                    progress: userId
                      ? {
                          where: { userId },
                        }
                      : true,
                  },
                },
              },
            },
            tasks: {
              include: {
                progress: userId
                  ? {
                      where: { userId },
                    }
                  : true,
              },
            },
          },
        },
      },
    });

    if (!tutorial) {
      return NextResponse.json(
        { error: 'Tutorial not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(tutorial);
  } catch (error) {
    console.error('Tutorial fetch error:', error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
