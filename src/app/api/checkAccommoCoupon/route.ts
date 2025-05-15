import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const { providerId, coupon } = await req.json();

    // 1. Get all accommodations for the provider
    const accommodations = await prisma.accommodation.findMany({
      where: { providerId: providerId },
    });

    if (accommodations.length === 0) {
      return NextResponse.json({ error: "Accommodation Provider not Found" }, { status: 404 });
    }

    // 2. Get bookings for each accommodation that match the coupon
    const bookings = await Promise.all(
      accommodations.map(async (acc) => {
        return await prisma.bookedService.findMany({
          where: {
            accommodationId: acc.id,
            coupon: coupon,
          },
          include: {
            user: true,
            accommodation: true,
          },
        });
      })
    );

    // Flatten the array and filter non-empty ones
    const flatBookings = bookings.flat().filter(b => b !== null);

    if (flatBookings.length === 0) {
      return NextResponse.json({ found: false, message: "No booking found with that coupon" });
    }

   
    return NextResponse.json({
      found: true,
      bookings: flatBookings, // an array of bookings, each includes user and accommodation
    });
   

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
