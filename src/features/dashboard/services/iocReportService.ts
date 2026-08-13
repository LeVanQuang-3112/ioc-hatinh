export type IocReportIndicatorRow = {
  idx?: string;
  indicator: string;
  indicatorname: string;
  indunit: string | null;
  value: string[];
};

export type IocReportResponse = {
  err_code: string;
  error_message: string;
  data: {
    header: { code: string; name: string; updatedate: string };
    attribute: Array<{ name: string; code: string }>;
    data: IocReportIndicatorRow[];
  };
};

const IOC_REPORT_URL = "https://report.vnsr.vn/IOC_WS/ws_recvMsgServlet";
const IOC_ORG = import.meta.env.VITE_IOC_ORG ?? "000.00.00.H27";
const IOC_ACCESS_TOKEN =
  import.meta.env.VITE_IOC_ACCESS_TOKEN ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoYXRpbmhAMTIzIiwibmFtZSI6ImhhdGluaC5zeW5jIiwiaWF0IjoxNTE2MjM5MDExNjgsInRlbmFudF9pZCI6ODV9.m85eHSTickKAkLSUQ9tiUVfPYjNwntE5R2MtLJv0zGk";

export async function fetchIocReport(
  code: string,
  period: string,
  signal?: AbortSignal,
): Promise<IocReportResponse> {
  const res = await fetch(IOC_REPORT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      func: "getReport",
      data: { header: { code, org: IOC_ORG, period } },
      access_token: IOC_ACCESS_TOKEN,
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`Yêu cầu báo cáo IOC thất bại (HTTP ${res.status})`);
  }

  const json = (await res.json()) as IocReportResponse;
  if (json.err_code !== "0") {
    throw new Error(json.error_message || "Yêu cầu báo cáo IOC thất bại");
  }
  return json;
}

/** Maps indicator code -> raw first value, e.g. "CTDB_I_1" -> "12.68". */
export function indexIocReport(response: IocReportResponse): Map<string, string> {
  const map = new Map<string, string>();
  for (const row of response.data.data) {
    const raw = row.value?.[0];
    if (raw !== undefined) map.set(row.indicator, raw);
  }
  return map;
}

/** Formats a raw numeric string using Vietnamese grouping/decimal conventions. */
export function formatIocValue(raw: string | undefined): string | undefined {
  if (raw === undefined || raw === "") return undefined;
  const num = Number(raw);
  if (Number.isNaN(num)) return raw;
  return num.toLocaleString("vi-VN", { maximumFractionDigits: 2 });
}

/** Looks up an indicator and formats it, falling back to `fallback` when absent. */
export function pickIocValue(indicators: Map<string, string> | null, code: string, fallback: string): string {
  return formatIocValue(indicators?.get(code)) ?? fallback;
}

/** Looks up an indicator as a raw number (for chart proportions), falling back when absent/non-numeric. */
export function pickIocNumber(indicators: Map<string, string> | null, code: string, fallback: number): number {
  const raw = indicators?.get(code);
  if (raw === undefined) return fallback;
  const num = Number(raw);
  return Number.isNaN(num) ? fallback : num;
}
