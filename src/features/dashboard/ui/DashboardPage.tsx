import { type CSSProperties, type ReactNode, useMemo, useState } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "../../../shared/components/EChart";
import type { DashboardFilters } from "../model/types";
import { DashboardHeader } from "./DashboardHeader";

type KpiItem = {
  label: string;
  value: string;
  unit: string;
  trend: string;
  tone?: "green" | "amber" | "cyan" | "red" | "white";
};

type DetailData = {
  id: string;
  title: string;
  subtitle: string;
  primaryChart: string;
  kpis: KpiItem[];
  highlights: KpiItem[];
  bars: Array<{ label: string; value: number; tone: "green" | "amber" | "cyan" | "red" }>;
  table: Array<{ name: string; date: string; status: string }>;
  pie: Array<{ label: string; value: number; tone: string }>;
};

type OverviewSignalPanel = {
  title: string;
  items: ReadonlyArray<{
    label: string;
    value: string;
    unit: string;
    tone: "green" | "amber" | "cyan" | "red" | "white";
  }>;
};

const overviewKpis: KpiItem[] = [
  {
    label: "GRDP bình quân đầu người",
    value: "8,67",
    unit: "%",
    trend: "12,6% so với cùng kỳ năm trước",
  },
  {
    label: "Thu nhập bình quân đầu người",
    value: "68,23",
    unit: "Triệu đồng/người/năm",
    trend: "12,6% so với cùng kỳ năm trước",
  },
  {
    label: "Số người hưởng trợ cấp xã hội hằng tháng và trợ cấp hưu trí xã hội",
    value: "3,231",
    unit: "Người",
    trend: "12,6% so với cùng kỳ năm trước",
  },
  {
    label: "Tỷ lệ bao phủ bảo hiểm y tế",
    value: "89,78",
    unit: "%",
    trend: "12,6% so với cùng kỳ năm trước",
  },
];

type OverviewPanel = {
  title: string;
  icon: "coin" | "service" | "investment";
  metrics: Array<{
    label: string;
    value: string;
    unit: string;
    note?: string;
    tone?: "green" | "amber" | "white";
  }>;
};

const overviewPanels: OverviewPanel[] = [
  {
    title: "Thu và chi ngân sách",
    icon: "coin",
    metrics: [
      {
        label: "Tổng các khoản thu NSNN",
        value: "15,212",
        unit: "Triệu đồng",
        note: "89,6% so với dự toán",
      },
      {
        label: "Tổng chi ngân sách địa phương",
        value: "421",
        unit: "Tỷ đồng",
        note: "89,6% so với dự toán",
      },
    ],
  },
  {
    title: "Cải cách hành chính",
    icon: "service",
    metrics: [
      {
        label: "Tỷ lệ người dân sử dụng dịch vụ công trực tuyến",
        value: "98,21",
        unit: "%",
        tone: "green",
      },
      {
        label: "Tỷ lệ hồ sơ giải quyết đúng hạn",
        value: "78,22",
        unit: "%",
        tone: "amber",
      },
    ],
  },
  {
    title: "Đầu tư công",
    icon: "investment",
    metrics: [
      {
        label: "Tổng số dự án đầu tư công",
        value: "36",
        unit: "Dự án",
        tone: "green",
      },
      {
        label: "Tổng vốn bố trí",
        value: "1,985",
        unit: "Tỷ đồng",
        tone: "white",
      },
    ],
  },
];

const overviewSignalPanels: OverviewSignalPanel[] = [
  {
    title: "Thương mại dịch vụ",
    items: [
      { label: "Tổng kim ngạch xuất nhập khẩu", value: "1.234", unit: "Lượt khách", tone: "green" },
      { label: "Tổng mức bán lẻ hàng hóa", value: "42,8", unit: "Nghìn tỷ", tone: "amber" },
      { label: "Doanh thu lưu trú, ăn uống", value: "688", unit: "Tỷ đồng", tone: "white" },
    ],
  },
  {
    title: "Công nghiệp",
    items: [
      { label: "Sản phẩm công nghiệp (Thép)", value: "84,2", unit: "%", tone: "green" },
      { label: "Chỉ số sản xuất công nghiệp", value: "109,4", unit: "%", tone: "cyan" },
      { label: "Sản lượng điện thương phẩm", value: "1.206", unit: "Triệu kWh", tone: "white" },
    ],
  },
  {
    title: "Doanh nghiệp và đầu tư",
    items: [
      { label: "Doanh nghiệp hoạt động trong nền kinh tế", value: "1233", unit: "DN", tone: "amber" },
      { label: "Dự án đang triển khai", value: "25", unit: "Dự án", tone: "white" },
      { label: "Doanh nghiệp thành lập mới", value: "345", unit: "DN", tone: "green" },
    ],
  },
  {
    title: "Nông nghiệp - môi trường",
    items: [
      { label: "Tỷ lệ che phủ rừng", value: "34,24", unit: "%", tone: "red" },
      { label: "Sản lượng thủy sản", value: "31,7", unit: "Nghìn tấn", tone: "cyan" },
      { label: "Xã đạt chuẩn nông thôn mới", value: "178", unit: "Xã", tone: "amber" },
    ],
  },
  {
    title: "Y tế, an sinh xã hội",
    items: [
      { label: "Tỷ lệ dân số tham gia BHYT", value: "99,43", unit: "%", tone: "green" },
      { label: "Tỷ lệ hộ nghèo", value: "87,29", unit: "%", tone: "green" },
      { label: "Tổng số lượt khám bệnh", value: "13.421", unit: "Lượt khám", tone: "white" },
    ],
  },
  {
    title: "Giáo dục",
    items: [
      { label: "Trường đạt chuẩn quốc gia", value: "214", unit: "Trường", tone: "white" },
      { label: "Tỷ lệ huy động trẻ 3-5 tuổi đến lớp", value: "1,424", unit: "Tỷ đồng", tone: "amber" },
      { label: "Cơ sở giáo dục số hóa", value: "156", unit: "Cơ sở", tone: "cyan" },
    ],
  },
];

const overviewExtraPanels: OverviewSignalPanel[] = [
  {
    title: "Văn bản chỉ đạo",
    items: [
      { label: "Tổng số văn bản chỉ đạo", value: "123", unit: "VB", tone: "green" },
      { label: "Số văn bản chờ ký", value: "12", unit: "VB", tone: "red" },
      { label: "Văn bản đã xử lý trong ngày", value: "345", unit: "VB", tone: "amber" },
    ],
  },
  {
    title: "Dự án trọng điểm",
    items: [
      { label: "Tổng số dự án", value: "25", unit: "Dự án", tone: "white" },
      { label: "Dự án chậm tiến độ", value: "12", unit: "Dự án", tone: "red" },
      { label: "Dự án đạt mốc tiến độ", value: "85,4", unit: "%", tone: "green" },
    ],
  },
  {
    title: "Đất đai, khoáng sản",
    items: [
      { label: "Số giấy CNQSDĐ cấp mới", value: "108", unit: "GCN", tone: "green" },
      { label: "Hồ sơ đất đai đang xử lý", value: "688", unit: "Hồ sơ", tone: "amber" },
      { label: "Mỏ khoáng sản đang quản lý", value: "87", unit: "Mỏ", tone: "cyan" },
    ],
  },
  {
    title: "Tài sản, nhà đất",
    items: [
      { label: "Tổng số cơ sở nhà đất", value: "126", unit: "Cơ sở", tone: "amber" },
      { label: "Cơ sở đã cập nhật dữ liệu", value: "85,4", unit: "%", tone: "green" },
    ],
  },
  {
    title: "Nhiệm vụ quá hạn",
    items: [
      { label: "Số lượng VB quá hạn", value: "5", unit: "VB", tone: "red" },
      { label: "Nhiệm vụ cần đôn đốc", value: "17", unit: "Nhiệm vụ", tone: "amber" },
    ],
  },
];

const overviewResolutionRows = [
  { name: "Nghị quyết số 57-NQ/TW", date: "22/12/2024", status: "Đang thực hiện" },
  { name: "Nghị quyết số 59-NQ/TW", date: "24/01/2025", status: "Đang thực hiện" },
  { name: "Nghị quyết số 66-NQ/TW", date: "10/04/2025", status: "Đang thực hiện" },
  { name: "Nghị quyết số 68-NQ/TW", date: "04/05/2025", status: "Đang thực hiện" },
  { name: "Nghị quyết số 70-NQ/TW", date: "20/08/2025", status: "Đang thực hiện" },
];

type ResolutionTaskStatus = "Đúng hạn" | "Theo dõi" | "Hoàn thành" | "Quá hạn";

type ResolutionFocusCard = {
  code: string;
  title: string;
  subtitle: string;
  tasks: Array<{
    agency: string;
    code: string;
    group: string;
    name: string;
    status: ResolutionTaskStatus;
    deadline: string;
  }>;
};

const resolutionFocusCards: ResolutionFocusCard[] = [
  {
    code: "KTXH.055",
    title: "Nghị quyết số 57-NQ/TW, ngày 22/12/2024",
    subtitle: "về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo...",
    tasks: [
      { group: "Nhóm 1: Phát triển hạ tầng số", code: "004_NQ70", name: "Nâng cao hiệu lực QL nhà nước", agency: "Hà Tĩnh", deadline: "31/12/2025", status: "Quá hạn" },
      { group: "Nhóm 2: Đổi mới sáng tạo", code: "005_NQ70", name: "Tăng cường kiểm tra giám sát", agency: "Hà Tĩnh", deadline: "31/12/2030", status: "Đúng hạn" },
      { group: "Nhóm 3: Chuyển đổi số", code: "006_NQ70", name: "Hoàn thiện hệ thống CSDL", agency: "Hà Tĩnh", deadline: "30/06/2026", status: "Hoàn thành" },
      { group: "Nhóm 3: Chuyển đổi số", code: "007_NQ70", name: "Đào tạo nhân lực công nghệ", agency: "Hà Tĩnh", deadline: "15/09/2026", status: "Theo dõi" },
      { group: "Nhóm 1: Phát triển hạ tầng số", code: "008_NQ70", name: "An toàn thông tin mạng", agency: "Hà Tĩnh", deadline: "31/12/2026", status: "Đúng hạn" },
    ],
  },
  {
    code: "KTXH.056",
    title: "Nghị quyết số 59-NQ/TW, ngày 24/01/2025",
    subtitle: "về hội nhập quốc tế trong tình hình mới;",
    tasks: [
      { group: "Nhóm 1: Ngoại giao kinh tế", code: "001_NQ59", name: "Mở rộng quan hệ hợp tác", agency: "Hà Tĩnh", deadline: "31/12/2025", status: "Đúng hạn" },
      { group: "Nhóm 2: Xúc tiến đầu tư", code: "002_NQ59", name: "Xúc tiến đầu tư nước ngoài", agency: "Hà Tĩnh", deadline: "30/06/2026", status: "Theo dõi" },
      { group: "Nhóm 3: Nhân lực quốc tế", code: "003_NQ59", name: "Đào tạo nhân lực hội nhập", agency: "Hà Tĩnh", deadline: "31/12/2026", status: "Hoàn thành" },
      { group: "Nhóm 1: Ngoại giao kinh tế", code: "004_NQ59", name: "Ký kết thỏa thuận quốc tế", agency: "Hà Tĩnh", deadline: "30/09/2026", status: "Đúng hạn" },
      { group: "Nhóm 2: Xúc tiến đầu tư", code: "005_NQ59", name: "Hỗ trợ doanh nghiệp xuất khẩu", agency: "Hà Tĩnh", deadline: "31/03/2026", status: "Quá hạn" },
    ],
  },
  {
    code: "KTXH.057",
    title: "Nghị quyết số 66-NQ/TW, ngày 30/4/2025",
    subtitle: "về đổi mới công tác xây dựng và thi hành pháp luật...",
    tasks: [
      { group: "Nhóm 1: Hoàn thiện thể chế", code: "010_NQ66", name: "Rà soát văn bản QPPL", agency: "Hà Tĩnh", deadline: "31/12/2025", status: "Đúng hạn" },
      { group: "Nhóm 2: Nâng lực thi hành", code: "011_NQ66", name: "Nâng cao chất lượng thẩm định", agency: "Hà Tĩnh", deadline: "30/06/2026", status: "Theo dõi" },
      { group: "Nhóm 3: Cải cách tư pháp", code: "012_NQ66", name: "Cải cách TTHC tư pháp", agency: "Hà Tĩnh", deadline: "31/12/2026", status: "Hoàn thành" },
      { group: "Nhóm 1: Hoàn thiện thể chế", code: "013_NQ66", name: "Phổ biến giáo dục pháp luật", agency: "Hà Tĩnh", deadline: "30/09/2026", status: "Đúng hạn" },
    ],
  },
  {
    code: "KTXH.058",
    title: "Nghị quyết số 68-NQ/TW, ngày 04/5/2025",
    subtitle: "về phát triển kinh tế tư nhân;",
    tasks: [
      { group: "Nhóm 1: Hỗ trợ doanh nghiệp", code: "021_NQ68", name: "Hỗ trợ khởi nghiệp sáng tạo", agency: "Hà Tĩnh", deadline: "31/12/2025", status: "Đúng hạn" },
      { group: "Nhóm 2: Cải thiện môi trường", code: "022_NQ68", name: "Cải thiện môi trường ĐT", agency: "Hà Tĩnh", deadline: "30/06/2026", status: "Theo dõi" },
      { group: "Nhóm 3: Tháo gỡ khó khăn", code: "023_NQ68", name: "Tháo gỡ vướng mắc đất đai", agency: "Hà Tĩnh", deadline: "31/12/2026", status: "Hoàn thành" },
    ],
  },
  {
    code: "KTXH.059",
    title: "Nghị quyết số 70-NQ/TW, ngày 20/8/2025",
    subtitle: "về bảo đảm an ninh năng lượng quốc gia...",
    tasks: [
      { group: "Nhóm 1: Xây dựng nguồn năng lượng", code: "004_NQ70", name: "Nâng cao hiệu lực QL nhà nước", agency: "Hà Tĩnh", deadline: "31/12/2025", status: "Quá hạn" },
      { group: "Nhóm 2: Giám sát quy hoạch", code: "005_NQ70", name: "Tăng cường kiểm tra giám sát", agency: "Hà Tĩnh", deadline: "31/12/2030", status: "Đúng hạn" },
    ],
  },
  {
    code: "KTXH.060",
    title: "Nghị quyết số 71-NQ/TW, ngày 22/8/2025",
    subtitle: "về đột phá phát triển giáo dục và đào tạo;",
    tasks: [
      { group: "Nhóm 1: Đổi mới chương trình GD", code: "031_NQ71", name: "Đổi mới chương trình GDPT", agency: "Hà Tĩnh", deadline: "31/12/2025", status: "Đúng hạn" },
      { group: "Nhóm 2: Cơ sở vật chất", code: "032_NQ71", name: "Đầu tư CSVC trường chuẩn", agency: "Hà Tĩnh", deadline: "30/06/2026", status: "Theo dõi" },
    ],
  },
  {
    code: "KTXH.061",
    title: "Nghị quyết số 72-NQ/TW, ngày 09/9/2025",
    subtitle: "về bảo vệ, chăm sóc và nâng cao sức khỏe Nhân dân;",
    tasks: [
      { group: "Nhóm 1: Y tế cơ sở", code: "041_NQ72", name: "Củng cố hệ thống y tế cơ sở", agency: "Hà Tĩnh", deadline: "31/12/2025", status: "Đúng hạn" },
    ],
  },
  {
    code: "KTXH.062",
    title: "Nghị quyết số 79-NQ/TW, ngày 06/01/2026",
    subtitle: "về phát triển kinh tế nhà nước;",
    tasks: [
      { group: "Nhóm 1: Doanh nghiệp nhà nước", code: "051_NQ79", name: "Nâng cao hiệu quả DNNN", agency: "Hà Tĩnh", deadline: "31/12/2026", status: "Đúng hạn" },
    ],
  },
  {
    code: "KTXH.063",
    title: "Nghị quyết số 80-NQ/TW, ngày 07/01/2026",
    subtitle: "về phát triển văn hóa Việt Nam;",
    tasks: [
      { group: "Nhóm 1: Xây dựng con người", code: "061_NQ80", name: "Xây dựng hệ giá trị văn hóa", agency: "Hà Tĩnh", deadline: "31/12/2026", status: "Đúng hạn" },
    ],
  },
  {
    code: "KTXH.064",
    title: "Nghị quyết số 10-NQ/TW, ngày 08/6/2026",
    subtitle: "về phát triển kinh tế có vốn đầu tư nước ngoài.",
    tasks: [
      { group: "Nhóm 1: Thu hút FDI", code: "071_NQ10", name: "Nâng cao hiệu quả thu hút FDI", agency: "Hà Tĩnh", deadline: "31/12/2026", status: "Đúng hạn" },
    ],
  },
];

const overviewProgramRows = [
  { name: "Tỷ trọng giá trị tăng thêm của kinh tế số trong GRDP", value: "8,78", unit: "%" },
  { name: "Tỷ lệ ứng dụng AI trong hoạt động quản lý, điều hành", value: "74,32", unit: "%" },
  { name: "Tỷ lệ doanh nghiệp công nghệ số trong tổng số doanh nghiệp", value: "12,23", unit: "%" },
  { name: "Số lượng văn bản, nhiệm vụ quá hạn", value: "5", unit: "VB" },
  { name: "Tỷ lệ hoàn thành chỉ tiêu kinh tế - xã hội", value: "85,4", unit: "%" },
];

const mapLabels = [
  "Nghi Xuân",
  "Hương Sơn",
  "TX Hồng Lĩnh",
  "Đức Thọ",
  "Can Lộc",
  "Lộc Hà",
  "Vũ Quang",
  "TP. Hà Tĩnh",
  "Thạch Hà",
  "Hương Khê",
  "Cẩm Xuyên",
];

