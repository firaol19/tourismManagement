import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/Client';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const receiverId = url.searchParams.get("receiverId");

  if (!receiverId) {
    return NextResponse.json({ error: "Receiver ID is required" }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        mreceiverId: parseInt(receiverId, 10), // Convert receiverId to number
      },
      distinct: ["msenderId"], // Ensure each sender only appears once
      include: {
        msender: true, // include sender details
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
