import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { currentReportingPeriod } from "../../model/reportingPeriod";

const adminLaborStaffBars = [
  { label: "Tuyển mới", values: [25, 0, 0, 0] },
  { label: "Nghỉ hưu", values: [0, 4, 0, 0] },
  { label: "Thôi việc", values: [0, 0, 37, 0] },
  { label: "Chuyển đi", values: [0, 0, 0, 3] },
] as const;

const adminProcedureBars = [
  { label: "Tỷ lệ hồ sơ giải quyết đúng hạn (98.5%)", value: 98.5, tone: "green" },
  { label: "Tỷ lệ người dân dùng dịch vụ công trực tuyến (76.2%)", value: 76.2, tone: "cyan" },
  { label: "Tỷ lệ thanh toán trực tuyến trên Cổng DVCQG (64.8%)", value: 64.8, tone: "purple" },
  { label: "Dịch vụ công trực tuyến toàn trình (82.0%)", value: 82, tone: "amber" },
] as const;

const adminLaborRows = [
  { label: "Tỷ lệ lao động đã qua đào tạo", value: "78.5%", progress: 78.5, tone: "green" },
  { label: "Số phiên giao dịch việc làm tổ chức", value: "24 Phiên", progress: 46, tone: "cyan" },
  { label: "Thông tin tuyển dụng lao động", value: "1,420 Tin bài", progress: 28, tone: "amber" },
  { label: "Nhu cầu tuyển dụng lao động", value: "1,420 nhu cầu", progress: 28, tone: "purple" },
  { label: "Số lượt lao động tư vấn, giới thiệu việc làm", value: "1,420 Lượt", progress: 28, tone: "red" },
] as const;

function AdminPeriodSelect({
  defaultValue = currentReportingPeriod.quarterValue,
  options = [
    [currentReportingPeriod.quarterValue, currentReportingPeriod.quarterLabel],
    ["quarter-2", "Quý II/2026"],
  ],
}: {
  defaultValue?: string;
  options?: Array<[string, string]>;
}) {
  return (
    <label className="admin-period-select">
      <span>Kỳ báo cáo</span>
      <select defaultValue={defaultValue} aria-label="Kỳ báo cáo">
        {options.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </label>
  );
}

function AdminStaffChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#16b77d", "#4b8ee8", "#f4a53b", "#bfc8d5"],
    grid: { left: 48, right: 30, top: 24, bottom: 34 },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: adminLaborStaffBars.map((item) => item.label),
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.42)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 40,
      interval: 10,
      name: "Cán bộ",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.72)", fontStyle: "italic", align: "left" },
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)", type: "dotted" } },
    },
    series: [0, 1, 2, 3].map((index) => ({
      name: ["Tuyển mới", "Nghỉ hưu", "Thôi việc", "Chuyển đi"][index],
      type: "bar",
      stack: "staff",
      barWidth: 24,
      data: adminLaborStaffBars.map((item) => item.values[index]),
    })),
  }), []);

  return <EChart className="admin-staff-chart" option={option} ariaLabel="Biến động nhân sự" />;
}

function AdminProgressRow({
  label,
  value,
  progress,
  tone,
}: {
  label: string;
  value: string;
  progress: number;
  tone: "green" | "cyan" | "amber" | "purple" | "red";
}) {
  return (
    <div className={`admin-progress-row ${tone}`}>
      <div>
        <span>{label}</span>
        {value ? <strong>{value}</strong> : null}
      </div>
      <i>
        <b style={{ width: `${progress}%` }} />
      </i>
    </div>
  );
}

function AdminLaborDonutChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#6ed698", "#ff817a"],
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["64%", "86%"],
        center: ["50%", "50%"],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { name: "Giới thiệu việc làm cho dự án, doanh nghiệp", value: 522 },
          { name: "Trở về quê làm việc", value: 200 },
        ],
      },
    ],
  }), []);

  return (
    <div className="admin-labor-donut">
      <EChart className="admin-labor-donut-chart" option={option} ariaLabel="Số lao động được giải quyết việc làm" />
      <div className="admin-labor-donut-center">
        <strong>722</strong>
        <span>Lao động</span>
      </div>
    </div>
  );
}

