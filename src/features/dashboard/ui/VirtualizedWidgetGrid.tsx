import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { DashboardFilters, WidgetConfig } from "../model/types";
import { WidgetShell } from "./WidgetShell";

type Props = {
  widgets: WidgetConfig[];
  filters: DashboardFilters;
};

const ROW_HEIGHT = 276;
const OVERSCAN = 2;

export const VirtualizedWidgetGrid = memo(function VirtualizedWidgetGrid({
  widgets,
  filters,
}: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [columns, setColumns] = useState(4);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(720);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setViewportHeight(element.clientHeight);
      if (width < 680) setColumns(1);
      else if (width < 980) setColumns(2);
      else if (width < 1280) setColumns(3);
      else setColumns(4);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const rows = useMemo(() => {
    const nextRows: WidgetConfig[][] = [];
    for (let index = 0; index < widgets.length; index += columns) {
      nextRows.push(widgets.slice(index, index + columns));
    }
    return nextRows;
  }, [columns, widgets]);

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT) + OVERSCAN * 2;
  const endIndex = Math.min(rows.length, startIndex + visibleCount);
  const visibleRows = rows.slice(startIndex, endIndex);
  const totalHeight = rows.length * ROW_HEIGHT;
  const offsetY = startIndex * ROW_HEIGHT;

  return (
    <div
      ref={viewportRef}
      className="virtual-grid"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <div className="virtual-grid-spacer" style={{ height: totalHeight }}>
        <div
          className="virtual-grid-window"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          {visibleRows.map((row, rowIndex) => (
            <div
              className="virtual-grid-row"
              data-columns={columns}
              key={`row-${startIndex + rowIndex}`}
            >
              {row.map((widget) => (
                <WidgetShell key={widget.id} widget={widget} filters={filters} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
