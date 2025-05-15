import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (!query) {
      return new Response(JSON.stringify({ suggestions: [] }), { status: 400 });
    }

    // Fetch destinations that match the query (case-insensitive)
    const suggestions = await prisma.destination.findMany({
      where: {
        name: {
          contains: query, // This will match the query case-insensitively
           // This should work if you're on a supported Prisma version
        },
      },
      select: {
        id: true,
        name: true,
        city: true,
      },
    });

    return new Response(JSON.stringify({ suggestions }), { status: 200 });
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
