// types/metric.ts
export type MetricStatus = "normal" | "warning" | "critical";

export interface Metric {
  name: string;
  unit: string;
  value: number;
  previous: number;
  change: number;
  status: MetricStatus;
  chartData: { time: string; value: number }[];
}
