import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  timeframe: "24h",
  setTimeframe: (tf: string) => set({ timeframe: tf }),
}));
