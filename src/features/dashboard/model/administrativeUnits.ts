import haTinhGeoJson from "./geo/haTinh.json";

export type AdministrativeUnit = {
  ward_code: string;
  name: string;
  province_code: string;
};

// Dùng chính mã và tên đi kèm ranh giới GIS làm nguồn dữ liệu duy nhất.
export const haTinhAdministrativeUnits: AdministrativeUnit[] = haTinhGeoJson.features.map((feature) => ({
  ward_code: String(feature.properties.code),
  name: String(feature.properties.fullName),
  province_code: "42",
}));

const haTinhAdministrativeUnitByCode = new Map(
  haTinhAdministrativeUnits.map((unit) => [unit.ward_code, unit]),
);

export function getHaTinhAdministrativeUnit(wardCode: string) {
  return haTinhAdministrativeUnitByCode.get(wardCode);
}

export type HaTinhMapPoint = {
  wardCode: string;
  value: [longitude: number, latitude: number, metric: number];
};

// Tọa độ các điểm KPI hiện có. Tên đơn vị được tra theo mã từ danh mục hành
// chính 2025, không còn hard-code theo huyện/thị xã cũ.
export const haTinhMapPoints: HaTinhMapPoint[] = [
  { wardCode: "18352", value: [105.78, 18.66, 2850] },
  { wardCode: "18133", value: [105.43, 18.38, 2350] },
  { wardCode: "18115", value: [105.72, 18.54, 2650] },
  { wardCode: "18229", value: [105.62, 18.48, 2100] },
  { wardCode: "18406", value: [105.77, 18.43, 1950] },
  { wardCode: "18568", value: [105.9, 18.45, 1720] },
  { wardCode: "18313", value: [105.36, 18.32, 1240] },
  { wardCode: "18073", value: [105.9, 18.34, 3300] },
  { wardCode: "18562", value: [105.86, 18.35, 1880] },
  { wardCode: "18496", value: [105.69, 18.18, 1450] },
  { wardCode: "18673", value: [106.0, 18.25, 2180] },
];
