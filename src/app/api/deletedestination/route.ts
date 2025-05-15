// app/api/deleteDestination/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Adjust the import if needed

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // Expecting the id from the request body

    if (!id) {
      return NextResponse.json({ message: "Missing destination ID" }, { status: 400 });
    }

    // Attempt to delete the destination from the database
    await prisma.destination.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("Error deleting destination:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
