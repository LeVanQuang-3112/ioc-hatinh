import {
  BookOpen,
  ChartColumnBig,
  ClipboardCheck,
  Factory,
  FileText,
  FolderKanban,
  Grid2x2,
  HeartPulse,
  ListChecks,
  LogIn,
  MapPinned,
  Medal,
  PiggyBank,
  ShoppingBag,
  Sprout,
  SquareUserRound,
  type LucideIcon,
} from "lucide-react";
import type { DashboardFilters } from "../model/types";

type Props = {
  activeCategory: string;
  filters: DashboardFilters;
  onCategoryChange: (categoryId: string) => void;
  onFiltersChange: (filters: DashboardFilters) => void;
};

type DashboardCategory = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export const dashboardCategories: DashboardCategory[] = [
  { id: "overview", label: "Tổng hợp", icon: Grid2x2 },
  { id: "grdp", label: "Nhóm chỉ số về GRDP", icon: ChartColumnBig },
  { id: "revenue", label: "Nhóm thu ngân sách", icon: Medal },
  { id: "expense", label: "Chi ngân sách", icon: PiggyBank },
  { id: "investment", label: "Đầu tư công", icon: PiggyBank },
  { id: "trade-service", label: "Nhóm thương mại dịch vụ", icon: ShoppingBag },
  {
    id: "enterprise-coop",
    label: "Nhóm doanh nghiệp, HTX",
    icon: SquareUserRound,
  },
  { id: "investment-attraction", label: "Thu hút đầu tư", icon: PiggyBank },
  {
    id: "industrial-products",
    label: "Nhóm sản phẩm công nghiệp",
    icon: Factory,
  },
  { id: "agriculture", label: "Nhóm chỉ tiêu nông nghiệp", icon: Sprout },
  { id: "key-projects", label: "Nhóm dự án trọng điểm", icon: FolderKanban },
  {
    id: "internal-admin-labor",
    label: "Nhóm nội vụ, cải cách hành chính - lao động",
    icon: ClipboardCheck,
  },
  { id: "health-social", label: "Y tế an sinh xã hội", icon: HeartPulse },
  { id: "education", label: "Nhóm giáo dục", icon: BookOpen },
  {
    id: "planning-public-assets",
    label: "Quy hoạch, xây dựng tài sản công",
    icon: MapPinned,
  },
  { id: "land-minerals", label: "Đất đai, khoáng sản", icon: MapPinned },
  {
    id: "resolution-tasks",
    label: "Theo dõi chỉ tiêu và nhiệm vụ thực hiện các nghị quyết trọng tâm",
    icon: FileText,
  },
  {
    id: "socio-economic-57",
    label: "57 chỉ tiêu phát triển kinh tế - xã hội giai đoạn",
    icon: ListChecks,
  },
];

export function DashboardHeader({
  activeCategory,
  onCategoryChange,
}: Props) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-titlebar">
        <img
          className="province-seal"
          src="/quoc-huy.png"
          alt=""
          aria-hidden="true"
        />
        <div>
          <h1>DASHBOARD ĐIỀU HÀNH IOC TỈNH HÀ TĨNH</h1>
          <p className="dashboard-eyebrow">
            PHỤC VỤ CHỈ ĐẠO ĐIỀU HÀNH CỦA LÃNH ĐẠO TỈNH
          </p>
        </div>

        <div className="dashboard-actions" aria-label="Thông tin người dùng dashboard">
          <div className="dashboard-updated">
            Cập nhật lúc: <strong>10:30</strong>
            <span>|</span>
            <strong>08/09/2026</strong>
          </div>
          <div className="dashboard-user">
            <span className="dashboard-user-avatar" aria-hidden="true" />
            <div>
              <strong>Chủ Tịch UBND Tỉnh</strong>
              <small>Xin chào!</small>
            </div>
          </div>
          <button className="dashboard-admin-button" type="button" aria-label="Đăng xuất">
            <LogIn size={24} strokeWidth={3} aria-hidden="true" />
          </button>
          <span className="dashboard-admin-label">Quản trị dữ liệu</span>
        </div>
      </div>

      <nav className="dashboard-tabs" aria-label="Nhóm chỉ số điều hành">
        {dashboardCategories.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              aria-pressed={activeCategory === tab.id}
              className={activeCategory === tab.id ? "active" : undefined}
              key={tab.id}
              onClick={() => onCategoryChange(tab.id)}
              type="button"
            >
              <span className="tab-icon" aria-hidden="true">
                <Icon size={25} strokeWidth={2.8} />
              </span>
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
