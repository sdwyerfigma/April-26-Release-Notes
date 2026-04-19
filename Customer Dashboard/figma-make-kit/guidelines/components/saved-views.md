# Saved Views

This file is especially important. The saved-views patterns were refined through multiple visual corrections and should be followed closely.

## Supported components

- `SavedViewsPill`
- `SavedViewsInlineRail`
- `SavedViewsListItem`
- `SavedViewsModal`

## General rules

- Saved views must match the scale of the existing renewal-health controls.
- Only one saved-view pill is selected at a time.
- Saved views should feel integrated into the existing interface, not layered over it.
- The selected state uses the accent blue fill.
- Soft or supporting states use the soft blue fill, not large bright surfaces.

## Inline saved views

Use `SavedViewsInlineRail` when saved views live directly in the filter band.

### Rules

- Keep the rail compact
- Keep it on a single line
- Show one selected pill only
- If there are many items, allow horizontal scrolling
- Add a subtle overflow hint instead of wrapping to a second row

### Do

- Use short pill labels like `Renewals`, `Expansion`, `Strategic`
- Match the height and border treatment of the health filter pills

### Do not

- Make the pills taller or larger than the other dashboard filters
- Add oversized labels above the rail
- Wrap to multiple rows

## Managed saved views

Use `SavedViewsModal` when you need a richer management surface.

### Rules

- The trigger still belongs in the same control band
- The modal is compact and centered over the table area
- The modal title and body copy stay modest in size
- The list rows inside the modal use `SavedViewsListItem`

### When there are many saved views

- Keep the modal footprint compact
- Make the list scroll vertically inside the modal
- Do not make the modal full-screen or edge-docked unless explicitly asked

## Density rules

- `standard` density for the shorter 3-item management state
- `compact` density for the 10-item scrollable state

## Example

```tsx
import {
  SavedViewsInlineRail,
  SavedViewsModal,
  overflowSavedViews,
  modalOverflowSavedViews
} from "customer-dashboard-make-kit";

<SavedViewsInlineRail
  items={overflowSavedViews}
  selectedId="renewals"
  showOverflowHint
/>

<SavedViewsModal
  items={modalOverflowSavedViews}
  density="compact"
  maxVisibleItems={4}
/>
```
