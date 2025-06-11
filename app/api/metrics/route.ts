// app/api/metrics/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get("timeframe") || "24h";

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/metrics`);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true, data });
    } else {
      return NextResponse.json({ success: false, message: "Failed to fetch metrics" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}