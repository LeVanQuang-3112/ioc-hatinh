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

## Production deployment

This project is prepared for deployment on a real server with:

- Docker serving the built React/Vite app through an internal Nginx container.
- Host Nginx terminating HTTPS for `lifedash.hatinh.gov.vn`.
- Certbot issuing and renewing the TLS certificate.

### 1. DNS

Point `lifedash.hatinh.gov.vn` to the public IP address of the server.

### 2. Start the app container

```bash
chmod +x deploy.sh
./deploy.sh
```

The app container listens on `127.0.0.1:8080` on the server. It is intentionally
not exposed directly to the public internet.

### 3. Bootstrap host Nginx before SSL

Use the bootstrap config first, because the final HTTPS config cannot load until
the certificate files exist:

```bash
sudo mkdir -p /var/www/certbot
sudo cp nginx/lifedash.hatinh.gov.vn.bootstrap.conf /etc/nginx/sites-available/lifedash.hatinh.gov.vn.conf
sudo ln -sf /etc/nginx/sites-available/lifedash.hatinh.gov.vn.conf /etc/nginx/sites-enabled/lifedash.hatinh.gov.vn.conf
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Issue SSL certificate

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d lifedash.hatinh.gov.vn
```

### 5. Enable HTTPS config

After Certbot succeeds, replace the bootstrap config with the final HTTPS config:

```bash
sudo cp nginx/lifedash.hatinh.gov.vn.conf /etc/nginx/sites-available/lifedash.hatinh.gov.vn.conf
sudo nginx -t
sudo systemctl reload nginx
```

The production site will be available at:

```txt
https://lifedash.hatinh.gov.vn
```
# ioc-hatinh
