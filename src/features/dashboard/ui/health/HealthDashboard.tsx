import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";

const healthMonths = ["T1/2026", "T2/2026", "T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];
const healthShortMonths = ["T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];

type HealthLineConfig = {
  label: string;
  series: number[];
  value: string;
};

const healthServiceLines: HealthLineConfig[] = [
  { label: "Bác sĩ/vạn dân", series: [210.5, 190, 182, 205, 231, 216], value: "210,5" },
  { label: "Giường bệnh/vạn dân", series: [72, 68, 32, 48, 122, 139.6], value: "139,6" },
];

const healthInsuranceLines: HealthLineConfig[] = [
  { label: "BHXH", series: [2100, 3000, 3500, 3200, 3800, 5339], value: "5.339" },
  { label: "BHYT", series: [3800, 4100, 3420, 3430, 3050, 4192], value: "4.192" },
  { label: "BHTN", series: [4580, 4400, 5350, 4920, 5700, 7085], value: "7.085" },
];

const healthBeneficiaryLines: HealthLineConfig[] = [
  { label: "BHXH", series: [3520, 3180, 3570, 3320, 2860, 3124], value: "3.124" },
  { label: "BHYT", series: [1040, 880, 1320, 1580, 1620, 1535], value: "1.535" },
  { label: "BHTN", series: [2940, 3150, 2970, 3680, 4040, 4340], value: "4.340" },
];

function HealthPeriodSelect({ value = "Tháng 1/2026" }: { value?: string }) {
  return (
    <label className="health-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value="Tháng 1/2026">Tháng 1/2026</option>
        <option value="Quý I/2026">Quý I/2026</option>
        <option value="Năm 2026">Năm 2026</option>
      </select>
    </label>
  );
}

function HealthMiniLineChart({ data, max = 10000 }: { data: HealthLineConfig; max?: number }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#2f80ff"],
    grid: { left: 42, right: 16, top: 18, bottom: 28 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: healthShortMonths,
      axisLabel: { color: "#657898", fontSize: 10, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max,
      interval: max / 4,
      axisLabel: {
        color: "#657898",
        fontSize: 10,
        formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
      },
      splitLine: { lineStyle: { color: "rgba(104, 123, 154, 0.24)" } },
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbolSize: 8,
        data: data.series,
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(47, 128, 255, 0.22)" },
        itemStyle: { borderColor: "#05101d", borderWidth: 2 },
      },
    ],
  }), [data, max]);

  return <EChart className="health-mini-line-chart" option={option} ariaLabel={`Biểu đồ ${data.label}`} />;
}

function HealthBarChart({ data, max = 2000, unit }: { data: number[]; max?: number; unit: string }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#327bf6"],
    grid: { left: 60, right: 34, top: 40, bottom: 52 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: healthMonths,
      axisLabel: { color: "#657898", fontSize: 12, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max,
      interval: max / 4,
      name: unit,
      nameTextStyle: { color: "#657898", fontSize: 12, fontStyle: "italic", align: "left", padding: [0, 0, 8, 0] },
      axisLabel: {
        color: "#657898",
        fontSize: 12,
        formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
      },
      splitLine: { lineStyle: { color: "rgba(104, 123, 154, 0.28)" } },
    },
    series: [
      {
        type: "bar",
        barWidth: "58%",
        data,
        itemStyle: { borderRadius: [4, 4, 1, 1] },
      },
    ],
  }), [data, max, unit]);

  return <EChart className="health-bar-chart" option={option} ariaLabel="Biểu đồ cột y tế và an sinh" />;
}

function HealthGauge({
  label,
  target = "95%",
  value = 70,
}: {
  label: string;
  target?: string;
  value?: number;
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ["50%", "70%"],
        radius: "92%",
        progress: { show: true, width: 18, itemStyle: { color: "#2fa75a" } },
        axisLine: {
          lineStyle: {
            width: 18,
            color: [[0.7, "#2fa75a"], [1, "#ffd15f"]],
          },
        },
        pointer: { length: "42%", width: 6, offsetCenter: [0, "-8%"], itemStyle: { color: "#f7fbff" } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          formatter: "{value}%",
          offsetCenter: [0, "0%"],
          color: "#2faf60",
          fontSize: 30,
          fontWeight: 900,
        },
        data: [{ value }],
      },
    ],
  }), [value]);

  return (
    <div className="health-gauge-block">
      <EChart className="health-gauge-chart" option={option} ariaLabel={label} />
      <strong>MỤC TIÊU: {target}</strong>
      <span>{label}</span>
    </div>
  );
}

function HealthMetricCard({
  className = "",
  title,
  trend = "+3.2%",
  trendTone = "green",
  unit,
  value,
}: {
  className?: string;
  title: string;
  trend?: string;
  trendTone?: "green" | "red";
  unit: string;
  value: string;
}) {
  return (
    <article className={`health-panel health-metric-card ${className}`}>
      <div className="health-card-title">{title}</div>
      <HealthPeriodSelect />
      <div className="health-big-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <p className={`health-trend ${trendTone}`}>{trend} <span>So với cùng kỳ</span></p>
    </article>
  );
}

