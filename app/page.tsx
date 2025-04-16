"use client"; // Needed to use Zustand, React Query in App Router
import { useDashboardStore } from "../store/useDashboardStore";
import { useMetrics } from "../hooks/useMetrics";
import MetricCard from "../components/MetricCard";
import ChartCard from "../components/ChartCard";
import TimeFrameToggle from "../components/TimeFrameToggle";

export default function Dashboard() {
  const { timeframe } = useDashboardStore();
  const { data, isLoading } = useMetrics(timeframe);

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <TimeFrameToggle />
      {data.metrics.map((metric: any) => (
        <MetricCard key={metric.name} metric={metric} />
      ))}
      {data.metrics.map((metric: any) => (
        <ChartCard key={metric.name} metric={metric} />
      ))}
    </main>
  );
}
