import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchIocReport } from "../api/iocReportApi";
import type { IocReportRequestHeader } from "../api/iocReport.dto";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";
import { indexIocReport } from "../lib/iocReportMapper";

type UseIocReportOptions = {
  enabled?: boolean;
};

export function useIocReport(
  header: IocReportRequestHeader,
  options: UseIocReportOptions = {},
) {
  const query = useQuery({
    queryKey: dashboardQueryKeys.iocReport(header),
    queryFn: ({ signal }) => fetchIocReport(header, signal),
    enabled: options.enabled ?? true,
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60_000,
  });
  const indexedData = useMemo(
    () => (query.data ? indexIocReport(query.data) : null),
    [query.data],
  );

  return {
    data: query.data ?? null,
    indexedData,
    error: query.error,
    loading: query.isLoading || query.isPending,
    stale: query.isFetching && Boolean(query.data),
  };
}
