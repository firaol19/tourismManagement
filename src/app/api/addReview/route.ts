// app/api/addReview/route.ts

//import { NextApiRequest, NextApiResponse } from 'next';

import { NextResponse } from 'next/server';
import { addReview } from '@/lib/action';

export async function POST(req: Request) {
  const { userId, review, destinationId } = await req.json();
  try {
    const newReview = await addReview(userId, review, destinationId);
    if (newReview) {
      return NextResponse.json(newReview, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to add review' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    console.log(error)
  }
}
