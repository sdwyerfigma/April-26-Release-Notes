# Tokens

## Design philosophy

The Customer Dashboard system is crisp, enterprise, and table-oriented. It should feel like a common CRM workspace used by revenue or customer-success teams:

- white cards over a subtle cool-gray background
- blue reserved for action, active state, and small emphasis
- muted slate text for supporting information
- rounded geometry, but not playful
- compact control density

## Color tokens

### Core app colors

| CSS variable | Value | Use |
|---|---|---|
| `--cdmk-app-background` | `#f3f5f8` | Page background |
| `--cdmk-app-panel` | `#ffffff` | Main cards and modal surfaces |
| `--cdmk-app-panel-muted` | `#f8fafc` | KPI cards and muted surfaces |
| `--cdmk-app-sidebar` | `#0f172a` | Left navigation |
| `--cdmk-app-border` | `#dbe3ec` | Standard borders |
| `--cdmk-app-muted` | `#64748b` | Secondary body text |
| `--cdmk-app-accent` | `#2563eb` | Primary actions and selected pills |
| `--cdmk-app-accent-soft` | `#eff6ff` | Soft active surfaces |
| `--cdmk-app-accent-soft-border` | `#bfdbfe` | Soft active borders |

### Feedback colors

| CSS variable | Value | Use |
|---|---|---|
| `--cdmk-app-success` | `#047857` | Positive growth and healthy states |
| `--cdmk-app-warning` | `#b45309` | Warning or attention states |
| `--cdmk-app-danger` | `#b91c1c` | At-risk or negative states |

## Typography

| Token | Value | Use |
|---|---|---|
| `--cdmk-font-sans` | Aptos/Avenir Next fallback stack | All UI text |
| `--cdmk-font-display` | Aptos Display/Avenir Next fallback stack | Hero title only |

### Type scale guidance

- Hero title: large and confident, but not oversized marketing type
- Card titles: medium-weight dashboard UI titles
- Table headers: small uppercase metadata
- Saved-view labels: compact, utility-oriented

## Radius

| CSS variable | Value | Use |
|---|---|---|
| `--cdmk-radius-shell` | `28px` | Outer nav shell |
| `--cdmk-radius-card` | `24px` | Dashboard cards |
| `--cdmk-radius-control` | `12px` | Inputs and buttons |
| `--cdmk-radius-pill` | `999px` | Pills and badges |
| `--cdmk-radius-sv-modal` | `18px` | Saved views modal |

## Token usage rules

- Use accent blue for active or primary states only.
- Use soft blue for selected but low-intensity saved-view and info surfaces.
- Do not use the accent blue for large panel backgrounds.
- Keep the interface mostly neutral; blue should feel intentional, not dominant.
- Saved-view pills and renewal-health pills should share the same control scale and density.
