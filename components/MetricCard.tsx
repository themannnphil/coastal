import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/20/solid";
import { Metric } from "../types/metric";

type Props = {
  metric: Metric;
};

// type Props = {
//   metric: {
//     name: string;
//     unit: string;
//     value: number;
//     change: number;
//     status: "normal" | "warning" | "critical";
//   };
// };

const statusColors = {
  normal: "bg-green-200 text-green-800",
  warning: "bg-yellow-200 text-yellow-800",
  critical: "bg-red-200 text-red-800",
};

const MetricCard = ({ metric }: Props) => {
  const isPositive = metric.change >= 0;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white space-y-2 rounded-xl shadow border">
      <div className="flex justify-between items-center">
        <h3 className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {metric.name}
        </h3>
        <span
          className={`px-2 py-1 rounded text-sm ${statusColors[metric.status]}`}
        >
          {" "}
          {/* warning status */}
          {metric.status.toUpperCase()}
        </span>
      </div>
      <div className="text-base/7 text-gray-600 ">
        {metric.value} {metric.unit}
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-600">
        {isPositive ? (
          <ArrowUpIcon className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 text-red-500" />
        )}
        {Math.abs(metric.change)}%
      </div>
    </div>
  );
};

export default MetricCard;
