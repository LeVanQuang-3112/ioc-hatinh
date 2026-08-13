import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { useIocReport } from "../../hooks/useIocReport";
import { currentReportingPeriod, getCurrentReportingPeriod } from "../../model/reportingPeriod";
import { pickIocValue } from "../../services/iocReportService";

function TradeServicePeriodSelect({ value = currentReportingPeriod.quarterLabel }: { value?: string }) {
  return (
    <label className="trade-service-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.quarterLabel}>{currentReportingPeriod.quarterLabel}</option>
        <option value="Quý I/2026">Quý I/2026</option>
        <option value="Quý II/2026">Quý II/2026</option>
      </select>
    </label>
  );
}

function TradeServiceMonthPeriodSelect({ value = currentReportingPeriod.monthLabel }: { value?: string }) {
  return (
    <label className="trade-service-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.monthLabel}>{currentReportingPeriod.monthLabel}</option>
        <option value="Tháng 7/2026">Tháng 7/2026</option>
        <option value="Tháng 6/2026">Tháng 6/2026</option>
      </select>
    </label>
  );
}

function TradeServiceExportChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#2e7cff", "#f5a623"],
    grid: { left: 92, right: 70, top: 82, bottom: 108 },
    legend: {
      bottom: 12,
      icon: "rect",
      itemGap: 18,
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(215, 225, 240, 0.72)", fontSize: 14 },
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
      data: ["Q2/2025", "Q3/2025", "Q4/2025", "Q1/2026", "Q2/2026", "Q3/2026"],
      axisLabel: {
        color: "rgba(139, 162, 202, 0.96)",
        fontFamily: "monospace",
        fontSize: 21,
        margin: 18,
      },
      axisLine: { lineStyle: { color: "rgba(145, 156, 180, 0.3)", width: 2 } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 50,
      name: "Triệu USD",
      nameTextStyle: {
        color: "rgba(139, 162, 202, 0.78)",
        fontSize: 10,
        fontStyle: "italic",
        padding: [0, 0, 22, 0],
      },
      axisLabel: {
        color: "rgba(139, 162, 202, 0.96)",
        fontFamily: "monospace",
        fontSize: 20,
      },
      splitLine: { lineStyle: { color: "rgba(88, 103, 130, 0.34)", width: 2 } },
    },
    series: [
      {
        name: "Kim ngạch xuất khẩu",
        type: "line",
        data: [129, 119, 143, 133, 118, 112],
        smooth: false,
        symbol: "circle",
        symbolSize: 12,
        lineStyle: { width: 5 },
        itemStyle: { borderColor: "#061025", borderWidth: 4 },
      },
      {
        name: "Kim ngạch nhập khẩu",
        type: "line",
        data: [44, 54, 67, 55, 47, 62],
        smooth: false,
        symbol: "circle",
        symbolSize: 12,
        lineStyle: { width: 5, type: "dashed" },
        itemStyle: { borderColor: "#061025", borderWidth: 4 },
      },
    ],
  }), []);

  return <EChart className="trade-service-export-chart" option={option} ariaLabel="Xuất nhập khẩu theo quý" />;
}

function TradeServiceTourismChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#8979ff", "#ff928a", "#3cc3df"],
    grid: { left: 80, right: 58, top: 92, bottom: 102 },
    legend: {
      bottom: 22,
      icon: "rect",
      itemGap: 26,
      itemHeight: 11,
      itemWidth: 11,
      textStyle: { color: "rgba(216, 225, 236, 0.72)", fontSize: 13 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Quý 4/2025", "Quý 1/2026", "Quý 2/2026", "Quý 3/2026"],
      axisLabel: { color: "rgba(220, 226, 238, 0.72)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(216, 225, 236, 0.52)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(216, 225, 236, 0.18)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 40,
      name: "Lượt khách",
      nameTextStyle: {
        color: "rgba(220, 226, 238, 0.72)",
        fontSize: 13,
        fontStyle: "italic",
        padding: [0, 0, 12, 8],
      },
      axisLabel: { color: "rgba(220, 226, 238, 0.72)", fontSize: 13 },
      splitLine: { lineStyle: { color: "rgba(216, 225, 236, 0.18)", type: "dotted" } },
    },
    series: [
      {
        name: "Khách tham quan",
        type: "bar",
        stack: "tourism",
        barWidth: 76,
        data: [21.07, 34.41, 79.03, 63.01],
        label: { show: true, color: "rgba(246, 249, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
      {
        name: "Khách lưu trú nội địa",
        type: "bar",
        stack: "tourism",
        barWidth: 76,
        data: [15.32, 86.17, 39.18, 25.41],
        label: { show: true, color: "rgba(246, 249, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
      {
        name: "Khách lưu trú quốc tế",
        type: "bar",
        stack: "tourism",
        barWidth: 76,
        data: [26.57, 27.23, 60.95, 21.5],
        label: { show: true, color: "rgba(246, 249, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
    ],
  }), []);

  return <EChart className="trade-service-tourism-chart" option={option} ariaLabel="Số lượng khách du lịch theo quý" />;
}

export function TradeServiceDashboard() {
  const { year, quarter } = getCurrentReportingPeriod();
  const { indicators } = useIocReport("CTKTXH_QUY", `${year}${quarter}`);

  return (
    <section className="trade-service-dashboard" aria-label="Nhóm thương mại dịch vụ">
      <div className="trade-service-grid">
        <article className="trade-service-panel trade-service-total-panel">
          <h3>Tổng kim ngạch xuất nhập khẩu</h3>
          <TradeServiceMonthPeriodSelect />
          <div className="trade-service-total-body">
            <div className="trade-service-total-value">
              <strong>{pickIocValue(indicators, "CTDB_V_1_1", "234")}</strong>
              <span>Triệu USD</span>
            </div>
            <p className="trade-service-trend"><i aria-hidden="true" /> <strong>12,6%</strong> so với cùng kỳ năm trước</p>
          </div>
        </article>

        <article className="trade-service-panel trade-service-export-panel">
          <h3>Xuất nhập khẩu</h3>
          <TradeServicePeriodSelect />
          <TradeServiceExportChart />
        </article>

        <article className="trade-service-panel trade-service-tourism-panel">
          <h3>Số lượng khách du lịch</h3>
          <TradeServicePeriodSelect />
          <TradeServiceTourismChart />
        </article>
      </div>
    </section>
  );
}
