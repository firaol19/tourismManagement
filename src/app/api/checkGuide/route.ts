import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const { providerId } = await req.json();

    if (!providerId) {
      return NextResponse.json({ error: "Provider ID is required" }, { status: 400 });
    }

    const guide = await prisma.tourGuide.findFirst({
      where: {
        providerId: providerId,
      },
    });

    return NextResponse.json({ isRegistered: !!guide }); // true or false
  } catch (error) {
    console.error("Check guide error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
