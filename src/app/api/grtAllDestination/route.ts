import { NextResponse } from 'next/server';
import prisma from '@/lib/Client';

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany();

    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: "Failed to fetch destinations" }, { status: 500 });
  }
}
