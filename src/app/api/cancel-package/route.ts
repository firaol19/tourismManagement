import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { packageId } = await req.json();

    const bookedPkg = await prisma.bookedPackage.findUnique({
      where: { id: packageId },
      include: { destination: true },
    });

    if (!bookedPkg) {
      return NextResponse.json({ error: 'Package booking not found.' }, { status: 404 });
    }

    const daysBetween = (d1: Date, d2: Date) =>
      Math.floor((d1.getTime() - d2.getTime()) / (1000 * 60 * 60 * 24));

    const today = new Date();
    const bookedDate = new Date(bookedPkg.date);
    const diff = daysBetween(bookedDate, today);
    const allowed = Number(bookedPkg.destination?.refundDate ?? 0);

    if (diff < allowed) {
      return NextResponse.json(
        { error: `Cannot cancel package less than ${allowed} days before.` },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.bookedPackage.update({
        where: { id: packageId },
        data: { packageId: null },
      });
      await tx.cancelbook.create({ data: { canceledPackageId: packageId } });

    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
