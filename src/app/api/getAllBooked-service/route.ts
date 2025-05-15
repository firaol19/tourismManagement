import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function GET() {
  try {
    const bookedServices = await prisma.bookedService.findMany({
      include: {
        destination: true,
        accommodation: true,
        transportation: true,
        tourGuide: true,
        user: true,
      },
    });

    // Ensure null values are handled properly but keep object structure
    const mappedBookedServices = bookedServices.map((service) => ({
      ...service,
      destination: service.destination || { name: "Not Included" },
      accommodation: service.accommodation || { type: "Not Included" },
      transportation: service.transportation || { type: "Not Included" },
      tourGuide: service.tourGuide || { name: "Not Included" },
      user: service.user || { name: "Not Included" },
    }));

    return NextResponse.json(mappedBookedServices);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
