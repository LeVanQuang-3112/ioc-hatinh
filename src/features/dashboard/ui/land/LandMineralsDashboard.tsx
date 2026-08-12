import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { currentReportingPeriod } from "../../model/reportingPeriod";

const landMonths = ["T5/2026", "T6/2026", "T7/2026", "T8/2026"];
const mineralPeriods = ["Q2/25", "Q3/25", "Q4/25", "Q1/26", "Q2/26", "Q3/26", "Q hiện tại"];

type LandComboChartConfig = {
  barData: number[];
  barLegend: string;
  lineData: number[];
  lineLegend: string;
  lineMax: number;
  title: string;
};

function LandPeriodSelect({ value = currentReportingPeriod.monthLabel }: { value?: string }) {
  return (
    <label className="land-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.monthLabel}>{currentReportingPeriod.monthLabel}</option>
        <option value={currentReportingPeriod.quarterNumericLabel}>{currentReportingPeriod.quarterNumericLabel}</option>
        <option value="Quý 2/2026">Quý 2/2026</option>
      </select>
    </label>
  );
}

function LandComboChart({ chart }: { chart: LandComboChartConfig }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#2f6df6", "#f5a10a"],
    grid: { left: 56, right: 66, top: 70, bottom: 64 },
    legend: {
      bottom: 18,
      left: 36,
      icon: "rect",
      itemGap: 42,
      itemHeight: 8,
      itemWidth: 13,
      textStyle: { color: "rgba(130, 151, 183, 0.9)", fontSize: 10, fontWeight: 700 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: landMonths,
      axisLabel: { color: "rgba(122, 143, 174, 0.92)", fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(122, 143, 174, 0.22)" } },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        name: "Giấy chứng nhận",
        nameLocation: "end",
        nameGap: 14,
        nameTextStyle: { color: "rgba(122, 143, 174, 0.9)", fontSize: 10, fontStyle: "italic", align: "left" },
        axisLabel: { color: "rgba(122, 143, 174, 0.9)", fontSize: 10 },
        splitLine: { lineStyle: { color: "rgba(86, 103, 132, 0.22)", type: "dashed" } },
      },
      {
        type: "value",
        min: 0,
        max: chart.lineMax,
        interval: chart.lineMax / 4,
        name: "ha",
        nameLocation: "end",
        nameGap: 14,
        nameTextStyle: { color: "rgba(122, 143, 174, 0.9)", fontSize: 10, fontStyle: "italic", align: "right" },
        axisLabel: {
          color: "rgba(122, 143, 174, 0.9)",
          fontSize: 10,
          formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
        },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: chart.barLegend,
        type: "bar",
        barWidth: 70,
        data: chart.barData,
        itemStyle: { borderRadius: [3, 3, 0, 0], color: "#294dbb" },
      },
      {
        name: chart.lineLegend,
        type: "line",
        yAxisIndex: 1,
        data: chart.lineData,
        symbolSize: 8,
        lineStyle: { color: "#f5a10a", width: 3 },
        itemStyle: { color: "#f5a10a", borderColor: "#f5a10a" },
      },
    ],
  }), [chart]);

  return <EChart className="land-combo-chart" option={option} ariaLabel={chart.title} />;
}

function LandGauge({ color, label, value }: { color: "#16c993" | "#f5a10a"; label: string; value: number }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ["50%", "68%"],
        radius: "96%",
        axisLine: {
          lineStyle: {
            width: 22,
            color: [[value / 100, color], [1, "rgba(63, 78, 103, 0.58)"]],
          },
        },
        progress: { show: true, width: 22, itemStyle: { color } },
        pointer: { show: false },
        anchor: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "20%"],
          formatter: (current: number) => `${current.toFixed(1).replace(".", ",")}%`,
          color,
          fontSize: 34,
          fontWeight: 900,
        },
        data: [{ value }],
      },
    ],
  }), [color, value]);

  return (
    <div className="land-gauge-item">
      <EChart className="land-gauge-chart" option={option} ariaLabel={label} />
      <span>MỤC TIÊU: 100%</span>
      <strong>{label}</strong>
    </div>
  );
}

