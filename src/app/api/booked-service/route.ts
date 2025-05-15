import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📝 Received Data:", body);  // Log the received data

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid data format. Expected an array." }, { status: 400 });
    }

    const createdBookings = await prisma.bookedService.createMany({
      data: body.map((booking) => {
        if (!booking.date) {
          throw new Error("Date is required.");
        }

        if (!booking.time) {
          throw new Error("Time is required.");
        }

        return {
          destinationId: booking.destinationId || undefined,
          accommodationId: booking.accommodationId || undefined,
          transportationId: booking.transportationId || undefined,
          tourGuideId: booking.tourGuideId || undefined,
          //date: new Date(booking.date), // 👈 Important: Always ensure it's a Date object
          date: booking.date, // 👈 Important: Always ensure it's a Date object
          time: booking.time,
          totalPrice: booking.totalPrice,
          numberPerson: booking.numberPerson,
          userId: booking.userId,
          coupon: booking.coupon || undefined,
          reference : booking.reference
        };
      }),
    });

    console.log("✅ Bookings Inserted:", createdBookings);
    return NextResponse.json({ message: "Bookings added successfully!", createdBookings }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ API Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("❌ Unknown error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
}
