import type { DashboardFilters, WidgetConfig } from "../model/types";
import type { IocReportRequestHeader } from "../api/iocReport.dto";

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
  iocReport: (header: IocReportRequestHeader) =>
    [
      ...dashboardQueryKeys.all,
      "ioc-report",
      header.code,
      header.org,
      header.period,
    ] as const,
};
