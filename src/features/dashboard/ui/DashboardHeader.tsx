import { Button } from "@/shared/components/Button";
import { SelectField } from "@/shared/components/SelectField";
import type { DashboardFilters } from "../model/types";

type Props = {
  activeCategory: string;
  filters: DashboardFilters;
  onCategoryChange: (categoryId: string) => void;
  onFiltersChange: (filters: DashboardFilters) => void;
};

export const dashboardCategories = [
  { id: "overview", label: "Tổng hợp" },
  { id: "grdp", label: "Nhóm chỉ số về GRDP" },
  { id: "revenue", label: "Nhóm thu ngân sách" },
  { id: "expense", label: "Chi ngân sách" },
  { id: "investment", label: "Đầu tư công" },
  { id: "trade-service", label: "Nhóm thương mại dịch vụ" },
  { id: "enterprise-coop", label: "Nhóm doanh nghiệp, HTX" },
  { id: "investment-attraction", label: "Thu hút đầu tư" },
  { id: "industrial-products", label: "Nhóm sản phẩm công nghiệp" },
  { id: "agriculture", label: "Nhóm chỉ tiêu nông nghiệp" },
  { id: "key-projects", label: "Nhóm dự án trọng điểm" },
  {
    id: "internal-admin-labor",
    label: "Nhóm nội vụ, cải cách hành chính - lao động",
  },
  { id: "health-social", label: "Y tế an sinh xã hội" },
  { id: "education", label: "Nhóm giáo dục" },
  { id: "planning-public-assets", label: "Quy hoạch, xây dựng tài sản công" },
  { id: "land-minerals", label: "Đất đai, khoáng sản" },
  {
    id: "resolution-tasks",
    label: "Theo dõi chỉ tiêu và nhiệm vụ thực hiện các nghị quyết trọng tâm",
  },
  {
    id: "socio-economic-57",
    label: "57 chỉ tiêu phát triển kinh tế - xã hội giai đoạn",
  },
];

const periodOptions: Array<{ label: string; value: DashboardFilters["period"] }> = [
  { label: "Hôm nay", value: "today" },
  { label: "7 ngày", value: "week" },
  { label: "Tháng này", value: "month" },
];

const unitOptions: Array<{ label: string; value: DashboardFilters["unit"] }> = [
  { label: "Toàn tỉnh", value: "all" },
  { label: "TP Hà Tĩnh", value: "city" },
  { label: "Cụm Bắc", value: "north" },
  { label: "Cụm Nam", value: "south" },
];

export function DashboardHeader({
  activeCategory,
  filters,
  onCategoryChange,
  onFiltersChange,
}: Props) {
  return (
    <header className="dashboard-header">
      <div className="dashboard-titlebar">
        <div className="province-seal" aria-hidden="true">
          HT
        </div>
        <div>
          <h1>DASHBOARD ĐIỀU HÀNH IOC TỈNH HÀ TĨNH</h1>
          <p className="dashboard-eyebrow">
            PHỤC VỤ CHỈ ĐẠO ĐIỀU HÀNH CỦA LÃNH ĐẠO TỈNH
          </p>
        </div>
        <span className="last-updated">Cập nhật: 11/08/2026 09:30</span>
      </div>

      <div className="dashboard-actions" aria-label="Bộ lọc dashboard">
        <SelectField
          aria-label="Thời gian"
          options={periodOptions}
          value={filters.period}
          onValueChange={(period) =>
            onFiltersChange({
              ...filters,
              period,
            })
          }
        />
        <SelectField
          aria-label="Đơn vị"
          options={unitOptions}
          value={filters.unit}
          onValueChange={(unit) =>
            onFiltersChange({
              ...filters,
              unit,
            })
          }
        />
        <Button aria-label="Làm mới dữ liệu">
          Làm mới
        </Button>
        <Button aria-label="Xuất dữ liệu">
          Xuất dữ liệu
        </Button>
      </div>

      <nav className="dashboard-tabs" aria-label="Nhóm chỉ số điều hành">
        {dashboardCategories.map((tab) => (
          <button
            aria-pressed={activeCategory === tab.id}
            className={activeCategory === tab.id ? "active" : undefined}
            key={tab.id}
            onClick={() => onCategoryChange(tab.id)}
            type="button"
          >
            <span className="tab-icon" aria-hidden="true" />
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
