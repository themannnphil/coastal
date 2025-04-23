import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Metric } from "../types/metric";

type Props = {
  metric: Metric;
};

// type Props = {
//   metric: {
//     name: string;
//     chartData: { time: string; value: number }[];
//   };
// };

const ChartCard = ({ metric }: Props) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <h4 className="text-lg text-black font-medium mb-2">{metric.name}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={metric.chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;
