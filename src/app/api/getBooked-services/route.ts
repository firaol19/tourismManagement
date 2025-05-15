// src/app/api/booked-services/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Adjust this import path as needed

export async function GET() {
  try {
    const bookedServices = await prisma.bookedService.findMany({
      take: 5, // Fetch only the first 5 rows
      include: {
        destination: true, // Include related destination data
        accommodation: true, // Include related accommodation data
        transportation: true, // Include related transportation data
        tourGuide: true, // Include related tour guide data
        user: true, // Include related user data
      },
    });

    return NextResponse.json(bookedServices);
  } catch (error) {
    console.log(error)
    return NextResponse.error();
    
  }
}
