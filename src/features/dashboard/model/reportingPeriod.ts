const QUARTER_ROMAN_LABELS = ["I", "II", "III", "IV"] as const;

export function getCurrentReportingPeriod(date = new Date()) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const quarter = Math.floor((month - 1) / 3) + 1;
  const quarterRoman = QUARTER_ROMAN_LABELS[quarter - 1];

  return {
    month,
    year,
    quarter,
    /** YYYYMM, e.g. "202601" — the period format the IOC report API expects for monthly reports (CTKTXH_THANG). */
    monthlyReportPeriod: `${year}${String(month).padStart(2, "0")}`,
    /**
     * YYYY06 or YYYY12 — the period format for semi-annual reports (CTKTXH_6THANG), which are only
     * filed once each half-year closes. Resolves to the most recently *completed* half: from Jul
     * onward that's H1 of this year (…06); from Jan–Jun it's H2 of last year (…12).
     */
    semiAnnualReportPeriod: month > 6 ? `${year}06` : `${year - 1}12`,
    monthLabel: `Tháng ${month}/${year}`,
    monthValue: `month-${month}-${year}`,
    quarterLabel: `Quý ${quarterRoman}/${year}`,
    quarterNumericLabel: `Quý ${quarter}/${year}`,
    quarterValue: `quarter-${quarter}-${year}`,
    quarterShortValue: `q${quarter}-${year}`,
    dayMonthValue: `day-month-${month}-${year}`,
    dayMonthLabel: `Ngày/Tháng ${month}/${year}`,
  };
}

export const currentReportingPeriod = getCurrentReportingPeriod();