export function InternalAdminLaborDashboard() {
  return (
    <section className="admin-labor-dashboard" aria-label="Nhóm nội vụ, cải cách hành chính, lao động">
      <div className="admin-labor-grid">
        <article className="admin-panel admin-staff-panel">
          <div className="admin-panel-title">Công chức, viên chức</div>
          <AdminPeriodSelect />
          <div className="admin-staff-value">
            <h3>Số biên chế hưởng lương NSNN</h3>
            <div>
              <strong>2,700</strong>
              <span>Biên chế</span>
            </div>
          </div>
          <div className="admin-quota">
            <h3>Tình hình thực hiện biên chế</h3>
            <p><strong>2,520 / 2,450</strong><span>thực hiện/được giao</span></p>
            <i><b /></i>
            <small>Đạt 97.2% chỉ tiêu biên chế giao</small>
          </div>
          <div className="admin-chart-heading">
            <h3>Biến động nhân sự</h3>
          </div>
          <AdminStaffChart />
        </article>

        <article className="admin-panel admin-procedure-panel">
          <div className="admin-panel-title">Giải quyết thủ tục hành chính</div>
          <AdminPeriodSelect
            defaultValue={currentReportingPeriod.dayMonthValue}
            options={[
              [currentReportingPeriod.dayMonthValue, currentReportingPeriod.dayMonthLabel],
              [currentReportingPeriod.quarterValue, currentReportingPeriod.quarterLabel],
            ]}
          />
          <div className="admin-procedure-total">
            <h3>Tổng số hồ sơ TTHC được tiếp nhận ở 02 cấp chính quyền</h3>
            <div>
              <strong>200</strong>
              <span>Hồ sơ <small>(lũy kế hằng ngày)</small></span>
            </div>
          </div>
          <div className="admin-progress-block">
            <h3>Các chỉ số cải cách thủ tục hành chính</h3>
            {adminProcedureBars.map((item) => (
              <AdminProgressRow
                key={item.label}
                label={item.label}
                progress={item.value}
                tone={item.tone}
                value=""
              />
            ))}
          </div>
        </article>

        <article className="admin-panel admin-overdue-panel">
          <div className="admin-panel-title">Số lượng văn bản quá hạn</div>
          <AdminPeriodSelect
            defaultValue="week-1"
            options={[
              ["week-1", "Tuần 1 (27/07/2026-01/08/2026)"],
              ["week-2", "Tuần 2 (03/08/2026-08/08/2026)"],
            ]}
          />
          <div className="admin-overdue-value">
            <strong>234</strong>
            <span>Văn bản quá hạn trong tuần</span>
          </div>
          <p className="admin-overdue-trend"><i aria-hidden="true" /> <strong>12,6%</strong> so với tuần trước</p>
        </article>

        <article className="admin-panel admin-labor-panel">
          <div className="admin-panel-title">Lao động, việc làm</div>
          <AdminPeriodSelect />
          <div className="admin-labor-content">
            <div className="admin-labor-training">
              <h3>Chất lượng Nguồn nhân lực & Đào tạo</h3>
              {adminLaborRows.map((item) => (
                <AdminProgressRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  progress={item.progress}
                  tone={item.tone}
                />
              ))}
            </div>
            <div className="admin-labor-donut-panel">
              <h3>Số lao động được giải quyết việc làm</h3>
              <AdminLaborDonutChart />
              <div className="admin-labor-legend">
                <span><i className="green" />Số lao động được giới thiệu việc làm cho các dự án, doanh nghiệp trên địa bàn tỉnh: 522 người (66%)</span>
                <span><i className="red" />Lao động trở về quê làm việc: 200 người (34%)</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
