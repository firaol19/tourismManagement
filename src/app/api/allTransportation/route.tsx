import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    const transportation = await prisma.transportation.findMany();
    return NextResponse.json({ transportation }); // Structured response
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transportation: " + (error as Error).message }, 
      { status: 500 }
    );
  }
}
