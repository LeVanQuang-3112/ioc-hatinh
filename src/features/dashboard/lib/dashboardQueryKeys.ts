import type { DashboardFilters, WidgetConfig } from "../model/types";

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  widget: (widget: WidgetConfig, filters: DashboardFilters) =>
    [
      ...dashboardQueryKeys.all,
      "widget",
      widget.id,
      filters.period,
      filters.unit,
    ] as const,
  iocReport: (code: string, period: string) =>
    [...dashboardQueryKeys.all, "ioc-report", code, period] as const,
};
