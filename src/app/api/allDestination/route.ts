import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    const destinations = await prisma.destination.findMany();
    return NextResponse.json({ destinations }); // Structured response
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch destinations: " + (error as Error).message }, 
      { status: 500 }
    );
  }
}
