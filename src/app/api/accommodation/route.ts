import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Adjust based on your Prisma client setup

export async function GET(request: Request) {
  // Extract the city from the query parameters
  const url = new URL(request.url);
  const city = url.searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 });
  }

  try {
    // Fetch accommodation data from the database based on the city
    const accommodations = await prisma.accommodation.findMany({
      where: {
        city: city, // Filter by city
      },
    });

    // Return the data in the response
    return NextResponse.json(accommodations);
  } catch (error) {
    console.error("Failed to fetch accommodation data:", error);
    return NextResponse.json({ error: "Failed to fetch accommodation data" }, { status: 500 });
  }
}