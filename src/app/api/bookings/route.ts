import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch booked services and include related data
    const bookedServices = await prisma.bookedService.findMany({
      where: {}, // optionally filter by userId if auth implemented
      include: {
        destination: { select: { name: true, image: true } },
        accommodation: { select: { provider: true, image: true, refundDate: true } },
        transportation: { select: { provider: true, image: true, refundDate: true } },
        tourGuide: { select: { name: true, image: true, refundDate: true } },
      },
    });

    // Fetch booked packages
    const bookedPackages = await prisma.bookedPackage.findMany({
      where: {}, // filter by user if needed
      include: {
        // The Package model uses 'title' instead of 'name'
        destination: { select: { title: true, image: true } },
      },
    });

    return NextResponse.json({ bookedServices, bookedPackages });
  } catch (err) {
    console.error("Error fetching bookings:", err);
    return NextResponse.json({ error: "Failed to load bookings." }, { status: 500 });
  }
}
