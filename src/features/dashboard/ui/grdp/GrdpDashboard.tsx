import { type ReactNode, useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import {
  grdpDesignPieItems,
  grdpDesignQuarterLabels,
} from "../../model/dashboardContent";
import { currentReportingPeriod } from "../../model/reportingPeriod";

function ReportPeriodSelect({ variant = "quarter" }: { variant?: "quarter" | "year" }) {
  if (variant === "year") {
    return (
      <label className="grdp-period">
        <span>Kỳ báo cáo</span>
        <select defaultValue="2025" aria-label="Kỳ báo cáo">
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2026">2026</option>
        </select>
      </label>
    );
  }

  return (
    <label className="grdp-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={currentReportingPeriod.quarterShortValue} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.quarterShortValue}>{currentReportingPeriod.quarterNumericLabel}</option>
        <option value="q1-2026">Quý 1/2026</option>
        <option value="q2-2026">Quý 2/2026</option>
        <option value="q4-2025">Quý 4/2025</option>
      </select>
    </label>
  );
}

function GrdpTrendChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#eb747b", "#7659ff"],
    grid: { left: 42, right: 28, top: 22, bottom: 42 },
    legend: {
      bottom: 5,
      icon: "circle",
      itemHeight: 7,
      itemWidth: 7,
      textStyle: { color: "rgba(245, 248, 252, 0.76)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: grdpDesignQuarterLabels,
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.18)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      name: "%",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.76)", padding: [0, 0, 0, -28] },
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dashed" } },
    },
    series: [
      {
        name: "Công nghiệp",
        type: "line",
        data: [20, 40, 35, 80],
        smooth: true,
        symbolSize: 7,
        label: { show: true, color: "rgba(245, 248, 252, 0.7)", fontSize: 10 },
        lineStyle: { width: 2 },
      },
      {
        name: "Xây dựng",
        type: "line",
        data: [77, 88, 55, 89],
        smooth: true,
        symbolSize: 7,
        label: { show: true, color: "rgba(245, 248, 252, 0.7)", fontSize: 10 },
        lineStyle: { width: 2 },
      },
    ],
  }), []);

  return <EChart className="grdp-trend-chart" option={option} ariaLabel="Tốc độ tăng trưởng kinh tế GRDP" />;
}

function GrdpInvestmentChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#d99844"],
    grid: { left: 38, right: 22, top: 18, bottom: 24 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: grdpDesignQuarterLabels,
      axisLabel: { show: false },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      name: "Tỷ đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.7)", fontSize: 10, padding: [0, 0, 0, 14] },
      axisLabel: { color: "rgba(245, 248, 252, 0.58)", fontSize: 10 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dashed" } },
    },
    series: [
      {
        type: "line",
        data: [25, 42, 36, 55],
        smooth: true,
        symbolSize: 5,
        lineStyle: { width: 2 },
        areaStyle: { color: "rgba(217, 152, 68, 0.22)" },
      },
    ],
  }), []);

  return <EChart className="grdp-investment-chart" option={option} ariaLabel="Tổng vốn đầu tư thực hiện toàn xã hội" />;
}

function GrdpPieChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: grdpDesignPieItems.map((item) => item.tone),
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: "78%",
        center: ["50%", "50%"],
        label: {
          show: true,
          position: "inside",
          color: "#ffffff",
          fontSize: 17,
          fontWeight: 700,
          formatter: "{b}\n{d}%",
        },
        labelLine: { show: false },
        data: grdpDesignPieItems.map((item) => ({
          name: item.label.replace(", xây dựng", ""),
          value: item.value,
        })),
      },
    ],
  }), []);

  return (
    <div className="grdp-pie-wrap">
      <EChart className="grdp-pie-chart" option={option} ariaLabel="Cơ cấu GRDP" />
      <div className="grdp-pie-legend">
        {grdpDesignPieItems.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.tone }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function GrdpValueBlock({
  children,
  className = "",
  label,
  periodVariant = "quarter",
  trend = "12,6% so với cùng kỳ năm trước",
  unit,
  value,
}: {
  children?: ReactNode;
  className?: string;
  label: string;
  periodVariant?: "quarter" | "year";
  trend?: string;
  unit: string;
  value: string;
}) {
  return (
    <article className={`grdp-panel grdp-value-card ${className}`}>
      <div className="grdp-panel-title">
        <span>{label}</span>
      </div>
      <ReportPeriodSelect variant={periodVariant} />
      <div className="grdp-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <p className="grdp-trend">▲ {trend}</p>
      {children}
    </article>
  );
}

export function GrdpDashboard() {
  return (
    <section className="grdp-dashboard" aria-label="Nhóm chỉ số về GRDP">
      <div className="grdp-grid">
        <article className="grdp-panel grdp-growth-panel">
          <div className="grdp-panel-title">
            <span>Tốc độ tăng trưởng kinh tế (GRDP)</span>
          </div>
          <ReportPeriodSelect />
          <div className="grdp-accordion-row active">
            <span className="grdp-row-icon factory-icon" aria-hidden="true" />
            <strong>Khu vực công nghiệp, xây dựng</strong>
            <i>⌃</i>
          </div>
          <GrdpTrendChart />
          <div className="grdp-accordion-row">
            <span className="grdp-row-icon fish-icon" aria-hidden="true" />
            <span>Khu vực nông, lâm nghiệp và thủy sản</span>
            <i>⌄</i>
          </div>
          <div className="grdp-inline-value">
            <strong>43,62</strong>
            <span>%</span>
          </div>
          <p className="grdp-trend">▲ 12,6% so với cùng kỳ năm trước</p>
          <div className="grdp-accordion-row">
            <span className="grdp-row-icon service-round-icon" aria-hidden="true" />
            <span>Khu vực dịch vụ</span>
            <i>⌄</i>
          </div>
          <div className="grdp-inline-value">
            <strong>23,61</strong>
            <span>%</span>
          </div>
          <p className="grdp-trend">▲ 12,6% so với cùng kỳ năm trước</p>
          <div className="grdp-accordion-row">
            <span className="grdp-row-icon tax-icon" aria-hidden="true" />
            <span>Thuế sản phẩm trừ trợ cấp sản phẩm</span>
            <i>⌄</i>
          </div>
          <div className="grdp-inline-value">
            <strong>78,35</strong>
            <span>%</span>
          </div>
          <p className="grdp-trend">▲ 12,6% so với cùng kỳ năm trước</p>
        </article>

        <div className="grdp-middle-column">
          <article className="grdp-panel grdp-structure-panel">
            <div className="grdp-panel-title">
              <span>Cơ cấu GRDP</span>
            </div>
            <ReportPeriodSelect />
            <GrdpPieChart />
          </article>

          <GrdpValueBlock
            className="grdp-industry-card"
            label="Tỷ trọng giá trị tăng thêm ngành công nghiệp chế biến, chế tạo trong GRDP"
            periodVariant="year"
            unit="%"
            value="24,62"
          />
        </div>

        <div className="grdp-side-column">
          <GrdpValueBlock label="GRDP bình quân đầu người" periodVariant="year" unit="%" value="8,78" />
          <GrdpValueBlock label="Thu nhập bình quân đầu người" periodVariant="year" unit="Triệu đồng/người/năm" value="60,14" />
          <GrdpValueBlock
            className="grdp-investment-card"
            label="Tổng vốn đầu tư thực hiện toàn xã hội"
            trend="11,9% so với cùng kỳ năm trước"
            unit="Tỷ đồng"
            value="2.931"
          >
            <GrdpInvestmentChart />
          </GrdpValueBlock>
        </div>
      </div>
    </section>
  );
}
