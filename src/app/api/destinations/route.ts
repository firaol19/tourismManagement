import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Ensure you have a Prisma client set up

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany({
      take: 20, // Fetch only the first 20 rows
    });

    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch destinations" + error }, { status: 500 });
  }
}