const detailSeeds = [
  {
    id: "grdp",
    title: "Nhóm chỉ số về GRDP",
    subtitle: "Theo dõi tăng trưởng, cơ cấu GRDP và thu nhập bình quân đầu người",
    chart: "Tốc độ tăng trưởng kinh tế (GRDP)",
    kpis: [
      ["Tốc độ tăng trưởng kinh tế (GRDP)", "8,78", "%", "12,6% so với cùng kỳ năm trước"],
      ["Thu nhập bình quân đầu người", "60,14", "Triệu đồng/người/năm", "12,6% so với cùng kỳ năm trước"],
      ["Tổng vốn đầu tư thực hiện toàn xã hội", "2.931", "Tỷ đồng", "11,9% so với cùng kỳ năm trước"],
      ["Tỷ trọng giá trị tăng thêm ngành công nghiệp", "24,62", "%", "12,6% so với cùng kỳ"],
    ],
  },
  {
    id: "revenue",
    title: "Nhóm thu ngân sách",
    subtitle: "Theo dõi cơ cấu thu, tiến độ thu nội địa và các khoản thu trọng điểm",
    chart: "Tổng các khoản thu ngân sách nhà nước",
    kpis: [
      ["Tổng số tiền nộp thuế", "234", "Triệu đồng", "12,6% so với dự toán"],
      ["Thu từ hoạt động xuất, nhập khẩu", "100", "Triệu đồng", "12,6% so với dự toán"],
      ["Thu nội địa", "431", "Triệu đồng", "12,6% so với dự toán"],
      ["Thu tiền thuê đất, tiền sử dụng đất", "245", "Triệu đồng", "12,6% so với cùng kỳ"],
    ],
  },
  {
    id: "expense",
    title: "Nhóm chi ngân sách",
    subtitle: "Giám sát chi thường xuyên, chi đầu tư và cân đối ngân sách địa phương",
    chart: "Cơ cấu chi ngân sách địa phương",
    kpis: [
      ["Tổng chi ngân sách địa phương", "9.842", "Tỷ đồng", "64,8% so với dự toán"],
      ["Chi đầu tư phát triển", "3.214", "Tỷ đồng", "58,2% so với kế hoạch vốn"],
      ["Chi thường xuyên", "5.972", "Tỷ đồng", "71,4% so với dự toán"],
      ["Hồ sơ thanh toán đúng hạn", "96,8", "%", "Tăng 2,3 điểm % so với tháng trước"],
    ],
  },
  {
    id: "investment",
    title: "Nhóm đầu tư công",
    subtitle: "Theo dõi dự án, kế hoạch vốn, giải ngân và các vướng mắc trọng điểm",
    chart: "Tiến độ giải ngân vốn đầu tư công",
    kpis: [
      ["Tổng số dự án đầu tư công", "36", "Dự án", "12,6% so với cùng kỳ năm trước"],
      ["Tổng vốn bố trí", "1.985", "Tỷ đồng", "82,4% kế hoạch vốn năm"],
      ["Giải ngân lũy kế", "1.214", "Tỷ đồng", "61,2% kế hoạch vốn"],
      ["Dự án chậm tiến độ", "5", "Dự án", "Giảm 2 dự án so với tháng trước"],
    ],
  },
  {
    id: "trade-service",
    title: "Nhóm thương mại dịch vụ",
    subtitle: "Theo dõi bán lẻ hàng hóa, du lịch, vận tải và dịch vụ tiêu dùng",
    chart: "Tăng trưởng thương mại dịch vụ",
    kpis: [
      ["Tổng mức bán lẻ hàng hóa", "42,8", "Nghìn tỷ đồng", "12,4% so với cùng kỳ"],
      ["Số lượt khách du lịch", "1.234", "Lượt khách", "18,2% so với cùng kỳ"],
      ["Doanh thu dịch vụ lưu trú", "682", "Tỷ đồng", "9,6% so với cùng kỳ"],
      ["Kim ngạch xuất khẩu", "786", "Triệu USD", "7,8% so với cùng kỳ"],
    ],
  },
  {
    id: "enterprise-coop",
    title: "Nhóm về doanh nghiệp hợp tác xã",
    subtitle: "Theo dõi thành lập mới, hoạt động doanh nghiệp, hợp tác xã và hộ kinh doanh",
    chart: "Doanh nghiệp hoạt động trong nền kinh tế",
    kpis: [
      ["Doanh nghiệp hoạt động", "1.233", "DN", "12,6% so với cùng kỳ năm trước"],
      ["Doanh nghiệp thành lập mới", "345", "DN", "8,3% so với cùng kỳ"],
      ["Hợp tác xã hoạt động", "108", "HTX", "5,4% so với cùng kỳ"],
      ["Hộ kinh doanh đăng ký mới", "2.412", "Hộ", "9,7% so với cùng kỳ"],
    ],
  },
  {
    id: "investment-attraction",
    title: "Thu hút đầu tư",
    subtitle: "Theo dõi dự án đăng ký mới, vốn FDI, vốn trong nước và tiến độ xúc tiến",
    chart: "Dòng vốn đầu tư đăng ký theo tháng",
    kpis: [
      ["Dự án thu hút mới", "18", "Dự án", "Tăng 4 dự án so với quý trước"],
      ["Vốn đăng ký trong nước", "3.420", "Tỷ đồng", "15,6% so với cùng kỳ"],
      ["Vốn FDI đăng ký", "126", "Triệu USD", "11,2% so với cùng kỳ"],
      ["Nhà đầu tư đang khảo sát", "52", "Đơn vị", "Tăng 9 đơn vị so với tháng trước"],
    ],
  },
  {
    id: "industrial-products",
    title: "Nhóm sản phẩm công nghiệp",
    subtitle: "Theo dõi sản lượng sản phẩm công nghiệp chủ lực và chỉ số sản xuất",
    chart: "Sản phẩm công nghiệp chủ lực",
    kpis: [
      ["Chỉ số sản xuất công nghiệp", "109,4", "%", "Tăng 7,1% so với cùng kỳ"],
      ["Sản phẩm thép", "842", "Nghìn tấn", "12,6% so với cùng kỳ"],
      ["Sản lượng điện thương phẩm", "1.206", "Triệu kWh", "5,9% so với cùng kỳ"],
      ["Sản phẩm chế biến", "74,3", "%", "Đạt 89,2% kế hoạch"],
    ],
  },
  {
    id: "agriculture",
    title: "Nhóm chỉ tiêu nông nghiệp",
    subtitle: "Theo dõi sản xuất nông nghiệp, thủy sản, lâm nghiệp và nông thôn mới",
    chart: "Sản xuất nông nghiệp theo lĩnh vực",
    kpis: [
      ["Sản lượng lúa", "58,4", "Nghìn tấn", "3,2% so với cùng kỳ"],
      ["Sản lượng thủy sản", "31,7", "Nghìn tấn", "8,4% so với cùng kỳ"],
      ["Tỷ lệ che phủ rừng", "34,24", "%", "Ổn định so với năm trước"],
      ["Xã đạt chuẩn nông thôn mới", "178", "Xã", "Đạt 96,7% kế hoạch"],
    ],
  },
  {
    id: "key-projects",
    title: "Nhóm dự án trọng điểm",
    subtitle: "Theo dõi tiến độ các dự án trọng điểm, vướng mắc và lịch xử lý",
    chart: "Tiến độ dự án trọng điểm",
    kpis: [
      ["Dự án trọng điểm", "25", "Dự án", "12,6% so với cùng kỳ năm trước"],
      ["Dự án chậm tiến độ", "12", "Dự án", "Cần xử lý trong tháng"],
      ["Vướng mắc giải phóng mặt bằng", "9", "Điểm", "Giảm 2 điểm so với tuần trước"],
      ["Tỷ lệ hoàn thành mốc tiến độ", "85,4", "%", "Đạt mục tiêu điều hành"],
    ],
  },
  {
    id: "internal-admin-labor",
    title: "Nhóm nội vụ, cải cách hành chính - lao động",
    subtitle: "Theo dõi dịch vụ công, lao động việc làm, cải cách thủ tục hành chính",
    chart: "Tỷ lệ xử lý hồ sơ hành chính",
    kpis: [
      ["Dịch vụ công trực tuyến", "98,21", "%", "12,6% so với cùng kỳ năm trước"],
      ["Hồ sơ giải quyết đúng hạn", "78,22", "%", "Tăng 4,3 điểm % so với tháng trước"],
      ["Lao động được giải quyết việc làm", "722", "Lao động", "Đạt 85,4% kế hoạch"],
      ["Kiến nghị đang xử lý", "38", "Kiến nghị", "Giảm 6 kiến nghị so với tuần trước"],
    ],
  },
  {
    id: "health-social",
    title: "Y tế an sinh xã hội",
    subtitle: "Theo dõi khám chữa bệnh, bảo hiểm y tế, giảm nghèo và an sinh xã hội",
    chart: "Tỷ lệ bao phủ bảo hiểm y tế",
    kpis: [
      ["Tổng số lượt khám bệnh", "13.421", "Lượt khám", "12,6% so với cùng kỳ tháng trước"],
      ["Tỷ lệ dân số tham gia BHYT", "99,43", "%", "12,6% so với cùng kỳ năm trước"],
      ["Tỷ lệ hộ nghèo", "87,29", "%", "Giảm 1,1 điểm % so với năm trước"],
      ["Người hưởng trợ cấp xã hội", "8,67", "Nghìn người", "Ổn định so với tháng trước"],
    ],
  },
  {
    id: "education",
    title: "Nhóm giáo dục",
    subtitle: "Theo dõi trường đạt chuẩn, quy mô học sinh và chất lượng giáo dục",
    chart: "Cơ cấu trường học theo cấp",
    kpis: [
      ["Trường đạt chuẩn quốc gia", "214", "Trường", "Đạt 92,4% kế hoạch"],
      ["Tỷ lệ huy động trẻ 3-5 tuổi đến lớp", "1.424", "Tỷ đồng", "12,6% so với cùng kỳ"],
      ["Học sinh hoàn thành chương trình", "98,2", "%", "Tăng 1,4 điểm %"],
      ["Cơ sở giáo dục được số hóa", "156", "Cơ sở", "Đạt 88,1% kế hoạch"],
    ],
  },
  {
    id: "planning-public-assets",
    title: "Quy hoạch, xây dựng tài sản công",
    subtitle: "Theo dõi quy hoạch, cấp phép xây dựng, tài sản công và hạ tầng đô thị",
    chart: "Tiến độ xử lý quy hoạch và xây dựng",
    kpis: [
      ["Đồ án quy hoạch được phê duyệt", "42", "Đồ án", "Tăng 8 đồ án so với quý trước"],
      ["Giấy phép xây dựng đã cấp", "1.286", "Giấy phép", "12,6% so với cùng kỳ"],
      ["Tài sản công cập nhật dữ liệu", "94,7", "%", "Đạt mục tiêu quý"],
      ["Công trình kiểm tra hiện trường", "318", "Công trình", "Tăng 6,2% so với tháng trước"],
    ],
  },
  {
    id: "land-minerals",
    title: "Đất đai, khoáng sản",
    subtitle: "Theo dõi hồ sơ đất đai, cấp giấy chứng nhận, mỏ khoáng sản và môi trường",
    chart: "Hồ sơ đất đai và khoáng sản",
    kpis: [
      ["Hồ sơ đất đai tiếp nhận", "3.812", "Hồ sơ", "10,3% so với cùng kỳ"],
      ["Giấy chứng nhận đã cấp", "2.418", "GCN", "Đạt 91,2% tiến độ"],
      ["Mỏ khoáng sản đang quản lý", "87", "Mỏ", "Ổn định so với kỳ trước"],
      ["Điểm nóng môi trường xử lý", "14", "Điểm", "Giảm 5 điểm so với tháng trước"],
    ],
  },
  {
    id: "resolution-tasks",
    title: "Theo dõi chỉ tiêu và nhiệm vụ thực hiện các nghị quyết trọng tâm",
    subtitle: "Theo dõi nghị quyết trọng tâm, nhiệm vụ được giao và tiến độ hoàn thành",
    chart: "Kết quả thực hiện nghị quyết trọng tâm",
    kpis: [
      ["Nhiệm vụ đang thực hiện", "57", "Nhiệm vụ", "Đúng tiến độ điều hành"],
      ["Chỉ tiêu đạt kế hoạch", "74,32", "%", "12,6% so với cùng kỳ năm trước"],
      ["Chỉ tiêu cần đôn đốc", "12,23", "%", "Cần rà soát trong kỳ"],
      ["Văn bản chờ ký", "12", "VB", "Giảm 4 văn bản so với tuần trước"],
    ],
  },
  {
    id: "socio-economic-57",
    title: "57 chỉ tiêu phát triển kinh tế - xã hội giai đoạn",
    subtitle: "Theo dõi 57 chỉ tiêu phát triển kinh tế - xã hội theo giai đoạn",
    chart: "Tổng hợp 57 chỉ tiêu phát triển kinh tế - xã hội",
    kpis: [
      ["Chỉ tiêu hoàn thành", "35", "Chỉ tiêu", "Đạt 61,4% tổng số chỉ tiêu"],
      ["Chỉ tiêu đang theo dõi", "17", "Chỉ tiêu", "Cần cập nhật định kỳ"],
      ["Chỉ tiêu có nguy cơ chậm", "5", "Chỉ tiêu", "Cần chỉ đạo xử lý"],
      ["Tỷ lệ hoàn thành bình quân", "82,6", "%", "Tăng 3,2 điểm % so với kỳ trước"],
    ],
  },
] as const;

function toKpiItems(items: ReadonlyArray<readonly [string, string, string, string]>): KpiItem[] {
  return items.map(([label, value, unit, trend], index) => ({
    label,
    value,
    unit,
    trend,
    tone: index === 3 ? "amber" : index === 2 ? "cyan" : "green",
  }));
}

function buildDetailData(): Record<string, DetailData> {
  return Object.fromEntries(
    detailSeeds.map((seed, seedIndex) => {
      const base = 42 + seedIndex * 3;

      return [
        seed.id,
        {
          id: seed.id,
          title: seed.title,
          subtitle: seed.subtitle,
          primaryChart: seed.chart,
          kpis: toKpiItems(seed.kpis),
          highlights: [
            {
              label: "Hoàn thành kế hoạch",
              value: `${Math.min(98, base + 21)},${seedIndex % 9}`,
              unit: "%",
              trend: "12,6% so với cùng kỳ năm trước",
              tone: "green",
            },
            {
              label: "Đơn vị đạt tiến độ",
              value: `${8 + (seedIndex % 5)}/13`,
              unit: "Đơn vị",
              trend: "Cập nhật theo bộ lọc hiện tại",
              tone: "cyan",
            },
            {
              label: "Hạng mục cần đôn đốc",
              value: `${3 + (seedIndex % 7)}`,
              unit: "Hạng mục",
              trend: "Ưu tiên xử lý trong tuần",
              tone: "amber",
            },
          ],
          bars: [
            { label: "TP Hà Tĩnh", value: 78 + (seedIndex % 12), tone: "green" },
            { label: "Hương Sơn", value: 64 + (seedIndex % 18), tone: "cyan" },
            { label: "Can Lộc", value: 56 + (seedIndex % 22), tone: "amber" },
            { label: "Cẩm Xuyên", value: 48 + (seedIndex % 16), tone: "red" },
          ],
          table: [
            { name: "Nghị quyết số 57-NQ/TW", date: "22/12/2024", status: "Đang thực hiện" },
            { name: "Nghị quyết số 59-NQ/TW", date: "24/01/2025", status: "Đang thực hiện" },
            { name: "Nghị quyết số 66-NQ/TW", date: "10/04/2025", status: "Đang thực hiện" },
            { name: "Nghị quyết số 68-NQ/TW", date: "04/05/2025", status: "Đang thực hiện" },
            { name: "Nghị quyết số 70-NQ/TW", date: "20/08/2025", status: "Đôn đốc" },
          ],
          pie: [
            { label: "Đạt", value: 48 + (seedIndex % 8), tone: "#16d196" },
            { label: "Theo dõi", value: 24 + (seedIndex % 7), tone: "#f4b45e" },
            { label: "Cần xử lý", value: 16 + (seedIndex % 5), tone: "#ff6f91" },
            { label: "Khác", value: 12, tone: "#63c7ff" },
          ],
        },
      ];
    }),
  );
}

const detailData = buildDetailData();

const grdpFocus = [
  {
    label: "Tốc độ tăng trưởng kinh tế (GRDP)",
    value: "8,78",
    unit: "%",
    trend: "12,6% so với cùng kỳ năm trước",
    tone: "green" as const,
  },
  {
    label: "GRDP bình quân đầu người",
    value: "68,23",
    unit: "Triệu đồng/người/năm",
    trend: "Đạt 84,2% kế hoạch năm",
    tone: "cyan" as const,
  },
  {
    label: "Tổng vốn đầu tư thực hiện toàn xã hội",
    value: "2.931",
    unit: "Tỷ đồng",
    trend: "11,9% so với cùng kỳ năm trước",
    tone: "amber" as const,
  },
];

const grdpSectorRows = [
  { label: "Công nghiệp - xây dựng", value: "44,8", unit: "%", tone: "green" },
  { label: "Dịch vụ", value: "36,4", unit: "%", tone: "cyan" },
  { label: "Nông, lâm nghiệp và thủy sản", value: "12,6", unit: "%", tone: "amber" },
  { label: "Thuế sản phẩm trừ trợ cấp", value: "6,2", unit: "%", tone: "white" },
] as const;

const grdpAreaRows = [
  { label: "TP Hà Tĩnh", value: 92, amount: "15.624", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 88, amount: "13.240", tone: "cyan" as const },
  { label: "Hương Sơn", value: 76, amount: "9.816", tone: "amber" as const },
  { label: "Cẩm Xuyên", value: 68, amount: "8.472", tone: "red" as const },
];

const grdpTaskRows = [
  { name: "Cập nhật số liệu GRDP theo ngành", date: "11/08/2026", status: "Đúng hạn" },
  { name: "Rà soát kịch bản tăng trưởng quý III", date: "09/08/2026", status: "Đang xử lý" },
  { name: "Tổng hợp vốn đầu tư toàn xã hội", date: "07/08/2026", status: "Đôn đốc" },
  { name: "Đối chiếu thu nhập bình quân đầu người", date: "05/08/2026", status: "Đúng hạn" },
];

const revenueFocus = [
  {
    label: "Tổng các khoản thu NSNN",
    value: "15.212",
    unit: "Triệu đồng",
    trend: "89,6% so với dự toán",
    tone: "green" as const,
  },
  {
    label: "Thu nội địa",
    value: "431",
    unit: "Triệu đồng",
    trend: "12,6% so với dự toán",
    tone: "cyan" as const,
  },
  {
    label: "Thu từ hoạt động xuất, nhập khẩu",
    value: "100",
    unit: "Triệu đồng",
    trend: "12,6% so với dự toán",
    tone: "amber" as const,
  },
];

const revenueSourceRows = [
  { label: "Thuế, phí và lệ phí", value: "48,6", unit: "%", tone: "green" },
  { label: "Thu tiền sử dụng đất", value: "22,4", unit: "%", tone: "amber" },
  { label: "Xuất, nhập khẩu", value: "18,9", unit: "%", tone: "cyan" },
  { label: "Thu khác ngân sách", value: "10,1", unit: "%", tone: "white" },
] as const;

const revenueAreaRows = [
  { label: "TP Hà Tĩnh", value: 94, amount: "3.842", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 88, amount: "2.614", tone: "cyan" as const },
  { label: "Nghi Xuân", value: 76, amount: "1.928", tone: "amber" as const },
  { label: "Cẩm Xuyên", value: 63, amount: "1.204", tone: "red" as const },
];

const revenueTaskRows = [
  { name: "Rà soát tiến độ thu nội địa", date: "11/08/2026", status: "Đúng hạn" },
  { name: "Đối chiếu khoản thu xuất nhập khẩu", date: "10/08/2026", status: "Đang xử lý" },
  { name: "Cập nhật thu tiền thuê đất, sử dụng đất", date: "08/08/2026", status: "Đôn đốc" },
  { name: "Tổng hợp báo cáo dự toán ngân sách", date: "05/08/2026", status: "Đúng hạn" },
];

const expenseFocus = [
  {
    label: "Tổng chi ngân sách địa phương",
    value: "9.842",
    unit: "Tỷ đồng",
    trend: "64,8% so với dự toán",
    tone: "green" as const,
  },
  {
    label: "Chi đầu tư phát triển",
    value: "3.214",
    unit: "Tỷ đồng",
    trend: "58,2% so với kế hoạch vốn",
    tone: "cyan" as const,
  },
  {
    label: "Chi thường xuyên",
    value: "5.972",
    unit: "Tỷ đồng",
    trend: "71,4% so với dự toán",
    tone: "amber" as const,
  },
];

const expenseStructureRows = [
  { label: "Chi thường xuyên", value: "60,7", unit: "%", tone: "green" },
  { label: "Chi đầu tư phát triển", value: "32,7", unit: "%", tone: "cyan" },
  { label: "Chi trả nợ, viện trợ", value: "4,2", unit: "%", tone: "amber" },
  { label: "Chi bổ sung quỹ dự phòng", value: "2,4", unit: "%", tone: "white" },
] as const;

const expenseAreaRows = [
  { label: "TP Hà Tĩnh", value: 91, amount: "1.486", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 84, amount: "1.204", tone: "cyan" as const },
  { label: "Cẩm Xuyên", value: 73, amount: "986", tone: "amber" as const },
  { label: "Hương Khê", value: 61, amount: "742", tone: "red" as const },
];

const expensePieItems = [
  { label: "Chi thường xuyên", value: 61, tone: "#16d196" },
  { label: "Chi đầu tư", value: 33, tone: "#63c7ff" },
  { label: "Chi khác", value: 6, tone: "#f4b45e" },
];

const expenseTaskRows = [
  { name: "Rà soát tiến độ giải ngân chi đầu tư", date: "11/08/2026", status: "Đang xử lý" },
  { name: "Đối chiếu chứng từ chi thường xuyên", date: "10/08/2026", status: "Đúng hạn" },
  { name: "Tổng hợp hồ sơ thanh toán qua kho bạc", date: "08/08/2026", status: "Đúng hạn" },
  { name: "Cập nhật cân đối ngân sách địa phương", date: "05/08/2026", status: "Đôn đốc" },
];

const investmentFocus = [
  {
    label: "Tổng số dự án đầu tư công",
    value: "36",
    unit: "Dự án",
    trend: "12,6% so với cùng kỳ năm trước",
    tone: "green" as const,
  },
  {
    label: "Tổng vốn bố trí",
    value: "1.985",
    unit: "Tỷ đồng",
    trend: "82,4% kế hoạch vốn năm",
    tone: "cyan" as const,
  },
  {
    label: "Dự án chậm tiến độ",
    value: "5",
    unit: "Dự án",
    trend: "Giảm 2 dự án so với tháng trước",
    tone: "amber" as const,
  },
];

const investmentCapitalRows = [
  { label: "Vốn ngân sách tỉnh", value: "54,2", unit: "%", tone: "green" },
  { label: "Vốn ngân sách Trung ương", value: "26,8", unit: "%", tone: "cyan" },
  { label: "Vốn chương trình mục tiêu", value: "12,4", unit: "%", tone: "amber" },
  { label: "Nguồn vốn khác", value: "6,6", unit: "%", tone: "white" },
] as const;

