import type { WidgetData } from "../../model/types";

export default function AlertWidget({ data }: { data: WidgetData }) {
  const alerts = data.rows.filter((row) => row.status !== "good").slice(0, 5);

  return (
    <div className="alert-widget">
      {alerts.map((row) => (
        <div className="alert-row" data-status={row.status} key={row.id}>
          <span>{row.label}</span>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  );
}
