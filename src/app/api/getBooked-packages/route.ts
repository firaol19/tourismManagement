import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    const bookedPackages = await prisma.bookedPackage.findMany({
      include: {
        destination: true, // Fetch related package details
        user: true, // Fetch user details
      },
    });

    // Format the response
    const mappedBookedPackages = bookedPackages.map((packageItem) => ({
      ...packageItem,
      destination: packageItem.destination ? packageItem.destination.title : "Not Included",
      user: packageItem.user ? packageItem.user.name : "Not Included",
      date: packageItem.date.split("T")[0], // Format date
    }));

    return NextResponse.json(mappedBookedPackages);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
