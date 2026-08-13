/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_TIMEOUT_MS?: string;
  readonly VITE_IOC_REPORT_BASE_URL?: string;
  readonly VITE_IOC_REPORT_ENDPOINT?: string;
  readonly VITE_IOC_ACCESS_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
