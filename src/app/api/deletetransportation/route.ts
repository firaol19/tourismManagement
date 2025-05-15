// app/api/deleteTransportation/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/Client"; // Adjust the import if needed

export async function DELETE(req: Request) {
  try {
    // Extracting the id from the request body
    const { id } = await req.json();

    if (!id) {
      // If the id is missing, return a bad request response
      return NextResponse.json({ message: "Missing transportation ID" }, { status: 400 });
    }

    // Attempt to delete the transportation from the database
    await prisma.transportation.delete({
      where: { id },
    });

    // Return success message
    return NextResponse.json({ message: "Transportation deleted successfully" });
  } catch (error) {
    // Catch any errors and log them
    console.error("Error deleting transportation:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