function MineralTrendChart({
  color,
  data,
  label,
}: {
  color: "#16b58d" | "#f5a10a";
  data: number[];
  label: string;
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: [color],
    grid: { left: 44, right: 28, top: 28, bottom: 36 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: mineralPeriods,
      axisLabel: { color: "rgba(126, 146, 178, 0.92)", fontSize: 10, fontWeight: 800 },
      axisLine: { lineStyle: { color: "rgba(126, 146, 178, 0.24)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 500,
      interval: 125,
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: "rgba(88, 105, 136, 0.2)", type: "dashed" } },
    },
    series: [
      {
        name: label,
        type: "line",
        data,
        smooth: true,
        symbolSize: 8,
        lineStyle: { width: 3 },
        areaStyle: { color: `${color}24` },
      },
    ],
  }), [color, data, label]);

  return <EChart className="mineral-trend-chart" option={option} ariaLabel={label} />;
}

export function LandMineralsDashboard() {
  const comboCharts: LandComboChartConfig[] = [
    {
      title: "Số Giấy CNQSDĐ và tài sản khác gắn liền với đất được cấp mới",
      barLegend: "Số giấy CN được cấp mới",
      lineLegend: "Diện tích cấp mới (ha)",
      barData: [116, 96, 99, 72],
      lineData: [800, 1400, 1900, 2400],
      lineMax: 5000,
    },
    {
      title: "Lũy kế số Giấy CNQSDĐ và diện tích cấp mới",
      barLegend: "Lũy kế số giấy CN được cấp mới",
      lineLegend: "Lũy kế diện tích cấp mới",
      barData: [102, 97, 103, 214],
      lineData: [1250, 1900, 2380, 2050],
      lineMax: 5000,
    },
  ];

  return (
    <section className="land-minerals-dashboard" aria-label="Đất đai, khoáng sản">
      <div className="land-minerals-grid">
        {comboCharts.map((chart) => (
          <article className="land-panel land-chart-panel" key={chart.title}>
            <h3>{chart.title}</h3>
            <LandPeriodSelect />
            <LandComboChart chart={chart} />
          </article>
        ))}

        <article className="land-panel land-gauge-panel">
          <h3>Tỷ lệ đáp ứng nhu cầu khoáng sản (nhóm III & IV)</h3>
          <LandPeriodSelect value={currentReportingPeriod.quarterNumericLabel} />
          <div className="land-gauge-row">
            <LandGauge color="#16c993" label="Nhóm III" value={90.9} />
            <LandGauge color="#f5a10a" label="Nhóm IV" value={82.6} />
          </div>
        </article>

        <article className="land-panel land-mineral-panel">
          <h3>Khối lượng khoáng sản đã cấp (nhóm III & IV)</h3>
          <span className="land-unit">Đơn vị: m<sup>3</sup> - 2 biểu đồ đường xu hướng độc lập</span>
          <LandPeriodSelect value={currentReportingPeriod.quarterNumericLabel} />
          <div className="land-mineral-metrics">
            <strong className="green">Nhóm III <b>350,6 m<sup>3</sup></b></strong>
            <strong className="amber">Nhóm IV <b>451,9 m<sup>3</sup></b></strong>
          </div>
          <div className="mineral-chart-block green">
            <span>Xu hướng Nhóm III</span>
            <MineralTrendChart color="#16b58d" data={[148, 172, 238, 258, 284, 342, 414]} label="Xu hướng Nhóm III" />
          </div>
          <div className="mineral-chart-block amber">
            <span>Xu hướng Nhóm IV</span>
            <MineralTrendChart color="#f5a10a" data={[86, 112, 138, 182, 226, 276, 318]} label="Xu hướng Nhóm IV" />
          </div>
        </article>
      </div>
    </section>
  );
}
