import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { BarChart, GaugeChart, LineChart, MapChart, PieChart, ScatterChart } from "echarts/charts";
import {
  GeoComponent,
  GridComponent,
  GraphicComponent,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { EChartsCoreOption } from "echarts/core";

echarts.use([
  BarChart,
  GaugeChart,
  LineChart,
  MapChart,
  PieChart,
  ScatterChart,
  GeoComponent,
  GridComponent,
  GraphicComponent,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

type EChartProps = {
  className?: string;
  option: EChartsCoreOption;
  ariaLabel: string;
};

const dashboardChartAnimation: EChartsCoreOption = {
  animation: true,
  animationThreshold: 10000,
  animationDuration: 1100,
  animationDurationUpdate: 800,
  animationEasing: "cubicOut",
  animationEasingUpdate: "cubicOut",
};

type SeriesOption = Record<string, unknown>;

const barLikeSeriesTypes = new Set(["bar", "pictorialBar"]);

function getSeriesAnimationDefaults(series: SeriesOption): SeriesOption {
  const type = series.type;

  if (barLikeSeriesTypes.has(String(type))) {
    return {
      animationDelay: (index: number) => index * 45,
      animationDelayUpdate: (index: number) => index * 24,
    };
  }

  if (type === "line") {
    return {
      animationDelay: 100,
      animationDelayUpdate: 60,
    };
  }

  if (type === "pie") {
    return {
      animationType: "scale",
      animationDelay: (index: number) => index * 55,
      animationDelayUpdate: (index: number) => index * 24,
    };
  }

  if (type === "gauge") {
    const detail = typeof series.detail === "object" && series.detail !== null
      ? series.detail
      : {};

    return {
      detail: {
        valueAnimation: true,
        ...detail,
      },
    };
  }

  return {
    animationDelay: (index: number) => index * 32,
    animationDelayUpdate: (index: number) => index * 18,
  };
}

function withSeriesAnimationDefaults(series: SeriesOption): SeriesOption {
  const defaults = getSeriesAnimationDefaults(series);
  const detail = defaults.detail || series.detail
    ? {
        ...(defaults.detail as SeriesOption | undefined),
        ...(series.detail as SeriesOption | undefined),
      }
    : undefined;

  const nextSeries = {
    ...defaults,
    ...series,
  };

  if (detail) {
    nextSeries.detail = detail;
  }

  return nextSeries;
}

function withDashboardDefaults(option: EChartsCoreOption): EChartsCoreOption {
  const series = (option as { series?: SeriesOption | SeriesOption[] }).series;
  const nextSeries = Array.isArray(series)
    ? series.map(withSeriesAnimationDefaults)
    : series
      ? withSeriesAnimationDefaults(series)
      : series;

  return {
    ...dashboardChartAnimation,
    ...option,
    series: nextSeries,
  };
}

function EChart({ className = "", option, ariaLabel }: EChartProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  const latestOptionRef = useRef(withDashboardDefaults(option));

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
    const nextOption = withDashboardDefaults(option);
    latestOptionRef.current = nextOption;
    chartRef.current?.setOption(nextOption, true);
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
