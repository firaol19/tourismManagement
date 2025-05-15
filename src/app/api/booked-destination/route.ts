// app/api/booked-accommo/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const providerId = searchParams.get("providerId");

  if (!providerId) {
    return NextResponse.json({ error: "Missing providerId" }, { status: 400 });
  }

  try {
    const destination = await prisma.destination.findMany({
      where: { providerId },
      select: { id: true }
    });

    const destinationId = destination.map((a) => a.id);

    if (destinationId.length === 0) {
      return NextResponse.json([], { status: 200 }); // No bookings, but valid response
    }

    const bookings = await prisma.bookedService.findMany({
      where: {
        destinationId: { in: destinationId },
      },
      include: {
        user: true,
        destination: true,
        accommodation: true,
        transportation: true,
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
