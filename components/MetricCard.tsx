export default function MetricCard({ metric }: { metric: any }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-bold">{metric.name}</h3>
      <p className="text-2xl">{metric.value}</p>
    </div>
  );
}
