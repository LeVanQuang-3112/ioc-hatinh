import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";

function ExpenseMonthlyBarChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#7767d6", "#d47a74"],
    grid: { left: 48, right: 24, top: 36, bottom: 58 },
    legend: {
      bottom: 4,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
      axisLabel: { color: "rgba(245, 248, 252, 0.64)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.46)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 50,
      name: "Tỷ đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.68)", padding: [0, 36, 8, 0], fontStyle: "italic" },
      axisLabel: { color: "rgba(245, 248, 252, 0.64)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.14)" } },
    },
    series: [
      {
        name: "Chi đầu tư phát triển",
        type: "bar",
        barWidth: 46,
        data: [90, 50, 79, 68],
      },
      {
        name: "Chi thường xuyên",
        type: "bar",
        barWidth: 46,
        data: [65, 88, 51, 89],
      },
    ],
  }), []);

  return <EChart className="expense-monthly-chart" option={option} ariaLabel="Chi ngân sách địa phương hằng tháng" />;
}

function ExpensePeriodSelect({ label = "Kỳ báo cáo" }: { label?: string }) {
  return (
    <label className="expense-period-select">
      <span>{label}</span>
      <select defaultValue="quarter">
        <option value="quarter">Quý I/2026</option>
        <option value="month">Tháng 1/2026</option>
      </select>
    </label>
  );
}

function ExpenseBudgetCard({
  className = "",
  title,
  value,
  unit = "Tỷ đồng",
  trend = "7,2%",
  trendTone = "amber",
  progressTone = "warm",
}: {
  className?: string;
  title: string;
  value: string;
  unit?: string;
  trend?: string;
  trendTone?: "amber" | "green";
  progressTone?: "warm" | "cyan";
}) {
  return (
    <article className={`expense-ioc-panel expense-budget-card ${className}`}>
      <h3>{title}</h3>
      <ExpensePeriodSelect />
      <div className="expense-budget-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <div className="expense-progress-label">
        <span>So dự toán</span>
        <small>61.09%</small>
        <small>1,851</small>
      </div>
      <div className={`expense-progress-track ${progressTone}`}>
        <i />
      </div>
      <p className={`expense-trend ${trendTone}`}>
        <i aria-hidden="true" />
        <strong>{trend}</strong>
        <span>so với cùng kỳ năm trước</span>
      </p>
    </article>
  );
}


export function ExpenseDashboard() {
  return (
    <section className="expense-ioc-dashboard" aria-label="Nhóm chi ngân sách">
      <div className="expense-ioc-grid">
        <ExpenseBudgetCard
          className="expense-total-card"
          title="Tổng chi ngân sách địa phương"
          value="100"
        />

        <article className="expense-ioc-panel expense-share-panel">
          <h3>Cơ cấu tỷ trọng các khoản chi</h3>
          <ExpensePeriodSelect />
          <div className="expense-donut-wrap">
            <EChart
              ariaLabel="Cơ cấu tỷ trọng các khoản chi"
              className="expense-donut-chart"
              option={{
                color: ["#67d893", "#ff7f7a"],
                legend: { show: false },
                series: [
                  {
                    type: "pie",
                    radius: ["64%", "82%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: true,
                    label: {
                      color: "#f6fbff",
                      formatter: "722\nTỷ đồng",
                      fontSize: 24,
                      fontWeight: 800,
                      lineHeight: 32,
                      position: "center",
                      show: true,
                    },
                    labelLine: { show: false },
                    itemStyle: { borderWidth: 0 },
                    data: [
                      { name: "Chi thường xuyên", value: 522 },
                      { name: "Chi đầu tư phát triển", value: 200 },
                    ],
                  },
                ],
              }}
            />
            <div className="expense-donut-legend">
              <span><i className="green" />Chi thường xuyên: 522 tỷ đồng (66%)</span>
              <span><i className="red" />Chi đầu tư phát triển: 200 tỷ đồng (34%)</span>
            </div>
          </div>
        </article>

        <article className="expense-ioc-panel expense-monthly-panel">
          <h3>Chi ngân sách địa phương hằng tháng</h3>
          <ExpensePeriodSelect label="Kỳ báo cáo" />
          <ExpenseMonthlyBarChart />
        </article>

        <ExpenseBudgetCard
          className="expense-investment-card"
          title="Chi đầu tư phát triển"
          value="77"
          trend="12,6%"
          trendTone="green"
          progressTone="cyan"
        />

        <ExpenseBudgetCard
          className="expense-regular-card"
          title="Chi thường xuyên"
          value="23"
        />
      </div>
    </section>
  );
}
