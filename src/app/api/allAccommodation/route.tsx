import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    const accommodation = await prisma.accommodation.findMany();
    return NextResponse.json({ accommodation }); // Structured response
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch accommodation: " + (error as Error).message }, 
      { status: 500 }
    );
  }
}
