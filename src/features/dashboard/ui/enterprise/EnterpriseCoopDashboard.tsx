import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { currentReportingPeriod } from "../../model/reportingPeriod";

function EnterprisePeriodSelect({ value = currentReportingPeriod.quarterLabel }: { value?: string }) {
  return (
    <label className="enterprise-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.quarterLabel}>{currentReportingPeriod.quarterLabel}</option>
        <option value={currentReportingPeriod.monthLabel}>{currentReportingPeriod.monthLabel}</option>
        <option value="Tháng 2/2026">Tháng 2/2026</option>
      </select>
    </label>
  );
}

function EnterpriseActivityChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#7462d9", "#df7a78", "#37bdd2", "#f6aa45", "#416fd8"],
    grid: { left: 78, right: 42, top: 72, bottom: 118 },
    legend: {
      bottom: 14,
      icon: "rect",
      itemGap: 14,
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8"],
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(224, 231, 242, 0.42)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 25,
      name: "Doanh nghiệp",
      nameTextStyle: {
        color: "rgba(224, 231, 242, 0.72)",
        fontSize: 12,
        fontStyle: "italic",
        padding: [0, 0, 12, 0],
      },
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    series: [
      { name: "Thành lập mới", type: "bar", barWidth: 13, data: [24, 21, 12, 16, 19, 22], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Hoạt động trở lại", type: "bar", barWidth: 13, data: [64, 12, 12, 12, 18, 21], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Tạm ngừng đăng ký", type: "bar", barWidth: 13, data: [2, 12, 34, 25, 22, 18], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Thông báo giải thể", type: "bar", barWidth: 13, data: [23, 12, 68, 12, 21, 17], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Đã giải thể", type: "bar", barWidth: 13, data: [5, 0, 1, 4, 3, 2], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
    ],
  }), []);

  return <EChart className="enterprise-activity-chart" option={option} ariaLabel="Biến động doanh nghiệp" />;
}

function EnterpriseCoopChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#7462d9", "#df7a78", "#37bdd2"],
    grid: { left: 80, right: 34, top: 78, bottom: 74 },
    legend: {
      bottom: 16,
      icon: "rect",
      itemGap: 18,
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8"],
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(224, 231, 242, 0.42)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 2000,
      interval: 1000,
      name: "Hợp tác xã",
      nameTextStyle: {
        color: "rgba(224, 231, 242, 0.72)",
        fontSize: 12,
        fontStyle: "italic",
        padding: [0, 0, 12, 0],
      },
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    series: [
      { name: "Đang hoạt động", type: "bar", barWidth: 24, data: [1860, 1120, 1960, 1530, 1640, 1710] },
      { name: "Mới thành lập", type: "bar", barWidth: 24, data: [1860, 1120, 1960, 1530, 1580, 1690] },
      { name: "Ngừng hoạt động", type: "bar", barWidth: 24, data: [1860, 1120, 1960, 1530, 1510, 1450] },
    ],
  }), []);

  return <EChart className="enterprise-coop-chart" option={option} ariaLabel="Hợp tác xã kinh tế tập thể" />;
}

export function EnterpriseCoopDashboard() {
  return (
    <section className="enterprise-dashboard" aria-label="Nhóm doanh nghiệp, hợp tác xã">
      <div className="enterprise-grid">
        <article className="enterprise-panel enterprise-total-panel">
          <h3>Doanh nghiệp hoạt động trong nền kinh tế</h3>
          <EnterprisePeriodSelect />
          <div className="enterprise-total-value">
            <strong>234</strong>
            <span>Doanh nghiệp</span>
          </div>
          <p className="enterprise-trend"><i aria-hidden="true" /> <strong>12,6%</strong> so với cùng kỳ năm trước</p>
        </article>

        <article className="enterprise-panel enterprise-activity-panel">
          <h3>Biến động doanh nghiệp</h3>
          <EnterprisePeriodSelect value={currentReportingPeriod.monthLabel} />
          <EnterpriseActivityChart />
        </article>

        <article className="enterprise-panel enterprise-coop-panel">
          <h3>Hợp tác xã, kinh tế tập thể</h3>
          <EnterprisePeriodSelect value={currentReportingPeriod.monthLabel} />
          <EnterpriseCoopChart />
          <div className="enterprise-coop-total">
            <span>Tổng số:</span>
            <strong>5.531</strong>
            <em>Hợp tác xã</em>
          </div>
        </article>
      </div>
    </section>
  );
}
