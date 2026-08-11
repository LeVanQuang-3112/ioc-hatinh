import type { WidgetData } from "../../model/types";

export default function KpiWidget({ data }: { data: WidgetData }) {
  const trendClass = data.trend >= 0 ? "trend-up" : "trend-down";

  return (
    <div className="kpi-widget">
      <strong>
        {data.value}
        {data.unit}
      </strong>
      <span className={trendClass}>
        {data.trend >= 0 ? "+" : ""}
        {data.trend}%
      </span>
    </div>
  );
}
