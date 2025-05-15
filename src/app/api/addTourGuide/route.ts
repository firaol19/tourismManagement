import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Adjust the import path according to your setup

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, language, price, image, refundDate, providerId } = body;

    // Ensure all fields are provided
    if (!name || !language || !price || !image || !refundDate || !providerId) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newTourGuide = await prisma.tourGuide.create({
      data: {
        name,
        language,
        price,
        image,
        refundDate: refundDate.toString(),
        providerId,
      },
    });

    return NextResponse.json(newTourGuide, { status: 201 });
  } catch (error) {
    console.error("Error adding tour guide:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
