"use client";

import { useState } from "react";
import axios from "axios";

const AlarmTrigger = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAlarm = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await axios.post("/api/alert", {
        message: "🚨 Coastal flood alert! Evacuate low-lying areas immediately.",
        recipients: ["+1234567890", "+1987654321"], // Replace with actual phone list or pull from backend
      });

      setResponse("✅ Alert sent successfully!");
    } catch (err) {
      setResponse("❌ Failed to send alert.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white space-y-3">
      <h2 className="text-lg font-bold text-base/7 text-gray-600 ">Emergency Alarm</h2>
      <button
        onClick={handleAlarm}
        disabled={loading}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Sending..." : "Trigger Alarm & Send SMS"}
      </button>
      {response && <p className="text-sm text-gray-700">{response}</p>}
    </div>
  );
};

export default AlarmTrigger;
