import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { investmentAttractionCapital, investmentAttractionMonths, investmentAttractionProjects } from "../../model/dashboardContent";
import { currentReportingPeriod } from "../../model/reportingPeriod";

function PublicInvestmentMonthlyChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#d7b85f", "#15b77d"],
    grid: { left: 66, right: 32, top: 56, bottom: 58 },
    legend: {
      bottom: 12,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(245, 248, 252, 0.78)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8"],
      axisLabel: { color: "rgba(245, 248, 252, 0.66)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.42)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(245, 248, 252, 0.14)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 40,
      name: "Tỷ đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.72)", align: "left", fontStyle: "italic", padding: [0, 0, 10, 0] },
      axisLabel: { color: "rgba(245, 248, 252, 0.66)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)", type: "dotted" } },
    },
    series: [
      {
        name: "Dự án do bộ ngành quản lý",
        type: "bar",
        stack: "total",
        barWidth: 76,
        data: [72.18, 88.64, 95.32, 79.83],
        label: { show: true, color: "rgba(255, 255, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
      {
        name: "Dự án do địa phương quản lý",
        type: "bar",
        stack: "total",
        barWidth: 76,
        data: [48.36, 54.72, 65.23, 69.59],
        label: { show: true, color: "rgba(255, 255, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
    ],
  }), []);

  return <EChart className="public-investment-monthly-chart" option={option} ariaLabel="Tổng giá trị giải ngân vốn đầu tư công theo bộ ngành và địa phương" />;
}

function PublicInvestmentSourcesChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#806cff"],
    grid: { left: 300, right: 38, top: 54, bottom: 34 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 600,
      interval: 75,
      position: "top",
      axisLabel: { color: "rgba(245, 248, 252, 0.64)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.32)" } },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)", type: "dotted" } },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: [
        "Vốn ngân sách địa phương cấp tỉnh",
        "Vốn ngân sách TW theo ngành lĩnh vực",
        "Nguồn vốn do cấp xã quản lý",
        "Vốn nước ngoài (ODA)",
        "Chi bằng lệnh chi tiền",
        "Nguồn dự phòng NSTW",
        "Vốn chương trình mục tiêu (cấp tỉnh)",
      ],
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        barWidth: 24,
        data: [520, 410, 310, 240, 170, 150, 90],
        label: { show: true, position: "right", color: "rgba(245, 248, 252, 0.68)", fontSize: 11 },
        itemStyle: { borderRadius: [0, 12, 12, 0] },
      },
    ],
  }), []);

  return <EChart className="public-investment-sources-chart" option={option} ariaLabel="Giải ngân theo các nguồn vốn" />;
}

function PublicInvestmentDonutChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#67d893", "#ff7f7a"],
    legend: { show: false },
    series: [
      {
        type: "pie",
        radius: ["62%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: "center",
          formatter: "722\nTỷ đồng",
          color: "#f7fbff",
          fontSize: 26,
          fontWeight: 800,
          lineHeight: 34,
        },
        labelLine: { show: false },
        itemStyle: { borderWidth: 0 },
        data: [
          { name: "NS Địa phương", value: 522 },
          { name: "NS Trung ương", value: 200 },
        ],
      },
    ],
  }), []);

  return <EChart className="public-investment-donut-chart" option={option} ariaLabel="Cơ cấu ngân sách trung ương và địa phương" />;
}

function PublicInvestmentPeriodSelect({ value = currentReportingPeriod.quarterLabel }: { value?: string }) {
  return (
    <label className="public-investment-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.quarterLabel}>{currentReportingPeriod.quarterLabel}</option>
        <option value={currentReportingPeriod.monthLabel}>{currentReportingPeriod.monthLabel}</option>
        <option value="Tháng 2/2026">Tháng 2/2026</option>
      </select>
    </label>
  );
}

function PublicInvestmentMetricCard({ title }: { title: string }) {
  return (
    <article className="public-investment-panel public-investment-metric-card">
      <h3>{title}</h3>
      <PublicInvestmentPeriodSelect />
      <div className="public-investment-big-value">
        <strong>3.163</strong>
        <span>Dự án</span>
      </div>
      <p className="public-investment-trend">▲ <strong>12,6%</strong> so với cùng kỳ năm trước</p>
    </article>
  );
}

