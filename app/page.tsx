"use client"; // Needed to use Zustand, React Query in App Router

import { useMetrics } from "../hooks/useMetrics";
import TimeFrameToggle from "../components/TimeFrameToggle";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import AlarmTrigger from "../components/AlarmTrigger";
import DownloadData from "../components/DownloadData";
import Header from "../components/Header";
import MapPanel from "../components/MapPanel";
import { Metric } from "../types/metric"; 

export default function Dashboard() {
  const { data: metrics, isLoading, isError, error } = useMetrics();

  if (isError) {
    console.error("Error fetching metrics:", error);
    return <div>Error loading data.</div>;
  } 

  console.log({ isLoading, metrics });
  console.error()

  if (isLoading || !metrics)
    return  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
  {[...Array(4)].map((_, i) => (
    <div key={i} className="h-28 bg-gray-200 rounded" />
  ))}
</div>
  //  <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <Header />
     

      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TimeFrameToggle />
          <div className="flex gap-2">
            <AlarmTrigger />
            <DownloadData />
          </div>
        </div>
        <section aria-label="Live Metrics">
          <h2 className="text-xl font-semibold text-white-500">Live Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.name} metric={metric} />
            ))}
          </div>
        </section>
        <h2 className="text-xl font-semibold text-White-300">Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <ChartCard key={metric.name} metric={metric} />
          ))}
        </div>
        <MapPanel />
      </div>
    </div>
  );
}