import { useDashboardStore } from "../hooks/useDashBoardStore";
import { Metric } from "../types/metric";

type Props = {
  metric: Metric;
};

const TimeFrameToggle = () => {
  const { timeframe, setTimeframe } = useDashboardStore();

  return (
    <div className="flex gap-2">
      {["24h", "7d", "30d"].map((t) => (
        <button
          key={t}
          onClick={() => setTimeframe(t as any)}
          className={`px-4 py-2 rounded border 
            ${
              timeframe === t
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800"
            }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameToggle;
