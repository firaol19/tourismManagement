import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    const tourGuide = await prisma.tourGuide.findMany();
    return NextResponse.json({ tourGuide }); // Structured response
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tourGuide: " + (error as Error).message }, 
      { status: 500 }
    );
  }
}