const investmentAreaRows = [
  { label: "TP Hà Tĩnh", value: 92, amount: "284", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 86, amount: "246", tone: "cyan" as const },
  { label: "Cẩm Xuyên", value: 74, amount: "198", tone: "amber" as const },
  { label: "Hương Khê", value: 58, amount: "142", tone: "red" as const },
];

const investmentPieItems = [
  { label: "Đã giải ngân", value: 61, tone: "#16d196" },
  { label: "Đang thực hiện", value: 24, tone: "#63c7ff" },
  { label: "Cần đôn đốc", value: 9, tone: "#f4b45e" },
  { label: "Chậm tiến độ", value: 6, tone: "#ff6f91" },
];

const investmentTaskRows = [
  { name: "Rà soát giải ngân các dự án chuyển tiếp", date: "11/08/2026", status: "Đúng hạn" },
  { name: "Tháo gỡ vướng mắc giải phóng mặt bằng", date: "10/08/2026", status: "Đang xử lý" },
  { name: "Cập nhật kế hoạch vốn sau điều chỉnh", date: "08/08/2026", status: "Đôn đốc" },
  { name: "Tổng hợp danh mục dự án khởi công mới", date: "05/08/2026", status: "Đúng hạn" },
];

const investmentAttractionMonths = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"];
const investmentAttractionProjects = [62, 76, 92, 57, 99, 77];
const investmentAttractionCapital = [1234, 1532, 1872, 1125, 1976, 1543];

const trendLabels = ["T1", "T2", "T3", "T4", "T5", "T6"];
const grdpDesignQuarterLabels = ["Quý 3/2025", "Quý 4/2025", "Quý 1/2026", "Quý 2/2026"];
const grdpDesignPieItems = [
  { label: "Công nghiệp, xây dựng", value: 55, tone: "#58c08a" },
  { label: "Nông nghiệp", value: 30, tone: "#f0aa3a" },
  { label: "Dịch vụ", value: 15, tone: "#5b7df2" },
];

const industrialMonths = ["T5/2026", "T6/2026", "T7/2026", "T8/2026"];

type IndustrialChartConfig = {
  title: string;
  unit: string;
  max: number;
  interval: number;
  series: Array<{
    name: string;
    color: string;
    data: number[];
  }>;
};

const industrialCharts: IndustrialChartConfig[] = [
  {
    title: "Phôi thép",
    unit: "Triệu tấn",
    max: 5,
    interval: 1.25,
    series: [{ name: "Phôi thép", color: "#2f7df6", data: [2.72, 3.15, 3.05, 2.78] }],
  },
  {
    title: "Thép thành phẩm",
    unit: "Triệu tấn",
    max: 10,
    interval: 2.5,
    series: [
      { name: "Formosa", color: "#2f7df6", data: [3.6, 3.35, 3.05, 3.45] },
      { name: "Vinmetal", color: "#f5a623", data: [2.86, 3.27, 3.46, 4.05] },
    ],
  },
  {
    title: "Pack",
    unit: "Nghìn pack",
    max: 500,
    interval: 125,
    series: [{ name: "Pack", color: "#2f7df6", data: [350, 336, 396, 386] }],
  },
  {
    title: "Cell",
    unit: "Triệu cell",
    max: 50,
    interval: 12.5,
    series: [{ name: "Cell", color: "#2f7df6", data: [20.8, 20.6, 11.2, 26.0] }],
  },
  {
    title: "Ô tô điện",
    unit: "Nghìn xe",
    max: 500,
    interval: 125,
    series: [{ name: "Ô tô điện", color: "#2f7df6", data: [198, 252, 284, 306] }],
  },
  {
    title: "Xe máy điện",
    unit: "Nghìn xe",
    max: 500,
    interval: 125,
    series: [{ name: "Xe máy điện", color: "#2f7df6", data: [242, 292, 258, 306] }],
  },
  {
    title: "Điện sản xuất",
    unit: "Tỷ kwh",
    max: 10000,
    interval: 2500,
    series: [
      { name: "Formosa", color: "#2f7df6", data: [2720, 3020, 3180, 3260] },
      { name: "Nhiệt điện 1", color: "#f5a623", data: [520, 470, 230, 610] },
      { name: "Nhiệt điện 2", color: "#34c875", data: [2920, 3260, 3560, 3220] },
    ],
  },
  {
    title: "Bia",
    unit: "Nghìn lít",
    max: 500,
    interval: 125,
    series: [{ name: "Bia", color: "#2f7df6", data: [390, 398, 426, 406] }],
  },
  {
    title: "Sợi",
    unit: "Tấn",
    max: 20000,
    interval: 5000,
    series: [{ name: "Sợi", color: "#2f7df6", data: [5800, 9800, 10700, 9500] }],
  },
];

const keyProjectRows = [
  {
    name: "Khu công nghiệp Vinh Tân mở rộng",
    investor: "Nhà đầu tư A",
    capital: "4.081 tỷ đồng",
    disbursement: "65%",
    status: "Đúng tiến độ",
    tone: "green",
  },
  {
    name: "Cảng nước sâu Vũng Áng GD2",
    investor: "Nhà đầu tư B",
    capital: "3.445 tỷ đồng",
    disbursement: "75%",
    status: "Đúng tiến độ",
    tone: "green",
  },
  {
    name: "Đường ven biển Hà Tĩnh",
    investor: "Nhà đầu tư C",
    capital: "4.171 tỷ đồng",
    disbursement: "47%",
    status: "Cần theo dõi",
    tone: "amber",
  },
  {
    name: "Nhà máy nhiệt điện Vũng Áng III",
    investor: "Nhà đầu tư D",
    capital: "4.464 tỷ đồng",
    disbursement: "93%",
    status: "Chậm tiến độ",
    tone: "red",
  },
  {
    name: "Khu đô thị sinh thái Xuân An",
    investor: "Nhà đầu tư E",
    capital: "2.245 tỷ đồng",
    disbursement: "90%",
    status: "Đúng tiến độ",
    tone: "green",
  },
  {
    name: "Hạ tầng KKT Vũng Áng",
    investor: "Nhà đầu tư F",
    capital: "2.313 tỷ đồng",
    disbursement: "81%",
    status: "Cần theo dõi",
    tone: "amber",
  },
] as const;

const keyProjectMonths = ["T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];

const agriculturePeriods = ["Q4/2025", "Q1/2026", "Q2/2026", "Q3/2026"];

type AgricultureChartConfig = {
  max: number;
  series: Array<{
    color: string;
    data: number[];
    name: string;
  }>;
  title: string;
  unit: string;
};

const agricultureCharts: AgricultureChartConfig[] = [
  {
    title: "Sản lượng lúa",
    unit: "Tấn",
    max: 50000,
    series: [{ name: "Sản lượng lúa", color: "#317cf7", data: [20500, 24700, 25500, 27200] }],
  },
  {
    title: "Diện tích gieo trồng cây hằng năm",
    unit: "Ha",
    max: 5000,
    series: [{ name: "Diện tích", color: "#317cf7", data: [900, 1650, 1850, 2450] }],
  },
  {
    title: "Diện tích rừng bị thiệt hại (chặt phá, cháy...)",
    unit: "Ha",
    max: 2000,
    series: [{ name: "Diện tích thiệt hại", color: "#ef5a52", data: [900, 710, 960, 640] }],
  },
  {
    title: "Sản lượng thủy sản",
    unit: "Tấn",
    max: 50000,
    series: [
      { name: "Nuôi trồng", color: "#317cf7", data: [20000, 22900, 21400, 23200] },
      { name: "Khai thác", color: "#f5a623", data: [17600, 17000, 16400, 15600] },
    ],
  },
  {
    title: "Diện tích rừng trồng mới tập trung",
    unit: "Ha",
    max: 5000,
    series: [{ name: "Rừng trồng mới", color: "#317cf7", data: [2700, 2620, 2540, 3150] }],
  },
  {
    title: "Sản lượng gỗ khai thác",
    unit: "m3",
    max: 500,
    series: [{ name: "Gỗ khai thác", color: "#317cf7", data: [272, 322, 336, 382] }],
  },
];

function AgriculturePeriodSelect() {
  return (
    <label className="agriculture-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue="q1-2026" aria-label="Kỳ báo cáo">
        <option value="q1-2026">Quý I/2026</option>
        <option value="q2-2026">Quý II/2026</option>
        <option value="q3-2026">Quý III/2026</option>
      </select>
    </label>
  );
}

function AgricultureBarChart({ chart }: { chart: AgricultureChartConfig }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 850,
    color: chart.series.map((item) => item.color),
    grid: {
      left: 66,
      right: 32,
      top: 72,
      bottom: chart.series.length > 1 ? 70 : 54,
    },
    legend: {
      bottom: 14,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      show: chart.series.length > 1,
      textStyle: { color: "rgba(161, 178, 203, 0.9)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: agriculturePeriods,
      axisLabel: { color: "rgba(112, 136, 172, 0.92)", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: chart.max,
      interval: chart.max / 4,
      axisLabel: {
        color: "rgba(112, 136, 172, 0.92)",
        fontSize: 12,
        formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
      },
      splitLine: { lineStyle: { color: "rgba(125, 147, 174, 0.23)" } },
    },
    series: chart.series.map((item) => ({
      name: item.name,
      type: "bar",
      stack: chart.series.length > 1 ? "total" : undefined,
      barWidth: "60%",
      data: item.data,
      itemStyle: {
        borderRadius: chart.series.length > 1 ? 0 : [4, 4, 0, 0],
        color: item.color,
      },
    })),
  }), [chart]);

  return <EChart className="agriculture-chart" option={option} ariaLabel={chart.title} />;
}

function ForestCoverageGauge() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ["50%", "64%"],
        radius: "88%",
        progress: {
          show: true,
          width: 22,
          itemStyle: { color: "#2ca85c" },
        },
        axisLine: {
          lineStyle: {
            width: 22,
            color: [[0.7, "#2ca85c"], [1, "#ffd05e"]],
          },
        },
        pointer: {
          icon: "rect",
          length: "45%",
          width: 6,
          offsetCenter: [0, "-8%"],
          itemStyle: { color: "#ffffff" },
        },
        anchor: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "-5%"],
          formatter: "{value}%",
          color: "#30b762",
          fontSize: 34,
          fontWeight: 900,
        },
        data: [{ value: 70 }],
      },
    ],
  }), []);

  return (
    <div className="agriculture-gauge-wrap">
      <EChart className="agriculture-gauge" option={option} ariaLabel="Tỷ lệ che phủ rừng" />
      <div className="agriculture-gauge-target">MỤC TIÊU: 55%</div>
    </div>
  );
}

function AgricultureDashboard() {
  return (
    <section className="agriculture-dashboard" aria-label="Nhóm chỉ tiêu nông nghiệp">
      <div className="agriculture-grid">
        {agricultureCharts.slice(0, 3).map((chart) => (
          <article className="agriculture-panel" key={chart.title}>
            <h3>{chart.title}</h3>
            <span className="agriculture-unit">Đơn vị: {chart.unit}</span>
            <AgriculturePeriodSelect />
            <AgricultureBarChart chart={chart} />
          </article>
        ))}

        <article className="agriculture-panel agriculture-gauge-panel">
          <h3>Tỷ lệ che phủ rừng</h3>
          <ForestCoverageGauge />
        </article>

        {agricultureCharts.slice(3).map((chart) => (
          <article className="agriculture-panel" key={chart.title}>
            <h3>{chart.title}</h3>
            <span className="agriculture-unit">Đơn vị: {chart.unit}</span>
            <AgriculturePeriodSelect />
            <AgricultureBarChart chart={chart} />
          </article>
        ))}
      </div>
    </section>
  );
}

function MiniLineChart({ series = [42, 68, 55, 73, 82, 96] }: { series?: number[] }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#ffbd63", "#56d7ff"],
    grid: {
      left: 14,
      right: 16,
      top: 18,
      bottom: 16,
      containLabel: false,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: trendLabels,
      boundaryGap: false,
      axisLabel: { color: "rgba(198, 218, 244, 0.62)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "rgba(198, 218, 244, 0.62)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.08)" } },
    },
    series: [
      {
        name: "Kế hoạch",
        type: "line",
        data: series,
        smooth: true,
        symbolSize: 7,
        lineStyle: { width: 4 },
        areaStyle: { color: "rgba(255, 189, 99, 0.18)" },
      },
      {
        name: "Thực hiện",
        type: "line",
        data: series.map((value, index) => Math.max(12, value - 18 + index * 3)),
        smooth: true,
        symbolSize: 0,
        lineStyle: { width: 3 },
      },
    ],
  }), [series]);

  return <EChart className="detail-line-chart" option={option} ariaLabel="Biểu đồ xu hướng" />;
}

function PieChartBlock({ items }: { items: DetailData["pie"] }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: items.map((item) => item.tone),
    legend: { show: false },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["48%", "76%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
          borderColor: "rgba(11, 17, 29, 0.96)",
          borderWidth: 2,
        },
        data: items.map((item) => ({ name: item.label, value: item.value })),
      },
    ],
  }), [items]);

  return (
    <div className="pie-block">
      <EChart className="pie-visual" option={option} ariaLabel="Biểu đồ cơ cấu chỉ tiêu" />
      <div className="pie-legend">
        {items.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.tone }} />
            {item.label}: {item.value}%
          </span>
        ))}
      </div>
    </div>
  );
}

const planningWeeklyLabels = ["Tuần 27", "Tuần 28", "Tuần 29", "Tuần 30", "Tuần 31", "Tuần 32"];

function PlanningPeriodSelect({
  compact = false,
  defaultValue = "month-1",
}: {
  compact?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className={`planning-period ${compact ? "compact" : ""}`}>
      <span>Kỳ báo cáo</span>
      <select defaultValue={defaultValue} aria-label="Kỳ báo cáo">
        <option value="month-1">Tháng 1/2026</option>
        <option value="week-1">Tuần 1 (27/07/2026-01/08/2026)</option>
        <option value="quarter-1">Quý I/2026</option>
      </select>
    </label>
  );
}

function PlanningGauge({
  label,
  target = "100%",
  value,
}: {
  label: string;
  target?: string;
  value: number;
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 850,
    series: [
      {
        type: "gauge",
        startAngle: 190,
        endAngle: -10,
        min: 0,
        max: 100,
        center: ["50%", "64%"],
        radius: "94%",
        progress: {
          show: true,
          roundCap: true,
          width: 22,
          itemStyle: { color: "#16c995" },
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 22,
            color: [[value / 100, "#16c995"], [Math.min(1, value / 100 + 0.025), "#f5ad35"], [1, "#253244"]],
          },
        },
        pointer: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "3%"],
          formatter: "{value}%",
          color: "#16c995",
          fontSize: 42,
          fontWeight: 900,
        },
        data: [{ value }],
      },
    ],
  }), [value]);

  return (
    <div className="planning-gauge-wrap">
      <EChart className="planning-gauge-chart" option={option} ariaLabel={label} />
      <strong>MỤC TIÊU: {target}</strong>
      <span>{label}</span>
    </div>
  );
}

function PlanningAssetLineChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 850,
    color: ["#4188ff", "#f9a037"],
    grid: { left: 52, right: 28, top: 72, bottom: 38 },
    legend: { show: false },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(9, 15, 28, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: planningWeeklyLabels,
      boundaryGap: false,
      axisLabel: { color: "rgba(153, 169, 194, 0.82)", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 1200,
      interval: 500,
      axisLabel: { color: "rgba(153, 169, 194, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(94, 111, 137, 0.26)" } },
    },
    series: [
      {
        name: "Cấp xã",
        type: "line",
        data: [1120, 1062, 1098, 1124, 1154, 1190],
        smooth: true,
        symbolSize: 9,
        lineStyle: { width: 4 },
      },
      {
        name: "Cấp tỉnh",
        type: "line",
        data: [668, 610, 615, 648, 672, 724],
        smooth: true,
        symbolSize: 8,
        lineStyle: { width: 3 },
      },
    ],
  }), []);

  return <EChart className="planning-line-chart" option={option} ariaLabel="Tổng số cơ sở nhà đất" />;
}

function PlanningBacklogChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 850,
    color: ["#ff4f55"],
    grid: { left: 54, right: 28, top: 76, bottom: 46 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(9, 15, 28, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: planningWeeklyLabels,
      boundaryGap: false,
      axisLabel: {
        color: (value: string) => value === "Tuần 32" ? "#ffffff" : "rgba(153, 169, 194, 0.82)",
        fontSize: 12,
        fontWeight: (value: string) => value === "Tuần 32" ? 800 : 500,
      },
      axisLine: { lineStyle: { color: "rgba(94, 111, 137, 0.36)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 90,
      interval: 40,
      axisLabel: { color: "rgba(153, 169, 194, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(94, 111, 137, 0.26)" } },
    },
    series: [
      {
        name: "Cơ sở cần xử lý",
        type: "line",
        data: [41, 45, 53, 61, 69, 85],
        smooth: true,
        symbolSize: 9,
        lineStyle: { width: 4 },
        areaStyle: { color: "rgba(255, 79, 85, 0.20)" },
      },
    ],
  }), []);

  return <EChart className="planning-line-chart" option={option} ariaLabel="Số nhà đất dôi dư cần tiếp tục xử lý" />;
}

function PlanningMetricStack() {
  return (
    <div className="planning-metric-stack">
      <div>
        <strong>12.500</strong>
      </div>
      <div>
        <b>2.45</b>
        <span>căn (Tổng số)</span>
      </div>
      <div>
        <b>0</b>
        <span>căn (Hoàn thành)</span>
      </div>
    </div>
  );
}

function PlanningPublicAssetsDashboard() {
  return (
    <section className="planning-dashboard" aria-label="Quy hoạch, xây dựng, tài sản công">
      <div className="planning-grid">
        <article className="planning-panel planning-gauge-panel">
          <h3>Tỷ lệ phủ kín quy hoạch chung</h3>
          <PlanningPeriodSelect />
          <PlanningGauge label="PHỦ KÍN QUY HOẠCH CHUNG" value={75} />
        </article>

        <article className="planning-panel planning-housing-panel">
          <h3>Nhà ở xã hội (Tổng số, trong năm, hoàn thành chỉ tiêu)</h3>
          <PlanningPeriodSelect />
          <PlanningMetricStack />
          <PlanningGauge label="CHỈ TIÊU TRUNG ƯƠNG GIAO" value={85.4} />
        </article>

        <article className="planning-panel planning-assets-panel">
          <h3>Tổng số cơ sở nhà đất (cấp tỉnh, cấp xã)</h3>
          <span className="planning-unit">Đơn vị: Cơ sở - Trục X: Tuần</span>
          <PlanningPeriodSelect compact defaultValue="week-1" />
          <div className="planning-asset-summary">
            <div>
              <span>Cấp tỉnh:</span>
              <strong>720</strong>
              <small>Cơ sở</small>
            </div>
            <div>
              <span>Cấp xã:</span>
              <strong>1.120</strong>
              <small>Cơ sở</small>
            </div>
          </div>
          <PlanningAssetLineChart />
        </article>

        <article className="planning-panel planning-backlog-panel">
          <h3>Số nhà, đất dôi dư cần tiếp tục xử lý</h3>
          <div className="planning-backlog-summary">
            <strong>85</strong>
            <span>Cơ sở</span>
            <small>Đơn vị: Cơ sở</small>
          </div>
          <PlanningPeriodSelect compact defaultValue="week-1" />
          <PlanningBacklogChart />
        </article>
      </div>
    </section>
  );
}

function ResolutionPeriodSelect() {
  return (
    <label className="resolution-period-select">
      <span>Kỳ báo cáo</span>
      <select defaultValue="month-1" aria-label="Kỳ báo cáo">
        <option value="month-1">Tháng 1/2026</option>
        <option value="month-2">Tháng 2/2026</option>
        <option value="quarter-1">Quý I/2026</option>
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

function ResolutionTasksDashboard() {
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

function ExpenseMonthlyBarChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: ["#7767d6", "#d47a74"],
    grid: { left: 48, right: 24, top: 36, bottom: 58 },
    legend: {
      bottom: 4,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
      axisLabel: { color: "rgba(245, 248, 252, 0.64)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.46)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 50,
      name: "Tỷ đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.68)", padding: [0, 36, 8, 0], fontStyle: "italic" },
      axisLabel: { color: "rgba(245, 248, 252, 0.64)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.14)" } },
    },
    series: [
      {
        name: "Chi đầu tư phát triển",
        type: "bar",
        barWidth: 46,
        data: [90, 50, 79, 68],
      },
      {
        name: "Chi thường xuyên",
        type: "bar",
        barWidth: 46,
        data: [65, 88, 51, 89],
      },
    ],
  }), []);

  return <EChart className="expense-monthly-chart" option={option} ariaLabel="Chi ngân sách địa phương hằng tháng" />;
}

