import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const { providerId } = await req.json();

    const destination = await prisma.destination.findMany({
      where: { providerId: providerId },
    });

    if (destination.length === 0) {
      return NextResponse.json({ message: "No taransportaion found" }, { status: 404 });
    }

    return NextResponse.json({ destination });
  } catch (error) {
    console.error("Error fetching taransportaion:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
