
// // /pages/api/metrics.ts
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     // Make a GET request to the FastAPI backend
//     const response = await fetch('http://127.0.0.1:8000/api/metrics?timeframe=24h'); // Adjust URL if needed
//     const data = await response.json();

//     // Check if response is successful
//     if (response.ok) {
//       res.status(200).json(data ({ success: true })); // Send metrics data as JSON to the frontend
//     } else  {
//       res.status(500).json({ message: 'Failed to fetch metrics' });
//     }
//   } catch (error) {
//     console.error('Error fetching metrics:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// }
