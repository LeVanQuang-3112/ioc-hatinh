import { type ReactNode } from "react";
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
import { overviewResolutionRows } from "../../model/dashboardContent";
import { PieChartBlock } from "../shared/ChartBlocks";
import { MapCanvas } from "../shared/MapCanvas";

const overviewIndustryRows = [
  { label: "Chế biến chế tạo", value: 68.2 },
  { label: "Sản xuất điện", value: 18.6 },
  { label: "Cung cấp nước", value: 8.7 },
  { label: "Khai khoáng", value: 4.1 },
  { label: "Khác", value: 0.8 },
];

const overviewEnterpriseRows = [
  { label: "Doanh nghiệp thành lập mới", value: "722 / 1.000", percent: 72 },
  { label: "Doanh nghiệp quay trở lại HĐ", value: "456 / 800", percent: 57 },
  { label: "Hợp tác xã thành lập mới", value: "122 / 200", percent: 61 },
];

const overviewProgramTargets = [
  "Tốc độ tăng trưởng GRDP",
  "GRDP bình quân đầu người",
  "Tổng vốn đầu tư toàn xã hội",
  "Tỷ lệ đô thị hóa",
  "Tỷ lệ hộ nghèo đa chiều",
  "Tỷ lệ lao động qua đào tạo",
  "Tỷ lệ trường đạt chuẩn quốc gia",
  "Giường bệnh/1 vạn dân",
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

function OverviewCard({
  children,
  className = "",
  icon = "service",
  title,
}: {
  children: ReactNode;
  className?: string;
  icon?: OverviewIcon;
  title: string;
}) {
  const Icon = overviewIcons[icon];

  return (
    <article className={`overview-ioc-card ${className}`}>
      <div className="overview-ioc-title">
        <span className="overview-card-icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2.4} />
        </span>
        {title}
      </div>
      {children}
    </article>
  );
}

function OverviewValue({
  className = "",
  label,
  note = "12,6% so với cùng kỳ",
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
      <p>{note}</p>
    </div>
  );
}

function OverviewProgressList({
  rows,
}: {
  rows: ReadonlyArray<{ label: string; percent: number; value: string }>;
}) {
  return (
    <div className="overview-progress-list">
      {rows.map((row) => (
        <div className="overview-progress-row" key={row.label}>
          <div>
            <span>{row.label}</span>
            <strong>{row.value}</strong>
          </div>
          <i>
            <b style={{ width: `${row.percent}%` }} />
          </i>
        </div>
      ))}
    </div>
  );
}

function OverviewSimpleTable({
  rows,
  type = "resolution",
}: {
  rows: ReadonlyArray<{ name: string; date?: string; status: string }>;
  type?: "resolution" | "target";
}) {
  return (
    <div className={`overview-simple-table ${type}`}>
      <div className="overview-simple-head">
        <span>{type === "target" ? "Chỉ tiêu" : "Tên nghị quyết"}</span>
        <span>{type === "target" ? "Hạn hoàn thành" : "Ngày ban hành"}</span>
        <span>{type === "target" ? "Kết quả" : "Trạng thái"}</span>
      </div>
      {rows.map((row, index) => (
        <div className="overview-simple-row" key={`${row.name}-${row.date ?? row.status}-${index}`}>
          <span>{row.name}</span>
          <span>{row.date ?? "2030"}</span>
          <strong>{row.status}</strong>
        </div>
      ))}
    </div>
  );
}

export function OverviewDashboard() {
  return (
    <section className="overview-ioc" aria-label="Tab tổng hợp">
      <div className="overview-ioc-grid">
        <OverviewCard className="overview-ioc-grdp" icon="grdp" title="Tình hình kinh tế - GRDP">
          <div className="overview-kpi-strip">
            <OverviewValue label="GRDP 6 tháng 2026" value="8,67" unit="%" />
            <OverviewValue label="GRDP bình quân đầu người" value="68,23" unit="Triệu đồng/người" />
            <OverviewValue label="Tốc độ tăng trưởng" value="7,24" unit="%" note="0,8% so với quý trước" />
          </div>
        </OverviewCard>

        <MapCanvas className="overview-ioc-map" title="Bản đồ GIS tổng hợp Hà Tĩnh" />

        <OverviewCard className="overview-ioc-industry" icon="industry" title="Công nghiệp">
          <div className="overview-split">
            <OverviewValue label="Chỉ số sản xuất công nghiệp (IIP)" value="112,4" unit="" />
            <div className="overview-small-bars">
              {overviewIndustryRows.map((row) => (
                <div key={row.label}>
                  <span>{row.label}</span>
                  <i><b style={{ width: `${row.value}%` }} /></i>
                  <strong>{row.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-agriculture" icon="agriculture" title="Nông nghiệp">
          <div className="overview-split">
            <OverviewValue label="Tốc độ tăng trưởng 6 tháng" value="3,56" unit="%" note="0,6% so với cùng kỳ" />
            <PieChartBlock
              items={[
                { label: "Trồng trọt", value: 55, tone: "#8d72ff" },
                { label: "Chăn nuôi", value: 28, tone: "#55c8ff" },
                { label: "Thủy sản", value: 12, tone: "#d56fff" },
                { label: "Lâm nghiệp", value: 5, tone: "#34d399" },
              ]}
            />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-projects" icon="investment" title="Dự án trọng điểm">
          <div className="overview-two-kpis">
            <OverviewValue className="white" label="Tổng số dự án" value="25" unit="Dự án" note="" />
            <OverviewValue className="red" label="Dự án chậm tiến độ" value="12" unit="Dự án" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-land" icon="land" title="Tài nguyên đất đai & khoáng sản">
          <OverviewValue label="Giấy chứng nhận QSDĐ cấp mới" value="108" unit="GCN" note="" />
        </OverviewCard>

        <OverviewCard className="overview-ioc-budget" icon="budget" title="Thu ngân sách">
          <div className="overview-two-kpis">
            <OverviewValue label="Tổng thu NSNN" value="15.212" unit="Tỷ đồng" note="89,6% dự toán" />
            <OverviewValue label="Tổng chi ngân sách địa phương" value="13.421" unit="Tỷ đồng" note="89,6% dự toán" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-trade" icon="service" title="Thương mại dịch vụ">
          <div className="overview-trade-layout">
            <div className="overview-donut">
              <strong>1.985</strong>
              <span>Tỷ USD</span>
            </div>
            <div className="overview-legend-list">
              <span><i className="green" />Xuất khẩu <strong>65%</strong></span>
              <span><i className="blue" />Nhập khẩu <strong>35%</strong></span>
            </div>
            <OverviewValue label="Khách du lịch" value="1.234.567" unit="Lượt khách" note="16,2% so với cùng kỳ" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-enterprise" icon="enterprise" title="Doanh nghiệp và hợp tác xã">
          <div className="overview-split">
            <OverviewValue label="Tổng số doanh nghiệp & HTX" value="1.233" unit="DN/HTX" note="9,8% so với cùng kỳ" />
            <OverviewProgressList rows={overviewEnterpriseRows} />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-admin" icon="admin" title="Nội vụ - cải cách hành chính - lao động">
          <div className="overview-admin-grid">
            <OverviewValue label="Tỷ lệ hồ sơ giải quyết đúng hạn" value="98,21" unit="%" note="1,2% so với cùng kỳ" />
            <OverviewValue label="Tỷ lệ số hóa hồ sơ" value="78,22" unit="%" note="2,1% so với cùng kỳ" />
            <OverviewValue label="Chỉ số CCHC (PAR INDEX)" value="85,4" unit="/100" note="3,4 điểm" />
            <div className="overview-donut small"><strong>722</strong><span>Nghìn người</span></div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-education" icon="education" title="Giáo dục">
          <div className="overview-trade-layout">
            <PieChartBlock
              items={[
                { label: "Mầm non", value: 28, tone: "#5dd6d6" },
                { label: "Tiểu học", value: 32, tone: "#d955b7" },
                { label: "THCS", value: 24, tone: "#64d2ff" },
                { label: "THPT", value: 16, tone: "#f8c35a" },
              ]}
            />
            <div className="overview-gauge large"><strong>95,2%</strong><span>0% - 100%</span></div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-public" icon="investment" title="Đầu tư công">
          <OverviewValue className="hero" label="Tổng số dự án" value="36" unit="Dự án" note="" />
          <div className="overview-two-kpis lined">
            <OverviewValue label="Tổng vốn đầu tư" value="9.842" unit="Tỷ đồng" note="" />
            <OverviewValue label="Giải ngân 6T/2026" value="5.124" unit="Tỷ đồng" note="52,1% kế hoạch" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-attract" icon="investment" title="Thu hút đầu tư">
          <div className="overview-two-kpis">
            <OverviewValue label="Dự án trong nước" value="178" unit="Dự án" note="" />
            <OverviewValue label="Tổng vốn đăng ký" value="17.856" unit="Tỷ đồng" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-assets" icon="planning" title="Quy hoạch - xây dựng - tài sản công">
          <div className="overview-trade-layout">
            <div className="overview-gauge"><strong>68,3%</strong><span>Kế hoạch 2026</span></div>
            <OverviewValue label="Nhà ở xã hội hoàn thành" value="1.892" unit="Căn" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-health" icon="health" title="Y tế - an sinh xã hội">
          <div className="overview-health-grid">
            <OverviewValue label="Tỷ lệ bao phủ BHYT" value="99,43" unit="%" note="" />
            <OverviewValue label="Tỷ lệ hộ nghèo" value="2,71" unit="%" note="" />
            <OverviewValue label="Số giường bệnh/1 vạn dân" value="32,4" unit="Giường" note="" />
            <OverviewValue label="Người có công được hỗ trợ" value="98,7" unit="%" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-resolution" icon="resolution" title="Nhiệm vụ thực hiện các nghị quyết trọng tâm">
          <OverviewSimpleTable rows={[...overviewResolutionRows, ...overviewResolutionRows.slice(4)]} />
          <button className="overview-link" type="button">Xem thêm nhiệm vụ &rarr;</button>
        </OverviewCard>

        <OverviewCard className="overview-ioc-targets" icon="target" title="Chỉ tiêu phát triển KT-XH giai đoạn 2025-2030">
          <OverviewSimpleTable
            type="target"
            rows={overviewProgramTargets.map((name) => ({
              name,
              date: "2030",
              status: "Đang thực hiện",
            }))}
          />
          <button className="overview-link" type="button">Xem thêm chỉ tiêu &rarr;</button>
        </OverviewCard>
      </div>
    </section>
  );
}
