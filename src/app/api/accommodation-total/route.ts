import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Helper function to get Y-M-D in LOCAL TIME
function getLocalDateString(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export async function POST(req: Request) {
  try {
    const { selectedDate, accommodationId } = await req.json();

    if (!selectedDate || !accommodationId) {
      return NextResponse.json({ total: 0 }, { status: 200 });
    }

    const clientDateStr = getLocalDateString(new Date(selectedDate));

    const bookings = await prisma.bookedService.findMany({
      where: {
        accommodationId: accommodationId,
      },
    });

    const matchingBookings = bookings.filter((booking) => {
      const bookingDateStr = getLocalDateString(new Date(booking.date));
      return bookingDateStr === clientDateStr;
      
    });

    let total = 0;

    if (matchingBookings.length === 0) {
      return NextResponse.json({ total: 0 }, { status: 200 });
      
    }else{

        matchingBookings.forEach((booking) => {
            total += booking.numberPerson;
          });

        return NextResponse.json({ total }, { status: 200 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
