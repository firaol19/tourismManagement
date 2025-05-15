// app/api/messages/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/Client"; // Prisma client

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { msenderId, mreceiverId, message } = body;

    if (!msenderId || !mreceiverId || !message) {
      return NextResponse.json(
        { message: "Sender ID, Receiver ID, and message are required." },
        { status: 400 }
      );
    }

    await prisma.message.create({
      data: {
        msenderId: parseInt(msenderId, 10),
        mreceiverId: parseInt(mreceiverId, 10),
        message,
      },
    });

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Type guard to check if the error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: "Error sending message.", error: error.message },
        { status: 500 }
      );
    }
    // Fallback if the error is not an instance of Error
    return NextResponse.json(
      { success: false, message: "Unknown error occurred.", error: String(error) },
      { status: 500 }
    );
  }
}
