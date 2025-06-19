
// types/metric.ts
export type MetricStatus = {
  value: number;
  previous: number;
  change: number;
  status: 'normal' | 'warning' | 'critical';
  unit: string;
  chartData: { time: string; value: number }[];
};

export type RawMetric = {
  id: number;
  wave_height: MetricStatus;
  water_height: MetricStatus;
  temperature: MetricStatus;
  humidity: MetricStatus;
  air_pressure: MetricStatus;
  wind_speed: MetricStatus;
  timestamp: string;
};

export interface FlattenedMetric {
  id: number;
  name: string;
  value: number;
  previous: number;
  change: number;
  status: 'normal' | 'warning' | 'critical';
  unit: string;
  chartData: { time: string; value: number }[];
  timestamp: string;
}
