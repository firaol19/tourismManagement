import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Ensure your Prisma client is set up

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true, // Assuming the User model has an `image` field
          },
        },
      },
      orderBy: {
        date: "desc", // Get the latest reviews first
      },
      take: 4, // Fetch only the first 4 reviews
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
