# Layout

## Core screen structure

Use this structure for the main dashboard:

1. Dark left navigation rail
2. Hero card with title and top-right actions
3. Four KPI cards in a row
4. Large table card
5. Search and filter controls in the table card header
6. Revenue table taking most of the vertical space

## Sizing expectations

- Left nav: about `280px` wide
- Main canvas: wide desktop workspace
- KPI cards: 4-up row on desktop
- Table card: the visually dominant region of the screen

## Spacing rules

- Use generous outer spacing between large regions
- Use tighter spacing inside controls and rows
- Avoid tall headers or large empty gutters above the table

## Table-first rule

The table is the product here. Everything above it should support scanning and filtering it:

- summary cards should stay concise
- search should be easy to find
- filters should feel fast and utility-driven
- no oversized decorative content between filters and the table

## Saved views integration rules

Saved views should feel integrated into the existing dashboard controls:

- place them in the same control band as the segment and renewal-health filters
- use the same height and visual weight as the existing pills
- never make saved views look like a second product layered over the dashboard

## Two supported saved-view patterns

### Inline rail

- Saved views live directly in the control band
- exactly one pill can be selected at a time
- if there are many views, keep them on one horizontal rail
- show a subtle overflow cue, such as a clipped tail or gradient hint

### Managed modal

- Entry point still lives in the same control band
- Open a centered compact modal over the table area
- Modal should feel proportional to the dashboard, not like a full-page sheet
- If the list grows, the modal stays compact and the list scrolls inside it
