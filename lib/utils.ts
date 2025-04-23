export const getStatus = (
  value: number,
  thresholds: { warning: number; critical: number }
) => {
  if (value >= thresholds.critical) return "critical";
  if (value >= thresholds.warning) return "warning";
  return "normal";
};

export const getChangePercentage = (current: number, previous: number) => {
  return +(((current - previous) / previous) * 100).toFixed(2);
};
