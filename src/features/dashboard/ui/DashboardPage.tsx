import { useMemo, useState } from "react";
import { detailData, type DetailData } from "../model/dashboardContent";
import type { DashboardFilters } from "../model/types";
import { AgricultureDashboard } from "./agriculture/AgricultureDashboard";
import { InternalAdminLaborDashboard } from "./admin/InternalAdminLaborDashboard";
import { DashboardHeader } from "./DashboardHeader";
import { DetailDashboard } from "./detail/DetailDashboard";
import { EducationDashboard } from "./education/EducationDashboard";
import { EnterpriseCoopDashboard } from "./enterprise/EnterpriseCoopDashboard";
import { ExpenseDashboard } from "./expense/ExpenseDashboard";
import { GrdpDashboard } from "./grdp/GrdpDashboard";
import { HealthDashboard } from "./health/HealthDashboard";
import { IndustrialProductsDashboard } from "./industrial/IndustrialProductsDashboard";
import { InvestmentAttractionDashboard, InvestmentDashboard } from "./investment/InvestmentDashboard";
import { KeyProjectsDashboard } from "./keyProjects/KeyProjectsDashboard";
import { LandMineralsDashboard } from "./land/LandMineralsDashboard";
import { OverviewDashboard } from "./overview/OverviewDashboard";
import { PlanningPublicAssetsDashboard } from "./planning/PlanningPublicAssetsDashboard";
import { ResolutionTasksDashboard } from "./resolution/ResolutionTasksDashboard";
import { RevenueDashboard } from "./revenue/RevenueDashboard";
import { SocioEconomic57Dashboard } from "./socioEconomic/SocioEconomic57Dashboard";
import { TradeServiceDashboard } from "./tradeService/TradeServiceDashboard";

function renderDashboard(category: string, activeData: DetailData | undefined) {
  switch (category) {
    case "overview":
      return <OverviewDashboard />;
    case "grdp":
      return <GrdpDashboard />;
    case "revenue":
      return <RevenueDashboard />;
    case "expense":
      return <ExpenseDashboard />;
    case "investment":
      return <InvestmentDashboard />;
    case "trade-service":
      return <TradeServiceDashboard />;
    case "enterprise-coop":
      return <EnterpriseCoopDashboard />;
    case "investment-attraction":
      return <InvestmentAttractionDashboard />;
    case "agriculture":
      return <AgricultureDashboard />;
    case "industrial-products":
      return <IndustrialProductsDashboard />;
    case "internal-admin-labor":
      return <InternalAdminLaborDashboard />;
    case "key-projects":
      return <KeyProjectsDashboard />;
    case "health-social":
      return <HealthDashboard />;
    case "education":
      return <EducationDashboard />;
    case "planning-public-assets":
      return <PlanningPublicAssetsDashboard />;
    case "land-minerals":
      return <LandMineralsDashboard />;
    case "resolution-tasks":
      return <ResolutionTasksDashboard />;
    case "socio-economic-57":
      return <SocioEconomic57Dashboard />;
    default:
      if (!activeData) {
        return <OverviewDashboard />;
      }

      return <DetailDashboard data={activeData} />;
  }
}

export function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState("overview");
  const [filters, setFilters] = useState<DashboardFilters>({
    period: "today",
    unit: "all",
  });

  const activeData = useMemo(
    () => detailData[activeCategory],
    [activeCategory],
  );

  return (
    <main className="dashboard-page">
      <DashboardHeader
        activeCategory={activeCategory}
        filters={filters}
        onCategoryChange={setActiveCategory}
        onFiltersChange={setFilters}
      />

      {renderDashboard(activeCategory, activeData)}
    </main>
  );
}