function HealthLineGroup({
  className = "",
  items,
  title,
  max,
}: {
  className?: string;
  items: HealthLineConfig[];
  max: number;
  title: string;
}) {
  return (
    <article className={`health-panel health-line-group ${className}`}>
      <div className="health-card-title">{title}</div>
      <HealthPeriodSelect />
      <p className="health-chart-note">Đơn vị: Người - từng chỉ tiêu theo tháng riêng để trình lệch tỷ lệ</p>
      <div className="health-line-grid">
        {items.map((item) => (
          <div className="health-line-item" key={item.label}>
            <h3>{item.label}</h3>
            <div>
              <strong>{item.value}</strong>
              <span>Người</span>
            </div>
            <HealthMiniLineChart data={item} max={max} />
          </div>
        ))}
      </div>
    </article>
  );
}

export function HealthDashboard() {
  return (
    <section className="health-social-dashboard" aria-label="Nhóm y tế, an sinh xã hội">
      <div className="health-social-grid">
        <HealthMetricCard
          className="health-doctors-card"
          title="Số bác sĩ/trạm y tế"
          unit="Bác sĩ"
          value="2.501"
        />

        <article className="health-panel health-service-panel">
          <div className="health-card-title">Số bác sĩ và giường bệnh trên 1 vạn dân</div>
          <HealthPeriodSelect value="Năm 2026" />
          <p className="health-chart-note">Đơn vị: trên vạn dân - từng chỉ tiêu theo tháng riêng để trình lệch tỷ lệ</p>
          <div className="health-line-grid two">
            {healthServiceLines.map((item) => (
              <div className="health-line-item" key={item.label}>
                <h3>{item.label}</h3>
                <div>
                  <strong>{item.value}</strong>
                  <span>trên vạn dân</span>
                </div>
                <HealthMiniLineChart data={item} max={item.label.startsWith("Bác") ? 500 : 200} />
              </div>
            ))}
          </div>
        </article>

        <article className="health-panel health-screening-panel">
          <div className="health-card-title">Người dân khám sức khỏe định kỳ/sàng lọc miễn phí 2 lần/năm</div>
          <HealthPeriodSelect />
          <HealthGauge label="MỤC TIÊU: 55%" target="55%" />
        </article>

        <article className="health-panel health-exam-panel">
          <div className="health-card-title">Tổng số lượt khám bệnh</div>
          <HealthPeriodSelect />
          <div className="health-big-value">
            <strong>654</strong>
            <span>Lượt</span>
          </div>
          <p className="health-trend red">-5.5% <span>So với cùng kỳ</span></p>
          <HealthBarChart data={[1050, 940, 650, 440, 1210, 810, 360, 654]} unit="Lượt" />
        </article>

        <HealthLineGroup
          className="health-insurance-panel"
          items={healthInsuranceLines}
          max={10000}
          title="Số người tham gia BHXH, BHYT, BHTN"
        />

        <article className="health-panel health-revenue-panel">
          <div className="health-card-title">Thu BHXH, BHYT, BHTN</div>
          <HealthPeriodSelect />
          <div className="health-big-value">
            <strong>2.825</strong>
            <span>Tỷ đồng</span>
          </div>
          <p className="health-trend green">+5.6% <span>So với cùng kỳ</span></p>
          <HealthBarChart data={[1740, 1820, 1750, 2050, 2260, 2640, 3050, 2825]} max={5000} unit="Tỷ đồng" />
        </article>

        <HealthLineGroup
          className="health-beneficiary-panel"
          items={healthBeneficiaryLines}
          max={5000}
          title="Số người hưởng BHXH, BHYT, BHTN"
        />

        <article className="health-panel health-payment-panel">
          <div className="health-card-title">Chi trả BHXH, BHYT, BHTN</div>
          <HealthPeriodSelect />
          <div className="health-big-value">
            <strong>2.188</strong>
            <span>Tỷ đồng</span>
          </div>
          <p className="health-trend red">-5.7% <span>So với cùng kỳ</span></p>
          <HealthBarChart data={[1320, 1410, 1580, 1460, 1530, 1690, 2030, 2188]} max={5000} unit="Tỷ đồng" />
        </article>

        <article className="health-panel health-coverage-panel">
          <div className="health-card-title">Tỷ lệ bao phủ BHYT và tỷ lệ LLLĐ tham gia BHXH</div>
          <HealthPeriodSelect value="Quý I/2026" />
          <div className="health-gauge-row">
            <HealthGauge label="BAO PHỦ BHYT" />
            <HealthGauge label="LLLĐ THAM GIA BHXH" />
          </div>
        </article>

        <article className="health-panel health-poverty-panel">
          <div className="health-card-title">Hộ nghèo (giảm nghèo đa chiều, giảm hộ nghèo)</div>
          <HealthPeriodSelect value="Năm 2026" />
          <div className="health-gauge-row">
            <HealthGauge label="GIẢM NGHÈO ĐA CHIỀU" />
            <HealthGauge label="GIẢM HỘ NGHÈO" />
          </div>
        </article>
      </div>
    </section>
  );
}
