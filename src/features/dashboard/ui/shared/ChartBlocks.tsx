import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { trendLabels, type DetailData } from "../../model/dashboardContent";

export function MiniLineChart({ series = [42, 68, 55, 73, 82, 96] }: { series?: number[] }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#ffbd63", "#56d7ff"],
    grid: {
      left: 14,
      right: 16,
      top: 18,
      bottom: 16,
      containLabel: false,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: trendLabels,
      boundaryGap: false,
      axisLabel: { color: "rgba(198, 218, 244, 0.62)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "rgba(198, 218, 244, 0.62)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.08)" } },
    },
    series: [
      {
        name: "Kế hoạch",
        type: "line",
        data: series,
        smooth: true,
        symbolSize: 7,
        lineStyle: { width: 4 },
        areaStyle: { color: "rgba(255, 189, 99, 0.18)" },
      },
      {
        name: "Thực hiện",
        type: "line",
        data: series.map((value, index) => Math.max(12, value - 18 + index * 3)),
        smooth: true,
        symbolSize: 0,
        lineStyle: { width: 3 },
      },
    ],
  }), [series]);

  return <EChart className="detail-line-chart" option={option} ariaLabel="Biểu đồ xu hướng" />;
}

export function PieChartBlock({ items }: { items: DetailData["pie"] }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: items.map((item) => item.tone),
    legend: { show: false },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["48%", "76%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
          borderColor: "rgba(11, 17, 29, 0.96)",
          borderWidth: 2,
        },
        data: items.map((item) => ({ name: item.label, value: item.value })),
      },
    ],
  }), [items]);

  return (
    <div className="pie-block">
      <EChart className="pie-visual" option={option} ariaLabel="Biểu đồ cơ cấu chỉ tiêu" />
      <div className="pie-legend">
        {items.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.tone }} />
            {item.label}: {item.value}%
          </span>
        ))}
      </div>
    </div>
  );
}
