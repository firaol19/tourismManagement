// app/api/verify/route.ts

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const tx_ref = searchParams.get("tx_ref");

  if (!tx_ref) {
    return NextResponse.json({ error: "Missing tx_ref" }, { status: 400 });
  }

  try {
    const verifyRes = await fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer CHASECK_TEST-3yoSebvcaGiJJzlRwiZx0wsmbkN4q87n", // secret key!
      },
    });

    const result = await verifyRes.json();

    if (result.status === "success") {
      const chapaRefundId = result.data.id; // 👈 use this for refunds
      return NextResponse.json({ chapaRefundId, data: result.data }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Verification failed", result }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
  }
}
