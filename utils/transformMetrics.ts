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
import { RawMetric } from "../types/metric";

export function flattenMetrics(metrics: RawMetric[]) {
  const grouped = {
    "Wave Height": [] as { time: string; value: number }[],
    "Water Height": [] as { time: string; value: number }[],
    "Temperature": [] as { time: string; value: number }[],
    "Humidity": [] as { time: string; value: number }[],
    "Air Pressure": [] as { time: string; value: number }[],
    "Wind Speed": [] as { time: string; value: number }[],
  };

  metrics.forEach((entry) => {
    grouped["Wave Height"].push(entry.wave_height.chartData[0]);
    grouped["Water Height"].push(entry.water_height.chartData[0]);
    grouped["Temperature"].push(entry.temperature.chartData[0]);
    grouped["Humidity"].push(entry.humidity.chartData[0]);
    grouped["Air Pressure"].push(entry.air_pressure.chartData[0]);
    grouped["Wind Speed"].push(entry.wind_speed.chartData[0]);
  });

  const getLatestTime = (data: { time: string }[]) =>
    data.length > 0
      ? data.reduce((latest, curr) =>
          new Date(curr.time) > new Date(latest.time) ? curr : latest
        ).time
      : "";
  
   
  return [
    {
      name: "Wave Height",
      unit: "m",
      chartData: grouped["Wave Height"],
      timestamp: getLatestTime(grouped["Wave Height"]),
      change: metrics[0]?.wave_height.change,  
      status: metrics[0]?.wave_height.status,  
      value: metrics[0]?.wave_height.value,  

    },
    {
      name: "Water Height",
      unit: "m",
      chartData: grouped["Water Height"],
      timestamp: getLatestTime(grouped["Water Height"]),
      change: metrics[0]?.water_height.change,  
      status: metrics[0]?.water_height.status,  
      value: metrics[0]?.water_height.value, 
    },
    {
      name: "Temperature",
      unit: "°C",
      chartData: grouped["Temperature"],
      timestamp: getLatestTime(grouped["Temperature"]),
      change: metrics[0]?.temperature.change,  
      status: metrics[0]?.temperature.status,  
      value: metrics[0]?.temperature.value, 
    },
    {
      name: "Humidity",
      unit: "%",
      chartData: grouped["Humidity"],
      timestamp: getLatestTime(grouped["Humidity"]),
      change: metrics[0]?.humidity.change,  
      status: metrics[0]?.humidity.status,  
      value: metrics[0]?.humidity.value, 
    },
    {
      name: "Air Pressure",
      unit: "hPa",
      chartData: grouped["Air Pressure"],
      timestamp: getLatestTime(grouped["Air Pressure"]),
      change: metrics[0]?.air_pressure.change,  
      status: metrics[0]?.air_pressure.status,  
      value: metrics[0]?.air_pressure.value, 
    },
    {
      name: "Wind Speed",
      unit: "m/s",
      chartData: grouped["Wind Speed"],
      timestamp: getLatestTime(grouped["Wind Speed"]),
      change: metrics[0]?.wind_speed.change,  
      status: metrics[0]?.wind_speed.status,  
      value: metrics[0]?.wind_speed.value, 
    },
  ];
}
// This function takes an array of RawMetric objects and returns an array of flattened metrics
// with the latest timestamp for each metric type.
// It groups the chart data by metric type and extracts the latest timestamp for each metric.
// The returned array contains objects with the metric name, unit, chart data, and latest timestamp.
// This allows for easier rendering of metrics in components like MetricCard and ChartCard.
