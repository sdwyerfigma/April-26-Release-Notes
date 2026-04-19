# CustomerDashboard

## When to use

Use `CustomerDashboard` when the screen needs to match the full sales-focused CRM layout from the design:

- left navigation
- KPI summary cards
- search and filter controls
- revenue table

## Semantic purpose

This is the full desktop workspace for revenue-account review. It is not a marketing dashboard, data-viz story, or admin settings screen.

## Props

| Prop | Type | Default |
|---|---|---|
| `accounts` | `CustomerAccount[]` | package sample data |
| `title` | `string` | `"Customer revenue dashboard"` |
| `subtitle` | `string` | default package subtitle |
| `viewBadge` | `string` | `"Sales-focused CRM view"` |

## Composition rules

- Keep the table card below the KPI cards.
- Keep the search bar in the top-right of the table card header.
- Keep the segment and renewal-health controls compact and horizontally arranged.
- Do not insert large banners or charts between the filters and the table.

## Correct usage

- A desktop CRM review screen for account health and ARR
- A dashboard base with saved views integrated into the filter band

## Incorrect usage

- A narrow mobile screen using this component unchanged
- A homepage or landing page
- A complex analytics dashboard with multiple large charts replacing the table

## Example

```tsx
import {
  CustomerDashboard,
  customerAccounts
} from "customer-dashboard-make-kit";

export function RevenueWorkspace() {
  return <CustomerDashboard accounts={customerAccounts} />;
}
```
