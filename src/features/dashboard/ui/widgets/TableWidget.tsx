import { memo, useMemo, useState } from "react";
import type { WidgetData } from "../../model/types";

const ROW_HEIGHT = 34;
const TABLE_HEIGHT = 156;
const OVERSCAN = 4;

function TableWidget({ data }: { data: WidgetData }) {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const visibleCount = Math.ceil(TABLE_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;
  const rows = useMemo(
    () => data.rows.slice(startIndex, startIndex + visibleCount),
    [data.rows, startIndex, visibleCount],
  );

  return (
    <div className="table-widget">
      <div className="table-head">
        <span>Đơn vị</span>
        <span>Điểm</span>
      </div>
      <div
        className="table-viewport"
        onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      >
        <div className="table-spacer" style={{ height: data.rows.length * ROW_HEIGHT }}>
          <div
            className="table-window"
            style={{ transform: `translateY(${startIndex * ROW_HEIGHT}px)` }}
          >
            {rows.map((row) => (
              <div className="table-row" data-status={row.status} key={row.id}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(TableWidget);