function ExpensePeriodSelect({ label = "Kỳ báo cáo" }: { label?: string }) {
  return (
    <label className="expense-period-select">
      <span>{label}</span>
      <select defaultValue="quarter">
        <option value="quarter">Quý I/2026</option>
        <option value="month">Tháng 1/2026</option>
      </select>
    </label>
  );
}

function ExpenseBudgetCard({
  className = "",
  title,
  value,
  unit = "Tỷ đồng",
  trend = "7,2%",
  trendTone = "amber",
  progressTone = "warm",
}: {
  className?: string;
  title: string;
  value: string;
  unit?: string;
  trend?: string;
  trendTone?: "amber" | "green";
  progressTone?: "warm" | "cyan";
}) {
  return (
    <article className={`expense-ioc-panel expense-budget-card ${className}`}>
      <h3>{title}</h3>
      <ExpensePeriodSelect />
      <div className="expense-budget-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <div className="expense-progress-label">
        <span>So dự toán</span>
        <small>61.09%</small>
        <small>1,851</small>
      </div>
      <div className={`expense-progress-track ${progressTone}`}>
        <i />
      </div>
      <p className={`expense-trend ${trendTone}`}>
        <i aria-hidden="true" />
        <strong>{trend}</strong>
        <span>so với cùng kỳ năm trước</span>
      </p>
    </article>
  );
}

function OverviewMiniPanel({
  className = "",
  panel,
}: {
  className?: string;
  panel: OverviewSignalPanel;
}) {
  return (
    <article className={`overview-mini-panel ${className}`}>
      <div className="panel-title amber">
        <span className="service-icon" aria-hidden="true" />
        {panel.title}
      </div>
      {panel.items.slice(0, 2).map((item) => (
        <div className={`overview-mini-metric ${item.tone}`} key={item.label}>
          <h3>{item.label}</h3>
          <div>
            <strong>{item.value}</strong>
            <span>{item.unit}</span>
          </div>
          <p>12,6% so với cùng kỳ năm trước</p>
        </div>
      ))}
    </article>
  );
}

function OverviewMetricTile({
  className = "",
  item,
  title,
}: {
  className?: string;
  item: {
    label: string;
    value: string;
    unit: string;
    note?: string;
    tone?: "green" | "amber" | "white";
  };
  title: string;
}) {
  return (
    <article className={`overview-metric-tile ${className}`}>
      <div className="panel-title amber">
        <span className="service-icon" aria-hidden="true" />
        {title}
      </div>
      <div className={`panel-metric compact ${item.tone ?? ""}`}>
        <h2>{item.label}</h2>
        <div>
          <strong>{item.value}</strong>
          <span>{item.unit}</span>
        </div>
        <p>12,6% so với cùng kỳ năm trước</p>
      </div>
    </article>
  );
}

