"use client";

import { Metric } from "../types/metric";
import { useMetrics } from "../hooks/useMetrics";

const DownloadData = () => {
  const { data: metrics, isLoading } = useMetrics();

  const downloadJSON = () => {
    if (!metrics) return;

    const blob = new Blob([JSON.stringify(metrics, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metrics.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = () => {
    if (!metrics) return;

    const header = Object.keys(metrics[0]).join(",");
    const rows = metrics.map((m) => Object.values(m).join(",")).join("\n");
    const csv = `${header}\n${rows}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metrics.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border rounded shadow bg-white space-y-3">
      <h2 className="text-lg text-base/7 text-gray-600  font-bold">Download Data</h2>
      <button
        onClick={downloadJSON}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        disabled={isLoading}
      >
        Export JSON
      </button>
      <button
        onClick={downloadCSV}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={isLoading}
      >
        Export CSV
      </button>
    </div>
  );
};

export default DownloadData;
