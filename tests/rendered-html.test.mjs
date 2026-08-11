import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("builds a React/Vite dashboard shell", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

  assert.match(html, /<title>Dashboard Điều hành Hà Tĩnh<\/title>/i);
  assert.match(html, /<div id="root"><\/div>/i);
  assert.match(html, /type="module"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("keeps dashboard code config-driven and starter-free", async () => {
  const [config, grid, shell, app, providers, service, packageJson] = await Promise.all([
    readFile(
      new URL("../src/features/dashboard/model/widgetConfig.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../src/features/dashboard/ui/VirtualizedWidgetGrid.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../src/features/dashboard/ui/WidgetShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/App.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/app/providers/AppProviders.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../src/features/dashboard/services/dashboardMockService.ts", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(config, /Array\.from\(\{ length: 40 \}/);
  assert.match(config, /const kpis = \[/);
  assert.match(grid, /ROW_HEIGHT/);
  assert.match(grid, /OVERSCAN/);
  assert.match(grid, /ResizeObserver/);
  assert.match(shell, /useVisibleOnce/);
  assert.match(shell, /useWidgetData/);
  assert.match(app, /@\/features\/dashboard/);
  assert.match(providers, /QueryClientProvider/);
  assert.match(service, /@faker-js\/faker/);
  assert.doesNotMatch(app, /_sites-preview|codex-preview|SkeletonPreview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle|db:generate|vinext|next/);
});
