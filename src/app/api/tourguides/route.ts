import { NextResponse } from 'next/server';
import prisma from '@/lib/Client';

// Adjust the path if necessary

export async function GET() {
  try {
    const tourGuides = await prisma.tourGuide.findMany(); // Fetching all rows from the TourGuide table
    return NextResponse.json(tourGuides);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tour guides' + error}, { status: 500 });
  }
}