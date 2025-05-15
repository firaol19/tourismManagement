// app/api/deleteAccommodation/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Missing accommodation ID" }, { status: 400 });
    }

    await prisma.accommodation.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Accommodation deleted successfully" });
  } catch (error) {
    console.error("Error deleting accommodation:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
