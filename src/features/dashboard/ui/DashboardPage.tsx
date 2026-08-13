import { useState } from "react";
import {
  getDashboardRegistryItem,
  type DashboardCategoryId,
} from "../config/dashboardRegistry";
import type { DashboardFilters } from "../model/types";
import { DashboardHeader } from "./DashboardHeader";
import { OverviewDashboard } from "./overview/OverviewDashboard";

export function DashboardPage() {
  const [activeCategory, setActiveCategory] =
    useState<DashboardCategoryId>("overview");
  const [filters, setFilters] = useState<DashboardFilters>({
    period: "today",
    unit: "all",
  });

  const ActiveDashboard =
    getDashboardRegistryItem(activeCategory)?.Component ?? OverviewDashboard;

  return (
    <main className="dashboard-page">
      <DashboardHeader
        activeCategory={activeCategory}
        filters={filters}
        onCategoryChange={setActiveCategory}
        onFiltersChange={setFilters}
      />

      <ActiveDashboard />
    </main>
  );
}
