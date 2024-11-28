import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); // Initialize the Prisma client

export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const pagePath = searchParams.get('pagePath');

    // console.log('Incoming pagePath:', pagePath); // Debugging log

    if (!pagePath) {
        return new Response(JSON.stringify({ error: "Page path is required" }), {
            status: 400,
        });
    }

    let ip = req.headers.get('x-forwarded-for') || req.socket?.remoteAddress;

    // // Normalize ::1 to 127.0.0.1 for local testing
    // if (ip === '::1') {
    //   ip = '127.0.0.1';
    // }

    // console.log('Incoming IP:', ip); // Debug log

    // Replace with your IP to exclude your visits
    if (ip === process.env.MY_IP) {
        return new Response(JSON.stringify({ message: "View not tracked" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const page = await prisma.pageViews.upsert({
            where: { pagePath },
            update: { viewsCount: { increment: 1 } },
            create: { pagePath, viewsCount: 1 },
        });

        return new Response(JSON.stringify({ views: page.viewsCount }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // console.error('Error in POST /api/page-views:', error); // Detailed error log
        return new Response(JSON.stringify({ error: error.message || "Error updating page views" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const pagePath = searchParams.get('pagePath');

    // console.log('Incoming pagePath:', pagePath); // Debugging log

    if (!pagePath) {
        return new Response(JSON.stringify({ error: "Page path is required" }), {
            status: 400,
        });
    }

    try {
        const page = await prisma.pageViews.findUnique({
            where: { pagePath },
        });
        return new Response(JSON.stringify({ views: page?.viewsCount || 0 }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // console.error('Error in GET /api/page-views:', error); // Detailed error log
        return new Response(JSON.stringify({ error: error.message || "Error fetching page views" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
