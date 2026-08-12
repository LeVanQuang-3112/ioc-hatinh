import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { currentReportingPeriod } from "../../model/reportingPeriod";

function RevenueDonutChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#7b61ff", "#ff817d", "#39c6de"],
    legend: { show: false },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["54%", "74%"],
        center: ["54%", "47%"],
        avoidLabelOverlap: true,
        label: {
          color: "rgba(245, 248, 252, 0.86)",
          formatter: ({ name, percent }: { name?: string; percent?: number }) => {
            const label = name && name.length > 12 ? `${name.slice(0, 11)}...` : name;
            return `${label ?? ""}\n${percent ?? 0}%`;
          },
          fontSize: 11,
        },
        labelLine: {
          length: 10,
          length2: 6,
          lineStyle: { color: "rgba(245, 248, 252, 0.42)" },
        },
        itemStyle: {
          borderColor: "rgba(11, 17, 29, 0.96)",
          borderWidth: 2,
        },
        data: [
          { name: "Thu nội địa", value: 30 },
          { name: "Thu từ hoạt động xuất, nhập khẩu", value: 15 },
          { name: "Thu khác", value: 55 },
        ],
      },
    ],
  }), []);

  return (
    <div className="treasury-donut-wrap">
      <EChart className="treasury-donut-chart" option={option} ariaLabel="Cơ cấu tổng thu ngân sách nhà nước" />
      <div className="treasury-donut-center">
        <strong>962</strong>
        <span>Triệu đồng</span>
      </div>
      <div className="treasury-donut-legend">
        <span><i className="purple" />Thu nội địa</span>
        <span><i className="salmon" />Thu từ hoạt động xuất, nhập khẩu</span>
        <span><i className="cyan" />Thu khác (viện trợ, huy động, vốn góp)</span>
      </div>
    </div>
  );
}

function RevenueColumnChart({ compact = false }: { compact?: boolean }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#7565d8"],
    grid: {
      left: 50,
      right: 18,
      top: 34,
      bottom: 34,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8"],
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.38)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      max: 2200,
      interval: 400,
      name: "Triệu đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.68)", align: "left", padding: [0, 0, 0, 6] },
      axisLabel: { color: "rgba(245, 248, 252, 0.68)", fontSize: 11 },
      splitLine: { show: false },
    },
    series: [
      {
        type: "bar",
        barWidth: compact ? 54 : 48,
        data: [1230, 1540, 1875, 1120, 1980, 1550, 1725, 1840],
        itemStyle: {
          color: "#7565d8",
        },
      },
    ],
  }), [compact]);

  return <EChart className="treasury-bar-chart" option={option} ariaLabel="Biểu đồ thu ngân sách theo tháng" />;
}

function TreasuryPeriodSelect({ value = currentReportingPeriod.monthLabel }: { value?: string }) {
  return (
    <label className="treasury-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.monthLabel}>{currentReportingPeriod.monthLabel}</option>
        <option value={currentReportingPeriod.quarterLabel}>{currentReportingPeriod.quarterLabel}</option>
        <option value="Quý II/2026">Quý II/2026</option>
      </select>
    </label>
  );
}

function TreasuryProgressCard({
  className = "",
  color = "orange",
  title,
  value,
  trend = "12,6% so với cùng kỳ năm trước",
  trendTone = "green",
}: {
  className?: string;
  color?: "orange" | "cyan" | "pink";
  title: string;
  trend?: string;
  trendTone?: "green" | "amber" | "red";
  value: string;
}) {
  return (
    <article className={`treasury-panel treasury-card ${className}`}>
      <div className="treasury-title">{title}</div>
      <TreasuryPeriodSelect value={currentReportingPeriod.quarterLabel} />
      <div className="treasury-card-value">
        <strong>{value}</strong>
        <span>Triệu đồng</span>
      </div>
      <div className="treasury-progress-label">
        <span>So dự toán</span>
        <em>1,851</em>
      </div>
      <div className="treasury-progress">
        <i className={color} style={{ width: "61%" }} />
      </div>
      <p className={`treasury-trend ${trendTone}`}>{trend}</p>
    </article>
  );
}

export function RevenueDashboard() {

  return (
    <section className="treasury-dashboard" aria-label="Nhóm thu ngân sách">
      <div className="treasury-grid">
        <article className="treasury-panel treasury-donut-panel">
          <div className="treasury-title">Cơ cấu tổng thu ngân sách nhà nước</div>
          <TreasuryPeriodSelect />
          <RevenueDonutChart />
        </article>

        <article className="treasury-panel treasury-total-panel">
          <div className="treasury-title">Tổng các khoản thu ngân sách nhà nước</div>
          <TreasuryPeriodSelect />
          <RevenueColumnChart />
          <div className="treasury-big-metric">
            <strong>531</strong>
            <span>Triệu đồng</span>
            <div>
              <p className="treasury-trend green">12,6% so với dự toán</p>
              <p className="treasury-trend amber">12,6% so với cùng kỳ năm trước</p>
            </div>
          </div>
        </article>

        <article className="treasury-panel treasury-domestic-panel">
          <div className="treasury-title">Thu nội địa</div>
          <TreasuryPeriodSelect />
          <RevenueColumnChart compact />
          <div className="treasury-big-metric">
            <strong>431</strong>
            <span>Triệu đồng</span>
            <div>
              <p className="treasury-trend green">12,6% so với dự toán</p>
              <p className="treasury-trend amber">12,6% so với cùng kỳ năm trước</p>
            </div>
          </div>
        </article>

        <article className="treasury-panel treasury-debt-card">
          <div className="treasury-title">Tổng số tiền nợ thuế</div>
          <TreasuryPeriodSelect value={currentReportingPeriod.quarterLabel} />
          <div className="treasury-debt-value">
            <strong>234</strong>
            <span>Triệu đồng</span>
          </div>
          <p className="treasury-trend red">12,6% so với cùng kỳ năm trước</p>
        </article>

        <TreasuryProgressCard
          color="pink"
          title="Thu từ hoạt động xuất, nhập khẩu"
          trend="7,2% so với cùng kỳ năm trước"
          trendTone="amber"
          value="100"
        />
        <TreasuryProgressCard title="Thu khác (viện trợ, huy động, vốn góp)" value="77" />
        <TreasuryProgressCard
          color="pink"
          title="Thu thuế, phí"
          trend="7,2% so với cùng kỳ năm trước"
          trendTone="amber"
          value="234"
        />
        <TreasuryProgressCard color="cyan" title="Thu tiền thuê đất, tiền sử dụng đất" value="245" />
      </div>
    </section>
  );
}
