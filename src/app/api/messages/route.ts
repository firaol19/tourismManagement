import { NextResponse } from "next/server";
import prisma from "@/lib/Client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { msenderId, mreceiverId } = body;

    // Ensure that msenderId and mreceiverId are numbers
    msenderId = Number(msenderId);
    mreceiverId = Number(mreceiverId);

    // Check if both ids are valid numbers
    if (isNaN(msenderId) || isNaN(mreceiverId)) {
      return NextResponse.json(
        { message: "Both Sender ID and Receiver ID must be valid numbers." },
        { status: 400 }
      );
    }

    // Log incoming request data
    console.log("Received data:", body);

    // Fetch messages between the sender and receiver, including the reversed order
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            msenderId: msenderId,  // msenderId as a number
            mreceiverId: mreceiverId,  // mreceiverId as a number
          },
          {
            msenderId: mreceiverId,  // Reverse the sender and receiver
            mreceiverId: msenderId,  // Reverse the sender and receiver
          },
        ],
      },
      orderBy: {
        createdAt: "asc", // Order by creation time, ascending
      },
      include: {
        msender: {
          select: { id: true, name: true, image: true },
        },
        mreceiver: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);  // Log error
    return NextResponse.json(
      { message: "Error fetching messages.", error },
      { status: 500 }
    );
  }
}
