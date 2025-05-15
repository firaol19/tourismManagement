import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📝 Received Data:", body);  // Log the received data

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
    }

    // Ensure date and time are valid strings
    const createdBookings = await prisma.bookedPackage.createMany({
      data: body.map((booking) => {
        if (!booking.date || typeof booking.date !== "string") {
          throw new Error("Date is required and must be a valid string.");
        }
        
        if (!booking.time || typeof booking.time !== "string") {
          throw new Error("Time is required and must be a valid string.");
        }

        return {
          packageId: booking.packageId || undefined,
          date: booking.date,  // Required string
          time: booking.time,  // Required string
          totalPrice: booking.totalPrice,
          numberPerson: booking.numberPerson,
          userId: booking.userId,
          coupon: booking.coupon,
        };
      }),
    });

    console.log("✅ Bookings Inserted:", createdBookings);
    return NextResponse.json({ message: "Bookings added successfully!", createdBookings }, { status: 201 });
  } catch (error: unknown) {
    // Assert that error is an instance of Error
    if (error instanceof Error) {
      console.error("❌ API Error:", error.message);  // Log the error message
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("❌ Unknown error:", error);  // Log unknown errors
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}