export function InvestmentDashboard() {
  return (
    <section className="public-investment-dashboard" aria-label="Nhóm đầu tư công">
      <div className="public-investment-grid">
        <div className="public-investment-left-stack">
          <PublicInvestmentMetricCard title="Tổng số dự án đầu tư công" />
          <PublicInvestmentMetricCard title="Tổng vốn bố trí theo dự án" />
          <PublicInvestmentMetricCard title="Giá trị giải ngân theo dự án" />
        </div>

        <article className="public-investment-panel public-investment-monthly-panel">
          <h3>Tổng giá trị giải ngân vốn đầu tư công theo bộ ngành và địa phương</h3>
          <PublicInvestmentPeriodSelect value={currentReportingPeriod.monthLabel} />
          <PublicInvestmentMonthlyChart />
        </article>

        <article className="public-investment-panel public-investment-sources-panel">
          <h3>Giải ngân theo các nguồn vốn (NSTW & NSĐP)</h3>
          <PublicInvestmentPeriodSelect value={currentReportingPeriod.monthLabel} />
          <span className="public-investment-chart-unit">Tỷ đồng</span>
          <PublicInvestmentSourcesChart />
        </article>

        <article className="public-investment-panel public-investment-structure-panel">
          <h3>Cơ cấu ngân sách trung ương và địa phương</h3>
          <PublicInvestmentPeriodSelect />
          <div className="public-investment-donut-wrap">
            <PublicInvestmentDonutChart />
            <div className="public-investment-donut-legend">
              <span><i className="green" />NS Địa phương: 522 tỷ đồng (66%)</span>
              <span><i className="red" />NS Trung ương: 200 tỷ đồng (34%)</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function InvestmentAttractionPeriodSelect() {
  return (
    <label className="investment-attraction-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={currentReportingPeriod.monthLabel} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.monthLabel}>{currentReportingPeriod.monthLabel}</option>
        <option value={currentReportingPeriod.quarterLabel}>{currentReportingPeriod.quarterLabel}</option>
        <option value="Tháng 2/2026">Tháng 2/2026</option>
      </select>
    </label>
  );
}

function InvestmentAttractionChart({ capitalUnit }: { capitalUnit: "Tỷ đồng" | "Triệu USD" }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#66c98d", "#d89232"],
    grid: { left: 62, right: 62, top: 100, bottom: 82 },
    legend: {
      bottom: 24,
      icon: "rect",
      itemGap: 24,
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(226, 233, 242, 0.76)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: investmentAttractionMonths,
      axisLabel: { color: "rgba(226, 233, 242, 0.7)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(226, 233, 242, 0.46)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(226, 233, 242, 0.16)", type: "dotted" } },
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 100,
        interval: 50,
        name: "Dự án",
        nameTextStyle: {
          color: "rgba(226, 233, 242, 0.74)",
          fontSize: 12,
          fontStyle: "italic",
          align: "left",
          padding: [0, 0, 14, 0],
        },
        axisLabel: { color: "rgba(226, 233, 242, 0.68)", fontSize: 12 },
        splitLine: { lineStyle: { color: "rgba(226, 233, 242, 0.16)", type: "dotted" } },
      },
      {
        type: "value",
        min: 0,
        max: 2000,
        interval: 500,
        name: capitalUnit,
        nameTextStyle: {
          color: "rgba(226, 233, 242, 0.74)",
          fontSize: 12,
          fontStyle: "italic",
          align: "right",
          padding: [0, 0, 14, 0],
        },
        axisLabel: { color: "rgba(226, 233, 242, 0.68)", fontSize: 12 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "Số dự án",
        type: "bar",
        barWidth: 50,
        data: investmentAttractionProjects,
        itemStyle: { color: "rgba(102, 201, 141, 0.88)" },
      },
      {
        name: "Tổng vốn đăng ký đầu tư",
        type: "line",
        yAxisIndex: 1,
        data: investmentAttractionCapital,
        symbol: "circle",
        symbolSize: 9,
        label: {
          show: true,
          color: "rgba(226, 233, 242, 0.76)",
          fontSize: 10,
          position: "top",
        },
        lineStyle: { color: "#d89232", width: 2 },
        itemStyle: { color: "#d89232", borderColor: "rgba(255, 218, 132, 0.72)", borderWidth: 2 },
      },
    ],
  }), [capitalUnit]);

  return <EChart className="investment-attraction-chart" option={option} ariaLabel={`Thu hút đầu tư, đơn vị vốn ${capitalUnit}`} />;
}

export function InvestmentAttractionDashboard() {
  return (
    <section className="investment-attraction-dashboard" aria-label="Thu hút đầu tư">
      <div className="investment-attraction-grid">
        <article className="investment-attraction-panel">
          <h3>Thu hút đầu tư trong nước</h3>
          <InvestmentAttractionPeriodSelect />
          <InvestmentAttractionChart capitalUnit="Tỷ đồng" />
        </article>

        <article className="investment-attraction-panel">
          <h3>Thu hút đầu tư ngoài nước (FDI)</h3>
          <InvestmentAttractionPeriodSelect />
          <InvestmentAttractionChart capitalUnit="Triệu USD" />
        </article>
      </div>
    </section>
  );
}
