import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const { providerId } = await req.json();

    const transportation = await prisma.transportation.findMany({
      where: { providerId: providerId },
    });

    if (transportation.length === 0) {
      return NextResponse.json({ message: "No taransportaion found" }, { status: 404 });
    }

    return NextResponse.json({ transportation });
  } catch (error) {
    console.error("Error fetching taransportaion:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
