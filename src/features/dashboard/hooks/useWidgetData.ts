import { useQuery } from "@tanstack/react-query";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";
import type { DashboardFilters, WidgetConfig } from "../model/types";
import { dashboardMockService } from "../services/dashboardMockService";

export function useWidgetData(
  widget: WidgetConfig,
  filters: DashboardFilters,
  enabled: boolean,
) {
  const query = useQuery({
    queryKey: dashboardQueryKeys.widget(widget, filters),
    queryFn: ({ signal }) =>
      dashboardMockService.fetchWidgetData(widget, filters, signal),
    enabled,
    placeholderData: (previousData) => previousData,
  });

  return {
    data: query.data ?? null,
    error: query.isError,
    loading: query.isLoading || query.isPending,
    stale: query.isFetching && Boolean(query.data),
  };
}
