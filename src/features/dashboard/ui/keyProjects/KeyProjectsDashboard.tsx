import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { keyProjectMonths, keyProjectRows } from "../../model/dashboardContent";

function KeyProjectsPeriodSelect() {
  return (
    <label className="key-projects-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue="month-7-2026" aria-label="Kỳ báo cáo">
        <option value="month-7-2026">Tháng 7/2026</option>
        <option value="month-8-2026">Tháng 8/2026</option>
        <option value="quarter-3-2026">Quý III/2026</option>
      </select>
    </label>
  );
}

function KeyProjectsProgressChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#2f7df6"],
    grid: { left: 48, right: 22, top: 36, bottom: 38 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: keyProjectMonths,
      axisLabel: { color: "#6f85a8", fontSize: 10, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(112, 130, 158, 0.28)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 5000,
      interval: 1250,
      axisLabel: {
        color: "#6f85a8",
        fontSize: 10,
        formatter: (value: number) => (value === 0 ? "0" : `${(value / 1000).toFixed(3)}`),
      },
      splitLine: { lineStyle: { color: "rgba(112, 130, 158, 0.24)" } },
    },
    series: [
      {
        name: "Tiến độ triển khai",
        type: "line",
        data: [1600, 1780, 1980, 1810, 2020, 1840],
        smooth: true,
        symbolSize: 6,
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(47, 125, 246, 0.22)" },
      },
    ],
  }), []);

  return <EChart className="key-projects-progress-chart" option={option} ariaLabel="Tiến độ triển khai dự án trọng điểm" />;
}

function KeyProjectsDelayedChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#ff6259"],
    grid: { left: 82, right: 42, top: 72, bottom: 64 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: keyProjectMonths,
      axisLabel: { color: "#6f85a8", fontSize: 16, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(112, 130, 158, 0.26)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 500,
      interval: 125,
      axisLabel: { color: "#6f85a8", fontSize: 16, fontWeight: 700 },
      splitLine: { lineStyle: { color: "rgba(112, 130, 158, 0.26)" } },
    },
    series: [
      {
        name: "Dự án chậm tiến độ",
        type: "line",
        data: [210, 175, 150, 176, 198, 236],
        smooth: true,
        symbolSize: 12,
        lineStyle: { width: 4 },
        itemStyle: { borderColor: "#162235", borderWidth: 3 },
        areaStyle: { color: "rgba(255, 98, 89, 0.28)" },
      },
    ],
  }), []);

  return <EChart className="key-projects-delayed-chart" option={option} ariaLabel="Dự án chậm tiến độ theo tháng" />;
}

export function KeyProjectsDashboard() {
  return (
    <section className="key-projects-dashboard" aria-label="Nhóm dự án trọng điểm">
      <div className="key-projects-grid">
        <article className="key-projects-panel key-projects-list-panel">
          <h2>Danh sách dự án trọng điểm</h2>
          <KeyProjectsPeriodSelect />
          <div className="key-projects-total">
            <strong>20</strong>
            <span>Dự án</span>
          </div>
          <div className="key-projects-table">
            <div className="key-projects-table-head">
              <span>Tên dự án</span>
              <span>Chủ đầu tư</span>
              <span>Vốn đăng ký</span>
              <span>% giải ngân</span>
              <span>Trạng thái</span>
            </div>
            {keyProjectRows.map((row) => (
              <div className="key-projects-table-row" key={row.name}>
                <span>{row.name}</span>
                <span>{row.investor}</span>
                <span>{row.capital}</span>
                <span>{row.disbursement}</span>
                <strong className={row.tone}>{row.status}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="key-projects-panel key-projects-progress-panel">
          <h2>Tiến độ triển khai</h2>
          <KeyProjectsPeriodSelect />
          <div className="key-projects-progress-value">
            <strong>1.803</strong>
            <span>Tỷ đồng</span>
          </div>
          <p className="key-projects-trend green">+7.1% <span>So với kỳ trước</span></p>
          <p className="key-projects-trend green">+8.3% <span>So với cùng kỳ năm trước</span></p>
          <small>Đơn vị: Tỷ đồng</small>
          <KeyProjectsProgressChart />
        </article>

        <article className="key-projects-panel key-projects-delayed-panel">
          <h2>Dự án chậm tiến độ</h2>
          <KeyProjectsPeriodSelect />
          <div className="key-projects-delayed-value">
            <strong>238</strong>
            <span>Dự án</span>
          </div>
          <small>Đơn vị: Dự án</small>
          <KeyProjectsDelayedChart />
        </article>
      </div>
    </section>
  );
}
