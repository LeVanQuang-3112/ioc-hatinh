import { type CSSProperties, useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";

const educationMonths = ["T1/2026", "T2/2026", "T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];

const educationGradeRows = [
  { label: "Mầm non", value: "124", unit: "Trường", percent: 76, tone: "green" },
  { label: "Tiểu học", value: "166", unit: "Trường", percent: 82, tone: "cyan" },
  { label: "THCS", value: "148", unit: "Trường", percent: 79, tone: "amber" },
  { label: "THPT", value: "43", unit: "Trường", percent: 68, tone: "red" },
] as const;

const educationQualityRows = [
  { label: "Tỷ lệ học sinh hoàn thành chương trình tiểu học", value: "98,2", unit: "%", progress: 98.2, tone: "green" },
  { label: "Tỷ lệ tốt nghiệp THPT", value: "97,6", unit: "%", progress: 97.6, tone: "cyan" },
  { label: "Học sinh đạt giải cấp tỉnh, quốc gia", value: "1.268", unit: "HS", progress: 72, tone: "amber" },
  { label: "Trường có lớp học thông minh", value: "156", unit: "Cơ sở", progress: 88, tone: "purple" },
] as const;

function EducationPeriodSelect({
  defaultValue = "month-8-2026",
  options = [
    ["month-8-2026", "Tháng 8/2026"],
    ["quarter-3-2026", "Quý III/2026"],
    ["school-year-2026", "Năm học 2026-2027"],
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

function EducationEnrollmentChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#347df7", "#57d79d"],
    grid: { left: 46, right: 20, top: 40, bottom: 34 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    legend: {
      top: 6,
      right: 12,
      icon: "circle",
      itemHeight: 8,
      itemWidth: 8,
      textStyle: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: educationMonths,
      axisLabel: { color: "#7f93b5", fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(126, 145, 174, 0.32)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 220,
      interval: 55,
      name: "Nghìn học sinh",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.58)", fontSize: 10, align: "left" },
      axisLabel: { color: "#7f93b5", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(126, 145, 174, 0.2)" } },
    },
    series: [
      {
        name: "Học sinh",
        type: "bar",
        barWidth: 22,
        data: [184, 188, 192, 191, 197, 201, 205, 208],
        itemStyle: { borderRadius: [4, 4, 1, 1] },
      },
      {
        name: "Huy động đúng độ tuổi",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [162, 166, 170, 171, 176, 182, 187, 193],
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(87, 215, 157, 0.14)" },
      },
    ],
  }), []);

  return <EChart className="education-enrollment-chart" option={option} ariaLabel="Quy mô học sinh và huy động đúng độ tuổi" />;
}

function EducationStandardChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#57d79d", "#ffc957"],
    grid: { left: 42, right: 18, top: 30, bottom: 30 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["2021", "2022", "2023", "2024", "2025", "2026"],
      axisLabel: { color: "#7f93b5", fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(126, 145, 174, 0.32)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 260,
      interval: 65,
      axisLabel: { color: "#7f93b5", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(126, 145, 174, 0.2)" } },
    },
    series: [
      {
        name: "Trường đạt chuẩn",
        type: "line",
        smooth: true,
        symbolSize: 8,
        data: [186, 193, 201, 207, 211, 214],
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(87, 215, 157, 0.18)" },
      },
      {
        name: "Mục tiêu",
        type: "line",
        smooth: true,
        symbolSize: 0,
        data: [200, 204, 208, 214, 226, 232],
        lineStyle: { width: 2, type: "dashed" },
      },
    ],
  }), []);

  return <EChart className="education-standard-chart" option={option} ariaLabel="Trường đạt chuẩn quốc gia" />;
}

function EducationGauge({ label, target, value }: { label: string; target: string; value: number }) {
  return (
    <div className="education-gauge">
      <div className="education-gauge-ring" style={{ "--value": `${value}%` } as CSSProperties}>
        <strong>{value}%</strong>
      </div>
      <span>{label}</span>
      <small>Mục tiêu: {target}</small>
    </div>
  );
}

export function EducationDashboard() {
  return (
    <section className="education-dashboard" aria-label="Nhóm giáo dục">
      <div className="education-grid">
        <article className="education-panel education-standard-panel">
          <div className="education-panel-title">Trường đạt chuẩn quốc gia</div>
          <EducationPeriodSelect defaultValue="school-year-2026" />
          <div className="education-hero-value">
            <strong>214</strong>
            <span>Trường</span>
          </div>
          <p className="education-trend green">+3,8% so với cùng kỳ năm trước</p>
          <EducationStandardChart />
        </article>

        <article className="education-panel education-enrollment-panel">
          <div className="education-panel-title">Quy mô học sinh và huy động đến lớp</div>
          <EducationPeriodSelect />
          <EducationEnrollmentChart />
        </article>

        <article className="education-panel education-digital-panel">
          <div className="education-panel-title">Chuyển đổi số giáo dục</div>
          <EducationPeriodSelect />
          <div className="education-digital-value">
            <strong>156</strong>
            <span>Cơ sở giáo dục được số hóa</span>
          </div>
          <EducationGauge label="Hồ sơ học sinh điện tử" target="95%" value={88} />
        </article>

        <article className="education-panel education-grade-panel">
          <div className="education-panel-title">Cơ cấu cơ sở giáo dục theo cấp học</div>
          {educationGradeRows.map((row) => (
            <div className={`education-grade-row ${row.tone}`} key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
              <em>{row.unit}</em>
              <i><b style={{ width: `${row.percent}%` }} /></i>
            </div>
          ))}
        </article>

        <article className="education-panel education-teacher-panel">
          <div className="education-panel-title">Đội ngũ giáo viên</div>
          <EducationPeriodSelect defaultValue="school-year-2026" />
          <div className="education-split-kpis">
            <div>
              <h3>Giáo viên đạt chuẩn</h3>
              <strong>96,4</strong>
              <span>%</span>
            </div>
            <div>
              <h3>Biên chế giáo viên hiện có</h3>
              <strong>12.840</strong>
              <span>Người</span>
            </div>
          </div>
        </article>

        <article className="education-panel education-quality-panel">
          <div className="education-panel-title">Chất lượng giáo dục</div>
          <EducationPeriodSelect />
          <div className="education-quality-list">
            {educationQualityRows.map((row) => (
              <div className={`education-quality-row ${row.tone}`} key={row.label}>
                <div>
                  <span>{row.label}</span>
                  <strong>{row.value} <small>{row.unit}</small></strong>
                </div>
                <i><b style={{ width: `${row.progress}%` }} /></i>
              </div>
            ))}
          </div>
        </article>

        <article className="education-panel education-gauge-panel">
          <div className="education-panel-title">Mục tiêu năm học</div>
          <div className="education-gauge-pair">
            <EducationGauge label="Huy động trẻ 3-5 tuổi đến lớp" target="99%" value={97} />
            <EducationGauge label="Trường học an toàn, xanh sạch đẹp" target="95%" value={91} />
          </div>
        </article>
      </div>
    </section>
  );
}
