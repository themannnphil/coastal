import { create } from "zustand";

type Timeframe = "24h" | "7d" | "30d";

interface DashboardState {
  timeframe: Timeframe;
  setTimeframe: (t: Timeframe) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  timeframe: "24h",
  setTimeframe: (t) => set({ timeframe: t }),
}));
