# Customer Dashboard Make Kit

`customer-dashboard-make-kit` is a small React package for Figma Make that packages the Customer Dashboard screen and the saved-views patterns we explored in Figma.

It is designed to be:

- React 18 compatible for Figma Make
- Vite-friendly with no Tailwind requirement
- Self-contained, with plain CSS tokens and components
- Useful as both a full dashboard starter and a library of reusable dashboard primitives

## What it exports

- `CustomerDashboard`
- `RevenueTable`
- `SavedViewsInlineRail`
- `SavedViewsModal`
- `SavedViewsListItem`
- `SavedViewsPill`
- `Button`, `Badge`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `Input`
- `customerAccounts`, `defaultSavedViews`, `overflowSavedViews`
- `segmentFilters`, `healthFilters`
- `themeTokens`
- Type exports for all dashboard and saved-view data

## Install

```bash
npm install customer-dashboard-make-kit
```

## Usage

Import the package CSS once near the app root:

```tsx
import "customer-dashboard-make-kit/styles.css";
```

Then use the exported components:

```tsx
import {
  CustomerDashboard,
  SavedViewsInlineRail,
  SavedViewsModal,
  customerAccounts,
  defaultSavedViews,
} from "customer-dashboard-make-kit";

export function Example() {
  return (
    <>
      <CustomerDashboard accounts={customerAccounts} />
      <SavedViewsInlineRail items={defaultSavedViews} selectedId="renewals" />
      <SavedViewsModal items={defaultSavedViews} />
    </>
  );
}
```

## Local build

```bash
npm run build
```

This package is intended to be published either to the public npm registry or to your organization's private Figma npm registry for use in a Make kit.
