import type { IocReportIndexedData } from "./iocReportMapper";

export function formatIocValue(raw: string | null | undefined): string | undefined {
  if (raw == null || raw === "") return undefined;

  const normalized = raw.replace(",", ".");
  const num = Number(normalized);
  if (Number.isNaN(num)) return raw;

  return num.toLocaleString("vi-VN", { maximumFractionDigits: 2 });
}

export function pickIocValue(
  indexedData: IocReportIndexedData | null,
  indicator: string,
  fallback: string,
  attributeIndex = 0,
): string {
  const raw = indexedData?.byIndicator.get(indicator)?.value?.[attributeIndex];
  return formatIocValue(raw) ?? fallback;
}

export function pickIocNumber(
  indexedData: IocReportIndexedData | null,
  indicator: string,
  fallback: number,
  attributeIndex = 0,
): number {
  const raw = indexedData?.byIndicator.get(indicator)?.value?.[attributeIndex];
  if (raw == null || raw === "") return fallback;

  const num = Number(raw.replace(",", "."));
  return Number.isNaN(num) ? fallback : num;
}
