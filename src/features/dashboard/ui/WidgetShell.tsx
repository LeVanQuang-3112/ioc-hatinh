import { memo, Suspense } from "react";
import { Card } from "@/shared/components/Card";
import { Skeleton } from "@/shared/components/Skeleton";
import { useVisibleOnce } from "@/shared/hooks/useVisibleOnce";
import { useWidgetData } from "../hooks/useWidgetData";
import type { DashboardFilters, WidgetConfig } from "../model/types";
import { LazyWidget } from "./widgetRegistry";

type Props = {
  widget: WidgetConfig;
  filters: DashboardFilters;
  eager?: boolean;
};

export const WidgetShell = memo(function WidgetShell({
  widget,
  filters,
  eager = false,
}: Props) {
  const { ref, visible } = useVisibleOnce();
  const shouldLoad = eager || visible || widget.priority === "high";
  const { data, error, loading, stale } = useWidgetData(widget, filters, shouldLoad);

  return (
    <Card as="article" ref={ref} className={`widget-card widget-${widget.type}`}>
      <div className="widget-card-header">
        <div>
          <p>{widget.group}</p>
          <h3>{widget.title}</h3>
        </div>
        {stale ? <span className="sync-pill">Sync</span> : null}
      </div>

      {error ? (
        <div className="widget-state">Không tải được dữ liệu</div>
      ) : !shouldLoad || loading ? (
        <Skeleton className={`skeleton-${widget.type}`} />
      ) : (
        <Suspense fallback={<Skeleton className={`skeleton-${widget.type}`} />}>
          <LazyWidget widget={widget} data={data} />
        </Suspense>
      )}
    </Card>
  );
});
