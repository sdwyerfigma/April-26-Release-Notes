export const packageCatalog = [
  {
    name: "@connecting-code-and-design/tokens",
    summary:
      "Core color, spacing, typography, motion, and gradient definitions extracted from the Figma direction."
  },
  {
    name: "@connecting-code-and-design/components",
    summary:
      "Reusable React building blocks for phone chrome, controls, and content sections."
  },
  {
    name: "@connecting-code-and-design/icons",
    summary:
      "Shared iconography for navigation, booking, playback, and museum-specific flows."
  },
  {
    name: "@connecting-code-and-design/assets",
    summary:
      "Reusable vector artwork and marks without bundling photo imagery into the package layer."
  },
  {
    name: "@connecting-code-and-design/docs",
    summary:
      "Structured docs content for package ownership, screen flow, and release notes context."
  },
  {
    name: "@connecting-code-and-design/tooling",
    summary:
      "Shared TypeScript presets used by the prototype app and future package additions."
  }
] as const;

export const screenFlow = [
  "Home",
  "Explore",
  "Art Detail",
  "Tour Landing",
  "Virtual Tour",
  "Map",
  "Information",
  "Ticket"
] as const;

export const publishingChecklist = [
  "Replace the temporary npm scope before first public release if needed.",
  "Decide whether package exports should remain source-first or switch to dist-first after the APIs stabilize.",
  "Attach provenance, changelog, and README badges before the first package publish.",
  "Promote illustration placeholders to production artwork only after asset ownership is finalized."
] as const;
