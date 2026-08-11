export type WidgetType = "kpi" | "chart" | "table" | "gauge" | "alert";

export type WidgetPriority = "high" | "normal" | "low";

export type DashboardFilters = {
  period: "today" | "week" | "month";
  unit: "all" | "city" | "north" | "south";
};

export type WidgetConfig = {
  id: string;
  title: string;
  type: WidgetType;
  group: "overview" | "revenue" | "network" | "customer" | "alerts";
  priority: WidgetPriority;
  dataKey: string;
};

export type WidgetData = {
  value: number;
  unit: string;
  trend: number;
  series: number[];
  rows: Array<{
    id: string;
    label: string;
    value: number;
    status: "good" | "warning" | "critical";
  }>;
};
