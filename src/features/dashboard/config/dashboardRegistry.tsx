import type { ComponentType } from "react";
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
  MapPinned,
  Medal,
  PiggyBank,
  ShoppingBag,
  Sprout,
  SquareUserRound,
  type LucideIcon,
} from "lucide-react";
import { AgricultureDashboard } from "../ui/agriculture/AgricultureDashboard";
import { InternalAdminLaborDashboard } from "../ui/admin/InternalAdminLaborDashboard";
import { EducationDashboard } from "../ui/education/EducationDashboard";
import { EnterpriseCoopDashboard } from "../ui/enterprise/EnterpriseCoopDashboard";
import { ExpenseDashboard } from "../ui/expense/ExpenseDashboard";
import { GrdpDashboard } from "../ui/grdp/GrdpDashboard";
import { HealthDashboard } from "../ui/health/HealthDashboard";
import { IndustrialProductsDashboard } from "../ui/industrial/IndustrialProductsDashboard";
import {
  InvestmentAttractionDashboard,
  InvestmentDashboard,
} from "../ui/investment/InvestmentDashboard";
import { KeyProjectsDashboard } from "../ui/keyProjects/KeyProjectsDashboard";
import { LandMineralsDashboard } from "../ui/land/LandMineralsDashboard";
import { OverviewDashboard } from "../ui/overview/OverviewDashboard";
import { PlanningPublicAssetsDashboard } from "../ui/planning/PlanningPublicAssetsDashboard";
import { ResolutionTasksDashboard } from "../ui/resolution/ResolutionTasksDashboard";
import { RevenueDashboard } from "../ui/revenue/RevenueDashboard";
import { SocioEconomic57Dashboard } from "../ui/socioEconomic/SocioEconomic57Dashboard";
import { TradeServiceDashboard } from "../ui/tradeService/TradeServiceDashboard";

export type DashboardCategoryId =
  | "overview"
  | "grdp"
  | "revenue"
  | "expense"
  | "investment"
  | "trade-service"
  | "enterprise-coop"
  | "investment-attraction"
  | "agriculture"
  | "industrial-products"
  | "internal-admin-labor"
  | "key-projects"
  | "health-social"
  | "education"
  | "planning-public-assets"
  | "land-minerals"
  | "resolution-tasks"
  | "socio-economic-57";

export type DashboardRegistryItem = {
  id: DashboardCategoryId;
  label: string;
  icon: LucideIcon;
  Component: ComponentType;
};

export const dashboardRegistry = [
  { id: "overview", label: "Tổng hợp", icon: Grid2x2, Component: OverviewDashboard },
  { id: "grdp", label: "Nhóm chỉ số về GRDP", icon: ChartColumnBig, Component: GrdpDashboard },
  { id: "revenue", label: "Nhóm thu ngân sách", icon: Medal, Component: RevenueDashboard },
  { id: "expense", label: "Chi ngân sách", icon: PiggyBank, Component: ExpenseDashboard },
  { id: "investment", label: "Đầu tư công", icon: PiggyBank, Component: InvestmentDashboard },
  {
    id: "trade-service",
    label: "Nhóm thương mại dịch vụ",
    icon: ShoppingBag,
    Component: TradeServiceDashboard,
  },
  {
    id: "enterprise-coop",
    label: "Nhóm doanh nghiệp, HTX",
    icon: SquareUserRound,
    Component: EnterpriseCoopDashboard,
  },
  {
    id: "investment-attraction",
    label: "Thu hút đầu tư",
    icon: PiggyBank,
    Component: InvestmentAttractionDashboard,
  },
  {
    id: "industrial-products",
    label: "Nhóm sản phẩm công nghiệp",
    icon: Factory,
    Component: IndustrialProductsDashboard,
  },
  {
    id: "agriculture",
    label: "Nhóm chỉ tiêu nông nghiệp",
    icon: Sprout,
    Component: AgricultureDashboard,
  },
  {
    id: "key-projects",
    label: "Nhóm dự án trọng điểm",
    icon: FolderKanban,
    Component: KeyProjectsDashboard,
  },
  {
    id: "internal-admin-labor",
    label: "Nhóm nội vụ, cải cách hành chính - lao động",
    icon: ClipboardCheck,
    Component: InternalAdminLaborDashboard,
  },
  {
    id: "health-social",
    label: "Y tế an sinh xã hội",
    icon: HeartPulse,
    Component: HealthDashboard,
  },
  { id: "education", label: "Nhóm giáo dục", icon: BookOpen, Component: EducationDashboard },
  {
    id: "planning-public-assets",
    label: "Quy hoạch, xây dựng tài sản công",
    icon: MapPinned,
    Component: PlanningPublicAssetsDashboard,
  },
  {
    id: "land-minerals",
    label: "Đất đai, khoáng sản",
    icon: MapPinned,
    Component: LandMineralsDashboard,
  },
  {
    id: "resolution-tasks",
    label: "Theo dõi chỉ tiêu và nhiệm vụ thực hiện các nghị quyết trọng tâm",
    icon: FileText,
    Component: ResolutionTasksDashboard,
  },
  {
    id: "socio-economic-57",
    label: "57 chỉ tiêu phát triển kinh tế - xã hội giai đoạn",
    icon: ListChecks,
    Component: SocioEconomic57Dashboard,
  },
] satisfies DashboardRegistryItem[];

export const dashboardCategoryIds = dashboardRegistry.map((item) => item.id);

export function isDashboardCategoryId(value: string): value is DashboardCategoryId {
  return dashboardCategoryIds.includes(value as DashboardCategoryId);
}

export function getDashboardRegistryItem(categoryId: DashboardCategoryId) {
  return dashboardRegistry.find((item) => item.id === categoryId);
}
