"use client"; // Needed to use Zustand, React Query in App Router

import { useMetrics } from "../hooks/useMetrics";
import TimeFrameToggle from "../components/TimeFrameToggle";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import AlarmTrigger from "../components/AlarmTrigger";
import DownloadData from "../components/DownloadData";
import Header from "../components/Header";
import MapPanel from "../components/MapPanel";
import { flattenMetrics } from '@/utils/transformMetrics';
import { FlattenedMetric } from '../types/metric'; 



export default function Dashboard() {
  const { data: metrics, isLoading, isError, error } = useMetrics();

  if (isLoading || !metrics) {
  return <div className="text-center p-4">Loading...!</div>;
}

if (isError) {
  console.error("Error fetching metrics:", error);
  return <div className="text-center p-4 text-red-500">Failed to load metrics</div>;
}
  

  
  
  console.log({ isLoading, metrics });
  console.error()
const flattenedMetrics = flattenMetrics(metrics); // metrics = raw array from backend
  // const flattenedMetrics: FlattenedMetric[] = metrics.flatMap((metric) => flattenMetrics(metric));
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
           {flattenedMetrics.map((metric) => (
              <MetricCard key={`${metric.name}-${metric.timestamp}`} metric={metric} name={metric.name}  />
          ))}
          </div>
        </section>
        <h2 className="text-xl font-semibold text-White-300">Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flattenedMetrics.map((metric) => (
            <ChartCard key={`${metric.name}`} metric={metric} name={metric.name} />
          ))}
        </div>
        <MapPanel />
      </div>
    </div>
  );
}