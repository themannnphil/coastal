// // utils/transformMetrics.ts
// import { RawMetric, FlattenedMetric } from "../types/metric";

// export function flattenMetrics(raw: RawMetric): FlattenedMetric[] {
//   return [
//     { name: "Wave Height", ...raw.wave_height, id: raw.id, timestamp: raw.timestamp },
//     { name: "Water Height", ...raw.water_height, id: raw.id, timestamp: raw.timestamp },
//     { name: "Temperature", ...raw.temperature, id: raw.id, timestamp: raw.timestamp },
//     { name: "Humidity", ...raw.humidity, id: raw.id, timestamp: raw.timestamp },
//     { name: "Air Pressure", ...raw.air_pressure, id: raw.id, timestamp: raw.timestamp },
//     { name: "Wind Speed", ...raw.wind_speed, id: raw.id, timestamp: raw.timestamp }
//   ];
// }
// utils/groupChartMetrics.ts

import { RawMetric } from '../types/metric';

export function flattenMetrics(metrics: RawMetric[]) {
  const grouped = {
    "Wave Height": [],
    "Water Height": [],
    "Temperature": [],
    "Humidity": [],
    "Air Pressure": [],
    "Wind Speed": [],
  };

  metrics.forEach((entry) => {
    grouped["Wave Height"].push(entry.wave_height.chartData[0]);
    grouped["Water Height"].push(entry.water_height.chartData[0]);
    grouped["Temperature"].push(entry.temperature.chartData[0]);
    grouped["Humidity"].push(entry.humidity.chartData[0]);
    grouped["Air Pressure"].push(entry.air_pressure.chartData[0]);
    grouped["Wind Speed"].push(entry.wind_speed.chartData[0]);
  });

  return [
    { name: "Wave Height", unit: "m", chartData: grouped["Wave Height"] },
    { name: "Water Height", unit: "m", chartData: grouped["Water Height"] },
    { name: "Temperature", unit: "°C", chartData: grouped["Temperature"] },
    { name: "Humidity", unit: "%", chartData: grouped["Humidity"] },
    { name: "Air Pressure", unit: "hPa", chartData: grouped["Air Pressure"] },
    { name: "Wind Speed", unit: "m/s", chartData: grouped["Wind Speed"] },
  ];
}
