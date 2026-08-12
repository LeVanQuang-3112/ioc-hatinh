import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";

const educationCertRows = [
  { label: "Mầm non", percent: 80.0, color: "#10b981" },
  { label: "Tiểu học", percent: 88.0, color: "#38bdf8" },
  { label: "THCS", percent: 85.0, color: "#f59e0b" },
  { label: "THPT công lập", percent: 75.0, color: "#a78bfa" },
  { label: "GD nghề nghiệp", percent: 70.0, color: "#ef4444" },
] as const;

const educationStudentRows = [
  { label: "Mầm non", value: 45, color: "#38bdf8" },
  { label: "Tiểu học", value: 82, color: "#34d399" },
  { label: "THCS", value: 58, color: "#f59e0b" },
  { label: "THPT", value: 35, color: "#a78bfa" },
] as const;

const educationAdminCards = [
  {
    label: "Số lượng hiện có",
    value: "620",
    unit: "Cán bộ quản lý",
    note: "Đảm bảo vận hành các cơ sở giáo dục",
    color: "#10b981",
  },
  {
    label: "Số vị trí còn thiếu",
    value: "35",
    unit: "Vị trí",
    note: "Cần tuyển bổ sung theo khung năng lực",
    color: "#f59e0b",
  },
  {
    label: "Số vị trí cần kiện toàn",
    value: "18",
    unit: "Vị trí",
    note: "Đang quy hoạch và bổ nhiệm lại",
    color: "#38bdf8",
  },
] as const;

function EducationPeriodSelect({
  defaultValue = "month-7-2026",
  options = [
    ["month-7-2026", "Tháng 7/2026"],
    ["month-8-2026", "Tháng 8/2026"],
    ["quarter-3-2026", "Quý III/2026"],
  ],
}: {
  defaultValue?: string;
  options?: Array<[string, string]>;
}) {
  return (
    <label className="education-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={defaultValue} aria-label="Kỳ báo cáo">
        {options.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </label>
  );
}

function EducationStudentChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: educationStudentRows.map((row) => row.color),
    grid: { left: 12, right: 12, top: 24, bottom: 30 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: educationStudentRows.map((row) => row.label),
      axisLabel: { color: "#7f93b5", fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(126, 145, 174, 0.32)" } },
      axisTick: { show: false },
    },
    yAxis: { type: "value", show: false },
    series: [
      {
        type: "bar",
        barWidth: 40,
        data: educationStudentRows.map((row) => ({
          value: row.value,
          itemStyle: { color: row.color, borderRadius: [4, 4, 1, 1] },
        })),
        label: {
          show: true,
          position: "top",
          color: "rgba(245, 248, 252, 0.9)",
          fontSize: 11,
          fontWeight: 800,
          formatter: (params: { value: number }) => `${params.value}K`,
        },
      },
    ],
  }), []);

  return <EChart className="education-student-chart" option={option} ariaLabel="Số lượng học sinh các cấp học" />;
}

export function EducationDashboard() {
  return (
    <section className="education-dashboard" aria-label="Nhóm giáo dục">
      <div className="education-grid">
        <article className="education-panel education-cert-panel">
          <div className="education-panel-title">Trường đạt chuẩn quốc gia (%)</div>
          <EducationPeriodSelect defaultValue="year-2025" options={[["year-2025", "2025"], ["year-2026", "2026"]]} />
          <div className="education-cert-list">
            {educationCertRows.map((row) => (
              <div className="education-cert-row" key={row.label} style={{ color: row.color }}>
                <span>
                  {row.label}: <strong>{row.percent.toFixed(1)}%</strong>
                </span>
                <i><b style={{ width: `${row.percent}%` }} /></i>
              </div>
            ))}
          </div>
          <div className="education-cert-highlight">
            <span>2. Tỷ lệ huy động trẻ em từ 3 đến 5 tuổi đến lớp:</span>
            <strong>95,4%</strong>
          </div>
        </article>

        <article className="education-panel education-student-panel">
          <div className="education-panel-title">Số lượng học sinh các cấp học</div>
          <EducationPeriodSelect />
          <p className="education-unit-note">Đơn vị tính: học sinh</p>
          <EducationStudentChart />
        </article>

        <article className="education-panel education-teacher-ratio-panel">
          <div className="education-panel-title">Số lượng giáo viên (Hiện có vs Nhu cầu định mức)</div>
          <EducationPeriodSelect />
          <div className="education-teacher-stats">
            <div>
              <span>Tổng số giáo viên hiện có:</span>
              <div><strong>8.450</strong><em>người</em></div>
            </div>
            <div className="cyan">
              <span>Nhu cầu theo định mức:</span>
              <div><strong>8.900</strong><em>người</em></div>
            </div>
          </div>
        </article>

        <article className="education-panel education-admin-panel">
          <div className="education-panel-title">Số lượng cán bộ quản lý giáo dục</div>
          <EducationPeriodSelect />
          <div className="education-admin-grid">
            {educationAdminCards.map((card) => (
              <div className="education-admin-card" key={card.label}>
                <span>{card.label}</span>
                <div>
                  <strong style={{ color: card.color }}>{card.value}</strong>
                  <em>{card.unit}</em>
                </div>
                <p>{card.note}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
