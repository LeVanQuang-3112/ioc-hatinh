import { memo, useMemo } from "react";
import type { WidgetData } from "../../model/types";
import EChart from "../../../../shared/components/EChart";

function ChartWidget({ data }: { data: WidgetData }) {
  const option = useMemo(() => {
    const labels = data.series.map((_, index) => `T${index + 1}`);

    return {
      color: ["#16d196"],
      grid: {
        left: 8,
        right: 8,
        top: 12,
        bottom: 10,
        containLabel: false,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(8, 13, 24, 0.96)",
        borderColor: "rgba(198, 218, 244, 0.16)",
        textStyle: { color: "#f5f8fc" },
      },
      xAxis: {
        type: "category",
        data: labels,
        boundaryGap: false,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.08)" } },
        axisLabel: { show: false },
      },
      series: [
        {
          type: "line",
          data: data.series,
          smooth: true,
          symbol: "circle",
          symbolSize: 5,
          lineStyle: { width: 3 },
          areaStyle: { color: "rgba(22, 209, 150, 0.14)" },
        },
      ],
    };
  }, [data.series]);

  return (
    <div className="chart-widget">
      <EChart className="chart-widget-canvas" option={option} ariaLabel="Biểu đồ xu hướng" />
      <div className="chart-footer">
        {data.series.slice(-5).map((value, index) => (
          <span key={`${value}-${index}`}>{value}</span>
        ))}
      </div>
    </div>
  );
}

export default memo(ChartWidget);
