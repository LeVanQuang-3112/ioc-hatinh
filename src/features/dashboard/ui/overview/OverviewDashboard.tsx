import { type ReactNode, useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
import {
  BadgeDollarSign,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Factory,
  FileText,
  HeartPulse,
  Landmark,
  ListChecks,
  MapPinned,
  Sprout,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { MapCanvas } from "../shared/MapCanvas";

const resolutionRows = [
  { name: "Nghị Quyết Số 57-NQ/TW", date: "22/12/2024", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 59-NQ/TW", date: "24/01/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 66-NQ/TW", date: "10/04/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 68-NQ/TW", date: "04/05/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 70-NQ/TW", date: "20/08/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 71-NQ/TW", date: "22/08/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 72-NQ/TW", date: "09/09/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 79-NQ/TW", date: "06/01/2026", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 80-NQ/TW", date: "07/01/2026", status: "Đang Thực Hiện" },
];

const targetRows = [
  { name: "003_NQ66 - Chương Trình Hành Động Thực Hiện Nghị Quyết Số 66-NQ/TW", date: "31/12/2026", status: "Đang Thực Hiện" },
  { name: "004_NQ66 - Quán Triệt Trách Nhiệm Của Các Cấp Ủy Đảng Trong Lãnh Đạo", date: "31/12/2026", status: "Đang Thực Hiện" },
  { name: "005_NQ66 - Rà Soát, Hoàn Thiện Pháp Luật", date: "31/12/2026", status: "Đang Thực Hiện" },
  { name: "006_NQ66 - Xây Dựng Văn Hóa Tuân Thủ Pháp Luật", date: "31/12/2026", status: "Đang Thực Hiện" },
  { name: "007_NQ66 - Thường Xuyên Đánh Giá Hiệu Quả Của Pháp Luật Sau Ban Hành", date: "31/12/2026", status: "Đang Thực Hiện" },
  { name: "008_NQ66 - Nâng Cao Chất Lượng Thẩm Định Văn Bản QPPL", date: "31/12/2026", status: "Theo Dõi" },
  { name: "009_NQ66 - Số Hóa Cơ Sở Dữ Liệu Thi Hành Pháp Luật", date: "31/12/2026", status: "Đang Thực Hiện" },
  { name: "010_NQ66 - Phổ Biến Giáo Dục Pháp Luật Cho Cơ Sở", date: "31/12/2026", status: "Hoàn Thành" },
];

const enterpriseRows = [
  { label: "Số hợp tác xã đang hoạt động: 1000", percent: 98, tone: "#1bd088" },
  { label: "Số tổ hợp tác xã thành lập mới: 34", percent: 72, tone: "#55a7e8" },
  { label: "Số tổ hợp tác xã ngừng hoạt động: 456", percent: 60, tone: "#a889ff" },
];

type OverviewIcon = "admin" | "agriculture" | "budget" | "education" | "enterprise" | "grdp" | "health" | "industry" | "investment" | "land" | "planning" | "resolution" | "service" | "target";

const overviewIcons: Record<OverviewIcon, LucideIcon> = {
  admin: ClipboardCheck,
  agriculture: Sprout,
  budget: BadgeDollarSign,
  education: BookOpen,
  enterprise: Building2,
  grdp: TrendingUp,
  health: HeartPulse,
  industry: Factory,
  investment: Landmark,
  land: MapPinned,
  planning: BriefcaseBusiness,
  resolution: FileText,
  service: Store,
  target: ListChecks,
};

function OverviewCard({ children, className = "", icon = "service", title }: { children: ReactNode; className?: string; icon?: OverviewIcon; title: string }) {
  const Icon = overviewIcons[icon];

  return (
    <article className={`overview-ioc-card ${className}`}>
      <div className="overview-ioc-title">
        <span className="overview-card-icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2.4} />
        </span>
        <span className="overview-ioc-title-text">{title}</span>
      </div>
      {children}
    </article>
  );
}

function OverviewValue({
  className = "",
  label,
  note = "12,6% so với cùng kỳ năm trước",
  unit,
  value,
}: {
  className?: string;
  label: string;
  note?: string;
  unit: string;
  value: string;
}) {
  return (
    <div className={`overview-value ${className}`}>
      <span>{label}</span>
      <div>
        <strong>{value}</strong>
        <small>{unit}</small>
      </div>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function OverviewSimpleTable({
  rows,
  type = "resolution",
}: {
  rows: ReadonlyArray<{ name: string; date: string; status: string }>;
  type?: "resolution" | "target";
}) {
  return (
    <div className={`overview-simple-table ${type}`}>
      <div className="overview-simple-head">
        <span>{type === "target" ? "Mã - Tên Nhiệm Vụ" : "Tên Nghị Quyết"}</span>
        <span>{type === "target" ? "Thời Hạn Hoàn Thành" : "Ngày Ban Hành"}</span>
        <span>{type === "target" ? "Kết Quả Thực Hiện" : "Trạng Thái"}</span>
      </div>
      {rows.map((row, index) => (
        <div className="overview-simple-row" key={`${row.name}-${row.date}-${index}`}>
          <span>{row.name}</span>
          <span>{row.date}</span>
          <strong>{row.status}</strong>
        </div>
      ))}
    </div>
  );
}

function OverviewPieChart({
  className = "",
  items,
  type = "pie",
}: {
  className?: string;
  items: ReadonlyArray<{ label: string; value: number; color: string }>;
  type?: "pie" | "donut";
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: items.map((item) => item.color),
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      formatter: "{b}: {d}%",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: className.includes("trade") ? ["0%", "76%"] : type === "donut" ? ["52%", "74%"] : ["0%", "72%"],
        center: className.includes("trade") ? ["50%", "45%"] : ["50%", "48%"],
        avoidLabelOverlap: true,
        label: {
          color: "rgba(255, 255, 255, 0.82)",
          fontSize: className.includes("trade") ? 11 : 10,
          formatter: "{d}%",
        },
        labelLine: { show: false },
        itemStyle: {
          borderColor: "rgba(8, 13, 24, 0.55)",
          borderWidth: 1,
        },
        data: items.map((item) => ({ name: item.label, value: item.value })),
      },
    ],
  }), [className, items, type]);

  return (
    <div className={`overview-real-pie ${className}`}>
      <EChart className="overview-real-pie-chart" option={option} ariaLabel="Biểu đồ cơ cấu" />
      <div className="overview-pie-legend">
        {items.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function OverviewGaugeChart({ label = "MỤC TIÊU: 100%", value }: { label?: string; value: number }) {
  return <OverviewPlanningCoverageChart value={value} ariaLabel={label} />;
}

function OverviewPlanningCoverageChart({ ariaLabel = "Tỷ lệ phủ kín quy hoạch chung", value }: { ariaLabel?: string; value: number }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animation: false,
    series: [
      {
        type: "gauge",
        startAngle: 205,
        endAngle: -25,
        min: 0,
        max: 100,
        radius: "92%",
        center: ["50%", "54%"],
        progress: {
          show: true,
          roundCap: true,
          width: 14,
          itemStyle: { color: "#18c68b" },
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 14,
            color: [
              [0.75, "rgba(24, 198, 139, 0.28)"],
              [1, "rgba(104, 126, 160, 0.28)"],
            ],
          },
        },
        pointer: {
          show: true,
          length: "42%",
          width: 3,
          itemStyle: { color: "#f7b53b" },
        },
        anchor: {
          show: true,
          size: 5,
          itemStyle: { color: "#f7b53b" },
        },
        axisTick: {
          distance: -20,
          length: 4,
          lineStyle: { color: "rgba(237, 246, 255, 0.38)", width: 1 },
        },
        splitLine: {
          distance: -22,
          length: 8,
          lineStyle: { color: "rgba(237, 246, 255, 0.54)", width: 1 },
        },
        axisLabel: {
          distance: -5,
          color: "rgba(221, 234, 247, 0.68)",
          fontSize: 8,
          formatter: (labelValue: number) => labelValue % 50 === 0 ? `${labelValue}` : "",
        },
        detail: {
          color: "#16d392",
          fontSize: 24,
          fontWeight: 900,
          lineHeight: 24,
          offsetCenter: [0, "42%"],
          formatter: (chartValue: number) => `{value|${chartValue}}\n{spacer|}\n{unit|%}`,
          rich: {
            value: {
              color: "#16d392",
              fontSize: 25,
              fontWeight: 900,
              lineHeight: 22,
            },
            spacer: {
              height: 8,
              lineHeight: 8,
            },
            unit: {
              color: "#16d392",
              fontSize: 16,
              fontWeight: 900,
              lineHeight: 18,
            },
          },
        },
        title: {
          color: "rgba(237, 246, 255, 0.78)",
          fontSize: 9,
          fontWeight: 800,
          offsetCenter: [0, "82%"],
        },
        data: [{ value, name: "Mục tiêu: 100%" }],
      },
    ],
  }), [value]);

  return <EChart className="overview-planning-coverage-chart" option={option} ariaLabel={ariaLabel} />;
}

function OverviewBarChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#0bd097"],
    grid: { left: 104, right: 30, top: 24, bottom: 22 },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "value",
      max: 100,
      axisLabel: { color: "rgba(221, 234, 247, 0.82)", fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "category",
      data: ["Phôi thép", "Thép thành phẩm"],
      inverse: true,
      axisLabel: { color: "rgba(221, 234, 247, 0.82)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(98, 155, 196, 0.46)" } },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        barWidth: 22,
        data: [68, 94],
        itemStyle: { borderRadius: 0 },
      },
    ],
  }), []);

  return <EChart className="overview-bar-chart" option={option} ariaLabel="Sản phẩm công nghiệp thép" />;
}

function OverviewLaborDonut() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#69d28a", "#ff8b86"],
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["58%", "76%"],
        center: ["50%", "50%"],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { name: "Số LĐ được giới thiệu việc làm cho các dự án, doanh nghiệp", value: 522 },
          { name: "Lao động về quê làm việc", value: 200 },
        ],
      },
    ],
    graphic: [
      {
        type: "text",
        left: "center",
        top: "39%",
        style: { text: "722", fill: "#ffffff", fontSize: 24, fontWeight: 900, textAlign: "center" },
      },
      {
        type: "text",
        left: "center",
        top: "56%",
        style: { text: "Lao động", fill: "#ffffff", fontSize: 13, fontWeight: 800, textAlign: "center" },
      },
    ],
  }), []);

  return (
    <div className="overview-labor-chart-wrap">
      <h3>Số Lao Động Được Giải Quyết Việc Làm</h3>
      <EChart className="overview-labor-donut-chart" option={option} ariaLabel="Số lao động được giải quyết việc làm" />
      <div className="overview-labor-legend">
        <span><i className="green" />Số LĐ được giới thiệu việc làm cho các dự án, doanh nghiệp: 522 người (66%)</span>
        <span><i className="salmon" />Lao động về quê làm việc: 200 người (34%)</span>
      </div>
    </div>
  );
}

