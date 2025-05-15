import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const accommodationCount = await prisma.accommodation.count();
    const transportationCount = await prisma.transportation.count();
    const destinationCount = await prisma.destination.count();
    const tourGuideCount = await prisma.tourGuide.count();

    // Return all counts in the response
    return NextResponse.json(
      {
        userCount,
        accommodationCount,
        transportationCount,
        destinationCount,
        tourGuideCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching counts:", error);
    return NextResponse.json(
      { message: "Error fetching data.", error },
      { status: 500 }
    );
  }
}
