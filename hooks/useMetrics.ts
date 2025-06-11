//hooks/useMetrics.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosClient";
import { useDashboardStore } from "./useDashBoardStore";
import { Metric } from "../types/metric";

type MetricsResponse = {
  success: boolean;
  metric: Metric[];  // Assuming data contains the array of metrics
};

export const useMetrics = () => {
  const { timeframe } = useDashboardStore();
   if (!timeframe) {
    throw new Error("Timeframe is not defined.");
  }

  return useQuery<Metric[], Error>({
    queryKey: ["metrics", timeframe],
    queryFn: async () => {
       try {
        const { data }: { data: MetricsResponse } = await axios.get(`/api/metrics?timeframe=${timeframe}`);
        

        // Ensure that we return an empty array if data.metrics is undefined
        console.log("Fetched Metrics:", data);  
        return data.metric || [];  // Fallback to an empty array
      } catch (error) {
        throw new Error("Failed to fetch metrics");
      }
    },
    staleTime: 1000 * 60, // optional
    retry: 1,
  });
};
