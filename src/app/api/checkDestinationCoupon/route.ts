import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const { providerId, coupon } = await req.json();

    // 1. Get all accommodations for the provider
    const destination = await prisma.destination.findMany({
      where: { providerId: providerId },
    });

    if (destination.length === 0) {
      return NextResponse.json({ error: "Destination Provider not Found" }, { status: 404 });
    }

    // 2. Get bookings for each accommodation that match the coupon
    const bookings = await Promise.all(
        destination.map(async (acc) => {
        return await prisma.bookedService.findMany({
          where: {
            destinationId: acc.id,
            coupon: coupon,
          },
          include: {
            user: true,
            destination: true,
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