function OverviewPlanningAssetsMetric() {
  return (
    <div className="overview-planning-metric">
      <h3>Tổng Số Cơ Sở Nhà Đất</h3>
      <div>
        <strong>126</strong>
        <small>Cơ sở</small>
      </div>
      <p>12,6% so với cùng kỳ năm trước</p>
    </div>
  );
}

export function OverviewDashboard() {
  return (
    <section className="overview-ioc" aria-label="Tab tổng hợp">
      <div className="overview-ioc-grid">
        <OverviewCard className="overview-ioc-grdp" icon="grdp" title="Chỉ số về GRDP">
          <div className="overview-kpi-strip two">
            <OverviewValue label="Tốc Độ Tăng Trưởng GRDP" value="8,67" unit="%" note="Lũy kế đến 08/2026" />
            <OverviewValue label="GRDP Bình Quân Đầu Người" value="68,23" unit="Triệu đồng/người/năm" note="Lũy kế đến 08/2026" />
          </div>
        </OverviewCard>

        <MapCanvas className="overview-ioc-map" title="Bản đồ GIS tổng hợp Hà Tĩnh" />

        <OverviewCard className="overview-ioc-industry" icon="industry" title="Công nghiệp">
          <div className="overview-bar-panel">
            <h3>Sản Phẩm Công Nghiệp (Thép)</h3>
            <OverviewBarChart />
            <small>Triệu tấn</small>
            <button className="overview-link" type="button">Xem thêm sản phẩm →</button>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-agriculture" icon="agriculture" title="Nông nghiệp">
          <div className="overview-agriculture-grid">
            <OverviewValue className="red" label="Tỷ Lệ Che Phủ Rừng" value="34,24" unit="%" note="Ổn định so với năm trước" />
            <div className="overview-pie-cell">
              <h3>Sản Lượng Thủy Sản: 31,7 nghìn tấn</h3>
              <OverviewPieChart items={[
                { label: "Nuôi trồng", value: 35, color: "#8c78ff" },
                { label: "Khai thác", value: 65, color: "#ff8b86" },
              ]} />
            </div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-projects" icon="investment" title="Dự án trọng điểm">
          <div className="overview-two-kpis vertical">
            <OverviewValue className="white" label="Tổng Số Dự Án" value="25" unit="Dự án" note="" />
            <OverviewValue className="red" label="Dự Án Chậm Tiến Độ" value="12" unit="Dự án" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-land" icon="land" title="Đất đai, khoáng sản">
          <OverviewValue label="Số Giấy CNQSDĐ Cấp Mới" value="108" unit="GCN" />
        </OverviewCard>

        <div className="overview-ioc-budget-strip">
          <OverviewCard className="overview-ioc-budget" icon="budget" title="Thu ngân sách">
            <OverviewValue label="Tổng Các Khoản Thu NSNN" value="15.212" unit="Tỷ đồng" note="Lũy kế đến 08/2026 · 89,6% so với dự toán" />
          </OverviewCard>

          <OverviewCard className="overview-ioc-expense" icon="budget" title="Chi ngân sách">
            <OverviewValue label="Tổng Chi Ngân Sách Địa Phương" value="421" unit="Tỷ đồng" note="12,6% so với cùng kỳ năm trước · 89,6% so với dự toán" />
          </OverviewCard>
        </div>

        <OverviewCard className="overview-ioc-trade" icon="service" title="Thương mại dịch vụ">
          <div className="overview-trade-layout">
            <div className="overview-pie-cell">
              <h3>Tổng Kim Ngạch Xuất Nhập Khẩu</h3>
              <OverviewPieChart className="trade" items={[
                { label: "Xuất khẩu", value: 35, color: "#8c78ff" },
                { label: "Nhập khẩu", value: 65, color: "#ff8b86" },
              ]} />
            </div>
            <OverviewValue label="Số Lượng Khách Du Lịch" value="1234" unit="Lượt khách" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-enterprise" icon="enterprise" title="Doanh nghiệp và hợp tác xã">
          <div className="overview-split">
            <OverviewValue label="Doanh Nghiệp Hoạt Động Trong Nền Kinh Tế" value="1233" unit="DN" />
            <div className="overview-progress-list">
              <h3>Tổng Số Hợp Tác Xã</h3>
              {enterpriseRows.map((row) => (
                <div className="overview-progress-row" key={row.label}>
                  <span>{row.label}</span>
                  <i><b style={{ width: `${row.percent}%`, background: row.tone }} /></i>
                </div>
              ))}
            </div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-admin" icon="admin" title="Nội vụ - cải cách hành chính, lao động">
          <div className="overview-admin-grid">
            <OverviewValue label="Tỷ Lệ Người Dân Sử Dụng Dịch Vụ Công Trực Tuyến" value="98,21" unit="%" note="12,6% so với cùng kỳ năm trước" />
            <OverviewLaborDonut />
            <OverviewValue className="amber" label="Tỷ Lệ Hồ Sơ Giải Quyết Đúng Hạn" value="78,22" unit="%" note="12,6% so với cùng kỳ năm trước" />
            <OverviewValue className="red overdue" label="Số Lượng VB Quá Hạn" value="5" unit="VB" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-education" icon="education" title="Giáo dục">
          <div className="overview-trade-layout">
            <div className="overview-pie-cell">
              <h3>Trường Đạt Chuẩn Quốc Gia</h3>
              <OverviewPieChart className="education" items={[
                { label: "Trường mầm non", value: 12, color: "#7e6cff" },
                { label: "Trường tiểu học", value: 34, color: "#ff8b86" },
                { label: "Trường THCS", value: 24, color: "#36c1d4" },
                { label: "Trường THPT", value: 20, color: "#ffb34c" },
                { label: "Cơ sở giáo dục nghề", value: 10, color: "#5488ff" },
              ]} />
            </div>
            <div className="overview-pie-cell">
              <h3>Tỷ Lệ Huy Động Trẻ Em Từ 3 Đến 5 Tuổi Đến Lớp</h3>
              <OverviewGaugeChart value={85.4} />
            </div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-public" icon="investment" title="Đầu tư công">
          <OverviewValue className="hero" label="Tổng Số Dự Án Đầu Tư Công" value="36" unit="Dự án" />
          <div className="overview-two-kpis lined vertical">
            <OverviewValue label="Tổng Vốn Bố Trí Theo Dự Án" value="1,985" unit="Tỷ đồng" note="" />
            <OverviewValue label="Giá Trị Giải Ngân Theo Dự Án" value="688" unit="Tỷ đồng" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-attract" icon="investment" title="Thu hút đầu tư">
          <div className="overview-two-kpis vertical">
            <OverviewValue label="Tổng Số Dự Án Trong Nước" value="167" unit="Dự án" note="" />
            <OverviewValue label="Tổng Vốn Đăng Ký Đầu Tư Của Dự Án Trong Nước" value="178" unit="Tỷ đồng" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-assets" icon="planning" title="Quy hoạch, xây dựng, tài sản công">
          <div className="overview-assets-stack">
            <div>
              <h3>Tỷ Lệ Phủ Kín Quy Hoạch Chung</h3>
              <OverviewPlanningCoverageChart value={85.4} />
            </div>
            <OverviewPlanningAssetsMetric />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-health" icon="health" title="Y tế, an sinh xã hội">
          <div className="overview-health-grid">
            <OverviewValue label="Tỷ Lệ Bao Phủ Bảo Hiểm Y Tế" value="99,43" unit="%" note="" />
            <OverviewValue label="Người Dân Được Khám Sức Khỏe Định Kỳ Hoặc Khám Sàng Lọc Miễn Phí Ít Nhất 01 Lần Trong Năm" value="8,67" unit="%" note="" />
            <OverviewValue className="tight-number" label="Tổng Số Lượt Khám Bệnh" value="13,421" unit="Lượt khám" note="12,6% so với cùng kỳ tháng trước" />
            <OverviewValue label="Tỷ Lệ Hoàn Thành Kế Hoạch Giảm Nghèo" value="87,29" unit="%" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-resolution" icon="resolution" title="🇻🇳 Nhiệm vụ thực hiện các nghị quyết trọng tâm">
          <OverviewSimpleTable rows={resolutionRows} />
          <button className="overview-link" type="button">Xem thêm nghị quyết →</button>
        </OverviewCard>

        <OverviewCard className="overview-ioc-targets" icon="target" title="🇻🇳 Chỉ tiêu phát triển kinh tế - xã hội giai đoạn 2025-2030">
          <OverviewSimpleTable type="target" rows={targetRows} />
          <button className="overview-link" type="button">Xem thêm nhiệm vụ →</button>
        </OverviewCard>
      </div>
    </section>
  );
}
