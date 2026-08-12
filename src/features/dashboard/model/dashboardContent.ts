import * as echarts from "echarts/core";
import haTinhGeoJson from "./geo/haTinh.json";

export { haTinhGeoJson };

export type KpiItem = {
  label: string;
  value: string;
  unit: string;
  trend: string;
  tone?: "green" | "amber" | "cyan" | "red" | "white";
};

export type DetailData = {
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

export const overviewResolutionRows = [
  { name: "Nghị quyết số 57-NQ/TW", date: "22/12/2024", status: "Đang thực hiện" },
  { name: "Nghị quyết số 59-NQ/TW", date: "24/01/2025", status: "Đang thực hiện" },
  { name: "Nghị quyết số 66-NQ/TW", date: "10/04/2025", status: "Đang thực hiện" },
  { name: "Nghị quyết số 68-NQ/TW", date: "04/05/2025", status: "Đang thực hiện" },
  { name: "Nghị quyết số 70-NQ/TW", date: "20/08/2025", status: "Đang thực hiện" },
];

export type ResolutionTaskStatus = "Đúng hạn" | "Theo dõi" | "Hoàn thành" | "Quá hạn";

export type ResolutionFocusCard = {
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

export const resolutionFocusCards: ResolutionFocusCard[] = [
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

export const HA_TINH_MAP_NAME = "ha-tinh-province";

echarts.registerMap(HA_TINH_MAP_NAME, haTinhGeoJson as Parameters<typeof echarts.registerMap>[1]);

export const haTinhMapPoints = [
  { name: "Nghi Xuân", value: [105.78, 18.66, 2850] },
  { name: "Hương Sơn", value: [105.43, 18.38, 2350] },
  { name: "TX Hồng Lĩnh", value: [105.72, 18.54, 2650] },
  { name: "Đức Thọ", value: [105.62, 18.48, 2100] },
  { name: "Can Lộc", value: [105.77, 18.43, 1950] },
  { name: "Lộc Hà", value: [105.9, 18.45, 1720] },
  { name: "Vũ Quang", value: [105.36, 18.32, 1240] },
  { name: "TP. Hà Tĩnh", value: [105.9, 18.34, 3300] },
  { name: "Thạch Hà", value: [105.86, 18.35, 1880] },
  { name: "Hương Khê", value: [105.69, 18.18, 1450] },
  { name: "Cẩm Xuyên", value: [106.0, 18.25, 2180] },
];

export const detailSeeds = [
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

export function toKpiItems(items: ReadonlyArray<readonly [string, string, string, string]>): KpiItem[] {
  return items.map(([label, value, unit, trend], index) => ({
    label,
    value,
    unit,
    trend,
    tone: index === 3 ? "amber" : index === 2 ? "cyan" : "green",
  }));
}

export function buildDetailData(): Record<string, DetailData> {
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

export const detailData = buildDetailData();

export const grdpFocus = [
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

export const grdpSectorRows = [
  { label: "Công nghiệp - xây dựng", value: "44,8", unit: "%", tone: "green" },
  { label: "Dịch vụ", value: "36,4", unit: "%", tone: "cyan" },
  { label: "Nông, lâm nghiệp và thủy sản", value: "12,6", unit: "%", tone: "amber" },
  { label: "Thuế sản phẩm trừ trợ cấp", value: "6,2", unit: "%", tone: "white" },
] as const;

export const grdpAreaRows = [
  { label: "TP Hà Tĩnh", value: 92, amount: "15.624", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 88, amount: "13.240", tone: "cyan" as const },
  { label: "Hương Sơn", value: 76, amount: "9.816", tone: "amber" as const },
  { label: "Cẩm Xuyên", value: 68, amount: "8.472", tone: "red" as const },
];

export const grdpTaskRows = [
  { name: "Cập nhật số liệu GRDP theo ngành", date: "11/08/2026", status: "Đúng hạn" },
  { name: "Rà soát kịch bản tăng trưởng quý III", date: "09/08/2026", status: "Đang xử lý" },
  { name: "Tổng hợp vốn đầu tư toàn xã hội", date: "07/08/2026", status: "Đôn đốc" },
  { name: "Đối chiếu thu nhập bình quân đầu người", date: "05/08/2026", status: "Đúng hạn" },
];

export const revenueFocus = [
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

export const revenueSourceRows = [
  { label: "Thuế, phí và lệ phí", value: "48,6", unit: "%", tone: "green" },
  { label: "Thu tiền sử dụng đất", value: "22,4", unit: "%", tone: "amber" },
  { label: "Xuất, nhập khẩu", value: "18,9", unit: "%", tone: "cyan" },
  { label: "Thu khác ngân sách", value: "10,1", unit: "%", tone: "white" },
] as const;

export const revenueAreaRows = [
  { label: "TP Hà Tĩnh", value: 94, amount: "3.842", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 88, amount: "2.614", tone: "cyan" as const },
  { label: "Nghi Xuân", value: 76, amount: "1.928", tone: "amber" as const },
  { label: "Cẩm Xuyên", value: 63, amount: "1.204", tone: "red" as const },
];

export const revenueTaskRows = [
  { name: "Rà soát tiến độ thu nội địa", date: "11/08/2026", status: "Đúng hạn" },
  { name: "Đối chiếu khoản thu xuất nhập khẩu", date: "10/08/2026", status: "Đang xử lý" },
  { name: "Cập nhật thu tiền thuê đất, sử dụng đất", date: "08/08/2026", status: "Đôn đốc" },
  { name: "Tổng hợp báo cáo dự toán ngân sách", date: "05/08/2026", status: "Đúng hạn" },
];

export const expenseFocus = [
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

export const expenseStructureRows = [
  { label: "Chi thường xuyên", value: "60,7", unit: "%", tone: "green" },
  { label: "Chi đầu tư phát triển", value: "32,7", unit: "%", tone: "cyan" },
  { label: "Chi trả nợ, viện trợ", value: "4,2", unit: "%", tone: "amber" },
  { label: "Chi bổ sung quỹ dự phòng", value: "2,4", unit: "%", tone: "white" },
] as const;

export const expenseAreaRows = [
  { label: "TP Hà Tĩnh", value: 91, amount: "1.486", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 84, amount: "1.204", tone: "cyan" as const },
  { label: "Cẩm Xuyên", value: 73, amount: "986", tone: "amber" as const },
  { label: "Hương Khê", value: 61, amount: "742", tone: "red" as const },
];

export const expensePieItems = [
  { label: "Chi thường xuyên", value: 61, tone: "#16d196" },
  { label: "Chi đầu tư", value: 33, tone: "#63c7ff" },
  { label: "Chi khác", value: 6, tone: "#f4b45e" },
];

export const expenseTaskRows = [
  { name: "Rà soát tiến độ giải ngân chi đầu tư", date: "11/08/2026", status: "Đang xử lý" },
  { name: "Đối chiếu chứng từ chi thường xuyên", date: "10/08/2026", status: "Đúng hạn" },
  { name: "Tổng hợp hồ sơ thanh toán qua kho bạc", date: "08/08/2026", status: "Đúng hạn" },
  { name: "Cập nhật cân đối ngân sách địa phương", date: "05/08/2026", status: "Đôn đốc" },
];

export const investmentFocus = [
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

export const investmentCapitalRows = [
  { label: "Vốn ngân sách tỉnh", value: "54,2", unit: "%", tone: "green" },
  { label: "Vốn ngân sách Trung ương", value: "26,8", unit: "%", tone: "cyan" },
  { label: "Vốn chương trình mục tiêu", value: "12,4", unit: "%", tone: "amber" },
  { label: "Nguồn vốn khác", value: "6,6", unit: "%", tone: "white" },
] as const;

export const investmentAreaRows = [
  { label: "TP Hà Tĩnh", value: 92, amount: "284", tone: "green" as const },
  { label: "TX Kỳ Anh", value: 86, amount: "246", tone: "cyan" as const },
  { label: "Cẩm Xuyên", value: 74, amount: "198", tone: "amber" as const },
  { label: "Hương Khê", value: 58, amount: "142", tone: "red" as const },
];

export const investmentPieItems = [
  { label: "Đã giải ngân", value: 61, tone: "#16d196" },
  { label: "Đang thực hiện", value: 24, tone: "#63c7ff" },
  { label: "Cần đôn đốc", value: 9, tone: "#f4b45e" },
  { label: "Chậm tiến độ", value: 6, tone: "#ff6f91" },
];

export const investmentTaskRows = [
  { name: "Rà soát giải ngân các dự án chuyển tiếp", date: "11/08/2026", status: "Đúng hạn" },
  { name: "Tháo gỡ vướng mắc giải phóng mặt bằng", date: "10/08/2026", status: "Đang xử lý" },
  { name: "Cập nhật kế hoạch vốn sau điều chỉnh", date: "08/08/2026", status: "Đôn đốc" },
  { name: "Tổng hợp danh mục dự án khởi công mới", date: "05/08/2026", status: "Đúng hạn" },
];

export const investmentAttractionMonths = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8"];
export const investmentAttractionProjects = [62, 76, 92, 57, 99, 77, 84, 91];
export const investmentAttractionCapital = [1234, 1532, 1872, 1125, 1976, 1543, 1688, 1814];

export const trendLabels = ["T1", "T2", "T3", "T4", "T5", "T6"];
export const grdpDesignQuarterLabels = ["Quý 4/2025", "Quý 1/2026", "Quý 2/2026", "Quý 3/2026"];
export const grdpDesignPieItems = [
  { label: "Công nghiệp, xây dựng", value: 55, tone: "#58c08a" },
  { label: "Nông nghiệp", value: 30, tone: "#f0aa3a" },
  { label: "Dịch vụ", value: 15, tone: "#5b7df2" },
];

export const industrialMonths = ["T5/2026", "T6/2026", "T7/2026", "T8/2026"];

export type IndustrialChartConfig = {
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

export const industrialCharts: IndustrialChartConfig[] = [
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

export const keyProjectRows = [
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

export const keyProjectMonths = ["T3/2026", "T4/2026", "T5/2026", "T6/2026", "T7/2026", "T8/2026"];

export const agriculturePeriods = ["Q4/2025", "Q1/2026", "Q2/2026", "Q3/2026"];

export type AgricultureChartConfig = {
  max: number;
  series: Array<{
    color: string;
    data: number[];
    name: string;
  }>;
  title: string;
  unit: string;
};

export const agricultureCharts: AgricultureChartConfig[] = [
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
