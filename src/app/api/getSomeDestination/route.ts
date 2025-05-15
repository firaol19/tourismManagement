import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/Client';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");

    const destinations = await prisma.destination.findMany({
      where: { category: category ? category : undefined },
    });

    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}
