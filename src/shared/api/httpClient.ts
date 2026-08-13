import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { appEnv } from "@/shared/config/env";

const REQUEST_ID_HEADER = "X-Request-Id";

type ApiErrorPayload = {
  message?: string;
  error_message?: string;
  err_msg?: string;
  error?: string;
  code?: string;
  err_code?: string;
};

export type ApiError = Error & {
  code?: string;
  status?: number;
  requestId?: string;
  details?: unknown;
  isCanceled?: boolean;
};

type RequestMetadata = {
  requestId: string;
  startedAt: number;
};

type HttpRequestConfig = InternalAxiosRequestConfig & {
  metadata?: RequestMetadata;
};

function createRequestId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getAccessToken(): string | undefined {
  return undefined;
}

function ensureHeaders(config: InternalAxiosRequestConfig): AxiosHeaders {
  if (config.headers instanceof AxiosHeaders) return config.headers;

  const headers = new AxiosHeaders(config.headers);
  config.headers = headers;
  return headers;
}

function getResponseMessage(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;

  const payload = data as ApiErrorPayload;
  return (
    payload.error_message || payload.err_msg || payload.message || payload.error
  );
}

function getResponseCode(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;

  const payload = data as ApiErrorPayload;
  return payload.err_code || payload.code;
}

function toApiError(error: unknown): ApiError {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) return error as ApiError;
    return Object.assign(new Error("Đã xảy ra lỗi không xác định"), {
      details: error,
    });
  }

  const axiosError = error as AxiosError;
  const config = axiosError.config as HttpRequestConfig | undefined;
  const status = axiosError.response?.status;
  const responseData = axiosError.response?.data;
  const requestId =
    config?.metadata?.requestId ||
    axiosError.response?.headers?.[REQUEST_ID_HEADER.toLowerCase()];
  const message =
    getResponseMessage(responseData) ||
    axiosError.message ||
    "Không thể kết nối tới máy chủ";

  return Object.assign(new Error(message), {
    cause: error,
    code: getResponseCode(responseData) || axiosError.code,
    status,
    requestId,
    details: responseData,
    isCanceled: axios.isCancel(error),
  });
}

function logRequest(config: HttpRequestConfig): void {
  if (!import.meta.env.DEV) return;

  const method = config.method?.toUpperCase() ?? "GET";
  console.info(`[api] ${method} ${config.url}`, {
    requestId: config.metadata?.requestId,
    baseURL: config.baseURL,
  });
}

function logResponse(response: AxiosResponse): void {
  if (!import.meta.env.DEV) return;

  const config = response.config as HttpRequestConfig;
  const duration = config.metadata
    ? Math.round(performance.now() - config.metadata.startedAt)
    : undefined;

  console.info(`[api] ${response.status} ${config.url}`, {
    requestId: config.metadata?.requestId,
    duration,
  });
}

function logError(error: ApiError): void {
  if (!import.meta.env.DEV || error.isCanceled) return;

  console.error("[api] request failed", {
    message: error.message,
    code: error.code,
    status: error.status,
    requestId: error.requestId,
  });
}

function createHttpClient(config?: AxiosRequestConfig): AxiosInstance {
  const instance = axios.create({
    baseURL: appEnv.iocReport.baseUrl,
    timeout: appEnv.apiTimeoutMs,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...config,
  });

  instance.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      const headers = ensureHeaders(requestConfig);
      const requestId = createRequestId();
      const accessToken = getAccessToken();

      headers.set(REQUEST_ID_HEADER, requestId);
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      const nextConfig = requestConfig as HttpRequestConfig;
      nextConfig.metadata = {
        requestId,
        startedAt: performance.now(),
      };

      logRequest(nextConfig);
      return nextConfig;
    }
  );

  instance.interceptors.response.use(
    (response) => {
      logResponse(response);
      return response;
    },
    (error) => {
      const apiError = toApiError(error);
      logError(apiError);
      return Promise.reject(apiError);
    }
  );

  return instance;
}

export const httpClient = createHttpClient();
export { createHttpClient, toApiError };
