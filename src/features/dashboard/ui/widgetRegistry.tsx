import { lazy } from "react";
import type { WidgetConfig, WidgetData } from "../model/types";

const KpiWidget = lazy(() => import("./widgets/KpiWidget"));
const ChartWidget = lazy(() => import("./widgets/ChartWidget"));
const TableWidget = lazy(() => import("./widgets/TableWidget"));
const GaugeWidget = lazy(() => import("./widgets/GaugeWidget"));
const AlertWidget = lazy(() => import("./widgets/AlertWidget"));

type Props = {
  widget: WidgetConfig;
  data: WidgetData | null;
};

export function LazyWidget({ widget, data }: Props) {
  if (!data) return null;

  switch (widget.type) {
    case "kpi":
      return <KpiWidget data={data} />;
    case "chart":
      return <ChartWidget data={data} />;
    case "table":
      return <TableWidget data={data} />;
    case "gauge":
      return <GaugeWidget data={data} />;
    case "alert":
      return <AlertWidget data={data} />;
  }
}
