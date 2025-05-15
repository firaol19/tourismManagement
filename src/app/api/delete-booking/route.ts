import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function DELETE(req: Request) {
  try {
    const { id, type } = await req.json();  // Get the ID and type from the request

    if (!id || !type) {
      return NextResponse.json(
        { error: "Booking ID and type are required" },
        { status: 400 }
      );
    }

    if (type === "service") {
      // Handle deleting a booked service
      const deletedService = await prisma.bookedService.delete({
        where: { id },
      });
      if (deletedService) {
        return NextResponse.json({ message: "Service deleted successfully" });
      }
    } else if (type === "package") {
      // Handle deleting a booked package
      const deletedPackage = await prisma.bookedPackage.delete({
        where: { id },
      });
      if (deletedPackage) {
        return NextResponse.json({ message: "Package deleted successfully" });
      }
    }

    return NextResponse.json({ error: "Invalid booking type" }, { status: 400 });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
