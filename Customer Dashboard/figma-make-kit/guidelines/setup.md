# Setup

## Environment assumptions

This package is meant for Figma Make and standard React/Vite environments.

- React: `18.x` compatible
- Build system: Vite-compatible
- Styling: plain CSS shipped by the package
- Icons: `lucide-react`

## Required imports

Always import the package stylesheet once near the application root:

```tsx
import "customer-dashboard-make-kit/styles.css";
```

Then import components from the package:

```tsx
import {
  CustomerDashboard,
  SavedViewsInlineRail,
  SavedViewsModal,
  customerAccounts,
  defaultSavedViews
} from "customer-dashboard-make-kit";
```

## Implementation preference order

When building a screen:

1. Use `CustomerDashboard` directly if the whole dashboard screen matches.
2. If only part of the screen is needed, compose from package exports:
   - `Card`, `Button`, `Badge`, `Input`
   - `RevenueTable`
   - `SavedViewsInlineRail`
   - `SavedViewsModal`
3. Only write custom wrappers around these components when the layout differs, but keep the package styling and spacing rules intact.

## Example

```tsx
import "customer-dashboard-make-kit/styles.css";
import {
  CustomerDashboard,
  customerAccounts
} from "customer-dashboard-make-kit";

export default function App() {
  return <CustomerDashboard accounts={customerAccounts} />;
}
```

## Important behavior rule

Keep any custom code lightweight. The more the package exports are used directly, the more consistent the resulting Make output will be with the design system and the original Figma explorations.
