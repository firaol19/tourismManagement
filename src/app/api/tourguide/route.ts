import { NextResponse } from 'next/server';
import prisma from '@/lib/Client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const providerId = searchParams.get('providerId');

  if (!providerId) {
    return NextResponse.json({ error: 'Missing providerId' }, { status: 400 });
  }

  const tourGuide = await prisma.tourGuide.findFirst({ where: { providerId } });

  if (!tourGuide) {
    return NextResponse.json({ error: 'Tour guide not found' }, { status: 404 });
  }

  return NextResponse.json(tourGuide);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const { providerId, image, price, refundDate, language } = body;

  if (!providerId) {
    return NextResponse.json({ error: 'Missing providerId' }, { status: 400 });
  }

  const updated = await prisma.tourGuide.updateMany({
    where: { providerId },
    data: { image, price, refundDate, language },
  });

  return NextResponse.json({ success: true, updated });
}
