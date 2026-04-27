# Connecting Code and Design

Browser-based interactive prototype workspace for the April 26 mobile release notes concept.

## Workspace layout

- `apps/prototype`: Next.js App Router prototype for the mobile screens in the provided Figma frame.
- `packages/tokens`: Design tokens for color, spacing, typography, motion, and shared gradients.
- `packages/components`: Reusable React UI primitives for the prototype shell and screen scaffolding.
- `packages/icons`: Shared icon set for navigation and controls.
- `packages/assets`: Reusable vector assets and non-photo UI artwork.
- `packages/docs`: Package catalog, screen flow notes, and publishing checklist data.
- `packages/tooling`: Shared TypeScript config presets for apps and packages.

## Publish note

Workspace packages use the temporary npm scope `@connecting-code-and-design`. If you want to publish under a different organization or personal scope later, update the package names before the first release.
