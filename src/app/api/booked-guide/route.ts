import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Assuming you have a Prisma client setup

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const providerId = searchParams.get("providerId");

  if (!providerId) {
    return NextResponse.json({ error: "Missing providerId" }, { status: 400 });
  }

  // Fetch the tour guide by providerId and include the bookings with their associated details
  const tourGuide = await prisma.tourGuide.findFirst({
    where: { providerId },
    include: {
      bookings: {
        include: {
          user: true,  // Fetching the associated user who booked
          destination: true,
          accommodation: true,
          transportation: true,
        },
      },
    },
  });

  if (!tourGuide) {
    return NextResponse.json({ error: "Tour guide not found" }, { status: 404 });
  }

  return NextResponse.json(tourGuide.bookings);
}
