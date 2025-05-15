import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Adjust the import path according to your setup

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { place, title, description, duration, image, price, include } = body;

    // Ensure all fields are provided
    if (!place || !title || !description || !duration || !image || !price || !include) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newPackage = await prisma.package.create({
      data: {
        place,
        title,
        description,
        duration,
        image,
        price,
        include,
      },
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error("Error adding package:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
