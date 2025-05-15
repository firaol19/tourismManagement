import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const { providerId } = await req.json();

    const accommodations = await prisma.accommodation.findMany({
      where: { providerId: providerId },
    });

    if (accommodations.length === 0) {
      return NextResponse.json({ message: "No accommodations found" }, { status: 404 });
    }

    return NextResponse.json({ accommodations });
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
