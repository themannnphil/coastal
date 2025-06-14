// utils/groupChartMetrics.ts

import { RawMetric } from '../types/metric';

export function groupChartData(metrics: RawMetric[]) {
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
