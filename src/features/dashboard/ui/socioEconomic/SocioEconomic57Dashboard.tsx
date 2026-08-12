import { useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import { MiniLineChart } from "../shared/ChartBlocks";

const socioEconomic57Summary = [
  { label: "Tổng số chỉ tiêu", value: "57", unit: "Chỉ tiêu", tone: "white" },
  { label: "Hoàn thành / đạt tiến độ", value: "35", unit: "Chỉ tiêu", tone: "green" },
  { label: "Đang theo dõi", value: "17", unit: "Chỉ tiêu", tone: "cyan" },
  { label: "Cần đôn đốc", value: "5", unit: "Chỉ tiêu", tone: "amber" },
] as const;

const socioEconomic57Groups = [
  { label: "Kinh tế", total: 18, done: 11, watch: 5, risk: 2 },
  { label: "Ngân sách - đầu tư", total: 9, done: 6, watch: 2, risk: 1 },
  { label: "Văn hóa - xã hội", total: 12, done: 8, watch: 3, risk: 1 },
  { label: "Môi trường - đô thị", total: 8, done: 4, watch: 3, risk: 1 },
  { label: "Cải cách - chuyển đổi số", total: 10, done: 6, watch: 4, risk: 0 },
] as const;

const socioEconomic57PriorityRows = [
  { name: "Tốc độ tăng trưởng GRDP", group: "Kinh tế", value: "8,78%", target: ">= 8,5%", status: "Đạt" },
  { name: "Thu ngân sách nhà nước trên địa bàn", group: "Ngân sách", value: "15.212 tỷ", target: ">= 17.500 tỷ", status: "Theo dõi" },
  { name: "Giải ngân vốn đầu tư công", group: "Đầu tư", value: "61,2%", target: ">= 95%", status: "Đôn đốc" },
  { name: "Tỷ lệ bao phủ bảo hiểm y tế", group: "Xã hội", value: "99,43%", target: ">= 95%", status: "Đạt" },
  { name: "Tỷ lệ che phủ rừng", group: "Môi trường", value: "34,24%", target: ">= 55%", status: "Đôn đốc" },
] as const;

const socioEconomic57MonthlyProgress = [58, 63, 67, 72, 78, 82.6];

function SocioEconomic57BarChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#16d196", "#63c7ff", "#f4b45e"],
    grid: { left: 46, right: 20, top: 44, bottom: 34 },
    legend: {
      top: 8,
      right: 12,
      icon: "rect",
      itemHeight: 9,
      itemWidth: 9,
      textStyle: { color: "rgba(245, 248, 252, 0.78)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: socioEconomic57Groups.map((item) => item.label),
      axisLabel: { color: "rgba(172, 188, 211, 0.86)", fontSize: 11, interval: 0 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 20,
      interval: 5,
      axisLabel: { color: "rgba(172, 188, 211, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(112, 132, 162, 0.24)" } },
    },
    series: [
      { name: "Đạt", type: "bar", stack: "total", barWidth: 24, data: socioEconomic57Groups.map((item) => item.done) },
      { name: "Theo dõi", type: "bar", stack: "total", barWidth: 24, data: socioEconomic57Groups.map((item) => item.watch) },
      { name: "Đôn đốc", type: "bar", stack: "total", barWidth: 24, data: socioEconomic57Groups.map((item) => item.risk) },
    ],
  }), []);

  return <EChart className="socio57-bar-chart" option={option} ariaLabel="Cơ cấu 57 chỉ tiêu theo nhóm" />;
}

export function SocioEconomic57Dashboard() {
  return (
    <section className="socio57-dashboard" aria-label="Bộ 57 chỉ tiêu phát triển kinh tế xã hội">
      <div className="socio57-heading">
        <div>
          <p>Bộ chỉ tiêu KTXH 2025-2030</p>
          <h2>Bộ 57 chỉ tiêu phát triển kinh tế - xã hội giai đoạn 2025-2030</h2>
        </div>
        <span>Tổng hợp tiến độ thực hiện theo nhóm lĩnh vực, trạng thái đạt mục tiêu và các chỉ tiêu cần đôn đốc trong kỳ báo cáo.</span>
      </div>

      <div className="socio57-kpi-grid">
        {socioEconomic57Summary.map((item) => (
          <article className={`socio57-kpi ${item.tone}`} key={item.label}>
            <h3>{item.label}</h3>
            <div>
              <strong>{item.value}</strong>
              <span>{item.unit}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="socio57-grid">
        <article className="socio57-panel socio57-chart-panel">
          <div className="panel-title amber">
            <span className="metric-icon" aria-hidden="true" />
            Cơ cấu chỉ tiêu theo nhóm lĩnh vực
          </div>
          <SocioEconomic57BarChart />
        </article>

        <article className="socio57-panel socio57-progress-panel">
          <div className="panel-title cyan">
            <span className="investment-icon" aria-hidden="true" />
            Tỷ lệ hoàn thành bình quân
          </div>
          <div className="socio57-progress-value">
            <strong>82,6</strong>
            <span>%</span>
          </div>
          <MiniLineChart series={socioEconomic57MonthlyProgress} />
        </article>

        <article className="socio57-panel socio57-matrix-panel">
          <div className="panel-title amber">
            <span className="service-icon" aria-hidden="true" />
            Ma trận 57 chỉ tiêu
          </div>
          <div className="socio57-group-list">
            {socioEconomic57Groups.map((item) => (
              <div className="socio57-group-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.done}/{item.total}</strong>
                <i>
                  <b className="green" style={{ width: `${(item.done / item.total) * 100}%` }} />
                  <b className="cyan" style={{ width: `${(item.watch / item.total) * 100}%` }} />
                  <b className="amber" style={{ width: `${(item.risk / item.total) * 100}%` }} />
                </i>
              </div>
            ))}
          </div>
        </article>

        <article className="socio57-panel socio57-table-panel">
          <div className="panel-title amber">
            <span className="coin-icon" aria-hidden="true" />
            Chỉ tiêu trọng tâm trong kỳ
          </div>
          <div className="socio57-table">
            <div className="socio57-table-head">
              <span>Chỉ tiêu</span>
              <span>Nhóm</span>
              <span>Thực hiện</span>
              <span>Mục tiêu</span>
              <span>Trạng thái</span>
            </div>
            {socioEconomic57PriorityRows.map((row) => (
              <div className="socio57-table-row" key={row.name}>
                <span>{row.name}</span>
                <span>{row.group}</span>
                <strong>{row.value}</strong>
                <span>{row.target}</span>
                <em>{row.status}</em>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
