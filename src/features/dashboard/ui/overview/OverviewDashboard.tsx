import { type ReactNode, useMemo } from "react";
import type { EChartsCoreOption } from "echarts/core";
import EChart from "@/shared/components/EChart";
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
import { useIocReport } from "../../hooks/useIocReport";
import { getCurrentReportingPeriod } from "../../model/reportingPeriod";
import { pickIocNumber, pickIocValue } from "../../services/iocReportService";
import { MapCanvas } from "../shared/MapCanvas";

const resolutionRows = [
  { name: "Nghị Quyết Số 57-NQ/TW", date: "22/12/2024", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 59-NQ/TW", date: "24/01/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 66-NQ/TW", date: "10/04/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 68-NQ/TW", date: "04/05/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 70-NQ/TW", date: "20/08/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 71-NQ/TW", date: "22/08/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 72-NQ/TW", date: "09/09/2025", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 79-NQ/TW", date: "06/01/2026", status: "Đang Thực Hiện" },
  { name: "Nghị Quyết Số 80-NQ/TW", date: "07/01/2026", status: "Đang Thực Hiện" },
];

const targetRows = [
  { name: "003_NQ66 - Xây dựng, ban hành và chỉ đạo thực hiện Chương trình hành động thực hiện Nghị quyết số 66-NQ/TW", date: "31/05/2025", status: "Đã hoàn thành" },
  { name: "004_NQ66 - Quán triệt trách nhiệm của các cấp ủy đảng trong lãnh đạo toàn diện, trực tiếp việc thể chế hoá chủ trương, đường lối của Đảng thành pháp luật và tăng cường kiểm tra, giám sát công tác này; thống nhất nhận thức việc xây dựng, hoàn thiện thể chế, pháp luật và kiểm tra, giám sát việc tổ chức thi hành pháp luật là nhiệm vụ trọng tâm, xuyên suốt, thường xuyên của các bộ, ngành trung ương; đảm bảo mỗi cán bộ, đảng viên phải gương mẫu, đi đầu trong chấp hành và tuân thủ pháp luật, lan tỏa tinh thần thượng tôn Hiến pháp, pháp luật", date: "—", status: "Đang thực hiện" },
  { name: "005_NQ66 - Thực hiện nghiêm kỷ cương, kỷ luật, các quy định về kiểm soát quyền lực, phòng, chống tham nhũng, lãng phí, tiêu cực, “lợi ích nhóm” trong xây dựng và thi hành pháp luật, gắn với triển khai thực hiện Quy định số 178-QĐ/TW, ngày 27 tháng 6 năm 2024 của Bộ Chính trị", date: "—", status: "Đang thực hiện" },
  { name: "015_NQ66 - Rà soát, hoàn thiện pháp luật về điều kiện đầu tư kinh doanh theo hướng cắt giảm ít nhất 30% điều kiện đầu tư kinh doanh bảo đảm nguyên tắc cân đối, hợp lý giữa mức độ hạn chế quyền với lợi ích chính đáng đạt được", date: "31/12/2025", status: "Đã hoàn thành" },
  { name: "023_NQ66 - Phát huy cao độ tinh thần phục vụ Nhân dân, tư duy kiến tạo phát triển, hành động vì lợi ích chung của đội ngũ cán bộ, công chức, viên chức; thực hiện nhất quán quan điểm người dân và doanh nghiệp được làm những gì luật không cấm", date: "—", status: "Đang thực hiện" },
  { name: "024_NQ66 - Xây dựng văn hóa tuân thủ pháp luật, bảo đảm thượng tôn Hiến pháp và pháp luật trở thành chuẩn mực ứng xử của mọi chủ thể trong xã hội", date: "—", status: "Đang thực hiện" },
  { name: "027_NQ66 - Thực hiện thường xuyên, hiệu quả công tác kiểm tra, xử lý; rà soát, hợp nhất, hệ thống hóa văn bản quy phạm pháp luật theo quy định", date: "—", status: "Đang thực hiện" },
  { name: "029_NQ66 - Thường xuyên đánh giá hiệu quả của pháp luật sau ban hành (Kiểm tra có trọng tâm, trọng điểm công tác tổ chức thi hành pháp luật; tăng cường các hoạt động điều tra, khảo sát)", date: "—", status: "Đang thực hiện" },
  { name: "032_NQ66 - Nâng cao năng lực của các cơ quan, tổ chức Việt Nam để bảo đảm thực hiện đầy đủ các nghĩa vụ pháp lý quốc tế, định hình trật tự pháp lý quốc tế", date: "—", status: "Đang thực hiện" },
  { name: "045_NQ66 - Lồng ghép nội dung phổ biến, giáo dục pháp luật vào phong trào “học tập số”", date: "—", status: "Đang thực hiện" },
  { name: "050_NQ66 - Rà soát, cập nhật lại các quy chế, quy định đảm bảo gắn trách nhiệm lãnh đạo, chỉ đạo và thực hiện công tác xây dựng pháp luật với công tác đánh giá, khen thưởng, sử dụng cán bộ và có chế tài, biện pháp xử lý đối với người không thực hiện đầy đủ", date: "—", status: "Đang thực hiện" },
  { name: "052_NQ66 - Các cấp ủy địa phương quan tâm phân công cấp ủy viên phụ trách công tác tư pháp và cơ cấu giám đốc Sở Tư pháp tham gia cấp ủy cấp tỉnh", date: "—", status: "Đã hoàn thành" },
  { name: "053_NQ66 - Điều động, luân chuyển cán bộ, công chức của bộ, ngành Tư pháp đi địa phương và làm việc ở bộ, ngành Trung ương để bổ sung kinh nghiệm thực tiễn", date: "—", status: "Đã hoàn thành" },
  { name: "068_NQ66 - Hoàn thiện các quy định pháp luật có liên quan, xây dựng Nghị quyết của Quốc hội về cơ chế phối hợp, chính sách đặc thù nâng cao hiệu quả phòng ngừa và giải quyết tranh chấp đầu tư quốc tế", date: "31/12/2025", status: "Đã hoàn thành" },
  { name: "001_NQ79 - Quán triệt đầy đủ, sâu sắc tới toàn thể công chức, viên chức, người lao động về quan điểm, chủ trương của Đảng đối với phát triển kinh tế nhà nước; đổi mới mạnh mẽ tư duy trong lãnh đạo, chỉ đạo; chuyển mạnh từ quản lý hành chính sang kiến tạo phát triển, quản trị hiện đại, hành động quyết liệt.", date: "—", status: "Đã hoàn thành" },
  { name: "002_NQ79 - Xây dựng kế hoạch triển khai Chương trình hành động của Chính phủ với các mục tiêu được lượng hóa cụ thể; giao trách nhiệm người đứng đầu các cơ quan.", date: "31/03/2026", status: "Đã hoàn thành" },
  { name: "098_NQ79 - Xây dựng và trình ban hành tiêu chí xếp hạng các đơn vị sự nghiệp công lập theo quy định của pháp luật chuyên ngành.", date: "31/12/2026", status: "Đang thực hiện" },
  { name: "005_NQ79 - Phối hợp giữa các cơ quan quản lý nhà nước trong kiểm tra, thanh tra, kiểm toán; tránh chồng chéo, trùng lặp, ảnh hưởng tới hoạt động của các cơ quan, tổ chức kinh tế nhà nước.", date: "—", status: "Đang thực hiện" },
  { name: "003_NQ79 - Xây dựng và thực thi chính sách, pháp luật công bằng, minh bạch theo cơ chế thị trường trong khai thác và sử dụng nguồn lực quốc gia.", date: "—", status: "Đang thực hiện" },
  { name: "007_NQ79 - Tăng cường hoạt động đối thoại; tiếp nhận, lắng nghe phản ánh, kiến nghị để giải quyết kịp thời khó khăn, vướng mắc hoặc báo cáo cơ quan có thẩm quyền để giải quyết.", date: "—", status: "Đang thực hiện" },
  { name: "004_NQ79 - Phối hợp với Bộ Công an khai thác, sử dụng cơ sở dữ liệu quốc gia để kịp thời giám sát, đánh giá hiệu quả quản lý, sử dụng vốn, tài sản, nguồn lực nhà nước, làm căn cứ cho hoạch định chính sách, phân bổ và điều tiết nguồn lực.", date: "—", status: "Đang thực hiện" },
  { name: "008_NQ79 - Xây dựng và tổ chức triển khai chương trình tuyên truyền thường xuyên, sâu rộng về nội dung Nghị quyết số 79-NQ/TW và vai trò của kinh tế nhà nước theo hướng đa dạng hóa các hình thức, phương thức tuyên truyền; cụ thể hóa nội dung tuyên truyền cho từng nhóm đối tượng. Xây dựng chương trình truyền thông chuyên đề về phát triển kinh tế nhà nước trên đài truyền hình, phát thanh, trên các mạng xã hội, báo điện tử.", date: "—", status: "Đang thực hiện" },
  { name: "049_NQ79 - Thực hiện nghiêm việc không hình thành mới quỹ tài chính nhà nước ngoài ngân sách, trừ các trường hợp cấp bách, cấp thiết theo yêu cầu của Bộ Chính trị, Ban Chấp hành Trung ương Đảng.", date: "—", status: "Đang thực hiện" },
  { name: "095_NQ79 - Thực hiện chuyển mạnh từ cấp trực tiếp kinh phí cho các đơn vị sự nghiệp công lập sang hỗ trợ trực tiếp cho đối tượng chính sách theo hướng tính đúng, tính đủ chi phí khi sử dụng dịch vụ sự nghiệp công cơ bản, thiết yếu, gắn với cơ chế kiểm soát.", date: "—", status: "Đang thực hiện" },
  { name: "006_NQ79 - Xây dựng cơ chế đủ mạnh để bảo vệ cán bộ dám nghĩ, dám làm, dám chịu trách nhiệm vì lợi ích chung trong các trường hợp không có yếu tố tham nhũng, vụ lợi. Thiết lập quy trình xem xét độc lập, toàn diện và minh bạch để đánh giá bản chất vụ việc là sai sót khách quan hay vi phạm pháp luật nhằm xử lý đúng người, đúng tội.", date: "—", status: "Đang thực hiện" },
  { name: "099_NQ79 - Triển khai ứng dụng công nghệ số để người dân trực tiếp đánh giá chất lượng, hiệu quả, mức độ hài lòng đối với các dịch vụ sự nghiệp công.", date: "—", status: "Đang thực hiện" },
  { name: "107_NQ79 - Quyết liệt triển khai chương trình đã đề ra. Ưu tiên bố trí đầy đủ nguồn lực tài chính và nhân lực để thực hiện; thường xuyên kiểm tra, đôn đốc, giám sát, bảo đảm thực hiện đúng tiến độ, chất lượng các mục tiêu, nhiệm vụ, giải pháp trong chương trình hành động. Định kỳ hàng năm báo cáo tình hình thực hiện Nghị quyết gửi Bộ Tài chính tổng hợp, báo cáo Chính phủ.", date: "—", status: "Đang thực hiện" },
  { name: "039_NQ79 - Triển khai hiệu quả quy hoạch tổng thể hệ thống kho dự trữ quốc gia thời kỳ 2021 - 2030, tầm nhìn đến năm 2050 đã được phê duyệt tại Quyết định số 214/QĐ-TTg ngày 20/10/2025 của Thủ tướng Chính phủ.", date: "—", status: "Đang thực hiện" },
  { name: "040_NQ79 - Nghiên cứu, xây dựng cơ chế hợp tác quốc tế, khu vực như cơ chế dự trữ chung,... để đa dạng hóa các loại hình dự trữ, tiết kiệm chi phí.", date: "—", status: "Đang thực hiện" },
  { name: "046_NQ79 - Rà soát, hoàn thiện quy định của pháp luật liên quan đến hoạt động của các quỹ tài chính nhà nước ngoài ngân sách nhằm tăng cường hiệu quả, hiệu lực quản lý các quỹ tài chính nhà nước ngoài ngân sách.", date: "—", status: "Đang thực hiện" },
  { name: "047_NQ79 - Khẩn trương rà soát, sáp nhập, giải thể các quỹ ngoài ngân sách trùng lặp, kém hiệu quả, không phù hợp với yêu cầu phát triển; giảm đầu mối để tăng quy mô, nâng cao hiệu quả sử dụng vốn của các quỹ; tăng cường kiểm tra, giám sát tình hình quản lý, sử dụng các quỹ; đẩy mạnh số hóa, công khai thông tin và kết quả hoạt động.", date: "31/12/2030", status: "Đang thực hiện" },
  { name: "048_NQ79 - Xây dựng và thực hiện kế hoạch cải cách quỹ tài chính nhà nước ngoài ngân sách theo hướng: (i) Ủy thác quản lý tài chính quỹ cho các tổ chức ngân hàng, công ty tài chính chuyên nghiệp; (ii) Cơ quan nhà nước chỉ tập trung xây dựng tiêu chí, điều kiện huy động và giải ngân vốn từ quỹ; (iii) Huy động nguồn lực xã hội hóa và giảm phụ thuộc vào ngân sách.", date: "—", status: "Đang thực hiện" },
  { name: "050_NQ79 - Các bộ, ngành, địa phương xây dựng và triển khai kế hoạch chuyển giao vốn nhà nước đầu tư tại doanh nghiệp do Nhà nước nắm giữ từ 50% vốn điều lệ trở xuống cho doanh nghiệp có chức năng kinh doanh và đầu tư vốn nhà nước, doanh nghiệp nhà nước cùng ngành nghề để quản lý, đầu tư phát triển, thực hiện trách nhiệm của chủ sở hữu đối với phần vốn góp của Nhà nước tại doanh nghiệp (tái cơ cấu, bổ sung vốn hoặc thoái vốn), bảo đảm hiệu quả nguồn vốn đầu tư của Nhà nước.", date: "31/12/2030", status: "Đang thực hiện" },
  { name: "060_NQ79 - Khẩn trương rà soát, xử lý các dự án đầu tư yếu kém, doanh nghiệp thua lỗ kéo dài; xác định rõ và xử lý trách nhiệm của tổ chức, cá nhân có liên quan theo quy định, tạo điều kiện để doanh nghiệp thực hiện thủ tục phá sản hoặc tiếp tục tái cơ cấu, hoạt động lành mạnh trở lại, tránh để kéo dài gây lãng phí, thất thoát tài sản, nguồn vốn, giảm thiểu thiệt hại cho nhà nước, doanh nghiệp.", date: "—", status: "Đang thực hiện" },
  { name: "080_NQ79 - Rà soát hệ thống các văn bản quy phạm pháp luật liên quan đến hoạt động của các ngân hàng chính sách theo chức năng, nhiệm vụ được giao; báo cáo cấp có thẩm quyền xem xét, quyết định các nội dung vượt thẩm quyền, vướng mắc phát sinh (nếu có) nhằm nâng cao hiệu quả hoạt động tín dụng chính sách phục vụ nhu cầu đầu tư, an sinh xã hội, phát triển kinh tế đất nước.", date: "—", status: "Đang thực hiện" },
  { name: "094_NQ79 - Thực hiện phân loại các đơn vị theo mức độ tự chủ và tính chất nhiệm vụ; xây dựng phương án sáp nhập, hợp nhất hoặc tổ chức lại các đơn vị chưa tự chủ, hoạt động kém hiệu quả; chuyển đổi đơn vị sự nghiệp công lập trong các ngành, lĩnh vực phù hợp sang mô hình doanh nghiệp do Nhà nước nắm giữ 100% vốn điều lệ.", date: "31/12/2027", status: "Đang thực hiện" },
  { name: "096_NQ79 - Xây dựng và triển khai kế hoạch kiểm định, đánh giá độc lập và công khai kết quả chất lượng dịch vụ sự nghiệp công theo tiêu chuẩn, tiêu chí do bộ quản lý chuyên ngành, lĩnh vực ban hành.", date: "31/12/2030", status: "Đang thực hiện" },
  { name: "097_NQ79 - Khẩn trương rà soát, sắp xếp danh mục dịch vụ sự nghiệp công sử dụng ngân sách nhà nước.", date: "31/12/2030", status: "Đang thực hiện" },
  { name: "106_NQ79 - Xây dựng kế hoạch thực hiện Nghị quyết này trên cơ sở rà soát các chương trình, kế hoạch thực hiện các Nghị quyết của Đảng, Chương trình hành động của Chính phủ liên quan đến phát triển kinh tế nhà nước để điều chỉnh đồng bộ thống nhất.", date: "31/03/2026", status: "Đã hoàn thành" },
  { name: "004_NQ70 - Nâng cao hiệu lực, hiệu quả quản lý nhà nước trong ngành năng lượng; phân định rõ trách nhiệm, quyền hạn, cơ chế phối hợp giữa các bộ, ngành trung ương và địa phương, bảo đảm sự lãnh đạo, chỉ đạo, điều hành tập trung, đồng bộ, thống nhất từ trung ương tới địa phương.", date: "31/12/2025", status: "Đang thực hiện - Quá hạn" },
  { name: "005_NQ70 - Tăng cường công tác kiểm tra, giám sát việc thực hiện các chủ trương của Đảng, chính sách, pháp luật của Nhà nước về bảo đảm an ninh năng lượng quốc gia, nhất là đối với các quy hoạch năng lượng; bảo đảm chất lượng, tiến độ các dự án phát triển năng lượng.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "003_NQ70 - Xây dựng, ban hành và chỉ đạo thực hiện chương trình, kế hoạch triển khai thực hiện Nghị quyết số 70-NQ/TW; các cấp ủy đảng và chính quyền các cấp xác định rõ phát triển năng lượng quốc gia là nhiệm vụ quan trọng, xuyên suốt, cần nghiêm túc lãnh đạo, chỉ đạo, tổ chức triển khai thực hiện hiệu quả.", date: "31/10/2025", status: "Đã hoàn thành - Quá hạn" },
  { name: "038_NQ70 - Cải cách triệt để các thủ tục hành chính, cắt giảm 30 - 50% thời gian thực hiện, chi phí tuân thủ và điều kiện kinh doanh, tạo môi trường thuận lợi trong đầu tư, kinh doanh, xây dựng, vận hành các dự án năng lượng.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "019_NQ70 - Hoàn thiện chính sách tài chính theo hướng huy động tối đa các nguồn vốn đầu tư tư nhân, đầu tư nước ngoài vào các dự án trong lĩnh vực năng lượng theo hình thức nhà đầu tư độc lập hoặc đối tác công tư (PPP).", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "028_NQ70 - Hoàn thiện cơ chế phòng, chống tham nhũng, lãng phí, tiêu cực, lợi ích nhóm, nhất là trong đầu tư, mua sắm, đấu thầu, triển khai các dự án năng lượng, nhất là các dự án nguồn điện và lưới điện truyền tải.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "029_NQ70 - Nâng cao chất lượng công tác xây dựng chiến lược, quy hoạch phát triển năng lượng, đặc biệt trong ngành điện, bảo đảm tính ổn định, đồng bộ, gắn kết với chiến lược, kế hoạch phát triển kinh tế - xã hội của địa phương và các ngành khác; quy hoạch năng lượng có tính mở, có trọng tâm, trọng điểm, bảo đảm phục vụ phát triển, phân phối hài hòa cho các ngành, lĩnh vực, vùng miền.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "018_NQ70 - Rà soát, hoàn thành việc tháo gỡ các điểm nghẽn về thể chế trong quy hoạch, cấp phép, huy động vốn,... cho các dự án về năng lượng; có cơ chế, chính sách đặc thù vượt trội để thu hút và triển khai các dự án năng lượng quan trọng, cấp bách của quốc gia.", date: "31/12/2025", status: "Đang thực hiện - Quá hạn" },
  { name: "051_NQ70 - Có chế tài nghiêm khắc đối với các nhà đầu tư đăng ký phát triển các dự án năng lượng nhưng chậm hoặc không triển khai làm ảnh hưởng đến an ninh năng lượng quốc gia.", date: "31/12/2026", status: "Đang thực hiện - Đúng hạn" },
  { name: "065_NQ70 - Đối với điện đồng phát, điện tận dụng nhiệt dư, khí dư, sinh khối, rác thải và chất thải rắn: Khai thác tối đa nguồn điện đồng phát sinh khối; đẩy mạnh phát triển các nguồn điện từ xử lý rác thải đô thị, chất thải rắn và sinh khối; khuyến khích phát điện từ thu hồi khí dư, nhiệt dư, nước dư của các nhà máy; các loại hình nguồn điện này được phát triển không bị giới hạn bởi quy mô quy hoạch.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "063_NQ70 - Đối với điện gió và điện mặt trời: ưu tiên phát triển phù hợp với khả năng bảo đảm an toàn hệ thống với giá thành điện hợp lý, đặc biệt là các nguồn điện tự sản xuất, tự tiêu thụ, điện mặt trời mái nhà. Khẩn trương xây dựng chính sách tháo gỡ khó khăn, chính sách pháp lý hỗ trợ và cơ chế đột phá cho phát triển điện gió ngoài khơi.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "064_NQ70 - Đối với nhiệt điện: Phát triển nhiệt điện khí, ưu tiên sử dụng nguồn khí trong nước; khẩn trương rà soát, tháo gỡ khó khăn để thúc đẩy triển khai các dự án điện khí, LNG, nhất là cơ chế về giá mua bán điện.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "062_NQ70 - Đối với thủy điện: Phát huy, mở rộng tối đa công suất của các nhà máy hiện có. Tiếp tục phát triển có chọn lọc một số thủy điện nhỏ và vừa, đẩy nhanh tiến độ các dự án thủy điện tích năng.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "050_NQ70 - Khẩn trương tháo gỡ khó khăn, vướng mắc, đẩy nhanh tiến độ triển khai các dự án năng lượng trọng điểm, đặc biệt là các dự án nguồn điện và lưới điện truyền tải.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "052_NQ70 - Tăng cường công tác chỉ đạo, đôn đốc, thanh tra, kiểm tra, giám sát quá trình thực hiện các dự án đầu tư trong lĩnh vực năng lượng.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "047_NQ70 - Theo dõi tình hình thực hiện Chiến lược phát triển ngành điện, quy hoạch và kế hoạch phát triển điện lực.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "049_NQ70 - Triển khai xây dựng và hình thành Trung tâm công nghiệp năng lượng quốc gia tích hợp khí, khí hóa lỏng, điện, lọc, hóa dầu, năng lượng tái tạo tại các địa phương có lợi thế.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "054_NQ70 - Về dầu khí: Phát triển công nghiệp khí; ưu tiên đầu tư hạ tầng kỹ thuật phục vụ nhập khẩu, dự trữ và tiêu thụ LNG.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "074_NQ70 - Về tăng cường dự trữ năng lượng chiến lược, lưu trữ năng lượng: Đầu tư xây dựng hệ thống kho dự trữ quốc gia về dầu thô, xăng dầu, khí đốt và than phù hợp với nhu cầu phát triển kinh tế - xã hội và an ninh năng lượng quốc gia cả trên đất liền và trên biển.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "075_NQ70 - Về tăng cường dự trữ năng lượng chiến lược, lưu trữ năng lượng: Phát triển hệ thống lưu trữ năng lượng phù hợp với tỉ lệ năng lượng tái tạo ngày càng cao hơn để nâng cao độ tin cậy và sự ổn định của hệ thống điện.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "090_NQ70 - Thiết lập hệ thống quản trị và ứng phó với rủi ro; xây dựng và cập nhật thường xuyên kịch bản, thực hiện các giải pháp ứng phó với biến đổi khí hậu, phòng, chống thiên tai ngay từ quá trình lựa chọn vị trí dự án, thiết kế, xây dựng công trình đến sản xuất, vận hành, bảo đảm an toàn ngành năng lượng.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
  { name: "098_NQ70 - Khuyến khích doanh nghiệp, người dân tham gia đầu tư phát triển các dự án năng lượng tái tạo nhỏ và vừa, các dự án vừa sản xuất, vừa tiêu thụ năng lượng. Khẩn trương hoàn thiện hệ thống pháp luật thực thi hợp đồng, giải quyết tranh chấp; có cơ chế đặc thù để xử lý dứt điểm các dự án, hợp đồng phát triển năng lượng tồn đọng kéo dài.", date: "31/12/2030", status: "Đang thực hiện - Đúng hạn" },
];

const enterpriseRows = [
  { label: "Số hợp tác xã đang hoạt động: 1000", percent: 98, tone: "#1bd088" },
  { label: "Số tổ hợp tác xã thành lập mới: 34", percent: 72, tone: "#55a7e8" },
  { label: "Số tổ hợp tác xã ngừng hoạt động: 456", percent: 60, tone: "#a889ff" },
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

function OverviewCard({ children, className = "", icon = "service", title }: { children: ReactNode; className?: string; icon?: OverviewIcon; title: string }) {
  const Icon = overviewIcons[icon];

  return (
    <article className={`overview-ioc-card ${className}`}>
      <div className="overview-ioc-title">
        <span className="overview-card-icon" aria-hidden="true">
          <Icon size={16} strokeWidth={2.4} />
        </span>
        <span className="overview-ioc-title-text">{title}</span>
      </div>
      {children}
    </article>
  );
}

function OverviewValue({
  className = "",
  label,
  note = "12,6% so với cùng kỳ năm trước",
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
      {note ? <p>{note}</p> : null}
    </div>
  );
}

function OverviewSimpleTable({
  rows,
  type = "resolution",
}: {
  rows: ReadonlyArray<{ name: string; date: string; status: string }>;
  type?: "resolution" | "target";
}) {
  return (
    <div className={`overview-simple-table ${type}`}>
      <div className="overview-simple-head">
        <span>{type === "target" ? "Mã - Tên Nhiệm Vụ" : "Tên Nghị Quyết"}</span>
        <span>{type === "target" ? "Thời Hạn Hoàn Thành" : "Ngày Ban Hành"}</span>
        <span>{type === "target" ? "Kết Quả Thực Hiện" : "Trạng Thái"}</span>
      </div>
      {rows.map((row, index) => (
        <div className="overview-simple-row" key={`${row.name}-${row.date}-${index}`}>
          <span>{row.name}</span>
          <span>{row.date}</span>
          <strong>{row.status}</strong>
        </div>
      ))}
    </div>
  );
}

function OverviewPieChart({
  className = "",
  items,
  type = "pie",
}: {
  className?: string;
  items: ReadonlyArray<{ label: string; value: number; color: string }>;
  type?: "pie" | "donut";
}) {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: items.map((item) => item.color),
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      formatter: "{b}: {d}%",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: className.includes("trade") ? ["0%", "76%"] : type === "donut" ? ["52%", "74%"] : ["0%", "72%"],
        center: className.includes("trade") ? ["50%", "45%"] : ["50%", "48%"],
        avoidLabelOverlap: true,
        label: {
          color: "rgba(255, 255, 255, 0.82)",
          fontSize: className.includes("trade") ? 11 : 10,
          formatter: "{d}%",
        },
        labelLine: { show: false },
        itemStyle: {
          borderColor: "rgba(8, 13, 24, 0.55)",
          borderWidth: 1,
        },
        data: items.map((item) => ({ name: item.label, value: item.value })),
      },
    ],
  }), [className, items, type]);

  return (
    <div className={`overview-real-pie ${className}`}>
      <EChart className="overview-real-pie-chart" option={option} ariaLabel="Biểu đồ cơ cấu" />
      <div className="overview-pie-legend">
        {items.map((item) => (
          <span key={item.label}>
            <i style={{ backgroundColor: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function OverviewGaugeChart({ label = "MỤC TIÊU: 100%", value }: { label?: string; value: number }) {
  return <OverviewPlanningCoverageChart value={value} ariaLabel={label} />;
}

function OverviewPlanningCoverageChart({ ariaLabel = "Tỷ lệ phủ kín quy hoạch chung", value }: { ariaLabel?: string; value: number }) {
  const option = useMemo<EChartsCoreOption>(() => ({
    animation: false,
    series: [
      {
        type: "gauge",
        startAngle: 205,
        endAngle: -25,
        min: 0,
        max: 100,
        radius: "92%",
        center: ["50%", "54%"],
        progress: {
          show: true,
          roundCap: true,
          width: 14,
          itemStyle: { color: "#18c68b" },
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 14,
            color: [
              [0.75, "rgba(24, 198, 139, 0.28)"],
              [1, "rgba(104, 126, 160, 0.28)"],
            ],
          },
        },
        pointer: {
          show: true,
          length: "42%",
          width: 3,
          itemStyle: { color: "#f7b53b" },
        },
        anchor: {
          show: true,
          size: 5,
          itemStyle: { color: "#f7b53b" },
        },
        axisTick: {
          distance: -20,
          length: 4,
          lineStyle: { color: "rgba(237, 246, 255, 0.38)", width: 1 },
        },
        splitLine: {
          distance: -22,
          length: 8,
          lineStyle: { color: "rgba(237, 246, 255, 0.54)", width: 1 },
        },
        axisLabel: {
          distance: -5,
          color: "rgba(221, 234, 247, 0.68)",
          fontSize: 8,
          formatter: (labelValue: number) => labelValue % 50 === 0 ? `${labelValue}` : "",
        },
        detail: {
          color: "#16d392",
          fontSize: 24,
          fontWeight: 900,
          lineHeight: 24,
          offsetCenter: [0, "42%"],
          formatter: (chartValue: number) => `{value|${chartValue}}\n{spacer|}\n{unit|%}`,
          rich: {
            value: {
              color: "#16d392",
              fontSize: 25,
              fontWeight: 900,
              lineHeight: 22,
            },
            spacer: {
              height: 8,
              lineHeight: 8,
            },
            unit: {
              color: "#16d392",
              fontSize: 16,
              fontWeight: 900,
              lineHeight: 18,
            },
          },
        },
        title: {
          color: "rgba(237, 246, 255, 0.78)",
          fontSize: 9,
          fontWeight: 800,
          offsetCenter: [0, "82%"],
        },
        data: [{ value, name: "Mục tiêu: 100%" }],
      },
    ],
  }), [value]);

  return <EChart className="overview-planning-coverage-chart" option={option} ariaLabel={ariaLabel} />;
}

function OverviewBarChart() {
  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#0bd097"],
    grid: { left: 104, right: 30, top: 24, bottom: 22 },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    xAxis: {
      type: "value",
      max: 100,
      axisLabel: { color: "rgba(221, 234, 247, 0.82)", fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: "category",
      data: ["Phôi thép", "Thép thành phẩm"],
      inverse: true,
      axisLabel: { color: "rgba(221, 234, 247, 0.82)", fontSize: 11 },
      axisLine: { lineStyle: { color: "rgba(98, 155, 196, 0.46)" } },
      axisTick: { show: false },
    },
    series: [
      {
        type: "bar",
        barWidth: 22,
        data: [68, 94],
        itemStyle: { borderRadius: 0 },
      },
    ],
  }), []);

  return <EChart className="overview-bar-chart" option={option} ariaLabel="Sản phẩm công nghiệp thép" />;
}

function OverviewLaborDonut({
  introduced = 522,
  returned = 200,
}: {
  introduced?: number;
  returned?: number;
}) {
  const total = introduced + returned;
  const introducedPercent = total > 0 ? Math.round((introduced / total) * 100) : 0;
  const returnedPercent = total > 0 ? 100 - introducedPercent : 0;

  const option = useMemo<EChartsCoreOption>(() => ({
    color: ["#69d28a", "#ff8b86"],
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(8, 13, 24, 0.96)",
      borderColor: "rgba(198, 218, 244, 0.16)",
      textStyle: { color: "#f5f8fc" },
    },
    series: [
      {
        type: "pie",
        radius: ["58%", "76%"],
        center: ["50%", "50%"],
        label: { show: false },
        labelLine: { show: false },
        data: [
          { name: "Số LĐ được giới thiệu việc làm cho các dự án, doanh nghiệp", value: introduced },
          { name: "Lao động về quê làm việc", value: returned },
        ],
      },
    ],
    graphic: [
      {
        type: "text",
        left: "center",
        top: "39%",
        style: { text: `${total}`, fill: "#ffffff", fontSize: 24, fontWeight: 900, textAlign: "center" },
      },
      {
        type: "text",
        left: "center",
        top: "56%",
        style: { text: "Lao động", fill: "#ffffff", fontSize: 13, fontWeight: 800, textAlign: "center" },
      },
    ],
  }), [introduced, returned, total]);

  return (
    <div className="overview-labor-chart-wrap">
      <h3>Số Lao Động Được Giải Quyết Việc Làm</h3>
      <EChart className="overview-labor-donut-chart" option={option} ariaLabel="Số lao động được giải quyết việc làm" />
      <div className="overview-labor-legend">
        <span><i className="green" />Số LĐ được giới thiệu việc làm cho các dự án, doanh nghiệp: {introduced} người ({introducedPercent}%)</span>
        <span><i className="salmon" />Lao động về quê làm việc: {returned} người ({returnedPercent}%)</span>
      </div>
    </div>
  );
}

function OverviewPlanningAssetsMetric() {
  return (
    <div className="overview-planning-metric">
      <h3>Tổng Số Cơ Sở Nhà Đất</h3>
      <div>
        <strong>126</strong>
        <small>Cơ sở</small>
      </div>
      <p>12,6% so với cùng kỳ năm trước</p>
    </div>
  );
}

export function OverviewDashboard() {
  const { year, quarter } = getCurrentReportingPeriod();
  const { indicators } = useIocReport("CTKTXH_QUY", `${year}${quarter}`);

  const seafoodFarmed = pickIocNumber(indicators, "CTDB_IX_7_1", 35);
  const seafoodCaught = pickIocNumber(indicators, "CTDB_IX_7_2", 65);
  const seafoodTotalLabel = indicators
    ? `${((seafoodFarmed + seafoodCaught) / 1000).toLocaleString("vi-VN", { maximumFractionDigits: 1 })} nghìn tấn`
    : "31,7 nghìn tấn";

  const tradeExport = pickIocNumber(indicators, "CTDB_V_1_2", 35);
  const tradeImport = pickIocNumber(indicators, "CTDB_V_1_3", 65);

  const laborIntroduced = pickIocNumber(indicators, "CTDB_X_3_6_1", 522);
  const laborReturned = pickIocNumber(indicators, "CTDB_X_3_6_2", 200);

  return (
    <section className="overview-ioc" aria-label="Tab tổng hợp">
      <div className="overview-ioc-grid">
        <OverviewCard className="overview-ioc-grdp" icon="grdp" title="Chỉ số về GRDP">
          <div className="overview-kpi-strip two">
            <OverviewValue label="Tốc Độ Tăng Trưởng GRDP" value={pickIocValue(indicators, "CTDB_I_1", "8,67")} unit="%" note="Lũy kế đến 08/2026" />
            <OverviewValue label="GRDP Bình Quân Đầu Người" value="68,23" unit="Triệu đồng/người/năm" note="Lũy kế đến 08/2026" />
          </div>
        </OverviewCard>

        <MapCanvas className="overview-ioc-map" title="Bản đồ GIS tổng hợp Hà Tĩnh" />

        <OverviewCard className="overview-ioc-industry" icon="industry" title="Công nghiệp">
          <div className="overview-bar-panel">
            <h3>Sản Phẩm Công Nghiệp (Thép)</h3>
            <OverviewBarChart />
            <small>Triệu tấn</small>
            <button className="overview-link" type="button">Xem thêm sản phẩm →</button>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-agriculture" icon="agriculture" title="Nông nghiệp">
          <div className="overview-agriculture-grid">
            <OverviewValue className="red" label="Tỷ Lệ Che Phủ Rừng" value={pickIocValue(indicators, "CTDB_IX_6", "34,24")} unit="%" note="Ổn định so với năm trước" />
            <div className="overview-pie-cell">
              <h3>Sản Lượng Thủy Sản: {seafoodTotalLabel}</h3>
              <OverviewPieChart items={[
                { label: "Nuôi trồng", value: seafoodFarmed, color: "#8c78ff" },
                { label: "Khai thác", value: seafoodCaught, color: "#ff8b86" },
              ]} />
            </div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-projects" icon="investment" title="Dự án trọng điểm">
          <div className="overview-two-kpis vertical">
            <OverviewValue className="white" label="Tổng Số Dự Án" value="25" unit="Dự án" note="" />
            <OverviewValue className="red" label="Dự Án Chậm Tiến Độ" value="12" unit="Dự án" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-land" icon="land" title="Đất đai, khoáng sản">
          <OverviewValue label="Số Giấy CNQSDĐ Cấp Mới" value="108" unit="GCN" />
        </OverviewCard>

        <div className="overview-ioc-budget-strip">
          <OverviewCard className="overview-ioc-budget" icon="budget" title="Thu ngân sách">
            <OverviewValue label="Tổng Các Khoản Thu NSNN" value="15.212" unit="Tỷ đồng" note="Lũy kế đến 08/2026 · 89,6% so với dự toán" />
          </OverviewCard>

          <OverviewCard className="overview-ioc-expense" icon="budget" title="Chi ngân sách">
            <OverviewValue label="Tổng Chi Ngân Sách Địa Phương" value="421" unit="Tỷ đồng" note="12,6% so với cùng kỳ năm trước · 89,6% so với dự toán" />
          </OverviewCard>
        </div>

        <OverviewCard className="overview-ioc-trade" icon="service" title="Thương mại dịch vụ">
          <div className="overview-trade-layout">
            <div className="overview-pie-cell">
              <h3>Tổng Kim Ngạch Xuất Nhập Khẩu</h3>
              <OverviewPieChart className="trade" items={[
                { label: "Xuất khẩu", value: tradeExport, color: "#8c78ff" },
                { label: "Nhập khẩu", value: tradeImport, color: "#ff8b86" },
              ]} />
            </div>
            <OverviewValue label="Số Lượng Khách Du Lịch" value={pickIocValue(indicators, "CTDB_V_2", "1234")} unit="Lượt khách" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-enterprise" icon="enterprise" title="Doanh nghiệp và hợp tác xã">
          <div className="overview-split">
            <OverviewValue label="Doanh Nghiệp Hoạt Động Trong Nền Kinh Tế" value={pickIocValue(indicators, "CTDB_VI_1_1", "1233")} unit="DN" />
            <div className="overview-progress-list">
              <h3>Tổng Số Hợp Tác Xã</h3>
              {enterpriseRows.map((row) => (
                <div className="overview-progress-row" key={row.label}>
                  <span>{row.label}</span>
                  <i><b style={{ width: `${row.percent}%`, background: row.tone }} /></i>
                </div>
              ))}
            </div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-admin" icon="admin" title="Nội vụ - cải cách hành chính, lao động">
          <div className="overview-admin-grid">
            <OverviewValue label="Tỷ Lệ Người Dân Sử Dụng Dịch Vụ Công Trực Tuyến" value="98,21" unit="%" note="12,6% so với cùng kỳ năm trước" />
            <OverviewLaborDonut introduced={laborIntroduced} returned={laborReturned} />
            <OverviewValue className="amber" label="Tỷ Lệ Hồ Sơ Giải Quyết Đúng Hạn" value="78,22" unit="%" note="12,6% so với cùng kỳ năm trước" />
            <OverviewValue className="red overdue" label="Số Lượng VB Quá Hạn" value="5" unit="VB" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-education" icon="education" title="Giáo dục">
          <div className="overview-trade-layout">
            <div className="overview-pie-cell">
              <h3>Trường Đạt Chuẩn Quốc Gia</h3>
              <OverviewPieChart className="education" items={[
                { label: "Trường mầm non", value: 12, color: "#7e6cff" },
                { label: "Trường tiểu học", value: 34, color: "#ff8b86" },
                { label: "Trường THCS", value: 24, color: "#36c1d4" },
                { label: "Trường THPT", value: 20, color: "#ffb34c" },
                { label: "Cơ sở giáo dục nghề", value: 10, color: "#5488ff" },
              ]} />
            </div>
            <div className="overview-pie-cell">
              <h3>Tỷ Lệ Huy Động Trẻ Em Từ 3 Đến 5 Tuổi Đến Lớp</h3>
              <OverviewGaugeChart value={85.4} />
            </div>
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-public" icon="investment" title="Đầu tư công">
          <OverviewValue className="hero" label="Tổng Số Dự Án Đầu Tư Công" value="36" unit="Dự án" />
          <div className="overview-two-kpis lined vertical">
            <OverviewValue label="Tổng Vốn Bố Trí Theo Dự Án" value="1,985" unit="Tỷ đồng" note="" />
            <OverviewValue label="Giá Trị Giải Ngân Theo Dự Án" value="688" unit="Tỷ đồng" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-attract" icon="investment" title="Thu hút đầu tư">
          <div className="overview-two-kpis vertical">
            <OverviewValue label="Tổng Số Dự Án Trong Nước" value="167" unit="Dự án" note="" />
            <OverviewValue label="Tổng Vốn Đăng Ký Đầu Tư Của Dự Án Trong Nước" value="178" unit="Tỷ đồng" note="" />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-assets" icon="planning" title="Quy hoạch, xây dựng, tài sản công">
          <div className="overview-assets-stack">
            <div>
              <h3>Tỷ Lệ Phủ Kín Quy Hoạch Chung</h3>
              <OverviewPlanningCoverageChart value={85.4} />
            </div>
            <OverviewPlanningAssetsMetric />
          </div>
        </OverviewCard>

        <OverviewCard className="overview-ioc-resolution" icon="resolution" title="🇻🇳 Nhiệm vụ thực hiện các nghị quyết trọng tâm">
          <OverviewSimpleTable rows={resolutionRows} />
          <button className="overview-link" type="button">Xem thêm nghị quyết →</button>
        </OverviewCard>

        <OverviewCard className="overview-ioc-targets" icon="target" title="🇻🇳 Chỉ tiêu phát triển kinh tế - xã hội giai đoạn 2025-2030">
          <OverviewSimpleTable type="target" rows={targetRows} />
        </OverviewCard>

        <OverviewCard className="overview-ioc-health" icon="health" title="Y tế, an sinh xã hội">
          <div className="overview-health-grid">
            <OverviewValue label="Tỷ Lệ Bao Phủ Bảo Hiểm Y Tế" value={pickIocValue(indicators, "CTDB_XI_5_5_1", "99,43")} unit="%" note="" />
            <OverviewValue label="Người Dân Được Khám Sức Khỏe Định Kỳ Hoặc Khám Sàng Lọc Miễn Phí Ít Nhất 01 Lần Trong Năm" value="8,67" unit="%" note="" />
            <OverviewValue className="tight-number" label="Tổng Số Lượt Khám Bệnh" value="13,421" unit="Lượt khám" note="12,6% so với cùng kỳ tháng trước" />
            <OverviewValue label="Tỷ Lệ Hoàn Thành Kế Hoạch Giảm Nghèo" value="87,29" unit="%" note="" />
          </div>
        </OverviewCard>
      </div>
    </section>
  );
}
