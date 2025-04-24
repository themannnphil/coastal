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

const ChartCard = ({ metric }: Props) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <h4 className="text-base/7 text-gray-600 ">{metric.name}</h4>
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
