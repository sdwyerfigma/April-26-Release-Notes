# Customer Dashboard Make Kit Guidelines

Read this file first. Figma Make does not assume an order for guideline files, so use this file as the routing guide.

## Primary goal

Implement desktop-first CRM dashboard interfaces that look and feel like the Customer Dashboard design in this package:

- clean white panels on a cool gray canvas
- dark left navigation
- large revenue table as the dominant content area
- compact, integrated filter controls
- sales-ops tone rather than marketing or consumer-app styling

## Package to use

Always prefer the components from `customer-dashboard-make-kit` before writing raw HTML.

Import once:

```tsx
import "customer-dashboard-make-kit/styles.css";
```

Primary exports:

- `CustomerDashboard`
- `RevenueTable`
- `SavedViewsInlineRail`
- `SavedViewsModal`
- `SavedViewsListItem`
- `SavedViewsPill`
- `Button`
- `Badge`
- `Card`
- `Input`

## Reading order

Read the supporting files in this order:

1. `setup.md`
2. `foundations/tokens.md`
3. `foundations/layout.md`
4. `components/customer-dashboard.md`
5. `components/revenue-table.md`
6. `components/saved-views.md`
7. `components/primitives.md`

## Global rules

- Treat this system as desktop-first. Default canvas widths should feel like `1440px+`.
- Use the package components directly whenever there is a matching component.
- Keep the layout table-first: the customer revenue table should own the most screen real estate.
- Keep controls compact. Saved-view pills must be the same visual scale as renewal-health pills.
- Do not introduce dark mode unless explicitly requested.
- Do not restyle components into a new brand language. Stay within the exported CSS variable system.
- Preserve the dashboard's existing proportions: dark nav at left, main workspace on the right, cards above the table, then filters, then table.

## Common mistakes to avoid

- Do not turn this into a mobile stacked card list by default.
- Do not make the saved-views UI look like a floating product inside another product.
- Do not create giant chips, huge modal headings, or oversized filter controls.
- Do not replace package buttons or pills with generic browser buttons if a package component already fits.
- Do not make the modal a full-screen takeover for simple saved-view management.
