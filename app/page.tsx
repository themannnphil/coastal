"use client"; // Needed to use Zustand, React Query in App Router

import { useMetrics } from "../hooks/useMetrics";
import TimeFrameToggle from "../components/TimeFrameToggle";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import { Metric } from "../types/metric";

export default function Dashboard() {
  const { data: metrics, isLoading, isError, error } = useMetrics();

  if (isError) {
    console.error("Error fetching metrics:", error);
    return <div>Error loading data.</div>;
  }

  console.log({ isLoading, metrics });

  if (isLoading || !metrics)
    return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <TimeFrameToggle />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.name} metric={metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <ChartCard key={metric.name} metric={metric} />
        ))}
      </div>
    </div>
  );
}
