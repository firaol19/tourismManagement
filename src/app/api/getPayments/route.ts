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
      },
    });

    interface PaymentItem {
      name: string;
      totalPrice: number;
    }

    const aggregateDestinationPayments = (): PaymentItem[] => {
      const paymentMap = new Map<string, number>();

      bookedServices.forEach(({ destination, numberPerson }) => {
        if (destination) {
          const { name, interance } = destination;
          const totalCost = interance * numberPerson; // Multiply price by number of persons
          paymentMap.set(name, (paymentMap.get(name) || 0) + totalCost);
        }
      });

      return Array.from(paymentMap, ([name, totalPrice]) => ({ name, totalPrice }));
    };

    const aggregateAccommodationPayments = (): PaymentItem[] => {
      const paymentMap = new Map<string, number>();

      bookedServices.forEach(({ accommodation, numberPerson }) => {
        if (accommodation) {
          const { provider, price } = accommodation;
          const totalCost = price * numberPerson; // Multiply price by number of persons
          paymentMap.set(provider, (paymentMap.get(provider) || 0) + totalCost);
        }
      });

      return Array.from(paymentMap, ([name, totalPrice]) => ({ name, totalPrice }));
    };

    const aggregateTransportationPayments = (): PaymentItem[] => {
      const paymentMap = new Map<string, number>();

      bookedServices.forEach(({ transportation, numberPerson }) => {
        if (transportation) {
          const { provider, price } = transportation;
          const totalCost = price * numberPerson; // Multiply price by number of persons
          paymentMap.set(provider, (paymentMap.get(provider) || 0) + totalCost);
        }
      });

      return Array.from(paymentMap, ([name, totalPrice]) => ({ name, totalPrice }));
    };

    const aggregateTourGuidePayments = (): PaymentItem[] => {
      const paymentMap = new Map<string, number>();

      bookedServices.forEach(({ tourGuide, numberPerson }) => {
        if (tourGuide) {
          const { name, price } = tourGuide;
          const priceValue = parseFloat(price); // Convert string price to number
          const totalCost = priceValue * numberPerson; // Multiply price by number of persons
          paymentMap.set(name, (paymentMap.get(name) || 0) + totalCost);
        }
      });

      return Array.from(paymentMap, ([name, totalPrice]) => ({ name, totalPrice }));
    };

    return NextResponse.json({
      destinationPayments: aggregateDestinationPayments(),
      accommodationPayments: aggregateAccommodationPayments(),
      transportationPayments: aggregateTransportationPayments(),
      tourGuidePayments: aggregateTourGuidePayments(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}
