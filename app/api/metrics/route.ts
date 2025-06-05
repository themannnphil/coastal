// app/api/metrics/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get("timeframe");

  return Response.json({
    metrics: [
      {
        name: "Wave Height",
        unit: "cm",
        value: 120,
        previous: 100,
        change: 20,
        status: "warning",
        chartData: [
          { time: "00:00", value: 100 },
          { time: "06:00", value: 110 },
          { time: "12:00", value: 120 },
        ],
      },
      {
        name: "Tide Level",
        unit: "m",
        value: 2.4,
        previous: 2.2,
        change: 9.09,
        status: "normal",
        chartData: [
          { time: "00:00", value: 2.0 },
          { time: "06:00", value: 2.2 },
          { time: "12:00", value: 2.4 },
        ],
      },
    ],
  });
}
