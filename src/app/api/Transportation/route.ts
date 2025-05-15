import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const transportations = await prisma.transportation.findMany();
    return NextResponse.json(transportations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch transportation data" + error }, { status: 500 });
  }
}