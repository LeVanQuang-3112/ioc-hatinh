import { resolutionFocusCards, type ResolutionFocusCard, type ResolutionTaskStatus } from "../../model/dashboardContent";
import { currentReportingPeriod } from "../../model/reportingPeriod";

function ResolutionPeriodSelect() {
  return (
    <label className="resolution-period-select">
      <span>Kỳ báo cáo</span>
      <select defaultValue={currentReportingPeriod.monthValue} aria-label="Kỳ báo cáo">
        <option value={currentReportingPeriod.monthValue}>{currentReportingPeriod.monthLabel}</option>
        <option value={currentReportingPeriod.quarterValue}>{currentReportingPeriod.quarterLabel}</option>
        <option value="month-2">Tháng 2/2026</option>
      </select>
    </label>
  );
}

function ResolutionStatusBadge({ status }: { status: ResolutionTaskStatus }) {
  const toneByStatus: Record<ResolutionTaskStatus, string> = {
    "Đúng hạn": "green",
    "Theo dõi": "amber",
    "Hoàn thành": "teal",
    "Quá hạn": "red",
  };

  return <strong className={`resolution-status ${toneByStatus[status]}`}>{status}</strong>;
}

function ResolutionFocusCard({ card }: { card: ResolutionFocusCard }) {
  return (
    <article className="resolution-card">
      <div className="resolution-card-top">
        <h3>
          <span>{card.code}</span> - {card.title}
        </h3>
        <p>{card.subtitle}</p>
        <ResolutionPeriodSelect />
      </div>

      <div className="resolution-task-table">
        <div className="resolution-task-head">
          <span>Mã - tên nhiệm vụ</span>
          <span>Cơ quan</span>
          <span>Thời hạn</span>
          <span>Trạng thái</span>
        </div>
        {card.tasks.map((task) => (
          <div className="resolution-task-row" key={`${card.code}-${task.code}-${task.name}`}>
            <div>
              <small>{task.group}</small>
              <span><b>{task.code}:</b> {task.name}</span>
            </div>
            <span>{task.agency}</span>
            <span>{task.deadline}</span>
            <ResolutionStatusBadge status={task.status} />
          </div>
        ))}
      </div>
    </article>
  );
}

export function ResolutionTasksDashboard() {
  return (
    <section className="resolution-dashboard" aria-label="Theo dõi nghị quyết trọng tâm">
      <div className="resolution-grid">
        {resolutionFocusCards.map((card) => (
          <ResolutionFocusCard card={card} key={card.code} />
        ))}
      </div>
    </section>
  );
}
