import type { DetailData } from "../../model/dashboardContent";
import { MiniLineChart, PieChartBlock } from "../shared/ChartBlocks";

export function DetailDashboard({ data }: { data: DetailData }) {
  return (
    <section className="detail-dashboard" aria-label={data.title}>
      <div className="detail-heading">
        <div>
          <p>Chi tiết nhóm chỉ tiêu</p>
          <h2>{data.title}</h2>
        </div>
        <span>{data.subtitle}</span>
      </div>

      <div className="detail-kpi-grid">
        {data.kpis.map((item) => (
          <article className={`detail-kpi ${item.tone ?? "green"}`} key={item.label}>
            <h3>{item.label}</h3>
            <div>
              <strong>{item.value}</strong>
              <span>{item.unit}</span>
            </div>
            <p>{item.trend}</p>
          </article>
        ))}
      </div>

      <div className="detail-layout">
        <article className="detail-panel detail-chart-panel">
          <div className="panel-title amber">
            <span className="metric-icon" aria-hidden="true" />
            {data.primaryChart}
          </div>
          <MiniLineChart series={data.highlights.map((item) => Number.parseFloat(item.value.replace(",", ".")) || 32)} />
          <div className="detail-accordion">
            {data.highlights.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value} {item.unit}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-panel">
          <div className="panel-title amber">
            <span className="coin-icon" aria-hidden="true" />
            Cơ cấu chỉ tiêu
          </div>
          <PieChartBlock items={data.pie} />
        </article>

        <article className="detail-panel detail-highlight-panel">
          <div className="panel-title amber">
            <span className="investment-icon" aria-hidden="true" />
            Chỉ số nổi bật
          </div>
          {data.highlights.map((item) => (
            <div className={`panel-metric large ${item.tone ?? "green"}`} key={item.label}>
              <h2>{item.label}</h2>
              <div>
                <strong>{item.value}</strong>
                <span>{item.unit}</span>
              </div>
              <p>{item.trend}</p>
            </div>
          ))}
        </article>

        <article className="detail-panel detail-bars-panel">
          <div className="panel-title amber">
            <span className="service-icon" aria-hidden="true" />
            Top địa bàn theo tiến độ
          </div>
          <div className="bar-list">
            {data.bars.map((item) => (
              <div className="bar-row" key={item.label}>
                <span>{item.label}</span>
                <div>
                  <i className={item.tone} style={{ width: `${item.value}%` }} />
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-panel detail-table-panel">
          <div className="panel-title amber">
            <span className="investment-icon" aria-hidden="true" />
            Nhiệm vụ thực hiện các nghị quyết trọng tâm
          </div>
          <div className="detail-table">
            <div className="detail-table-head">
              <span>Tên nhiệm vụ</span>
              <span>Ngày ban hành</span>
              <span>Trạng thái</span>
            </div>
            {data.table.map((row) => (
              <div className="detail-table-row" key={`${row.name}-${row.date}`}>
                <span>{row.name}</span>
                <span>{row.date}</span>
                <strong>{row.status}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
