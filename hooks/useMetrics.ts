//hooks/useMetrics.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "../lib/axiosClient";
import { useDashboardStore } from "./useDashBoardStore";
import { RawMetric } from "../types/metric";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

type MetricsResponse = {
  success: boolean;
  metric: RawMetric[];  // Assuming data contains the array of metrics
};

export const useMetrics = () => {
  const { timeframe } = useDashboardStore();
   if (!timeframe) {
    throw new Error("Timeframe is not defined.");
  }

  return useQuery<RawMetric[], Error>({
    queryKey: ["metrics", timeframe],
    queryFn: async () => {
       try {
        // Fetch metrics from the API using the specified timeframe

        // const { data }: { data: MetricsResponse } = await axios.get(`http://localhost:8000/api/metrics?timeframe=24h`);
        const res = await axios.get(`${API_BASE_URL}/api/metrics?timeframe=${timeframe}`);
        // Ensure that we return an empty array if data.metrics is undefined
        console.log("Fetched Metrics:", res.data);  
        return res.data || [];
        
        

        

      } catch (error) {
        throw new Error("Failed to fetch metrics");
      }
    },
    staleTime: 1000 * 60,  // 1 min cache
    refetchInterval: 10000, // Auto refetch every 10s
    retry: 1,
  });
};