function ResolutionTable({ className = "" }: { className?: string }) {
  return (
    <article className={`overview-resolution-panel ${className}`}>
      <div className="panel-title cyan">
        <span className="investment-icon" aria-hidden="true" />
        Kết quả thực hiện nghị quyết trọng tâm
      </div>
      <div className="overview-resolution-table">
        <div className="overview-resolution-head">
          <span>Tên nghị quyết</span>
          <span>Ngày ban hành</span>
          <span>Trạng thái</span>
        </div>
        {overviewResolutionRows.map((row) => (
          <div className="overview-resolution-row" key={row.name}>
            <span>{row.name}</span>
            <span>{row.date}</span>
            <strong>{row.status}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}

function ProgramPanel({ className = "" }: { className?: string }) {
  return (
    <article className={`overview-program-panel ${className}`}>
      <div className="panel-title cyan">
        <span className="metric-icon" aria-hidden="true" />
        Chỉ tiêu theo nghị quyết đại hội Đảng bộ lần thứ XX
      </div>
      {overviewProgramRows.slice(0, 3).map((row) => (
        <div className="overview-program-metric" key={row.name}>
          <h3>{row.name}</h3>
          <div>
            <strong>{row.value}</strong>
            <span>{row.unit}</span>
          </div>
          <p>12,6% so với cùng kỳ năm trước</p>
        </div>
      ))}
    </article>
  );
}

function MapCanvas({ className = "", title }: { className?: string; title: string }) {
  return (
    <article className={`map-panel ${className}`}>
      <div className="panel-title green">
        <span className="pin-icon" aria-hidden="true" />
        {title}
      </div>
      <div className="map-canvas" role="img" aria-label="Bản đồ tỉnh Hà Tĩnh">
        <div className="province-outline" />
        <div className="map-legend">
          <span className="legend high">Trên 3.000</span>
          <span className="legend mid">2.000 - 3.000</span>
          <span className="legend low">1.000 - 2.000</span>
          <span className="legend base">Dưới 1.000</span>
        </div>
        <div className="zoom-control" aria-hidden="true">
          <span>+</span>
          <span>-</span>
        </div>
        {mapLabels.map((label, index) => (
          <span className={`map-label label-${index + 1}`} key={label}>
            {label}
          </span>
        ))}
      </div>
    </article>
  );
}

function OverviewDashboard() {
  return (
    <>
      <section className="ioc-band" aria-label="Chỉ tiêu kinh tế xã hội">
        <div className="band-title">
          <span className="metric-icon" aria-hidden="true" />
          Chỉ tiêu kinh tế xã hội
        </div>
        <div className="ioc-kpi-grid">
          {overviewKpis.map((item) => (
            <article className="ioc-kpi" key={item.label}>
              <h2>{item.label}</h2>
              <div className="ioc-kpi-value">
                <strong>{item.value}</strong>
                <span>{item.unit}</span>
              </div>
              <p>{item.trend}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="overview-dashboard-grid" aria-label="Tổng quan điều hành">
        <MapCanvas className="overview-area-map" title="Bản đồ GIS tổng hợp Hà Tĩnh" />
        <OverviewMetricTile className="overview-area-revenue" item={overviewPanels[0].metrics[0]} title="Thu ngân sách" />
        <OverviewMetricTile className="overview-area-expense" item={overviewPanels[0].metrics[1]} title="Chi ngân sách" />
        <OverviewMetricTile className="overview-area-admin-online" item={overviewPanels[1].metrics[0]} title="Cải cách hành chính" />
        <OverviewMetricTile className="overview-area-admin-deadline" item={overviewPanels[1].metrics[1]} title="Cải cách hành chính" />
        <OverviewMetricTile className="overview-area-invest-projects" item={overviewPanels[2].metrics[0]} title="Đầu tư công" />
        <OverviewMetricTile className="overview-area-invest-capital" item={overviewPanels[2].metrics[1]} title="Đầu tư công" />
        <ResolutionTable className="overview-area-resolution" />
        <ProgramPanel className="overview-area-program" />
        <OverviewMiniPanel className="overview-area-trade" panel={overviewSignalPanels[0]} />
        <OverviewMiniPanel className="overview-area-industry" panel={overviewSignalPanels[1]} />
        <OverviewMiniPanel className="overview-area-enterprise" panel={overviewSignalPanels[2]} />
        <article className="overview-chart-panel overview-area-pie">
          <div className="panel-title amber">
            <span className="coin-icon" aria-hidden="true" />
            Cơ cấu chi tiết doanh nghiệp
          </div>
          <PieChartBlock
            items={[
              { label: "Doanh nghiệp hoạt động trở lại", value: 41, tone: "#16d196" },
              { label: "Doanh nghiệp đăng ký tạm ngừng", value: 18, tone: "#f4b45e" },
              { label: "Doanh nghiệp mới báo cáo thuế", value: 15, tone: "#63c7ff" },
              { label: "Thành lập mới", value: 26, tone: "#ff8a65" },
            ]}
          />
        </article>
        <OverviewMiniPanel className="overview-area-agriculture" panel={overviewSignalPanels[3]} />
        <OverviewMiniPanel className="overview-area-health" panel={overviewSignalPanels[4]} />
        <OverviewMiniPanel className="overview-area-education" panel={overviewSignalPanels[5]} />
        <article className="overview-chart-panel wide overview-area-trend">
          <div className="panel-title amber">
            <span className="metric-icon" aria-hidden="true" />
            Xu hướng dữ liệu 6 tháng gần nhất
          </div>
          <MiniLineChart />
        </article>
        <article className="overview-gauge-panel overview-area-gauge">
          <div className="panel-title amber">
            <span className="investment-icon" aria-hidden="true" />
            Quy hoạch, xây dựng, tài sản công
          </div>
          <div className="overview-gauge">
            <strong>85,4%</strong>
            <span>Mức tiêu thực hiện</span>
          </div>
          <div className="overview-mini-metric white">
            <h3>Tổng số cơ sở nhà đất</h3>
            <div>
              <strong>126</strong>
              <span>Cơ sở</span>
            </div>
          </div>
        </article>
        <OverviewMiniPanel className="overview-area-documents" panel={overviewExtraPanels[0]} />
        <OverviewMiniPanel className="overview-area-projects" panel={overviewExtraPanels[1]} />
        <OverviewMiniPanel className="overview-area-land" panel={overviewExtraPanels[2]} />
        <OverviewMiniPanel className="overview-area-assets" panel={overviewExtraPanels[3]} />
        <OverviewMiniPanel className="overview-area-overdue" panel={overviewExtraPanels[4]} />
      </section>
    </>
  );
}

function DetailDashboard({ data }: { data: DetailData }) {
  return (
    <section className="detail-dashboard" aria-label={data.title}>
      <div className="detail-heading">
        <div>
          <p>Chi tiết nhóm chỉ tiêu</p>
          <h2>{data.title}</h2>
        </div>
        <span>{data.subtitle}</span>
      </div>

      <div className="detail-kpi-grid">
        {data.kpis.map((item) => (
          <article className={`detail-kpi ${item.tone ?? "green"}`} key={item.label}>
            <h3>{item.label}</h3>
            <div>
              <strong>{item.value}</strong>
              <span>{item.unit}</span>
            </div>
            <p>{item.trend}</p>
          </article>
        ))}
      </div>

      <div className="detail-layout">
        <article className="detail-panel detail-chart-panel">
          <div className="panel-title amber">
            <span className="metric-icon" aria-hidden="true" />
            {data.primaryChart}
          </div>
          <MiniLineChart series={data.highlights.map((item) => Number.parseFloat(item.value.replace(",", ".")) || 32)} />
          <div className="detail-accordion">
            {data.highlights.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value} {item.unit}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-panel">
          <div className="panel-title amber">
            <span className="coin-icon" aria-hidden="true" />
            Cơ cấu chỉ tiêu
          </div>
          <PieChartBlock items={data.pie} />
        </article>

        <article className="detail-panel detail-highlight-panel">
          <div className="panel-title amber">
            <span className="investment-icon" aria-hidden="true" />
            Chỉ số nổi bật
          </div>
          {data.highlights.map((item) => (
            <div className={`panel-metric large ${item.tone ?? "green"}`} key={item.label}>
              <h2>{item.label}</h2>
              <div>
                <strong>{item.value}</strong>
                <span>{item.unit}</span>
              </div>
              <p>{item.trend}</p>
            </div>
          ))}
        </article>

        <article className="detail-panel detail-bars-panel">
          <div className="panel-title amber">
            <span className="service-icon" aria-hidden="true" />
            Top địa bàn theo tiến độ
          </div>
          <div className="bar-list">
            {data.bars.map((item) => (
              <div className="bar-row" key={item.label}>
                <span>{item.label}</span>
                <div>
                  <i className={item.tone} style={{ width: `${item.value}%` }} />
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="detail-panel detail-table-panel">
          <div className="panel-title amber">
            <span className="investment-icon" aria-hidden="true" />
            Nhiệm vụ thực hiện các nghị quyết trọng tâm
          </div>
          <div className="detail-table">
            <div className="detail-table-head">
              <span>Tên nhiệm vụ</span>
              <span>Ngày ban hành</span>
              <span>Trạng thái</span>
            </div>
            {data.table.map((row) => (
              <div className="detail-table-row" key={`${row.name}-${row.date}`}>
                <span>{row.name}</span>
                <span>{row.date}</span>
                <strong>{row.status}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

const socioEconomic57Summary = [
  { label: "Tổng số chỉ tiêu", value: "57", unit: "Chỉ tiêu", tone: "white" },
  { label: "Hoàn thành / đạt tiến độ", value: "35", unit: "Chỉ tiêu", tone: "green" },
  { label: "Đang theo dõi", value: "17", unit: "Chỉ tiêu", tone: "cyan" },
  { label: "Cần đôn đốc", value: "5", unit: "Chỉ tiêu", tone: "amber" },
] as const;

const socioEconomic57Groups = [
  { label: "Kinh tế", total: 18, done: 11, watch: 5, risk: 2 },
  { label: "Ngân sách - đầu tư", total: 9, done: 6, watch: 2, risk: 1 },
  { label: "Văn hóa - xã hội", total: 12, done: 8, watch: 3, risk: 1 },
  { label: "Môi trường - đô thị", total: 8, done: 4, watch: 3, risk: 1 },
  { label: "Cải cách - chuyển đổi số", total: 10, done: 6, watch: 4, risk: 0 },
] as const;

const socioEconomic57PriorityRows = [
  { name: "Tốc độ tăng trưởng GRDP", group: "Kinh tế", value: "8,78%", target: ">= 8,5%", status: "Đạt" },
  { name: "Thu ngân sách nhà nước trên địa bàn", group: "Ngân sách", value: "15.212 tỷ", target: ">= 17.500 tỷ", status: "Theo dõi" },
  { name: "Giải ngân vốn đầu tư công", group: "Đầu tư", value: "61,2%", target: ">= 95%", status: "Đôn đốc" },
  { name: "Tỷ lệ bao phủ bảo hiểm y tế", group: "Xã hội", value: "99,43%", target: ">= 95%", status: "Đạt" },
  { name: "Tỷ lệ che phủ rừng", group: "Môi trường", value: "34,24%", target: ">= 55%", status: "Đôn đốc" },
] as const;

const socioEconomic57MonthlyProgress = [58, 63, 67, 72, 78, 82.6];

function SocioEconomic57BarChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#16d196", "#63c7ff", "#f4b45e"],
    grid: { left: 46, right: 20, top: 44, bottom: 34 },
    legend: {
      top: 8,
      right: 12,
      icon: "rect",
      itemHeight: 9,
      itemWidth: 9,
      textStyle: { color: "rgba(245, 248, 252, 0.78)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: socioEconomic57Groups.map((item) => item.label),
      axisLabel: { color: "rgba(172, 188, 211, 0.86)", fontSize: 11, interval: 0 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 20,
      interval: 5,
      axisLabel: { color: "rgba(172, 188, 211, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(112, 132, 162, 0.24)" } },
    },
    series: [
      { name: "Đạt", type: "bar", stack: "total", barWidth: 24, data: socioEconomic57Groups.map((item) => item.done) },
      { name: "Theo dõi", type: "bar", stack: "total", barWidth: 24, data: socioEconomic57Groups.map((item) => item.watch) },
      { name: "Đôn đốc", type: "bar", stack: "total", barWidth: 24, data: socioEconomic57Groups.map((item) => item.risk) },
    ],
  }), []);

  return <EChart className="socio57-bar-chart" option={option} ariaLabel="Cơ cấu 57 chỉ tiêu theo nhóm" />;
}

function SocioEconomic57Dashboard() {
  return (
    <section className="socio57-dashboard" aria-label="Bộ 57 chỉ tiêu phát triển kinh tế xã hội">
      <div className="socio57-heading">
        <div>
          <p>Bộ chỉ tiêu KTXH 2025-2030</p>
          <h2>Bộ 57 chỉ tiêu phát triển kinh tế - xã hội giai đoạn 2025-2030</h2>
        </div>
        <span>Tổng hợp tiến độ thực hiện theo nhóm lĩnh vực, trạng thái đạt mục tiêu và các chỉ tiêu cần đôn đốc trong kỳ báo cáo.</span>
      </div>

      <div className="socio57-kpi-grid">
        {socioEconomic57Summary.map((item) => (
          <article className={`socio57-kpi ${item.tone}`} key={item.label}>
            <h3>{item.label}</h3>
            <div>
              <strong>{item.value}</strong>
              <span>{item.unit}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="socio57-grid">
        <article className="socio57-panel socio57-chart-panel">
          <div className="panel-title amber">
            <span className="metric-icon" aria-hidden="true" />
            Cơ cấu chỉ tiêu theo nhóm lĩnh vực
          </div>
          <SocioEconomic57BarChart />
        </article>

        <article className="socio57-panel socio57-progress-panel">
          <div className="panel-title cyan">
            <span className="investment-icon" aria-hidden="true" />
            Tỷ lệ hoàn thành bình quân
          </div>
          <div className="socio57-progress-value">
            <strong>82,6</strong>
            <span>%</span>
          </div>
          <MiniLineChart series={socioEconomic57MonthlyProgress} />
        </article>

        <article className="socio57-panel socio57-matrix-panel">
          <div className="panel-title amber">
            <span className="service-icon" aria-hidden="true" />
            Ma trận 57 chỉ tiêu
          </div>
          <div className="socio57-group-list">
            {socioEconomic57Groups.map((item) => (
              <div className="socio57-group-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.done}/{item.total}</strong>
                <i>
                  <b className="green" style={{ width: `${(item.done / item.total) * 100}%` }} />
                  <b className="cyan" style={{ width: `${(item.watch / item.total) * 100}%` }} />
                  <b className="amber" style={{ width: `${(item.risk / item.total) * 100}%` }} />
                </i>
              </div>
            ))}
          </div>
        </article>

        <article className="socio57-panel socio57-table-panel">
          <div className="panel-title amber">
            <span className="coin-icon" aria-hidden="true" />
            Chỉ tiêu trọng tâm trong kỳ
          </div>
          <div className="socio57-table">
            <div className="socio57-table-head">
              <span>Chỉ tiêu</span>
              <span>Nhóm</span>
              <span>Thực hiện</span>
              <span>Mục tiêu</span>
              <span>Trạng thái</span>
            </div>
            {socioEconomic57PriorityRows.map((row) => (
              <div className="socio57-table-row" key={row.name}>
                <span>{row.name}</span>
                <span>{row.group}</span>
                <strong>{row.value}</strong>
                <span>{row.target}</span>
                <em>{row.status}</em>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

const adminLaborStaffBars = [
  { label: "Tuyển mới", values: [25, 0, 0, 0] },
  { label: "Nghỉ hưu", values: [0, 4, 0, 0] },
  { label: "Thôi việc", values: [0, 0, 37, 0] },
  { label: "Chuyển đi", values: [0, 0, 0, 3] },
] as const;

const adminProcedureBars = [
  { label: "Tỷ lệ hồ sơ giải quyết đúng hạn (98.5%)", value: 98.5, tone: "green" },
  { label: "Tỷ lệ người dân dùng dịch vụ công trực tuyến (76.2%)", value: 76.2, tone: "cyan" },
  { label: "Tỷ lệ thanh toán trực tuyến trên Cổng DVCQG (64.8%)", value: 64.8, tone: "purple" },
  { label: "Dịch vụ công trực tuyến toàn trình (82.0%)", value: 82, tone: "amber" },
] as const;

const adminLaborRows = [
  { label: "Tỷ lệ lao động đã qua đào tạo", value: "78.5%", progress: 78.5, tone: "green" },
  { label: "Số phiên giao dịch việc làm tổ chức", value: "24 Phiên", progress: 46, tone: "cyan" },
  { label: "Thông tin tuyển dụng lao động", value: "1,420 Tin bài", progress: 28, tone: "amber" },
  { label: "Nhu cầu tuyển dụng lao động", value: "1,420 nhu cầu", progress: 28, tone: "purple" },
  { label: "Số lượt lao động tư vấn, giới thiệu việc làm", value: "1,420 Lượt", progress: 28, tone: "red" },
] as const;

function AdminPeriodSelect({
  defaultValue = "quarter-1",
  options = [
    ["quarter-1", "Quý I/2026"],
    ["quarter-2", "Quý II/2026"],
  ],
}: {
  defaultValue?: string;
  options?: Array<[string, string]>;
}) {
  return (
    <label className="admin-period-select">
      <span>Kỳ báo cáo</span>
      <select defaultValue={defaultValue} aria-label="Kỳ báo cáo">
        {options.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </label>
  );
}

function AdminStaffChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: ["#16b77d", "#4b8ee8", "#f4a53b", "#bfc8d5"],
    grid: { left: 48, right: 30, top: 24, bottom: 34 },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: adminLaborStaffBars.map((item) => item.label),
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.42)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 40,
      interval: 10,
      name: "Cán bộ",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.72)", fontStyle: "italic", align: "left" },
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)", type: "dotted" } },
    },
    series: [0, 1, 2, 3].map((index) => ({
      name: ["Tuyển mới", "Nghỉ hưu", "Thôi việc", "Chuyển đi"][index],
      type: "bar",
      stack: "staff",
      barWidth: 24,
      data: adminLaborStaffBars.map((item) => item.values[index]),
    })),
  }), []);

  return <EChart className="admin-staff-chart" option={option} ariaLabel="Biến động nhân sự" />;
}

function AdminProgressRow({
  label,
  value,
  progress,
  tone,
}: {
  label: string;
  value: string;
  progress: number;
  tone: "green" | "cyan" | "amber" | "purple" | "red";
}) {
  return (
    <div className={`admin-progress-row ${tone}`}>
      <div>
        <span>{label}</span>
        {value ? <strong>{value}</strong> : null}
      </div>
      <i>
        <b style={{ width: `${progress}%` }} />
      </i>
    </div>
  );
}

function AdminLaborDonutChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: ["#6ed698", "#ff817a"],
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["64%", "86%"],
        center: ["50%", "50%"],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { name: "Giới thiệu việc làm cho dự án, doanh nghiệp", value: 522 },
          { name: "Trở về quê làm việc", value: 200 },
        ],
      },
    ],
  }), []);

  return (
    <div className="admin-labor-donut">
      <EChart className="admin-labor-donut-chart" option={option} ariaLabel="Số lao động được giải quyết việc làm" />
      <div className="admin-labor-donut-center">
        <strong>722</strong>
        <span>Lao động</span>
      </div>
    </div>
  );
}

function InternalAdminLaborDashboard() {
  return (
    <section className="admin-labor-dashboard" aria-label="Nhóm nội vụ, cải cách hành chính, lao động">
      <div className="admin-labor-grid">
        <article className="admin-panel admin-staff-panel">
          <div className="admin-panel-title">Công chức, viên chức</div>
          <AdminPeriodSelect />
          <div className="admin-staff-value">
            <h3>Số biên chế hưởng lương NSNN</h3>
            <div>
              <strong>2,700</strong>
              <span>Biên chế</span>
            </div>
          </div>
          <div className="admin-quota">
            <h3>Tình hình thực hiện biên chế</h3>
            <p><strong>2,520 / 2,450</strong><span>thực hiện/được giao</span></p>
            <i><b /></i>
            <small>Đạt 97.2% chỉ tiêu biên chế giao</small>
          </div>
          <div className="admin-chart-heading">
            <h3>Biến động nhân sự</h3>
          </div>
          <AdminStaffChart />
        </article>

        <article className="admin-panel admin-procedure-panel">
          <div className="admin-panel-title">Giải quyết thủ tục hành chính</div>
          <AdminPeriodSelect
            defaultValue="day-month"
            options={[
              ["day-month", "Ngày/Tháng/2026"],
              ["quarter-1", "Quý I/2026"],
            ]}
          />
          <div className="admin-procedure-total">
            <h3>Tổng số hồ sơ TTHC được tiếp nhận ở 02 cấp chính quyền</h3>
            <div>
              <strong>200</strong>
              <span>Hồ sơ <small>(lũy kế hằng ngày)</small></span>
            </div>
          </div>
          <div className="admin-progress-block">
            <h3>Các chỉ số cải cách thủ tục hành chính</h3>
            {adminProcedureBars.map((item) => (
              <AdminProgressRow
                key={item.label}
                label={item.label}
                progress={item.value}
                tone={item.tone}
                value=""
              />
            ))}
          </div>
        </article>

        <article className="admin-panel admin-overdue-panel">
          <div className="admin-panel-title">Số lượng văn bản quá hạn</div>
          <AdminPeriodSelect
            defaultValue="week-1"
            options={[
              ["week-1", "Tuần 1 (27/07/2026-01/08/2026)"],
              ["week-2", "Tuần 2 (03/08/2026-08/08/2026)"],
            ]}
          />
          <div className="admin-overdue-value">
            <strong>234</strong>
            <span>Văn bản quá hạn trong tuần</span>
          </div>
          <p className="admin-overdue-trend"><i aria-hidden="true" /> <strong>12,6%</strong> so với tuần trước</p>
        </article>

        <article className="admin-panel admin-labor-panel">
          <div className="admin-panel-title">Lao động, việc làm</div>
          <AdminPeriodSelect />
          <div className="admin-labor-content">
            <div className="admin-labor-training">
              <h3>Chất lượng Nguồn nhân lực & Đào tạo</h3>
              {adminLaborRows.map((item) => (
                <AdminProgressRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  progress={item.progress}
                  tone={item.tone}
                />
              ))}
            </div>
            <div className="admin-labor-donut-panel">
              <h3>Số lao động được giải quyết việc làm</h3>
              <AdminLaborDonutChart />
              <div className="admin-labor-legend">
                <span><i className="green" />Số lao động được giới thiệu việc làm cho các dự án, doanh nghiệp trên địa bàn tỉnh: 522 người (66%)</span>
                <span><i className="red" />Lao động trở về quê làm việc: 200 người (34%)</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

const educationMonths = ["T1/2026", "T2/2026", "T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];

const educationGradeRows = [
  { label: "Mầm non", value: "124", unit: "Trường", percent: 76, tone: "green" },
  { label: "Tiểu học", value: "166", unit: "Trường", percent: 82, tone: "cyan" },
  { label: "THCS", value: "148", unit: "Trường", percent: 79, tone: "amber" },
  { label: "THPT", value: "43", unit: "Trường", percent: 68, tone: "red" },
] as const;

const educationQualityRows = [
  { label: "Tỷ lệ học sinh hoàn thành chương trình tiểu học", value: "98,2", unit: "%", progress: 98.2, tone: "green" },
  { label: "Tỷ lệ tốt nghiệp THPT", value: "97,6", unit: "%", progress: 97.6, tone: "cyan" },
  { label: "Học sinh đạt giải cấp tỉnh, quốc gia", value: "1.268", unit: "HS", progress: 72, tone: "amber" },
  { label: "Trường có lớp học thông minh", value: "156", unit: "Cơ sở", progress: 88, tone: "purple" },
] as const;

function EducationPeriodSelect({
  defaultValue = "month-8-2026",
  options = [
    ["month-8-2026", "Tháng 8/2026"],
    ["quarter-3-2026", "Quý III/2026"],
    ["school-year-2026", "Năm học 2026-2027"],
  ],
}: {
  defaultValue?: string;
  options?: Array<[string, string]>;
}) {
  return (
    <label className="education-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={defaultValue} aria-label="Kỳ báo cáo">
        {options.map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </label>
  );
}

function EducationEnrollmentChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#347df7", "#57d79d"],
    grid: { left: 46, right: 20, top: 40, bottom: 34 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    legend: {
      top: 6,
      right: 12,
      icon: "circle",
      itemHeight: 8,
      itemWidth: 8,
      textStyle: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: educationMonths,
      axisLabel: { color: "#7f93b5", fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(126, 145, 174, 0.32)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 220,
      interval: 55,
      name: "Nghìn học sinh",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.58)", fontSize: 10, align: "left" },
      axisLabel: { color: "#7f93b5", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(126, 145, 174, 0.2)" } },
    },
    series: [
      {
        name: "Học sinh",
        type: "bar",
        barWidth: 22,
        data: [184, 188, 192, 191, 197, 201, 205, 208],
        itemStyle: { borderRadius: [4, 4, 1, 1] },
      },
      {
        name: "Huy động đúng độ tuổi",
        type: "line",
        smooth: true,
        symbolSize: 7,
        data: [162, 166, 170, 171, 176, 182, 187, 193],
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(87, 215, 157, 0.14)" },
      },
    ],
  }), []);

  return <EChart className="education-enrollment-chart" option={option} ariaLabel="Quy mô học sinh và huy động đúng độ tuổi" />;
}

function EducationStandardChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#57d79d", "#ffc957"],
    grid: { left: 42, right: 18, top: 30, bottom: 30 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["2021", "2022", "2023", "2024", "2025", "2026"],
      axisLabel: { color: "#7f93b5", fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(126, 145, 174, 0.32)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 260,
      interval: 65,
      axisLabel: { color: "#7f93b5", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(126, 145, 174, 0.2)" } },
    },
    series: [
      {
        name: "Trường đạt chuẩn",
        type: "line",
        smooth: true,
        symbolSize: 8,
        data: [186, 193, 201, 207, 211, 214],
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(87, 215, 157, 0.18)" },
      },
      {
        name: "Mục tiêu",
        type: "line",
        smooth: true,
        symbolSize: 0,
        data: [200, 204, 208, 214, 226, 232],
        lineStyle: { width: 2, type: "dashed" },
      },
    ],
  }), []);

  return <EChart className="education-standard-chart" option={option} ariaLabel="Trường đạt chuẩn quốc gia" />;
}

function EducationGauge({ label, target, value }: { label: string; target: string; value: number }) {
  return (
    <div className="education-gauge">
      <div className="education-gauge-ring" style={{ "--value": `${value}%` } as CSSProperties}>
        <strong>{value}%</strong>
      </div>
      <span>{label}</span>
      <small>Mục tiêu: {target}</small>
    </div>
  );
}

function EducationDashboard() {
  return (
    <section className="education-dashboard" aria-label="Nhóm giáo dục">
      <div className="education-grid">
        <article className="education-panel education-standard-panel">
          <div className="education-panel-title">Trường đạt chuẩn quốc gia</div>
          <EducationPeriodSelect defaultValue="school-year-2026" />
          <div className="education-hero-value">
            <strong>214</strong>
            <span>Trường</span>
          </div>
          <p className="education-trend green">+3,8% so với cùng kỳ năm trước</p>
          <EducationStandardChart />
        </article>

        <article className="education-panel education-enrollment-panel">
          <div className="education-panel-title">Quy mô học sinh và huy động đến lớp</div>
          <EducationPeriodSelect />
          <EducationEnrollmentChart />
        </article>

        <article className="education-panel education-digital-panel">
          <div className="education-panel-title">Chuyển đổi số giáo dục</div>
          <EducationPeriodSelect />
          <div className="education-digital-value">
            <strong>156</strong>
            <span>Cơ sở giáo dục được số hóa</span>
          </div>
          <EducationGauge label="Hồ sơ học sinh điện tử" target="95%" value={88} />
        </article>

        <article className="education-panel education-grade-panel">
          <div className="education-panel-title">Cơ cấu cơ sở giáo dục theo cấp học</div>
          {educationGradeRows.map((row) => (
            <div className={`education-grade-row ${row.tone}`} key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
              <em>{row.unit}</em>
              <i><b style={{ width: `${row.percent}%` }} /></i>
            </div>
          ))}
        </article>

        <article className="education-panel education-teacher-panel">
          <div className="education-panel-title">Đội ngũ giáo viên</div>
          <EducationPeriodSelect defaultValue="school-year-2026" />
          <div className="education-split-kpis">
            <div>
              <h3>Giáo viên đạt chuẩn</h3>
              <strong>96,4</strong>
              <span>%</span>
            </div>
            <div>
              <h3>Biên chế giáo viên hiện có</h3>
              <strong>12.840</strong>
              <span>Người</span>
            </div>
          </div>
        </article>

        <article className="education-panel education-quality-panel">
          <div className="education-panel-title">Chất lượng giáo dục</div>
          <EducationPeriodSelect />
          <div className="education-quality-list">
            {educationQualityRows.map((row) => (
              <div className={`education-quality-row ${row.tone}`} key={row.label}>
                <div>
                  <span>{row.label}</span>
                  <strong>{row.value} <small>{row.unit}</small></strong>
                </div>
                <i><b style={{ width: `${row.progress}%` }} /></i>
              </div>
            ))}
          </div>
        </article>

        <article className="education-panel education-gauge-panel">
          <div className="education-panel-title">Mục tiêu năm học</div>
          <div className="education-gauge-pair">
            <EducationGauge label="Huy động trẻ 3-5 tuổi đến lớp" target="99%" value={97} />
            <EducationGauge label="Trường học an toàn, xanh sạch đẹp" target="95%" value={91} />
          </div>
        </article>
      </div>
    </section>
  );
}

function IndustrialPeriodSelect() {
  return (
    <label className="industrial-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue="month-1-2026" aria-label="Kỳ báo cáo">
        <option value="month-1-2026">Tháng 1/2026</option>
        <option value="month-2-2026">Tháng 2/2026</option>
        <option value="quarter-1-2026">Quý 1/2026</option>
      </select>
    </label>
  );
}

function formatIndustrialAxis(value: number) {
  return Number.isInteger(value) ? `${value}` : `${value}`.replace(".", ",");
}

function IndustrialProductChart({ item }: { item: IndustrialChartConfig }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: item.series.map((serie) => serie.color),
    grid: {
      left: 64,
      right: 28,
      top: 56,
      bottom: item.series.length > 1 ? 58 : 34,
    },
    legend: {
      show: item.series.length > 1,
      bottom: 8,
      left: 64,
      icon: "rect",
      itemGap: 12,
      itemHeight: 9,
      itemWidth: 9,
      textStyle: { color: "rgba(143, 162, 189, 0.92)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: industrialMonths,
      axisLabel: { color: "#6f85a8", fontSize: 12, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: item.max,
      interval: item.interval,
      axisLabel: {
        color: "#6f85a8",
        fontSize: 12,
        formatter: formatIndustrialAxis,
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(102, 122, 154, 0.28)", width: 1 } },
    },
    series: item.series.map((serie) => ({
      name: serie.name,
      type: "bar",
      stack: item.series.length > 1 ? "total" : undefined,
      barWidth: "66%",
      data: serie.data,
      itemStyle: { borderRadius: item.series.length > 1 ? 0 : [4, 4, 2, 2] },
      emphasis: { focus: "series" },
    })),
  }), [item]);

  return (
    <article className="industrial-card">
      <div className="industrial-card-head">
        <div>
          <h2>{item.title}</h2>
          <p>Đơn vị: {item.unit}</p>
        </div>
        <IndustrialPeriodSelect />
      </div>
      <EChart
        ariaLabel={`Biểu đồ ${item.title}`}
        className="industrial-chart"
        option={option}
      />
    </article>
  );
}

function IndustrialProductsDashboard() {
  return (
    <section className="industrial-dashboard" aria-label="Nhóm sản phẩm công nghiệp">
      <div className="industrial-grid">
        {industrialCharts.map((item) => (
          <IndustrialProductChart item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}

function KeyProjectsPeriodSelect() {
  return (
    <label className="key-projects-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue="month-7-2026" aria-label="Kỳ báo cáo">
        <option value="month-7-2026">Tháng 7/2026</option>
        <option value="month-8-2026">Tháng 8/2026</option>
        <option value="quarter-3-2026">Quý III/2026</option>
      </select>
    </label>
  );
}

function KeyProjectsProgressChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#2f7df6"],
    grid: { left: 48, right: 22, top: 88, bottom: 42 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: keyProjectMonths,
      axisLabel: { color: "#6f85a8", fontSize: 10, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(112, 130, 158, 0.28)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 5000,
      interval: 1250,
      axisLabel: {
        color: "#6f85a8",
        fontSize: 10,
        formatter: (value: number) => (value === 0 ? "0" : `${(value / 1000).toFixed(3)}`),
      },
      splitLine: { lineStyle: { color: "rgba(112, 130, 158, 0.24)" } },
    },
    series: [
      {
        name: "Tiến độ triển khai",
        type: "line",
        data: [1600, 1780, 1980, 1810, 2020, 1840],
        smooth: true,
        symbolSize: 6,
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(47, 125, 246, 0.22)" },
      },
    ],
  }), []);

  return <EChart className="key-projects-progress-chart" option={option} ariaLabel="Tiến độ triển khai dự án trọng điểm" />;
}

function KeyProjectsDelayedChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#ff6259"],
    grid: { left: 82, right: 42, top: 72, bottom: 64 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: keyProjectMonths,
      axisLabel: { color: "#6f85a8", fontSize: 16, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(112, 130, 158, 0.26)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 500,
      interval: 125,
      axisLabel: { color: "#6f85a8", fontSize: 16, fontWeight: 700 },
      splitLine: { lineStyle: { color: "rgba(112, 130, 158, 0.26)" } },
    },
    series: [
      {
        name: "Dự án chậm tiến độ",
        type: "line",
        data: [210, 175, 150, 176, 198, 236],
        smooth: true,
        symbolSize: 12,
        lineStyle: { width: 4 },
        itemStyle: { borderColor: "#162235", borderWidth: 3 },
        areaStyle: { color: "rgba(255, 98, 89, 0.28)" },
      },
    ],
  }), []);

  return <EChart className="key-projects-delayed-chart" option={option} ariaLabel="Dự án chậm tiến độ theo tháng" />;
}

function KeyProjectsDashboard() {
  return (
    <section className="key-projects-dashboard" aria-label="Nhóm dự án trọng điểm">
      <div className="key-projects-grid">
        <article className="key-projects-panel key-projects-list-panel">
          <h2>Danh sách dự án trọng điểm</h2>
          <KeyProjectsPeriodSelect />
          <div className="key-projects-total">
            <strong>20</strong>
            <span>Dự án</span>
          </div>
          <div className="key-projects-table">
            <div className="key-projects-table-head">
              <span>Tên dự án</span>
              <span>Chủ đầu tư</span>
              <span>Vốn đăng ký</span>
              <span>% giải ngân</span>
              <span>Trạng thái</span>
            </div>
            {keyProjectRows.map((row) => (
              <div className="key-projects-table-row" key={row.name}>
                <span>{row.name}</span>
                <span>{row.investor}</span>
                <span>{row.capital}</span>
                <span>{row.disbursement}</span>
                <strong className={row.tone}>{row.status}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="key-projects-panel key-projects-progress-panel">
          <h2>Tiến độ triển khai</h2>
          <KeyProjectsPeriodSelect />
          <div className="key-projects-progress-value">
            <strong>1.803</strong>
            <span>Tỷ đồng</span>
          </div>
          <p className="key-projects-trend green">+7.1% <span>So với kỳ trước</span></p>
          <p className="key-projects-trend green">+8.3% <span>So với cùng kỳ năm trước</span></p>
          <small>Đơn vị: Tỷ đồng</small>
          <KeyProjectsProgressChart />
        </article>

        <article className="key-projects-panel key-projects-delayed-panel">
          <h2>Dự án chậm tiến độ</h2>
          <KeyProjectsPeriodSelect />
          <div className="key-projects-delayed-value">
            <strong>238</strong>
            <span>Dự án</span>
          </div>
          <small>Đơn vị: Dự án</small>
          <KeyProjectsDelayedChart />
        </article>
      </div>
    </section>
  );
}

function ReportPeriodSelect() {
  return (
    <label className="grdp-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue="q1-2026" aria-label="Kỳ báo cáo">
        <option value="q1-2026">Quý 1/2026</option>
        <option value="q2-2026">Quý 2/2026</option>
        <option value="q4-2025">Quý 4/2025</option>
      </select>
    </label>
  );
}

function GrdpTrendChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#eb747b", "#7659ff"],
    grid: { left: 42, right: 28, top: 22, bottom: 42 },
    legend: {
      bottom: 5,
      icon: "circle",
      itemHeight: 7,
      itemWidth: 7,
      textStyle: { color: "rgba(245, 248, 252, 0.76)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: grdpDesignQuarterLabels,
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.18)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      name: "%",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.76)", padding: [0, 0, 0, -28] },
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dashed" } },
    },
    series: [
      {
        name: "Công nghiệp",
        type: "line",
        data: [20, 40, 35, 80],
        smooth: true,
        symbolSize: 7,
        label: { show: true, color: "rgba(245, 248, 252, 0.7)", fontSize: 10 },
        lineStyle: { width: 2 },
      },
      {
        name: "Xây dựng",
        type: "line",
        data: [77, 88, 55, 89],
        smooth: true,
        symbolSize: 7,
        label: { show: true, color: "rgba(245, 248, 252, 0.7)", fontSize: 10 },
        lineStyle: { width: 2 },
      },
    ],
  }), []);

  return <EChart className="grdp-trend-chart" option={option} ariaLabel="Tốc độ tăng trưởng kinh tế GRDP" />;
}

function GrdpInvestmentChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#d99844"],
    grid: { left: 38, right: 22, top: 18, bottom: 24 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: grdpDesignQuarterLabels,
      axisLabel: { show: false },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      name: "Tỷ đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.7)", fontSize: 10, padding: [0, 0, 0, 14] },
      axisLabel: { color: "rgba(245, 248, 252, 0.58)", fontSize: 10 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dashed" } },
    },
    series: [
      {
        type: "line",
        data: [25, 42, 36, 55],
        smooth: true,
        symbolSize: 5,
        lineStyle: { width: 2 },
        areaStyle: { color: "rgba(217, 152, 68, 0.22)" },
      },
    ],
  }), []);

  return <EChart className="grdp-investment-chart" option={option} ariaLabel="Tổng vốn đầu tư thực hiện toàn xã hội" />;
}

function GrdpPieChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: grdpDesignPieItems.map((item) => item.tone),
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: "78%",
        center: ["50%", "52%"],
        label: {
          show: true,
          color: "#ffffff",
          fontSize: 11,
          formatter: "{b}\n{d}%",
        },
        labelLine: { show: false },
        data: grdpDesignPieItems.map((item) => ({
          name: item.label.replace(", xây dựng", ""),
          value: item.value,
        })),
      },
    ],
  }), []);

  return (
    <div className="grdp-pie-wrap">
      <EChart className="grdp-pie-chart" option={option} ariaLabel="Cơ cấu GRDP" />
      <div className="grdp-pie-legend">
        {grdpDesignPieItems.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.tone }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function GrdpValueBlock({
  children,
  className = "",
  label,
  trend = "12,6% so với cùng kỳ năm trước",
  unit,
  value,
}: {
  children?: ReactNode;
  className?: string;
  label: string;
  trend?: string;
  unit: string;
  value: string;
}) {
  return (
    <article className={`grdp-panel grdp-value-card ${className}`}>
      <div className="grdp-panel-title">
        <span>{label}</span>
      </div>
      <ReportPeriodSelect />
      <div className="grdp-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <p className="grdp-trend">▲ {trend}</p>
      {children}
    </article>
  );
}

function GrdpDashboard() {
  return (
    <section className="grdp-dashboard" aria-label="Nhóm chỉ số về GRDP">
      <div className="grdp-grid">
        <article className="grdp-panel grdp-growth-panel">
          <div className="grdp-panel-title">
            <span>Tốc độ tăng trưởng kinh tế (GRDP)</span>
          </div>
          <div className="grdp-accordion-row active">
            <span className="grdp-row-icon factory-icon" aria-hidden="true" />
            <strong>Khu vực công nghiệp, xây dựng</strong>
            <i>⌃</i>
          </div>
          <ReportPeriodSelect />
          <GrdpTrendChart />
          <div className="grdp-accordion-row">
            <span className="grdp-row-icon fish-icon" aria-hidden="true" />
            <span>Khu vực nông, lâm nghiệp và thủy sản</span>
            <i>⌄</i>
          </div>
          <div className="grdp-inline-value">
            <strong>43,62</strong>
            <span>%</span>
          </div>
          <p className="grdp-trend">▲ 12,6% so với cùng kỳ năm trước</p>
          <div className="grdp-accordion-row">
            <span className="grdp-row-icon service-round-icon" aria-hidden="true" />
            <span>Khu vực dịch vụ</span>
            <i>⌄</i>
          </div>
          <div className="grdp-inline-value">
            <strong>23,61</strong>
            <span>%</span>
          </div>
          <p className="grdp-trend">▲ 12,6% so với cùng kỳ năm trước</p>
          <div className="grdp-accordion-row muted">
            <span className="grdp-row-icon tax-icon" aria-hidden="true" />
            <span>Thuế sản phẩm trừ trợ cấp sản phẩm</span>
            <i>⌄</i>
          </div>
        </article>

        <div className="grdp-middle-column">
          <article className="grdp-panel grdp-structure-panel">
            <div className="grdp-panel-title">
              <span>Cơ cấu GRDP</span>
            </div>
            <ReportPeriodSelect />
            <GrdpPieChart />
          </article>

          <GrdpValueBlock
            className="grdp-industry-card"
            label="Tỷ trọng giá trị tăng thêm ngành công nghiệp chế biến, chế tạo trong GRDP"
            unit="%"
            value="24,62"
          />
        </div>

        <div className="grdp-side-column">
          <GrdpValueBlock label="GRDP bình quân đầu người" unit="%" value="8,78" />
          <GrdpValueBlock label="Thu nhập bình quân đầu người" unit="Triệu đồng/người/năm" value="60,14" />
          <GrdpValueBlock
            className="grdp-investment-card"
            label="Tổng vốn đầu tư thực hiện toàn xã hội"
            trend="11,9% so với cùng kỳ năm trước"
            unit="Tỷ đồng"
            value="2.931"
          >
            <GrdpInvestmentChart />
          </GrdpValueBlock>
        </div>
      </div>
    </section>
  );
}

function DesignReportPeriodSelect() {
  return (
    <label className="grdp-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue="q1-2026" aria-label="Kỳ báo cáo">
        <option value="q1-2026">Quý 1/2026</option>
        <option value="q2-2026">Quý 2/2026</option>
        <option value="q4-2025">Quý 4/2025</option>
      </select>
    </label>
  );
}

function GrdpDesignTrendChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#7659ff", "#eb747b"],
    grid: { left: 42, right: 28, top: 22, bottom: 42 },
    legend: {
      bottom: 5,
      icon: "circle",
      itemHeight: 7,
      itemWidth: 7,
      textStyle: { color: "rgba(245, 248, 252, 0.76)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: grdpDesignQuarterLabels,
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.18)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      name: "%",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.76)", padding: [0, 0, 0, -28] },
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dashed" } },
    },
    series: [
      {
        name: "Công nghiệp",
        type: "line",
        data: [20, 40, 35, 80],
        smooth: true,
        symbolSize: 7,
        label: { show: true, color: "rgba(245, 248, 252, 0.7)", fontSize: 10 },
        lineStyle: { width: 2 },
      },
      {
        name: "Xây dựng",
        type: "line",
        data: [77, 88, 55, 89],
        smooth: true,
        symbolSize: 7,
        label: { show: true, color: "rgba(245, 248, 252, 0.7)", fontSize: 10 },
        lineStyle: { width: 2 },
      },
    ],
  }), []);

  return <EChart className="grdp-trend-chart" option={option} ariaLabel="Tốc độ tăng trưởng kinh tế GRDP" />;
}

function GrdpDesignInvestmentChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#d99844"],
    grid: { left: 38, right: 22, top: 18, bottom: 24 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: grdpDesignQuarterLabels,
      axisLabel: { show: false },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      name: "Tỷ đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.7)", fontSize: 10, padding: [0, 0, 0, 14] },
      axisLabel: { color: "rgba(245, 248, 252, 0.58)", fontSize: 10 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.12)", type: "dashed" } },
    },
    series: [
      {
        type: "line",
        data: [25, 42, 36, 55],
        smooth: true,
        symbolSize: 5,
        lineStyle: { width: 2 },
        areaStyle: { color: "rgba(217, 152, 68, 0.22)" },
      },
    ],
  }), []);

  return <EChart className="grdp-investment-chart" option={option} ariaLabel="Tổng vốn đầu tư thực hiện toàn xã hội" />;
}

function GrdpDesignPieChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: grdpDesignPieItems.map((item) => item.tone),
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: "78%",
        center: ["50%", "52%"],
        label: {
          show: true,
          color: "#ffffff",
          fontSize: 11,
          formatter: "{b}\n{d}%",
        },
        labelLine: { show: false },
        data: grdpDesignPieItems.map((item) => ({
          name: item.label.replace(", xây dựng", ""),
          value: item.value,
        })),
      },
    ],
  }), []);

  return (
    <div className="grdp-pie-wrap">
      <EChart className="grdp-pie-chart" option={option} ariaLabel="Cơ cấu GRDP" />
      <div className="grdp-pie-legend">
        {grdpDesignPieItems.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.tone }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function GrdpDesignValueBlock({
  children,
  className = "",
  label,
  trend = "12,6% so với cùng kỳ năm trước",
  unit,
  value,
}: {
  children?: ReactNode;
  className?: string;
  label: string;
  trend?: string;
  unit: string;
  value: string;
}) {
  return (
    <article className={`grdp-panel grdp-value-card ${className}`}>
      <div className="grdp-panel-title">
        <span>{label}</span>
      </div>
      <DesignReportPeriodSelect />
      <div className="grdp-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <p className="grdp-trend">▲ {trend}</p>
      {children}
    </article>
  );
}

function GrdpDashboardDesign() {
  return (
    <section className="grdp-dashboard" aria-label="Nhóm chỉ số về GRDP">
      <div className="grdp-grid">
        <article className="grdp-panel grdp-growth-panel">
          <div className="grdp-panel-title">
            <span>Tốc độ tăng trưởng kinh tế (GRDP)</span>
          </div>
          <div className="grdp-accordion-row active">
            <span className="grdp-row-icon factory-icon" aria-hidden="true" />
            <strong>Khu vực công nghiệp, xây dựng</strong>
            <i>⌃</i>
          </div>
          <DesignReportPeriodSelect />
          <GrdpDesignTrendChart />
          <div className="grdp-accordion-row">
            <span className="grdp-row-icon fish-icon" aria-hidden="true" />
            <span>Khu vực nông, lâm nghiệp và thủy sản</span>
            <i>⌄</i>
          </div>
          <div className="grdp-inline-value">
            <strong>43,62</strong>
            <span>%</span>
          </div>
          <p className="grdp-trend">▲ 12,6% so với cùng kỳ năm trước</p>
          <div className="grdp-accordion-row">
            <span className="grdp-row-icon service-round-icon" aria-hidden="true" />
            <span>Khu vực dịch vụ</span>
            <i>⌄</i>
          </div>
          <div className="grdp-inline-value">
            <strong>23,61</strong>
            <span>%</span>
          </div>
          <p className="grdp-trend">▲ 12,6% so với cùng kỳ năm trước</p>
          <div className="grdp-accordion-row muted">
            <span className="grdp-row-icon tax-icon" aria-hidden="true" />
            <span>Thuế sản phẩm trừ trợ cấp sản phẩm</span>
            <i>⌄</i>
          </div>
        </article>

        <div className="grdp-middle-column">
          <article className="grdp-panel grdp-structure-panel">
            <div className="grdp-panel-title">
              <span>Cơ cấu GRDP</span>
            </div>
            <DesignReportPeriodSelect />
            <GrdpDesignPieChart />
          </article>

          <GrdpDesignValueBlock
            className="grdp-industry-card"
            label="Tỷ trọng giá trị tăng thêm ngành công nghiệp chế biến, chế tạo trong GRDP"
            unit="%"
            value="24,62"
          />
        </div>

        <div className="grdp-side-column">
          <GrdpDesignValueBlock label="GRDP bình quân đầu người" unit="%" value="8,78" />
          <GrdpDesignValueBlock label="Thu nhập bình quân đầu người" unit="Triệu đồng/người/năm" value="60,14" />
          <GrdpDesignValueBlock
            className="grdp-investment-card"
            label="Tổng vốn đầu tư thực hiện toàn xã hội"
            trend="11,9% so với cùng kỳ năm trước"
            unit="Tỷ đồng"
            value="2.931"
          >
            <GrdpDesignInvestmentChart />
          </GrdpDesignValueBlock>
        </div>
      </div>
    </section>
  );
}

function GrdpDashboardV2() {
  const grdpData = detailData.grdp;

  return (
    <section className="grdp-dashboard" aria-label="Nhóm chỉ số về GRDP">
      <div className="grdp-heading">
        <div>
          <p>Chi tiết nhóm chỉ tiêu</p>
          <h2>Nhóm chỉ số về GRDP</h2>
        </div>
        <span>Theo dõi tăng trưởng kinh tế, cơ cấu giá trị tăng thêm và mức đóng góp theo địa bàn</span>
      </div>

      <div className="grdp-grid">
        <div className="grdp-map-panel">
          <MapCanvas title="Bản đồ GRDP theo địa bàn Hà Tĩnh" />
        </div>

        <article className="grdp-hero-kpi">
          <div className="panel-title amber">
            <span className="metric-icon" aria-hidden="true" />
            Tăng trưởng GRDP
          </div>
          <strong>8,78%</strong>
          <span>Ước thực hiện năm 2026</span>
          <p>12,6% so với cùng kỳ năm trước</p>
        </article>

        <article className="grdp-chart-panel">
          <div className="panel-title cyan">
            <span className="service-icon" aria-hidden="true" />
            Diễn biến GRDP 6 tháng gần nhất
          </div>
          <MiniLineChart series={[52, 58, 63, 68, 76, 88]} />
        </article>

        <article className="grdp-sector-panel">
          <div className="panel-title amber">
            <span className="coin-icon" aria-hidden="true" />
            Cơ cấu GRDP theo ngành
          </div>
          {grdpSectorRows.map((row) => (
            <div className={`grdp-sector-row ${row.tone}`} key={row.label}>
              <span>{row.label}</span>
              <strong>{row.value}</strong>
              <em>{row.unit}</em>
            </div>
          ))}
        </article>

        {grdpFocus.map((item) => (
          <article className={`grdp-focus-kpi ${item.tone}`} key={item.label}>
            <h3>{item.label}</h3>
            <div>
              <strong>{item.value}</strong>
              <span>{item.unit}</span>
            </div>
            <p>{item.trend}</p>
          </article>
        ))}

        <article className="grdp-pie-panel">
          <div className="panel-title amber">
            <span className="coin-icon" aria-hidden="true" />
            Mức đóng góp vào tăng trưởng
          </div>
          <PieChartBlock items={grdpData.pie} />
        </article>

        <article className="grdp-bars-panel">
          <div className="panel-title cyan">
            <span className="pin-icon" aria-hidden="true" />
            Top địa bàn theo quy mô GRDP
          </div>
          <div className="bar-list">
            {grdpAreaRows.map((item) => (
              <div className="bar-row grdp-area-row" key={item.label}>
                <span>{item.label}</span>
                <div>
                  <i className={item.tone} style={{ width: `${item.value}%` }} />
                </div>
                <strong>{item.amount}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="grdp-table-panel">
          <div className="panel-title amber">
            <span className="investment-icon" aria-hidden="true" />
            Nhiệm vụ dữ liệu GRDP
          </div>
          <div className="detail-table">
            <div className="detail-table-head">
              <span>Tên nhiệm vụ</span>
              <span>Ngày cập nhật</span>
              <span>Trạng thái</span>
            </div>
            {grdpTaskRows.map((row) => (
              <div className="detail-table-row" key={`${row.name}-${row.date}`}>
                <span>{row.name}</span>
                <span>{row.date}</span>
                <strong>{row.status}</strong>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function RevenueDonutChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: ["#7b61ff", "#ff817d", "#39c6de"],
    legend: { show: false },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["56%", "78%"],
        center: ["50%", "47%"],
        avoidLabelOverlap: true,
        label: {
          color: "rgba(245, 248, 252, 0.86)",
          formatter: "{b}\n{d}%",
          fontSize: 11,
        },
        labelLine: {
          length: 12,
          length2: 8,
          lineStyle: { color: "rgba(245, 248, 252, 0.42)" },
        },
        itemStyle: {
          borderColor: "rgba(11, 17, 29, 0.96)",
          borderWidth: 2,
        },
        data: [
          { name: "Thu nội địa", value: 30 },
          { name: "Thu từ hoạt động xuất, nhập khẩu", value: 15 },
          { name: "Thu khác", value: 55 },
        ],
      },
    ],
  }), []);

  return (
    <div className="treasury-donut-wrap">
      <EChart className="treasury-donut-chart" option={option} ariaLabel="Cơ cấu tổng thu ngân sách nhà nước" />
      <div className="treasury-donut-center">
        <strong>962</strong>
        <span>Triệu đồng</span>
      </div>
      <div className="treasury-donut-legend">
        <span><i className="purple" />Thu nội địa</span>
        <span><i className="salmon" />Thu từ hoạt động xuất, nhập khẩu</span>
        <span><i className="cyan" />Thu khác (viện trợ, huy động, vốn góp)</span>
      </div>
    </div>
  );
}

function RevenueColumnChart({ compact = false }: { compact?: boolean }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#7565d8"],
    grid: {
      left: 50,
      right: 18,
      top: 34,
      bottom: 34,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.38)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      max: 2200,
      interval: 400,
      name: "Triệu đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.68)", align: "left", padding: [0, 0, 0, 6] },
      axisLabel: { color: "rgba(245, 248, 252, 0.68)", fontSize: 11 },
      splitLine: { show: false },
    },
    series: [
      {
        type: "bar",
        barWidth: compact ? 54 : 48,
        data: [1230, 1540, 1875, 1120, 1980, 1550],
        itemStyle: {
          color: "#7565d8",
        },
      },
    ],
  }), [compact]);

  return <EChart className="treasury-bar-chart" option={option} ariaLabel="Biểu đồ thu ngân sách theo tháng" />;
}

function TreasuryPeriodSelect({ value = "Tháng1/2026" }: { value?: string }) {
  return (
    <label className="treasury-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value="Tháng1/2026">Tháng1/2026</option>
        <option value="Quý I/2026">Quý I/2026</option>
        <option value="Quý II/2026">Quý II/2026</option>
      </select>
    </label>
  );
}

function TreasuryProgressCard({
  className = "",
  color = "orange",
  title,
  value,
  trend = "12,6% so với cùng kỳ năm trước",
  trendTone = "green",
}: {
  className?: string;
  color?: "orange" | "cyan" | "pink";
  title: string;
  trend?: string;
  trendTone?: "green" | "amber" | "red";
  value: string;
}) {
  return (
    <article className={`treasury-panel treasury-card ${className}`}>
      <div className="treasury-title">{title}</div>
      <TreasuryPeriodSelect value="Quý I/2026" />
      <div className="treasury-card-value">
        <strong>{value}</strong>
        <span>Triệu đồng</span>
      </div>
      <div className="treasury-progress-label">
        <span>So dự toán</span>
        <em>1,851</em>
      </div>
      <div className="treasury-progress">
        <i className={color} style={{ width: "61%" }} />
      </div>
      <p className={`treasury-trend ${trendTone}`}>{trend}</p>
    </article>
  );
}

function RevenueDashboard() {

  return (
    <section className="treasury-dashboard" aria-label="Nhóm thu ngân sách">
      <div className="treasury-grid">
        <article className="treasury-panel treasury-donut-panel">
          <div className="treasury-title">Cơ cấu tổng thu ngân sách nhà nước</div>
          <TreasuryPeriodSelect />
          <RevenueDonutChart />
        </article>

        <article className="treasury-panel treasury-total-panel">
          <div className="treasury-title">Tổng các khoản thu ngân sách nhà nước</div>
          <TreasuryPeriodSelect />
          <RevenueColumnChart />
          <div className="treasury-big-metric">
            <strong>531</strong>
            <span>Triệu đồng</span>
            <div>
              <p className="treasury-trend green">12,6% so với dự toán</p>
              <p className="treasury-trend amber">12,6% so với cùng kỳ năm trước</p>
            </div>
          </div>
        </article>

        <article className="treasury-panel treasury-domestic-panel">
          <div className="treasury-title">Thu nội địa</div>
          <TreasuryPeriodSelect />
          <RevenueColumnChart compact />
          <div className="treasury-big-metric">
            <strong>431</strong>
            <span>Triệu đồng</span>
            <div>
              <p className="treasury-trend green">12,6% so với dự toán</p>
              <p className="treasury-trend amber">12,6% so với cùng kỳ năm trước</p>
            </div>
          </div>
        </article>

        <article className="treasury-panel treasury-debt-card">
          <div className="treasury-title">Tổng số tiền nợ thuế</div>
          <TreasuryPeriodSelect value="Quý I/2026" />
          <div className="treasury-debt-value">
            <strong>234</strong>
            <span>Triệu đồng</span>
          </div>
          <p className="treasury-trend red">12,6% so với cùng kỳ năm trước</p>
        </article>

        <TreasuryProgressCard
          color="pink"
          title="Thu từ hoạt động xuất, nhập khẩu"
          trend="7,2% so với cùng kỳ năm trước"
          trendTone="amber"
          value="100"
        />
        <TreasuryProgressCard title="Thu khác (viện trợ, huy động, vốn góp)" value="77" />
        <TreasuryProgressCard
          color="pink"
          title="Thu thuế, phí"
          trend="7,2% so với cùng kỳ năm trước"
          trendTone="amber"
          value="234"
        />
        <TreasuryProgressCard color="cyan" title="Thu tiền thuê đất, tiền sử dụng đất" value="245" />
      </div>
    </section>
  );
}

function PublicInvestmentMonthlyChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#d7b85f", "#15b77d"],
    grid: { left: 66, right: 32, top: 56, bottom: 58 },
    legend: {
      bottom: 12,
      icon: "rect",
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(245, 248, 252, 0.78)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4"],
      axisLabel: { color: "rgba(245, 248, 252, 0.66)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.42)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(245, 248, 252, 0.14)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 40,
      name: "Tỷ đồng",
      nameTextStyle: { color: "rgba(245, 248, 252, 0.72)", align: "left", fontStyle: "italic", padding: [0, 0, 10, 0] },
      axisLabel: { color: "rgba(245, 248, 252, 0.66)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)", type: "dotted" } },
    },
    series: [
      {
        name: "Dự án do bộ ngành quản lý",
        type: "bar",
        stack: "total",
        barWidth: 76,
        data: [14.38, 62.97, 95.32, 79.83],
        label: { show: true, color: "rgba(255, 255, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
      {
        name: "Dự án do địa phương quản lý",
        type: "bar",
        stack: "total",
        barWidth: 76,
        data: [22.41, 34.32, 65.23, 69.59],
        label: { show: true, color: "rgba(255, 255, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
    ],
  }), []);

  return <EChart className="public-investment-monthly-chart" option={option} ariaLabel="Tổng giá trị giải ngân vốn đầu tư công theo bộ ngành và địa phương" />;
}

function PublicInvestmentSourcesChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#806cff"],
    grid: { left: 300, right: 38, top: 54, bottom: 34 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "value",
      min: 0,
      max: 600,
      interval: 75,
      position: "top",
      axisLabel: { color: "rgba(245, 248, 252, 0.64)", fontSize: 12 },
      axisLine: { lineStyle: { color: "rgba(245, 248, 252, 0.32)" } },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "rgba(245, 248, 252, 0.16)", type: "dotted" } },
    },
    yAxis: {
      type: "category",
      inverse: true,
      data: [
        "Vốn ngân sách địa phương cấp tỉnh",
        "Vốn ngân sách TW theo ngành lĩnh vực",
        "Nguồn vốn do cấp xã quản lý",
        "Vốn nước ngoài (ODA)",
        "Chi bằng lệnh chi tiền",
        "Nguồn dự phòng NSTW",
        "Vốn chương trình mục tiêu (cấp tỉnh)",
      ],
      axisLabel: { color: "rgba(245, 248, 252, 0.72)", fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        barWidth: 24,
        data: [520, 410, 310, 240, 170, 150, 90],
        label: { show: true, position: "right", color: "rgba(245, 248, 252, 0.68)", fontSize: 11 },
        itemStyle: { borderRadius: [0, 12, 12, 0] },
      },
    ],
  }), []);

  return <EChart className="public-investment-sources-chart" option={option} ariaLabel="Giải ngân theo các nguồn vốn" />;
}

function PublicInvestmentDonutChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: ["#67d893", "#ff7f7a"],
    legend: { show: false },
    series: [
      {
        type: "pie",
        radius: ["62%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true,
        label: {
          show: true,
          position: "center",
          formatter: "722\nTỷ đồng",
          color: "#f7fbff",
          fontSize: 26,
          fontWeight: 800,
          lineHeight: 34,
        },
        labelLine: { show: false },
        itemStyle: { borderWidth: 0 },
        data: [
          { name: "NS Địa phương", value: 522 },
          { name: "NS Trung ương", value: 200 },
        ],
      },
    ],
  }), []);

  return <EChart className="public-investment-donut-chart" option={option} ariaLabel="Cơ cấu ngân sách trung ương và địa phương" />;
}

function PublicInvestmentPeriodSelect({ value = "Quý I/2026" }: { value?: string }) {
  return (
    <label className="public-investment-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value="Quý I/2026">Quý I/2026</option>
        <option value="Tháng 1/2026">Tháng 1/2026</option>
        <option value="Tháng 2/2026">Tháng 2/2026</option>
      </select>
    </label>
  );
}

function PublicInvestmentMetricCard({ title }: { title: string }) {
  return (
    <article className="public-investment-panel public-investment-metric-card">
      <h3>{title}</h3>
      <PublicInvestmentPeriodSelect />
      <div className="public-investment-big-value">
        <strong>3.163</strong>
        <span>Dự án</span>
      </div>
      <p className="public-investment-trend">▲ <strong>12,6%</strong> so với cùng kỳ năm trước</p>
    </article>
  );
}

function InvestmentDashboard() {
  return (
    <section className="public-investment-dashboard" aria-label="Nhóm đầu tư công">
      <div className="public-investment-grid">
        <div className="public-investment-left-stack">
          <PublicInvestmentMetricCard title="Tổng số dự án đầu tư công" />
          <PublicInvestmentMetricCard title="Tổng vốn bố trí theo dự án" />
          <PublicInvestmentMetricCard title="Giá trị giải ngân theo dự án" />
        </div>

        <article className="public-investment-panel public-investment-monthly-panel">
          <h3>Tổng giá trị giải ngân vốn đầu tư công theo bộ ngành và địa phương</h3>
          <PublicInvestmentPeriodSelect value="Tháng 1/2026" />
          <PublicInvestmentMonthlyChart />
        </article>

        <article className="public-investment-panel public-investment-sources-panel">
          <h3>Giải ngân theo các nguồn vốn (NSTW & NSĐP)</h3>
          <PublicInvestmentPeriodSelect value="Tháng 1/2026" />
          <span className="public-investment-chart-unit">Tỷ đồng</span>
          <PublicInvestmentSourcesChart />
        </article>

        <article className="public-investment-panel public-investment-structure-panel">
          <h3>Cơ cấu ngân sách trung ương và địa phương</h3>
          <PublicInvestmentPeriodSelect />
          <div className="public-investment-donut-wrap">
            <PublicInvestmentDonutChart />
            <div className="public-investment-donut-legend">
              <span><i className="green" />NS Địa phương: 522 tỷ đồng (66%)</span>
              <span><i className="red" />NS Trung ương: 200 tỷ đồng (34%)</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function InvestmentAttractionPeriodSelect() {
  return (
    <label className="investment-attraction-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue="Tháng 1/2026" aria-label="Kỳ báo cáo">
        <option value="Tháng 1/2026">Tháng 1/2026</option>
        <option value="Tháng 2/2026">Tháng 2/2026</option>
        <option value="Quý I/2026">Quý I/2026</option>
      </select>
    </label>
  );
}

function InvestmentAttractionChart({ capitalUnit }: { capitalUnit: "Tỷ đồng" | "Triệu USD" }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#66c98d", "#d89232"],
    grid: { left: 62, right: 62, top: 100, bottom: 82 },
    legend: {
      bottom: 24,
      icon: "rect",
      itemGap: 24,
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(226, 233, 242, 0.76)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: investmentAttractionMonths,
      axisLabel: { color: "rgba(226, 233, 242, 0.7)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(226, 233, 242, 0.46)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(226, 233, 242, 0.16)", type: "dotted" } },
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 100,
        interval: 50,
        name: "Dự án",
        nameTextStyle: {
          color: "rgba(226, 233, 242, 0.74)",
          fontSize: 12,
          fontStyle: "italic",
          align: "left",
          padding: [0, 0, 14, 0],
        },
        axisLabel: { color: "rgba(226, 233, 242, 0.68)", fontSize: 12 },
        splitLine: { lineStyle: { color: "rgba(226, 233, 242, 0.16)", type: "dotted" } },
      },
      {
        type: "value",
        min: 0,
        max: 2000,
        interval: 500,
        name: capitalUnit,
        nameTextStyle: {
          color: "rgba(226, 233, 242, 0.74)",
          fontSize: 12,
          fontStyle: "italic",
          align: "right",
          padding: [0, 0, 14, 0],
        },
        axisLabel: { color: "rgba(226, 233, 242, 0.68)", fontSize: 12 },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: "Số dự án",
        type: "bar",
        barWidth: 50,
        data: investmentAttractionProjects,
        itemStyle: { color: "rgba(102, 201, 141, 0.88)" },
      },
      {
        name: "Tổng vốn đăng ký đầu tư",
        type: "line",
        yAxisIndex: 1,
        data: investmentAttractionCapital,
        symbol: "circle",
        symbolSize: 9,
        label: {
          show: true,
          color: "rgba(226, 233, 242, 0.76)",
          fontSize: 10,
          position: "top",
        },
        lineStyle: { color: "#d89232", width: 2 },
        itemStyle: { color: "#d89232", borderColor: "rgba(255, 218, 132, 0.72)", borderWidth: 2 },
      },
    ],
  }), [capitalUnit]);

  return <EChart className="investment-attraction-chart" option={option} ariaLabel={`Thu hút đầu tư, đơn vị vốn ${capitalUnit}`} />;
}

function InvestmentAttractionDashboard() {
  return (
    <section className="investment-attraction-dashboard" aria-label="Thu hút đầu tư">
      <div className="investment-attraction-grid">
        <article className="investment-attraction-panel">
          <h3>Thu hút đầu tư trong nước</h3>
          <InvestmentAttractionPeriodSelect />
          <InvestmentAttractionChart capitalUnit="Tỷ đồng" />
        </article>

        <article className="investment-attraction-panel">
          <h3>Thu hút đầu tư ngoài nước (FDI)</h3>
          <InvestmentAttractionPeriodSelect />
          <InvestmentAttractionChart capitalUnit="Triệu USD" />
        </article>
      </div>
    </section>
  );
}

function TradeServicePeriodSelect({ value = "Quý II/2026" }: { value?: string }) {
  return (
    <label className="trade-service-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value="Quý I/2026">Quý I/2026</option>
        <option value="Quý II/2026">Quý II/2026</option>
        <option value="Quý III/2026">Quý III/2026</option>
      </select>
    </label>
  );
}

function TradeServiceExportChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#2e7cff", "#f5a623"],
    grid: { left: 92, right: 70, top: 82, bottom: 72 },
    legend: {
      bottom: 16,
      icon: "rect",
      itemGap: 18,
      itemHeight: 8,
      itemWidth: 8,
      textStyle: { color: "rgba(215, 225, 240, 0.72)", fontSize: 11 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Q2/2025", "Q3/2025", "Q4/2025", "Q1/2026", "Q2/2026", "Q3/2026"],
      axisLabel: {
        color: "rgba(139, 162, 202, 0.96)",
        fontFamily: "monospace",
        fontSize: 21,
        margin: 18,
      },
      axisLine: { lineStyle: { color: "rgba(145, 156, 180, 0.3)", width: 2 } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 50,
      name: "Triệu USD",
      nameTextStyle: {
        color: "rgba(139, 162, 202, 0.78)",
        fontSize: 10,
        fontStyle: "italic",
        padding: [0, 0, 22, 0],
      },
      axisLabel: {
        color: "rgba(139, 162, 202, 0.96)",
        fontFamily: "monospace",
        fontSize: 20,
      },
      splitLine: { lineStyle: { color: "rgba(88, 103, 130, 0.34)", width: 2 } },
    },
    series: [
      {
        name: "Kim ngạch xuất khẩu",
        type: "line",
        data: [129, 119, 143, 133, 118, 112],
        smooth: false,
        symbol: "circle",
        symbolSize: 12,
        lineStyle: { width: 5 },
        itemStyle: { borderColor: "#061025", borderWidth: 4 },
      },
      {
        name: "Kim ngạch nhập khẩu",
        type: "line",
        data: [44, 54, 67, 55, 47, 62],
        smooth: false,
        symbol: "circle",
        symbolSize: 12,
        lineStyle: { width: 5, type: "dashed" },
        itemStyle: { borderColor: "#061025", borderWidth: 4 },
      },
    ],
  }), []);

  return <EChart className="trade-service-export-chart" option={option} ariaLabel="Xuất nhập khẩu theo quý" />;
}

function TradeServiceTourismChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#7463d4", "#d97973", "#38b5cc"],
    grid: { left: 80, right: 58, top: 92, bottom: 102 },
    legend: {
      bottom: 22,
      icon: "rect",
      itemGap: 26,
      itemHeight: 11,
      itemWidth: 11,
      textStyle: { color: "rgba(216, 225, 236, 0.72)", fontSize: 13 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.18)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Quý 4/2025", "Quý 1/2026", "Quý 2/2026", "Quý 3/2026"],
      axisLabel: { color: "rgba(220, 226, 238, 0.72)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(216, 225, 236, 0.52)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(216, 225, 236, 0.18)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 200,
      interval: 40,
      name: "Lượt khách",
      nameTextStyle: {
        color: "rgba(220, 226, 238, 0.72)",
        fontSize: 13,
        fontStyle: "italic",
        padding: [0, 0, 12, 8],
      },
      axisLabel: { color: "rgba(220, 226, 238, 0.72)", fontSize: 13 },
      splitLine: { lineStyle: { color: "rgba(216, 225, 236, 0.18)", type: "dotted" } },
    },
    series: [
      {
        name: "Khách tham quan",
        type: "bar",
        stack: "tourism",
        barWidth: 76,
        data: [21.07, 34.41, 79.03, 63.01],
        label: { show: true, color: "rgba(246, 249, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
      {
        name: "Khách lưu trú nội địa",
        type: "bar",
        stack: "tourism",
        barWidth: 76,
        data: [15.32, 86.17, 39.18, 25.41],
        label: { show: true, color: "rgba(246, 249, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
      {
        name: "Khách lưu trú quốc tế",
        type: "bar",
        stack: "tourism",
        barWidth: 76,
        data: [26.57, 27.23, 60.95, 21.5],
        label: { show: true, color: "rgba(246, 249, 255, 0.72)", fontSize: 11, position: "insideTop" },
      },
    ],
  }), []);

  return <EChart className="trade-service-tourism-chart" option={option} ariaLabel="Số lượng khách du lịch theo quý" />;
}

function TradeServiceDashboard() {
  return (
    <section className="trade-service-dashboard" aria-label="Nhóm thương mại dịch vụ">
      <div className="trade-service-grid">
        <article className="trade-service-panel trade-service-total-panel">
          <h3>Tổng kim ngạch xuất nhập khẩu</h3>
          <TradeServicePeriodSelect />
          <div className="trade-service-total-value">
            <strong>234</strong>
            <span>Triệu USD</span>
          </div>
          <p className="trade-service-trend"><i aria-hidden="true" /> <strong>12,6%</strong> so với cùng kỳ năm trước</p>
        </article>

        <article className="trade-service-panel trade-service-export-panel">
          <h3>Xuất nhập khẩu</h3>
          <TradeServicePeriodSelect />
          <TradeServiceExportChart />
        </article>

        <article className="trade-service-panel trade-service-tourism-panel">
          <h3>Số lượng khách du lịch</h3>
          <TradeServicePeriodSelect value="Quý I/2026" />
          <TradeServiceTourismChart />
        </article>
      </div>
    </section>
  );
}

function EnterprisePeriodSelect({ value = "Quý I/2026" }: { value?: string }) {
  return (
    <label className="enterprise-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value="Quý I/2026">Quý I/2026</option>
        <option value="Tháng 1/2026">Tháng 1/2026</option>
        <option value="Tháng 2/2026">Tháng 2/2026</option>
      </select>
    </label>
  );
}

function EnterpriseActivityChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#7462d9", "#df7a78", "#37bdd2", "#f6aa45", "#416fd8"],
    grid: { left: 78, right: 42, top: 78, bottom: 82 },
    legend: {
      bottom: 22,
      icon: "rect",
      itemGap: 14,
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(224, 231, 242, 0.42)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      interval: 25,
      name: "Doanh nghiệp",
      nameTextStyle: {
        color: "rgba(224, 231, 242, 0.72)",
        fontSize: 12,
        fontStyle: "italic",
        padding: [0, 0, 12, 0],
      },
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    series: [
      { name: "Thành lập mới", type: "bar", barWidth: 13, data: [12, 11, 24, 21, 12, 16], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Hoạt động trở lại", type: "bar", barWidth: 13, data: [24, 43, 64, 12, 12, 12], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Tạm ngừng đăng ký", type: "bar", barWidth: 13, data: [4, 23, 2, 12, 34, 25], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Thông báo giải thể", type: "bar", barWidth: 13, data: [45, 23, 23, 12, 68, 12], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
      { name: "Đã giải thể", type: "bar", barWidth: 13, data: [11, 3, 5, 0, 1, 4], label: { show: true, position: "top", color: "rgba(246, 249, 255, 0.78)", fontSize: 11 } },
    ],
  }), []);

  return <EChart className="enterprise-activity-chart" option={option} ariaLabel="Biến động doanh nghiệp" />;
}

function EnterpriseCoopChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    color: ["#7462d9", "#df7a78", "#37bdd2"],
    grid: { left: 80, right: 34, top: 78, bottom: 74 },
    legend: {
      bottom: 16,
      icon: "rect",
      itemGap: 18,
      itemHeight: 10,
      itemWidth: 10,
      textStyle: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 13 },
      axisLine: { lineStyle: { color: "rgba(224, 231, 242, 0.42)" } },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 2000,
      interval: 1000,
      name: "Hợp tác xã",
      nameTextStyle: {
        color: "rgba(224, 231, 242, 0.72)",
        fontSize: 12,
        fontStyle: "italic",
        padding: [0, 0, 12, 0],
      },
      axisLabel: { color: "rgba(224, 231, 242, 0.72)", fontSize: 12 },
      splitLine: { lineStyle: { color: "rgba(224, 231, 242, 0.14)", type: "dotted" } },
    },
    series: [
      { name: "Đang hoạt động", type: "bar", barWidth: 24, data: [1230, 1520, 1860, 1120, 1960, 1530] },
      { name: "Mới thành lập", type: "bar", barWidth: 24, data: [1230, 1510, 1860, 1120, 1960, 1530] },
      { name: "Ngừng hoạt động", type: "bar", barWidth: 24, data: [1230, 1510, 1860, 1120, 1960, 1530] },
    ],
  }), []);

  return <EChart className="enterprise-coop-chart" option={option} ariaLabel="Hợp tác xã kinh tế tập thể" />;
}

function EnterpriseCoopDashboard() {
  return (
    <section className="enterprise-dashboard" aria-label="Nhóm doanh nghiệp, hợp tác xã">
      <div className="enterprise-grid">
        <article className="enterprise-panel enterprise-total-panel">
          <h3>Doanh nghiệp hoạt động trong nền kinh tế</h3>
          <EnterprisePeriodSelect />
          <div className="enterprise-total-value">
            <strong>234</strong>
            <span>Doanh nghiệp</span>
          </div>
          <p className="enterprise-trend"><i aria-hidden="true" /> <strong>12,6%</strong> so với cùng kỳ năm trước</p>
        </article>

        <article className="enterprise-panel enterprise-activity-panel">
          <h3>Biến động doanh nghiệp</h3>
          <EnterprisePeriodSelect value="Tháng 1/2026" />
          <EnterpriseActivityChart />
        </article>

        <article className="enterprise-panel enterprise-coop-panel">
          <h3>Hợp tác xã, kinh tế tập thể</h3>
          <EnterprisePeriodSelect value="Tháng 1/2026" />
          <EnterpriseCoopChart />
          <div className="enterprise-coop-total">
            <span>Tổng số:</span>
            <strong>5.531</strong>
            <em>Hợp tác xã</em>
          </div>
        </article>
      </div>
    </section>
  );
}

