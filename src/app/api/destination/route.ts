import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/Client";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID not provided" }, { status: 400 });
    }

    const destination = await prisma.destination.findUnique({
      where: { id: parseInt(id) },
      include: {
        reviews: true,
        bookedServices: true,
      },
    });

    if (!destination) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json(destination);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong: " + error }, { status: 500 });
  }
}
