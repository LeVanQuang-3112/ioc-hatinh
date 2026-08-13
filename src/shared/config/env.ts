const DEFAULT_IOC_REPORT_BASE_URL = "https://report.vnsr.vn";
const DEFAULT_IOC_REPORT_ENDPOINT = "/IOC_WS/ws_recvMsgServlet";
const DEFAULT_API_TIMEOUT_MS = 30_000;

function readString(key: keyof ImportMetaEnv, fallback: string): string {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function readOptionalString(key: keyof ImportMetaEnv): string | undefined {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readPositiveNumber(key: keyof ImportMetaEnv, fallback: number): number {
  const value = import.meta.env[key];
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export const appEnv = {
  apiTimeoutMs: readPositiveNumber("VITE_API_TIMEOUT_MS", DEFAULT_API_TIMEOUT_MS),
  iocReport: {
    baseUrl: readString("VITE_IOC_REPORT_BASE_URL", DEFAULT_IOC_REPORT_BASE_URL),
    endpoint: readString("VITE_IOC_REPORT_ENDPOINT", DEFAULT_IOC_REPORT_ENDPOINT),
    accessToken: readOptionalString("VITE_IOC_ACCESS_TOKEN"),
  },
};
