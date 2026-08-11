import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart, GaugeChart, LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsCoreOption } from "echarts/core";

echarts.use([
  BarChart,
  GaugeChart,
  LineChart,
  PieChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
]);

type EChartProps = {
  className?: string;
  option: EChartsCoreOption;
  ariaLabel: string;
};

function EChart({ className = "", option, ariaLabel }: EChartProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const latestOptionRef = useRef(option);

  useEffect(() => {
    if (!rootRef.current) {
      return undefined;
    }

    let frameId = 0;

    const syncChart = () => {
      const root = rootRef.current;

      if (!root) {
        return;
      }

      if (!root.clientWidth || !root.clientHeight) {
        return;
      }

      if (!chartRef.current) {
        chartRef.current = echarts.init(root, undefined, {
          renderer: "canvas",
        });
        chartRef.current.setOption(latestOptionRef.current, true);
        return;
      }

      chartRef.current.resize();
    };

    frameId = requestAnimationFrame(syncChart);

    const resizeObserver = new ResizeObserver(() => {
      syncChart();
    });
    resizeObserver.observe(rootRef.current);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      chartRef.current?.dispose();
      chartRef.current = null;
    };
  }, []);

  useEffect(() => {
    latestOptionRef.current = option;
    chartRef.current?.setOption(option, true);
  }, [option]);

  return (
    <div
      ref={rootRef}
      className={className}
      role="img"
      aria-label={ariaLabel}
    />
  );
}

export default EChart;
