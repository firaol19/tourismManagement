import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, region, city, farFromAdiss, image, category, interance, description, providerId, refundDate } = body;

    if (!name || !region || !city || !farFromAdiss || !image || !category || !interance || !description || !providerId || !refundDate) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newDestination = await prisma.destination.create({
      data: { name, region, city, farFromAdiss, image, category, interance, description,providerId,refundDate },
    });

    return NextResponse.json(newDestination, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create destination" + error }, { status: 500 });
  }
}
