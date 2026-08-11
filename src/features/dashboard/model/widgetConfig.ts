import type { WidgetConfig, WidgetType } from "./types";

const kpis = [
  "Doanh thu",
  "Thuê bao mới",
  "Tỷ lệ hoàn thành",
  "ARPU",
  "SLA",
  "Sự cố mở",
  "Tỷ lệ rời mạng",
  "Độ hài lòng",
  "Ticket xử lý",
  "Đơn vị đạt chỉ tiêu",
];

const sections = [
  { group: "revenue", title: "Doanh thu theo ngày", type: "chart" },
  { group: "revenue", title: "Cơ cấu dịch vụ", type: "chart" },
  { group: "revenue", title: "Top địa bàn", type: "table" },
  { group: "revenue", title: "Tiến độ chỉ tiêu", type: "gauge" },
  { group: "network", title: "Tải mạng truy nhập", type: "chart" },
  { group: "network", title: "Trạm có cảnh báo", type: "alert" },
  { group: "network", title: "SLA theo huyện", type: "table" },
  { group: "network", title: "Dung lượng backbone", type: "gauge" },
  { group: "customer", title: "Tăng trưởng thuê bao", type: "chart" },
  { group: "customer", title: "Khiếu nại khách hàng", type: "alert" },
  { group: "customer", title: "Ranking kênh bán", type: "table" },
  { group: "customer", title: "Tỷ lệ chăm sóc", type: "gauge" },
] as const;

function getDetailPriority(index: number): WidgetConfig["priority"] {
  return index < 8 ? "normal" : "low";
}

export const widgetConfig: WidgetConfig[] = [
  ...kpis.map((title, index) => ({
    id: `kpi-${index + 1}`,
    title,
    type: "kpi" as WidgetType,
    group: "overview" as const,
    priority: "high" as const,
    dataKey: `overview.${index + 1}`,
  })),
  ...Array.from({ length: 40 }, (_, index) => {
    const source = sections[index % sections.length];
    return {
      id: `widget-${index + 1}`,
      title: `${source.title} ${Math.floor(index / sections.length) + 1}`,
      type: source.type,
      group: source.group,
      priority: getDetailPriority(index),
      dataKey: `${source.group}.${source.type}.${index + 1}`,
    };
  }),
];
