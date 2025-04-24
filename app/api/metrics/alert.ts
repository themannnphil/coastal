import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { message, recipients } = req.body;

    console.log("🚨 Alert Triggered:", { message, recipients });

    // Here you'd integrate Twilio or another SMS service
    // await sendSmsToUsers(recipients, message);

    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}
