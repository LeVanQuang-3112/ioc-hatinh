import {
  LogIn,
} from "lucide-react";
import { dashboardRegistry, type DashboardCategoryId } from "../config/dashboardRegistry";
import type { DashboardFilters } from "../model/types";

type Props = {
  activeCategory: DashboardCategoryId;
  filters: DashboardFilters;
  onCategoryChange: (categoryId: DashboardCategoryId) => void;
  onFiltersChange: (filters: DashboardFilters) => void;
};

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
        {dashboardRegistry.map((tab) => {
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
