import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { industrialCharts, industrialMonths, type IndustrialChartConfig } from "../../model/dashboardContent";
import { currentReportingPeriod } from "../../model/reportingPeriod";

function IndustrialPeriodSelect() {
  return (
    <label className="industrial-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={currentReportingPeriod.monthValue} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.monthValue}>{currentReportingPeriod.monthLabel}</option>
        <option value={currentReportingPeriod.quarterValue}>{currentReportingPeriod.quarterNumericLabel}</option>
        <option value="month-7-2026">Tháng 7/2026</option>
      </select>
    </label>
  );
}

function formatIndustrialAxis(value: number) {
  return Number.isInteger(value) ? `${value}` : `${value}`.replace(".", ",");
}

function IndustrialProductChart({ item }: { item: IndustrialChartConfig }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: item.series.map((serie) => serie.color),
    grid: {
      left: 64,
      right: 28,
      top: 80,
      bottom: item.series.length > 1 ? 58 : 34,
    },
    legend: {
      show: item.series.length > 1,
      bottom: 8,
      left: 64,
      icon: "rect",
      itemGap: 12,
      itemHeight: 9,
      itemWidth: 9,
      textStyle: { color: "rgba(143, 162, 189, 0.92)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: industrialMonths,
      axisLabel: { color: "#6f85a8", fontSize: 12, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: item.max,
      interval: item.interval,
      axisLabel: {
        color: "#6f85a8",
        fontSize: 12,
        formatter: formatIndustrialAxis,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(102, 122, 154, 0.28)", width: 1 } },
    },
    series: item.series.map((serie) => ({
      name: serie.name,
      type: "bar",
      stack: item.series.length > 1 ? "total" : undefined,
      barWidth: "66%",
      data: serie.data,
      itemStyle: { borderRadius: item.series.length > 1 ? 0 : [4, 4, 2, 2] },
      emphasis: { focus: "series" },
    })),
  }), [item]);

  return (
    <article className="industrial-card">
      <div className="industrial-card-head">
        <div>
          <h2>{item.title}</h2>
          <p>Đơn vị: {item.unit}</p>
        </div>
        <IndustrialPeriodSelect />
      </div>
      <EChart
        ariaLabel={`Biểu đồ ${item.title}`}
        className="industrial-chart"
        option={option}
      />
    </article>
  );
}

export function IndustrialProductsDashboard() {
  return (
    <section className="industrial-dashboard" aria-label="Nhóm sản phẩm công nghiệp">
      <div className="industrial-grid">
        {industrialCharts.map((item) => (
          <IndustrialProductChart item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}
