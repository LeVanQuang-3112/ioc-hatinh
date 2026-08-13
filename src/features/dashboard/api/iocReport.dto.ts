export type IocReportRequestHeader = {
  code: string;
  org: string;
  period: string;
};

export type IocReportAttributeDto = {
  name: string;
  code: string;
};

export type IocReportIndicatorRowDto = {
  idx?: string;
  indicator: string;
  indicatorname: string;
  indunit: string | null;
  value: Array<string | null> | null;
};

export type IocReportResponseDto = {
  err_code: string;
  error_message?: string;
  err_msg?: string;
  data: {
    header: {
      code: string;
      name?: string;
      updatedate?: string;
    };
    attribute: IocReportAttributeDto[];
    data: IocReportIndicatorRowDto[];
  };
};
