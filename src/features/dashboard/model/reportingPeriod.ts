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
