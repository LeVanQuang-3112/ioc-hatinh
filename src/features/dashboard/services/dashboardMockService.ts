import type { Faker } from "@faker-js/faker";
import { delay } from "@/shared/lib/mock/delay";
import { hashSeed } from "@/shared/lib/mock/hash";
import type { DashboardFilters, WidgetConfig, WidgetData } from "../model/types";

let fakerInstance: Faker | null = null;

export const dashboardMockService = {
  async fetchWidgetData(
    widget: WidgetConfig,
    filters: DashboardFilters,
    signal: AbortSignal,
  ): Promise<WidgetData> {
    const seed = hashSeed(`${widget.dataKey}-${filters.period}-${filters.unit}`);
    const latency = widget.priority === "high" ? 120 : 260 + (seed % 420);

    await delay(latency, signal);
    return createWidgetData(widget, seed, await getFaker());
  },
};

async function getFaker() {
  if (!fakerInstance) {
    const { fakerVI } = await import("@faker-js/faker");
    fakerInstance = fakerVI;
  }

  return fakerInstance;
}

function createWidgetData(widget: WidgetConfig, seed: number, faker: Faker): WidgetData {
  faker.seed(seed);
  const base = 45 + (seed % 55);
  const series = Array.from({ length: 16 }, (_, index) => {
    const wave = Math.sin((index + seed) / 2.8) * 14;
    return Math.max(8, Math.round(base + wave + ((seed + index) % 12)));
  });

  return {
    value: series[series.length - 1],
    unit: widget.type === "kpi" || widget.type === "gauge" ? "%" : "",
    trend: Math.round((((seed % 25) - 8) / 10) * 10) / 10,
    series,
    rows: Array.from({ length: 180 }, (_, index) => {
      const value = Math.max(1, Math.round(base + ((seed + index * 7) % 80)));
      return {
        id: `${widget.id}-row-${index}`,
        label: faker.helpers.arrayElement([
          `Đơn vị ${String(index + 1).padStart(2, "0")}`,
          `Kênh ${faker.location.city()}`,
          `Trạm ${faker.string.alphanumeric({ length: 4, casing: "upper" })}`,
        ]),
        value,
        status: value > 105 ? "critical" : value > 82 ? "warning" : "good",
      };
    }),
  };
}
