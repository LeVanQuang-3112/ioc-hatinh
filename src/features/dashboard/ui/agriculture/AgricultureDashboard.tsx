import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { agricultureCharts, agriculturePeriods, type AgricultureChartConfig } from "../../model/dashboardContent";
import { currentReportingPeriod } from "../../model/reportingPeriod";

function AgriculturePeriodSelect() {
  return (
    <label className="agriculture-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={currentReportingPeriod.quarterShortValue} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.quarterShortValue}>{currentReportingPeriod.quarterLabel}</option>
        <option value="q1-2026">Quý I/2026</option>
        <option value="q2-2026">Quý II/2026</option>
      </select>
    </label>
  );
}

function AgricultureBarChart({ chart }: { chart: AgricultureChartConfig }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: chart.series.map((item) => item.color),
    grid: {
      left: 66,
      right: 32,
      top: 72,
      bottom: chart.series.length > 1 ? 70 : 54,
    },
    legend: {
      bottom: 14,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      show: chart.series.length > 1,
      textStyle: { color: "rgba(161, 178, 203, 0.9)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: agriculturePeriods,
      axisLabel: { color: "rgba(112, 136, 172, 0.92)", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: chart.max,
      interval: chart.max / 4,
      axisLabel: {
        color: "rgba(112, 136, 172, 0.92)",
        fontSize: 12,
        formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
      },
      splitLine: { lineStyle: { color: "rgba(125, 147, 174, 0.23)" } },
    },
    series: chart.series.map((item) => ({
      name: item.name,
      type: "bar",
      stack: chart.series.length > 1 ? "total" : undefined,
      barWidth: "60%",
      data: item.data,
      itemStyle: {
        borderRadius: chart.series.length > 1 ? 0 : [4, 4, 0, 0],
        color: item.color,
      },
    })),
  }), [chart]);

  return <EChart className="agriculture-chart" option={option} ariaLabel={chart.title} />;
}

function ForestCoverageGauge() {
  const option = useMemo<EChartsCoreOption>(() => ({
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ["50%", "64%"],
        radius: "88%",
        progress: {
          show: true,
          width: 22,
          itemStyle: { color: "#2ca85c" },
        },
        axisLine: {
          lineStyle: {
            width: 22,
            color: [[0.7, "#2ca85c"], [1, "#ffd05e"]],
          },
        },
        pointer: {
          icon: "rect",
          length: "45%",
          width: 6,
          offsetCenter: [0, "-8%"],
          itemStyle: { color: "#ffffff" },
        },
        anchor: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "-5%"],
          formatter: "{value}%",
          color: "#30b762",
          fontSize: 34,
          fontWeight: 900,
        },
        data: [{ value: 70 }],
      },
    ],
  }), []);

  return (
    <div className="agriculture-gauge-wrap">
      <EChart className="agriculture-gauge" option={option} ariaLabel="Tỷ lệ che phủ rừng" />
      <div className="agriculture-gauge-target">MỤC TIÊU: 55%</div>
    </div>
  );
}

export function AgricultureDashboard() {
  return (
    <section className="agriculture-dashboard" aria-label="Nhóm chỉ tiêu nông nghiệp">
      <div className="agriculture-grid">
        {agricultureCharts.slice(0, 3).map((chart) => (
          <article className="agriculture-panel" key={chart.title}>
            <h3>{chart.title}</h3>
            <span className="agriculture-unit">Đơn vị: {chart.unit}</span>
            <AgriculturePeriodSelect />
            <AgricultureBarChart chart={chart} />
          </article>
        ))}

        <article className="agriculture-panel agriculture-gauge-panel">
          <h3>Tỷ lệ che phủ rừng</h3>
          <ForestCoverageGauge />
        </article>

        {agricultureCharts.slice(3).map((chart) => (
          <article className="agriculture-panel" key={chart.title}>
            <h3>{chart.title}</h3>
            <span className="agriculture-unit">Đơn vị: {chart.unit}</span>
            <AgriculturePeriodSelect />
            <AgricultureBarChart chart={chart} />
          </article>
        ))}
      </div>
    </section>
  );
}
