import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Adjust the import path according to your setup

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, type, description, image, price, city, providerId, refundDate, available } = body;
   

    // Ensure all fields are provided
    if (!provider || !type || !description || !image || !price || !city || !providerId || !refundDate || !available ) {
      
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    

    const newAccommodation = await prisma.accommodation.create({
      data: {
        provider,
        type,
        description,
        image,
        price: Number(price),
        city,
        providerId : providerId as string ,
        refundDate : refundDate as string,
        available : available as string,
      },
    });

    return NextResponse.json(newAccommodation, { status: 201 });
  } catch (error) {
    console.error("Error adding accommodation:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
