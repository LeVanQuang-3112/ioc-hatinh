import { useQuery } from "@tanstack/react-query";
import { dashboardQueryKeys } from "../lib/dashboardQueryKeys";
import { fetchIocReport, indexIocReport } from "../services/iocReportService";

export function useIocReport(code: string, period: string) {
  const query = useQuery({
    queryKey: dashboardQueryKeys.iocReport(code, period),
    queryFn: ({ signal }) => fetchIocReport(code, period, signal),
    staleTime: 5 * 60_000,
  });

  return {
    indicators: query.data ? indexIocReport(query.data) : null,
    loading: query.isLoading,
    error: query.isError,
  };
}
