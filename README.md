# Ha Tinh Dashboard FE

React/Vite dashboard prototype for a single-screen operations dashboard with 50
widgets, lazy loading, viewport-aware data loading, and virtualization.

## Architecture

```txt
src/
  app/
    App.tsx
    providers/
      AppProviders.tsx
  features/
    dashboard/
      hooks/
        useWidgetData.ts
      lib/
        dashboardQueryKeys.ts
      model/
        types.ts
        widgetConfig.ts
      services/
        dashboardMockService.ts
      ui/
        DashboardHeader.tsx
        DashboardPage.tsx
        VirtualizedWidgetGrid.tsx
        WidgetShell.tsx
        widgetRegistry.tsx
        widgets/
  shared/
    components/
      Button.tsx
      Card.tsx
      SelectField.tsx
      Skeleton.tsx
    hooks/
      useDebouncedValue.ts
      useVisibleOnce.ts
    lib/
      mock/
      query/
  styles/
    global.css
  main.tsx
```

`src/main.tsx` mounts the React app, `src/app/providers` wires app-level
providers, `features/dashboard` owns dashboard business code, and `shared`
contains reusable UI, hooks, and infrastructure helpers.

## Mock API

The project does not include backend routes or database code. Widget data is
served by a seeded mock service backed by `@faker-js/faker`:

```txt
src/features/dashboard/services/dashboardMockService.ts
```

Replace this module with real API calls later without changing widget UI.
React Query query keys live in `src/features/dashboard/lib/dashboardQueryKeys.ts`.

## Performance

- KPI widgets render eagerly.
- Detail widgets are grouped in a virtualized grid.
- Each widget loads data only when visible or close to visible.
- Widget data is cached and deduplicated through `@tanstack/react-query`.
- Heavy widget types are lazy imported through `widgetRegistry.tsx`.
- Tables virtualize their own rows.

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
npm test
```
# ioc-hatinh
