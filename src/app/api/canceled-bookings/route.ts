// app/api/canceled-bookings/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    // Fetch canceled services and packages
    const canceledBookings = await prisma.cancelbook.findMany({
      include: {
        bookedService: true,
        bookedPackage: true,
      },
    });

    const canceledServices = canceledBookings.filter(
      (item) => item.canceledServiceId !== null
    );
    const canceledPackages = canceledBookings.filter(
      (item) => item.canceledPackageId !== null
    );

    return NextResponse.json(
      { canceledServices, canceledPackages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching canceled bookings:", error);
    return NextResponse.json({ error: "Failed to fetch canceled bookings" }, { status: 500 });
  }
}
