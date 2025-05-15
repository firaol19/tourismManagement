import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CancelChoices {
  accommodation: boolean;
  transportation: boolean;
  tourGuide: boolean;
  all: boolean;
}

interface CancelRequestBody {
  bookingId: number;
  choices: CancelChoices;
}

export async function POST(req: Request) {
  try {
    // Parse and type the incoming JSON body
    const { bookingId, choices } = (await req.json()) as CancelRequestBody;

    // Fetch booking with related entities
    const booking = await prisma.bookedService.findUnique({
      where: { id: bookingId },
      include: {
        accommodation: true,
        transportation: true,
        tourGuide: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    // Helper to compute days difference
    const daysBetween = (d1: Date, d2: Date) =>
      Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));

    const today = new Date();
    const diffDays = daysBetween(booking.date, today);

    // Collect refund rules based on choices
    type RefundCheck = { field: keyof CancelChoices; days: number };
    const checks: RefundCheck[] = [];

    if (choices.all || choices.accommodation) {
      checks.push({ field: 'accommodation', days: Number(booking.accommodation?.refundDate ?? 0) });
    }
    if (choices.all || choices.transportation) {
      checks.push({ field: 'transportation', days: Number(booking.transportation?.refundDate ?? 0) });
    }
    if (choices.all || choices.tourGuide) {
      checks.push({ field: 'tourGuide', days: Number(booking.tourGuide?.refundDate ?? 0) });
    }

    // Validate refund window
    for (const { field, days } of checks) {
      if (diffDays < days) {
        return NextResponse.json(
          { error: `Cannot cancel ${field} less than ${days} days before.` },
          { status: 400 }
        );
      }
    }

    // Build the status string
    const statusFragments: string[] = [];
    if (choices.all) {
      statusFragments.push('allRefund');
    } else {
      if (choices.accommodation) statusFragments.push('accRefunded');
      if (choices.transportation) statusFragments.push('tranRefunded');
      if (choices.tourGuide) statusFragments.push('tourRefund');
    }
    const newStatus = statusFragments.join('_') || booking.status;

    // Prepare update payload without using `any`
    const updateData: {
      status: string;
      accommodationId?: null;
      transportationId?: null;
      tourGuideId?: null;
    } = { status: newStatus };

    if (choices.all || choices.accommodation) {
      updateData.accommodationId = null;
    }
    if (choices.all || choices.transportation) {
      updateData.transportationId = null;
    }
    if (choices.all || choices.tourGuide) {
      updateData.tourGuideId = null;
    }

    // Perform updates in a transaction
    const updatedBooking = await prisma.$transaction(async (tx) => {
      const updated = await tx.bookedService.update({
        where: { id: bookingId },
        data: updateData,
      });

      await tx.cancelbook.create({
        data: {
          canceledServiceId: bookingId,
          canceledAccommodationId:
            choices.all || choices.accommodation ? booking.accommodationId : null,
          canceledTransportationId:
            choices.all || choices.transportation ? booking.transportationId : null,
          canceledTourGuideId:
            choices.all || choices.tourGuide ? booking.tourGuideId : null,
        },
      });

      return updated;
    });

    return NextResponse.json({ booking: updatedBooking });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
