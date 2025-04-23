import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const timeframe = req.query.timeframe;

  res.status(200).json({
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
