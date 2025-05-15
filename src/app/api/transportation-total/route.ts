import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

// Helper function to get Y-M-D in LOCAL TIME
function getLocalDateString(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export async function POST(req: Request) {
  try {
    const { selectedDate, transportationId, selectedDestinationId } = await req.json();

    if (!selectedDate || !transportationId) {
      return NextResponse.json({ total: 0 }, { status: 200 });
    }

    const clientDateStr = getLocalDateString(new Date(selectedDate));

    const bookings = await prisma.bookedService.findMany({
      where: {
        transportationId: transportationId,
      },
      include: {
        transportation: true,
      },
    });

    const matchingBookings = bookings.filter((booking) => {
      const bookingDateStr = getLocalDateString(new Date(booking.date));
      return bookingDateStr === clientDateStr;
      
    });

 

    if (matchingBookings.length === 0) {
      return NextResponse.json({ total: 0 }, { status: 200 });
      
    }
    

    const transportationType = matchingBookings[0]?.transportation?.type;

    if (!transportationType) {
      
      return NextResponse.json({ total: 0 }, { status: 200 });
    }

    let total = 0;
   
    

    if (transportationType === "Bus" || transportationType === "VIP Bus") {
      // Only count the total number of people when transportation type is "Bus" or "VIP Bus"
      const destinationBookings = matchingBookings.filter((booking) => {
        console.log(booking.destinationId)
        return Number(booking.destinationId) === Number(selectedDestinationId)
      }
      );

      if (destinationBookings.length === 0) {
        return NextResponse.json({ total: 0 }, { status: 200 });
      }

      destinationBookings.forEach((booking) => {
        total += booking.numberPerson;
      });

    } else if (transportationType === "Car" || transportationType === "VIP Car") {
      // Only count the number of bookings (rows) when transportation type is "Car" or "VIP Car"
      total = matchingBookings.length;
    } else {
      return NextResponse.json({ total: 0 }, { status: 200 });
    }

    return NextResponse.json({ total }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
