import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const { providerId, coupon } = await req.json();

    // 1. Get the specific tour guide by providerId
    const tourGuide = await prisma.tourGuide.findFirst({
      where: { providerId: providerId },
    });

    if (!tourGuide) {
      return NextResponse.json({ error: "Tour guide not found" }, { status: 404 });
    }

    // 2. Check if any booking with this tourGuide and the entered coupon
    const booking = await prisma.bookedService.findFirst({
      where: {
        tourGuideId: tourGuide.id,
        coupon: coupon,
      },
      include: {
        user: true, // this fetches the user info
      },
    });

    if (!booking) {
      return NextResponse.json({ found: false, message: "No booking found with that coupon" });
    }

    return NextResponse.json({
      found: true,
      user: booking.user, // contains user details
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
