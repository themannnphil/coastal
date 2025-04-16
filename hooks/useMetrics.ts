"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMetrics = (timeframe: string) => {
  return useQuery({
    queryKey: ["metrics", timeframe],
    queryFn: async () => {
      const res = await axios.get(`/api/metrics?timeframe=${timeframe}`, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` },
      });
      return res.data;
    },
    staleTime: 60 * 1000,
  });
};
