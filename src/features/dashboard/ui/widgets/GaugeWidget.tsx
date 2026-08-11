import type { CSSProperties } from "react";
import type { WidgetData } from "../../model/types";

export default function GaugeWidget({ data }: { data: WidgetData }) {
  const value = Math.min(100, data.value);

  return (
    <div className="gauge-widget">
      <div
        className="gauge-ring"
        style={
          { "--value": `${value * 3.6}deg` } as CSSProperties &
            Record<"--value", string>
        }
      >
        <strong>{value}%</strong>
      </div>
      <div className="gauge-scale">
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
}
