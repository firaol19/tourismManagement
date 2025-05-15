import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Adjust the import based on your Prisma setup

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { provider, type, description, image, price, noperson, providerId, refundDate,totalcar  } = body;

    if (!provider || !type || !description || !image || !price || !noperson || !providerId || !refundDate ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newTransportation = await prisma.transportation.create({
      data: {
        provider,
        type,
        description,
        image,
        price: Number(price),
        noperson: Number(noperson),
        providerId,
        refundDate,
        totalcar,
      },
    });

    return NextResponse.json(newTransportation, { status: 201 });
  } catch (error) {
    console.error("Error adding transportation:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
