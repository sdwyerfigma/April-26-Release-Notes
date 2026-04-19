# Primitives

## Button

Use `Button` for all dashboard actions.

### Variants

| Variant | Use for |
|---|---|
| `default` | Primary CTA, selected filter button |
| `outline` | Secondary action with visible border |
| `ghost` | Low-emphasis reset action |
| `secondary` | Neutral filled action when needed |

### Sizes

| Size | Use for |
|---|---|
| `default` | Main buttons like Search or New account |
| `sm` | Filter controls |
| `icon` | Icon-only controls |

## Badge

Use `Badge` for:

- small view labels
- active filter count
- segment or health markers when the package does not already provide a built-in table badge

Keep badges small and pill-shaped.

## Card

Use `Card` as the default panel wrapper.

- outer dashboard regions should use cards
- KPI surfaces should use muted cards
- do not invent new panel shapes unless explicitly requested

## Input

Use `Input` for the search field.

- keep the icon inside the field
- keep the border subtle
- do not use heavy shadows or huge corner radii

## SavedViewsPill

Valid tones:

- `default`
- `active`
- `soft`

Do not invent other tones unless you also extend the CSS tokens.

## SavedViewsListItem

Valid densities:

- `standard`
- `compact`

Use `selected={true}` for the active or default saved view. Keep the title and meta text compact and vertically centered.