function ExpenseDashboard() {
  return (
    <section className="expense-ioc-dashboard" aria-label="Nhóm chi ngân sách">
      <div className="expense-ioc-grid">
        <ExpenseBudgetCard
          className="expense-total-card"
          title="Tổng chi ngân sách địa phương"
          value="100"
        />

        <article className="expense-ioc-panel expense-share-panel">
          <h3>Cơ cấu tỷ trọng các khoản chi</h3>
          <ExpensePeriodSelect />
          <div className="expense-donut-wrap">
            <EChart
              ariaLabel="Cơ cấu tỷ trọng các khoản chi"
              className="expense-donut-chart"
              option={{
                animationDuration: 800,
                color: ["#67d893", "#ff7f7a"],
                legend: { show: false },
                series: [
                  {
                    type: "pie",
                    radius: ["64%", "82%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: true,
                    label: {
                      color: "#f6fbff",
                      formatter: "722\nTỷ đồng",
                      fontSize: 24,
                      fontWeight: 800,
                      lineHeight: 32,
                      position: "center",
                      show: true,
                    },
                    labelLine: { show: false },
                    itemStyle: { borderWidth: 0 },
                    data: [
                      { name: "Chi thường xuyên", value: 522 },
                      { name: "Chi đầu tư phát triển", value: 200 },
                    ],
                  },
                ],
              }}
            />
            <div className="expense-donut-legend">
              <span><i className="green" />Chi thường xuyên: 522 tỷ đồng (66%)</span>
              <span><i className="red" />Chi đầu tư phát triển: 200 tỷ đồng (34%)</span>
            </div>
          </div>
        </article>

        <article className="expense-ioc-panel expense-monthly-panel">
          <h3>Chi ngân sách địa phương hằng tháng</h3>
          <ExpensePeriodSelect label="Kỳ báo cáo" />
          <ExpenseMonthlyBarChart />
        </article>

        <ExpenseBudgetCard
          className="expense-investment-card"
          title="Chi đầu tư phát triển"
          value="77"
          trend="12,6%"
          trendTone="green"
          progressTone="cyan"
        />

        <ExpenseBudgetCard
          className="expense-regular-card"
          title="Chi thường xuyên"
          value="23"
        />
      </div>
    </section>
  );
}

const healthMonths = ["T1/2026", "T2/2026", "T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];
const healthShortMonths = ["T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];

type HealthLineConfig = {
  label: string;
  series: number[];
  value: string;
};

const healthServiceLines: HealthLineConfig[] = [
  { label: "Bác sĩ/vạn dân", series: [210.5, 190, 182, 205, 231, 216], value: "210,5" },
  { label: "Giường bệnh/vạn dân", series: [72, 68, 32, 48, 122, 139.6], value: "139,6" },
];

const healthInsuranceLines: HealthLineConfig[] = [
  { label: "BHXH", series: [2100, 3000, 3500, 3200, 3800, 5339], value: "5.339" },
  { label: "BHYT", series: [3800, 4100, 3420, 3430, 3050, 4192], value: "4.192" },
  { label: "BHTN", series: [4580, 4400, 5350, 4920, 5700, 7085], value: "7.085" },
];

const healthBeneficiaryLines: HealthLineConfig[] = [
  { label: "BHXH", series: [3520, 3180, 3570, 3320, 2860, 3124], value: "3.124" },
  { label: "BHYT", series: [1040, 880, 1320, 1580, 1620, 1535], value: "1.535" },
  { label: "BHTN", series: [2940, 3150, 2970, 3680, 4040, 4340], value: "4.340" },
];

function HealthPeriodSelect({ value = "Tháng 1/2026" }: { value?: string }) {
  return (
    <label className="health-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value="Tháng 1/2026">Tháng 1/2026</option>
        <option value="Quý I/2026">Quý I/2026</option>
        <option value="Năm 2026">Năm 2026</option>
      </select>
    </label>
  );
}

function HealthMiniLineChart({ data, max = 10000 }: { data: HealthLineConfig; max?: number }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: ["#2f80ff"],
    grid: { left: 42, right: 16, top: 18, bottom: 28 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: healthShortMonths,
      axisLabel: { color: "#657898", fontSize: 10, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max,
      interval: max / 4,
      axisLabel: {
        color: "#657898",
        fontSize: 10,
        formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
      },
      splitLine: { lineStyle: { color: "rgba(104, 123, 154, 0.24)" } },
    },
    series: [
      {
        type: "line",
        smooth: true,
        symbolSize: 8,
        data: data.series,
        lineStyle: { width: 3 },
        areaStyle: { color: "rgba(47, 128, 255, 0.22)" },
        itemStyle: { borderColor: "#05101d", borderWidth: 2 },
      },
    ],
  }), [data, max]);

  return <EChart className="health-mini-line-chart" option={option} ariaLabel={`Biểu đồ ${data.label}`} />;
}

function HealthBarChart({ data, max = 2000, unit }: { data: number[]; max?: number; unit: string }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 800,
    color: ["#327bf6"],
    grid: { left: 60, right: 34, top: 40, bottom: 52 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: healthMonths,
      axisLabel: { color: "#657898", fontSize: 12, fontWeight: 700 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max,
      interval: max / 4,
      name: unit,
      nameTextStyle: { color: "#657898", fontSize: 12, fontStyle: "italic", align: "left", padding: [0, 0, 8, 0] },
      axisLabel: {
        color: "#657898",
        fontSize: 12,
        formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
      },
      splitLine: { lineStyle: { color: "rgba(104, 123, 154, 0.28)" } },
    },
    series: [
      {
        type: "bar",
        barWidth: "58%",
        data,
        itemStyle: { borderRadius: [4, 4, 1, 1] },
      },
    ],
  }), [data, max, unit]);

  return <EChart className="health-bar-chart" option={option} ariaLabel="Biểu đồ cột y tế và an sinh" />;
}

function HealthGauge({
  label,
  target = "95%",
  value = 70,
}: {
  label: string;
  target?: string;
  value?: number;
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ["50%", "70%"],
        radius: "92%",
        progress: { show: true, width: 18, itemStyle: { color: "#2fa75a" } },
        axisLine: {
          lineStyle: {
            width: 18,
            color: [[0.7, "#2fa75a"], [1, "#ffd15f"]],
          },
        },
        pointer: { length: "42%", width: 6, offsetCenter: [0, "-8%"], itemStyle: { color: "#f7fbff" } },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          formatter: "{value}%",
          offsetCenter: [0, "0%"],
          color: "#2faf60",
          fontSize: 30,
          fontWeight: 900,
        },
        data: [{ value }],
      },
    ],
  }), [value]);

  return (
    <div className="health-gauge-block">
      <EChart className="health-gauge-chart" option={option} ariaLabel={label} />
      <strong>MỤC TIÊU: {target}</strong>
      <span>{label}</span>
    </div>
  );
}

function HealthMetricCard({
  className = "",
  title,
  trend = "+3.2%",
  trendTone = "green",
  unit,
  value,
}: {
  className?: string;
  title: string;
  trend?: string;
  trendTone?: "green" | "red";
  unit: string;
  value: string;
}) {
  return (
    <article className={`health-panel health-metric-card ${className}`}>
      <div className="health-card-title">{title}</div>
      <HealthPeriodSelect />
      <div className="health-big-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>
      <p className={`health-trend ${trendTone}`}>{trend} <span>So với cùng kỳ</span></p>
    </article>
  );
}

function HealthLineGroup({
  className = "",
  items,
  title,
  max,
}: {
  className?: string;
  items: HealthLineConfig[];
  max: number;
  title: string;
}) {
  return (
    <article className={`health-panel health-line-group ${className}`}>
      <div className="health-card-title">{title}</div>
      <HealthPeriodSelect />
      <p className="health-chart-note">Đơn vị: Người - từng chỉ tiêu theo tháng riêng để trình lệch tỷ lệ</p>
      <div className="health-line-grid">
        {items.map((item) => (
          <div className="health-line-item" key={item.label}>
            <h3>{item.label}</h3>
            <div>
              <strong>{item.value}</strong>
              <span>Người</span>
            </div>
            <HealthMiniLineChart data={item} max={max} />
          </div>
        ))}
      </div>
    </article>
  );
}

function HealthDashboard() {
  return (
    <section className="health-social-dashboard" aria-label="Nhóm y tế, an sinh xã hội">
      <div className="health-social-grid">
        <HealthMetricCard
          className="health-doctors-card"
          title="Số bác sĩ/trạm y tế"
          unit="Bác sĩ"
          value="2.501"
        />

        <article className="health-panel health-service-panel">
          <div className="health-card-title">Số bác sĩ và giường bệnh trên 1 vạn dân</div>
          <HealthPeriodSelect value="Năm 2026" />
          <p className="health-chart-note">Đơn vị: trên vạn dân - từng chỉ tiêu theo tháng riêng để trình lệch tỷ lệ</p>
          <div className="health-line-grid two">
            {healthServiceLines.map((item) => (
              <div className="health-line-item" key={item.label}>
                <h3>{item.label}</h3>
                <div>
                  <strong>{item.value}</strong>
                  <span>trên vạn dân</span>
                </div>
                <HealthMiniLineChart data={item} max={item.label.startsWith("Bác") ? 500 : 200} />
              </div>
            ))}
          </div>
        </article>

        <article className="health-panel health-screening-panel">
          <div className="health-card-title">Người dân khám sức khỏe định kỳ/sàng lọc miễn phí 2 lần/năm</div>
          <HealthPeriodSelect />
          <HealthGauge label="MỤC TIÊU: 55%" target="55%" />
        </article>

        <article className="health-panel health-exam-panel">
          <div className="health-card-title">Tổng số lượt khám bệnh</div>
          <HealthPeriodSelect />
          <div className="health-big-value">
            <strong>654</strong>
            <span>Lượt</span>
          </div>
          <p className="health-trend red">-5.5% <span>So với cùng kỳ</span></p>
          <HealthBarChart data={[1050, 940, 650, 440, 1210, 810, 360, 654]} unit="Lượt" />
        </article>

        <HealthLineGroup
          className="health-insurance-panel"
          items={healthInsuranceLines}
          max={10000}
          title="Số người tham gia BHXH, BHYT, BHTN"
        />

        <article className="health-panel health-revenue-panel">
          <div className="health-card-title">Thu BHXH, BHYT, BHTN</div>
          <HealthPeriodSelect />
          <div className="health-big-value">
            <strong>2.825</strong>
            <span>Tỷ đồng</span>
          </div>
          <p className="health-trend green">+5.6% <span>So với cùng kỳ</span></p>
          <HealthBarChart data={[1740, 1820, 1750, 2050, 2260, 2640, 3050, 2825]} max={5000} unit="Tỷ đồng" />
        </article>

        <HealthLineGroup
          className="health-beneficiary-panel"
          items={healthBeneficiaryLines}
          max={5000}
          title="Số người hưởng BHXH, BHYT, BHTN"
        />

        <article className="health-panel health-payment-panel">
          <div className="health-card-title">Chi trả BHXH, BHYT, BHTN</div>
          <HealthPeriodSelect />
          <div className="health-big-value">
            <strong>2.188</strong>
            <span>Tỷ đồng</span>
          </div>
          <p className="health-trend red">-5.7% <span>So với cùng kỳ</span></p>
          <HealthBarChart data={[1320, 1410, 1580, 1460, 1530, 1690, 2030, 2188]} max={5000} unit="Tỷ đồng" />
        </article>

        <article className="health-panel health-coverage-panel">
          <div className="health-card-title">Tỷ lệ bao phủ BHYT và tỷ lệ LLLĐ tham gia BHXH</div>
          <HealthPeriodSelect value="Quý I/2026" />
          <div className="health-gauge-row">
            <HealthGauge label="BAO PHỦ BHYT" />
            <HealthGauge label="LLLĐ THAM GIA BHXH" />
          </div>
        </article>

        <article className="health-panel health-poverty-panel">
          <div className="health-card-title">Hộ nghèo (giảm nghèo đa chiều, giảm hộ nghèo)</div>
          <HealthPeriodSelect value="Năm 2026" />
          <div className="health-gauge-row">
            <HealthGauge label="GIẢM NGHÈO ĐA CHIỀU" />
            <HealthGauge label="GIẢM HỘ NGHÈO" />
          </div>
        </article>
      </div>
    </section>
  );
}

const landMonths = ["T5/2026", "T6/2026", "T7/2026", "T8/2026"];
const mineralPeriods = ["Q2/25", "Q3/25", "Q4/25", "Q1/26", "Q2/26", "Q3/26", "Q hiện tại"];

type LandComboChartConfig = {
  barData: number[];
  barLegend: string;
  lineData: number[];
  lineLegend: string;
  lineMax: number;
  title: string;
};

function LandPeriodSelect({ value = "Tháng 1/2026" }: { value?: string }) {
  return (
    <label className="land-period">
      <span>Kỳ báo cáo</span>
      <select defaultValue={value} aria-label="Kỳ báo cáo">
        <option value="Tháng 1/2026">Tháng 1/2026</option>
        <option value="Quý 1/2026">Quý 1/2026</option>
        <option value="Quý 2/2026">Quý 2/2026</option>
      </select>
    </label>
  );
}

function LandComboChart({ chart }: { chart: LandComboChartConfig }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 850,
    color: ["#2f6df6", "#f5a10a"],
    grid: { left: 42, right: 52, top: 70, bottom: 64 },
    legend: {
      bottom: 18,
      left: 36,
      icon: "rect",
      itemGap: 42,
      itemHeight: 8,
      itemWidth: 13,
      textStyle: { color: "rgba(130, 151, 183, 0.9)", fontSize: 10, fontWeight: 700 },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      data: landMonths,
      axisLabel: { color: "rgba(122, 143, 174, 0.92)", fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: "rgba(122, 143, 174, 0.22)" } },
      axisTick: { show: false },
    },
    yAxis: [
      {
        type: "value",
        min: 0,
        max: 200,
        interval: 50,
        axisLabel: { color: "rgba(122, 143, 174, 0.9)", fontSize: 10 },
        splitLine: { lineStyle: { color: "rgba(86, 103, 132, 0.22)", type: "dashed" } },
      },
      {
        type: "value",
        min: 0,
        max: chart.lineMax,
        interval: chart.lineMax / 4,
        axisLabel: {
          color: "rgba(122, 143, 174, 0.9)",
          fontSize: 10,
          formatter: (value: number) => new Intl.NumberFormat("vi-VN").format(value),
        },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: chart.barLegend,
        type: "bar",
        barWidth: 70,
        data: chart.barData,
        itemStyle: { borderRadius: [3, 3, 0, 0], color: "#294dbb" },
      },
      {
        name: chart.lineLegend,
        type: "line",
        yAxisIndex: 1,
        data: chart.lineData,
        symbolSize: 8,
        lineStyle: { color: "#f5a10a", width: 3 },
        itemStyle: { color: "#f5a10a", borderColor: "#f5a10a" },
      },
    ],
  }), [chart]);

  return <EChart className="land-combo-chart" option={option} ariaLabel={chart.title} />;
}

function LandGauge({ color, label, value }: { color: "#16c993" | "#f5a10a"; label: string; value: number }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 900,
    series: [
      {
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        center: ["50%", "68%"],
        radius: "96%",
        axisLine: {
          lineStyle: {
            width: 22,
            color: [[value / 100, color], [1, "rgba(63, 78, 103, 0.58)"]],
          },
        },
        progress: { show: true, width: 22, itemStyle: { color } },
        pointer: { show: false },
        anchor: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, "20%"],
          formatter: (current: number) => `${current.toFixed(1).replace(".", ",")}%`,
          color,
          fontSize: 34,
          fontWeight: 900,
        },
        data: [{ value }],
      },
    ],
  }), [color, value]);

  return (
    <div className="land-gauge-item">
      <EChart className="land-gauge-chart" option={option} ariaLabel={label} />
      <span>MỤC TIÊU: 100%</span>
      <strong>{label}</strong>
    </div>
  );
}

function MineralTrendChart({
  color,
  data,
  label,
}: {
  color: "#16b58d" | "#f5a10a";
  data: number[];
  label: string;
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animationDuration: 850,
    color: [color],
    grid: { left: 44, right: 28, top: 28, bottom: 36 },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: mineralPeriods,
      axisLabel: { color: "rgba(126, 146, 178, 0.92)", fontSize: 10, fontWeight: 800 },
      axisLine: { lineStyle: { color: "rgba(126, 146, 178, 0.24)" } },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 500,
      interval: 125,
      axisLabel: { show: false },
      splitLine: { lineStyle: { color: "rgba(88, 105, 136, 0.2)", type: "dashed" } },
    },
    series: [
      {
        name: label,
        type: "line",
        data,
        smooth: true,
        symbolSize: 8,
        lineStyle: { width: 3 },
        areaStyle: { color: `${color}24` },
      },
    ],
  }), [color, data, label]);

  return <EChart className="mineral-trend-chart" option={option} ariaLabel={label} />;
}

function LandMineralsDashboard() {
  const comboCharts: LandComboChartConfig[] = [
    {
      title: "Số Giấy CNQSDĐ và tài sản khác gắn liền với đất được cấp mới",
      barLegend: "Số giấy CN được cấp mới",
      lineLegend: "Diện tích cấp mới (ha)",
      barData: [116, 96, 99, 72],
      lineData: [800, 1400, 1900, 2400],
      lineMax: 5000,
    },
    {
      title: "Lũy kế số Giấy CNQSDĐ và diện tích cấp mới",
      barLegend: "Lũy kế số giấy CN được cấp mới",
      lineLegend: "Lũy kế diện tích cấp mới",
      barData: [102, 97, 103, 214],
      lineData: [1250, 1900, 2380, 2050],
      lineMax: 5000,
    },
  ];

  return (
    <section className="land-minerals-dashboard" aria-label="Đất đai, khoáng sản">
      <div className="land-minerals-grid">
        {comboCharts.map((chart) => (
          <article className="land-panel land-chart-panel" key={chart.title}>
            <h3>{chart.title}</h3>
            <span className="land-unit">Trục VT: Cột (trái) - Đường (phải)</span>
            <LandPeriodSelect />
            <LandComboChart chart={chart} />
            <p className="land-note">Tháng - 2 chỉ tiêu khác đơn vị cùng 1 sự việc - combo 2 trục</p>
          </article>
        ))}

        <article className="land-panel land-gauge-panel">
          <h3>Tỷ lệ đáp ứng nhu cầu khoáng sản (nhóm III & IV)</h3>
          <LandPeriodSelect value="Quý 1/2026" />
          <div className="land-gauge-row">
            <LandGauge color="#16c993" label="Nhóm III" value={90.9} />
            <LandGauge color="#f5a10a" label="Nhóm IV" value={82.6} />
          </div>
        </article>

        <article className="land-panel land-mineral-panel">
          <h3>Khối lượng khoáng sản đã cấp (nhóm III & IV)</h3>
          <span className="land-unit">Đơn vị: m<sup>3</sup> - 2 biểu đồ đường xu hướng độc lập</span>
          <LandPeriodSelect value="Quý 1/2026" />
          <div className="land-mineral-metrics">
            <strong className="green">Nhóm III <b>350,6 m<sup>3</sup></b></strong>
            <strong className="amber">Nhóm IV <b>451,9 m<sup>3</sup></b></strong>
          </div>
          <div className="mineral-chart-block green">
            <span>Xu hướng Nhóm III</span>
            <MineralTrendChart color="#16b58d" data={[148, 172, 238, 258, 284, 342, 414]} label="Xu hướng Nhóm III" />
          </div>
          <div className="mineral-chart-block amber">
            <span>Xu hướng Nhóm IV</span>
            <MineralTrendChart color="#f5a10a" data={[86, 112, 138, 182, 226, 276, 318]} label="Xu hướng Nhóm IV" />
          </div>
          <p className="land-note">m<sup>3</sup> - Quý - Tách 2 nhóm khoáng sản thành 2 biểu đồ đường riêng biệt</p>
        </article>
      </div>
    </section>
  );
}

void GrdpDashboardDesign;
void GrdpDashboardV2;
void revenueFocus;
void revenueSourceRows;
void revenueAreaRows;
void revenueTaskRows;
void expenseFocus;
void expenseStructureRows;
void expenseAreaRows;
void expensePieItems;
void expenseTaskRows;
void investmentFocus;
void investmentCapitalRows;
void investmentAreaRows;
void investmentPieItems;
void investmentTaskRows;

export function DashboardPage() {
  const [activeCategory, setActiveCategory] = useState("resolution-tasks");
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

      {activeCategory === "overview" || !activeData ? (
        <OverviewDashboard />
      ) : activeCategory === "grdp" ? (
        <GrdpDashboard />
      ) : activeCategory === "revenue" ? (
        <RevenueDashboard />
      ) : activeCategory === "expense" ? (
        <ExpenseDashboard />
      ) : activeCategory === "investment" ? (
        <InvestmentDashboard />
      ) : activeCategory === "trade-service" ? (
        <TradeServiceDashboard />
      ) : activeCategory === "enterprise-coop" ? (
        <EnterpriseCoopDashboard />
      ) : activeCategory === "investment-attraction" ? (
        <InvestmentAttractionDashboard />
      ) : activeCategory === "agriculture" ? (
        <AgricultureDashboard />
      ) : activeCategory === "industrial-products" ? (
        <IndustrialProductsDashboard />
      ) : activeCategory === "internal-admin-labor" ? (
        <InternalAdminLaborDashboard />
      ) : activeCategory === "key-projects" ? (
        <KeyProjectsDashboard />
      ) : activeCategory === "health-social" ? (
        <HealthDashboard />
      ) : activeCategory === "education" ? (
        <EducationDashboard />
      ) : activeCategory === "planning-public-assets" ? (
        <PlanningPublicAssetsDashboard />
      ) : activeCategory === "land-minerals" ? (
        <LandMineralsDashboard />
      ) : activeCategory === "resolution-tasks" ? (
        <ResolutionTasksDashboard />
      ) : activeCategory === "socio-economic-57" ? (
        <SocioEconomic57Dashboard />
      ) : (
        <DetailDashboard data={activeData} />
      )}
    </main>
  );
}
