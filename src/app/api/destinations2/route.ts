import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface FilterBody {
  categories?: string[];
  regions?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: FilterBody = await req.json();
    const { categories = [], regions = [] } = body;

    const whereConditions: Prisma.DestinationWhereInput = {};

    if (categories.length > 0) {
      whereConditions.category = {
        in: categories,
      };
    }

    if (regions.length > 0) {
      whereConditions.region = {
        in: regions,
      };
    }

    const destinations = await prisma.destination.findMany({
      where: whereConditions,
    });

    return NextResponse.json({ success: true, data: destinations });
  } catch (error: unknown) {
    let message = "Something went wrong";
    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
