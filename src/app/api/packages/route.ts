// app/api/packages/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/Client';

// Assuming you have Prisma setup in lib/prisma.ts

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      take: 6, // Fetch only the first 4 rows
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}
