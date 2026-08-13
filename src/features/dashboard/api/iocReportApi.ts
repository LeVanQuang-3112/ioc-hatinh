import { httpClient } from "@/shared/api/httpClient";
import { appEnv } from "@/shared/config/env";
import type { IocReportRequestHeader, IocReportResponseDto } from "./iocReport.dto";

type IocReportPayload = {
  func: "getReport";
  data: {
    header: IocReportRequestHeader;
  };
  access_token: string;
};

function createIocReportPayload(header: IocReportRequestHeader): IocReportPayload {
  const accessToken = appEnv.iocReport.accessToken;

  if (!accessToken) {
    throw new Error("Thiếu cấu hình VITE_IOC_ACCESS_TOKEN");
  }

  return {
    func: "getReport",
    data: {
      header,
    },
    access_token: accessToken,
  };
}

export async function fetchIocReport(
  header: IocReportRequestHeader,
  signal?: AbortSignal,
): Promise<IocReportResponseDto> {
  const response = await httpClient.post<IocReportResponseDto>(
    appEnv.iocReport.endpoint,
    createIocReportPayload(header),
    { signal },
  );

  if (response.data.err_code !== "0") {
    throw new Error(
      response.data.error_message ||
        response.data.err_msg ||
        "API báo cáo IOC trả về lỗi",
    );
  }

  return response.data;
}
