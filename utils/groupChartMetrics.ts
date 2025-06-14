// utils/groupChartMetrics.ts
import { RawMetric } from "../types/metric";

export function flattenMetrics(metrics: RawMetric[]) {
  const result: {
    name: string;
    unit: string;
    value: number;
    change: number;
    status: string;
    timestamp: string;
    chartData: { time: string; value: number }[];
  }[] = [];

  metrics.forEach((entry) => {
    result.push(
      {
        name: "Wave Height",
        unit: entry.wave_height.unit,
        value: entry.wave_height.value,
        change: entry.wave_height.change,
        status: entry.wave_height.status,
        timestamp: entry.timestamp,
        chartData: entry.wave_height.chartData,
      },
      {
        name: "Water Height",
        unit: entry.water_height.unit,
        value: entry.water_height.value,
        change: entry.water_height.change,
        status: entry.water_height.status,
        timestamp: entry.timestamp,
        chartData: entry.water_height.chartData,
      },
      {
        name: "Temperature",
        unit: entry.temperature.unit,
        value: entry.temperature.value,
        change: entry.temperature.change,
        status: entry.temperature.status,
        timestamp: entry.timestamp,
        chartData: entry.temperature.chartData,
      },
      {
        name: "Humidity",
        unit: entry.humidity.unit,
        value: entry.humidity.value,
        change: entry.humidity.change,
        status: entry.humidity.status,
        timestamp: entry.timestamp,
        chartData: entry.humidity.chartData,
      },
      {
        name: "Air Pressure",
        unit: entry.air_pressure.unit,
        value: entry.air_pressure.value,
        change: entry.air_pressure.change,
        status: entry.air_pressure.status,
        timestamp: entry.timestamp,
        chartData: entry.air_pressure.chartData,
      },
      {
        name: "Wind Speed",
        unit: entry.wind_speed.unit,
        value: entry.wind_speed.value,
        change: entry.wind_speed.change,
        status: entry.wind_speed.status,
        timestamp: entry.timestamp,
        chartData: entry.wind_speed.chartData,
      }
    );
  });

  return result;
}
