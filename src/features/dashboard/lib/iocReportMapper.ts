import type {
  IocReportAttributeDto,
  IocReportIndicatorRowDto,
  IocReportResponseDto,
} from "../api/iocReport.dto";

export type IocReportAttribute = IocReportAttributeDto;
export type IocReportIndicatorRow = IocReportIndicatorRowDto;
export type IocReportResponse = IocReportResponseDto;

export type IocReportIndexedData = {
  attributes: IocReportAttribute[];
  rows: IocReportIndicatorRow[];
  byIndicator: Map<string, IocReportIndicatorRow>;
  firstValueByIndicator: Map<string, string>;
};

export function indexIocReport(response: IocReportResponse): IocReportIndexedData {
  const byIndicator = new Map<string, IocReportIndicatorRow>();
  const firstValueByIndicator = new Map<string, string>();

  for (const row of response.data.data) {
    byIndicator.set(row.indicator, row);

    const firstValue = row.value?.[0];
    if (firstValue != null && firstValue !== "") {
      firstValueByIndicator.set(row.indicator, firstValue);
    }
  }

  return {
    attributes: response.data.attribute,
    rows: response.data.data,
    byIndicator,
    firstValueByIndicator,
  };
}
