import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { currentReportingPeriod } from "../../model/reportingPeriod";

const planningWeeklyLabels = ["Tuần 27", "Tuần 28", "Tuần 29", "Tuần 30", "Tuần 31", "Tuần 32"];

function PlanningPeriodSelect({
  compact = false,
  defaultValue = currentReportingPeriod.monthValue,
}: {
  compact?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className={`planning-period ${compact ? "compact" : ""}`}>
      <span>Kỳ báo cáo</span>
      <select defaultValue={defaultValue} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.monthValue}>{currentReportingPeriod.monthLabel}</option>
        <option value="week-1">Tuần 1 (27/07/2026-01/08/2026)</option>
        <option value={currentReportingPeriod.quarterValue}>{currentReportingPeriod.quarterLabel}</option>
      </select>
    </label>
  );
}

function PlanningGauge({
  label,
  target = "100%",
  value,
}: {
  label: string;
  target?: string;
  value: number;
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    series: [
      {
        type: "gauge",
        startAngle: 190,
        endAngle: -10,
        min: 0,
        max: 100,
        center: ["50%", "64%"],
        radius: "94%",
        progress: {
          show: true,
          roundCap: true,
          width: 22,
          itemStyle: { color: "#16c995" },
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 22,
            color: [[value / 100, "#16c995"], [Math.min(1, value / 100 + 0.025), "#f5ad35"], [1, "#253244"]],
          },
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "3%"],
          formatter: "{value}%",
          color: "#16c995",
          fontSize: 42,
          fontWeight: 900,
        },
        data: [{ value }],
      },
    ],
  }), [value]);

  return (
    <div className="planning-gauge-wrap">
      <EChart className="planning-gauge-chart" option={option} ariaLabel={label} />
      <strong>MỤC TIÊU: {target}</strong>
      <span>{label}</span>
    </div>
  );
}

function PlanningAssetLineChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#4188ff", "#f9a037"],
    grid: { left: 52, right: 28, top: 72, bottom: 38 },
    legend: { show: false },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(9, 15, 28, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: planningWeeklyLabels,
      boundaryGap: false,
      axisLabel: { color: "rgba(153, 169, 194, 0.82)", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1200,
      interval: 500,
      axisLabel: { color: "rgba(153, 169, 194, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(94, 111, 137, 0.26)" } },
    },
    series: [
      {
        name: "Cấp xã",
        type: "line",
        data: [1120, 1062, 1098, 1124, 1154, 1190],
        smooth: true,
        symbolSize: 9,
        lineStyle: { width: 4 },
      },
      {
        name: "Cấp tỉnh",
        type: "line",
        data: [668, 610, 615, 648, 672, 724],
        smooth: true,
        symbolSize: 8,
        lineStyle: { width: 3 },
      },
    ],
  }), []);

  return <EChart className="planning-line-chart" option={option} ariaLabel="Tổng số cơ sở nhà đất" />;
}

function PlanningBacklogChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#ff4f55"],
    grid: { left: 54, right: 28, top: 76, bottom: 46 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(9, 15, 28, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: planningWeeklyLabels,
      boundaryGap: false,
      axisLabel: {
        color: (value: string) => value === "Tuần 32" ? "#ffffff" : "rgba(153, 169, 194, 0.82)",
        fontSize: 12,
        fontWeight: (value: string) => value === "Tuần 32" ? 800 : 500,
      },
      axisLine: { lineStyle: { color: "rgba(94, 111, 137, 0.36)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 90,
      interval: 40,
      axisLabel: { color: "rgba(153, 169, 194, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(94, 111, 137, 0.26)" } },
    },
    series: [
      {
        name: "Cơ sở cần xử lý",
        type: "line",
        data: [41, 45, 53, 61, 69, 85],
        smooth: true,
        symbolSize: 9,
        lineStyle: { width: 4 },
        areaStyle: { color: "rgba(255, 79, 85, 0.20)" },
      },
    ],
  }), []);

  return <EChart className="planning-line-chart" option={option} ariaLabel="Số nhà đất dôi dư cần tiếp tục xử lý" />;
}

function PlanningMetricStack() {
  return (
    <div className="planning-metric-stack">
      <div>
        <strong>12.500</strong>
      </div>
      <div>
        <b>2.45</b>
        <span>căn (Tổng số)</span>
      </div>
      <div>
        <b>0</b>
        <span>căn (Hoàn thành)</span>
      </div>
    </div>
  );
}

export function PlanningPublicAssetsDashboard() {
  return (
    <section className="planning-dashboard" aria-label="Quy hoạch, xây dựng, tài sản công">
      <div className="planning-grid">
        <article className="planning-panel planning-gauge-panel">
          <h3>Tỷ lệ phủ kín quy hoạch chung</h3>
          <PlanningPeriodSelect />
          <PlanningGauge label="PHỦ KÍN QUY HOẠCH CHUNG" value={75} />
        </article>

        <article className="planning-panel planning-housing-panel">
          <h3>Nhà ở xã hội (Tổng số, trong năm, hoàn thành chỉ tiêu)</h3>
          <PlanningPeriodSelect />
          <PlanningMetricStack />
          <PlanningGauge label="CHỈ TIÊU TRUNG ƯƠNG GIAO" value={85.4} />
        </article>

        <article className="planning-panel planning-assets-panel">
          <h3>Tổng số cơ sở nhà đất (cấp tỉnh, cấp xã)</h3>
          <span className="planning-unit">Đơn vị: Cơ sở - Trục X: Tuần</span>
          <PlanningPeriodSelect compact defaultValue="week-1" />
          <div className="planning-asset-summary">
            <div>
              <span>Cấp tỉnh:</span>
              <strong>720</strong>
              <small>Cơ sở</small>
            </div>
            <div>
              <span>Cấp xã:</span>
              <strong>1.120</strong>
              <small>Cơ sở</small>
            </div>
          </div>
          <PlanningAssetLineChart />
        </article>

        <article className="planning-panel planning-backlog-panel">
          <h3>Số nhà, đất dôi dư cần tiếp tục xử lý</h3>
          <div className="planning-backlog-summary">
            <strong>85</strong>
            <span>Cơ sở</span>
            <small>Đơn vị: Cơ sở</small>
          </div>
          <PlanningPeriodSelect compact defaultValue="week-1" />
          <PlanningBacklogChart />
        </article>
      </div>
    </section>
  );
}
