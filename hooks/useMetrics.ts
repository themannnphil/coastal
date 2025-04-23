"use client";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useMetrics = (timeframe: string) => {
//   return useQuery({
//     queryKey: ["metrics", timeframe],
//     queryFn: async () => {
//       const res = await axios.get(`/api/metrics?timeframe=${timeframe}`, {
//         headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` },
//       });
//       return res.data;
//     },
//     staleTime: 60 * 1000,
//   });
// };// hooks/useMetrics.ts
import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosClient";
import { useDashboardStore } from "./useDashBoardStore";
import { Metric } from "../types/metric";

type MetricsResponse = {
  metrics: Metric[];
};

export const useMetrics = () => {
  const { timeframe } = useDashboardStore();

  return useQuery<Metric[], Error>({
    queryKey: ["metrics", timeframe],
    queryFn: async () => {
      const { data } = await axios.get<MetricsResponse>(
        `/metrics?timeframe=${timeframe}`
      );
      return data.metrics;
    },
  });
};
