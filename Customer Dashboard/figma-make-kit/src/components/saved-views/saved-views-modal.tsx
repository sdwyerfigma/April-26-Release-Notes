import type { CSSProperties } from "react";

import type { SavedView } from "../../data/customer-data";
import { SavedViewsListItem } from "./saved-views-list-item";

export type SavedViewsModalProps = {
  items: SavedView[];
  title?: string;
  description?: string;
  density?: "standard" | "compact";
  maxVisibleItems?: number;
};

function rowHeightForDensity(density: "standard" | "compact") {
  return density === "compact" ? 32 : 36;
}

export function SavedViewsModal({
  items,
  title = "Saved views",
  description = "Switch and manage default views.",
  density = "standard",
  maxVisibleItems
}: SavedViewsModalProps) {
  const visibleItems = maxVisibleItems ?? (density === "compact" ? 4 : 3);
  const scrollable = items.length > visibleItems;
  const maxHeight = rowHeightForDensity(density) * visibleItems + 8 * (visibleItems - 1);

  return (
    <div className="cdmk-sv-modal">
      <div className="cdmk-sv-modal__title">{title}</div>
      <div className="cdmk-sv-modal__description">{description}</div>
      <div
        className={scrollable ? "cdmk-sv-modal__list cdmk-sv-modal__list--scrollable" : "cdmk-sv-modal__list"}
        style={{ "--cdmk-sv-max-height": `${maxHeight}px` } as CSSProperties}
      >
        {items.map((item) => (
          <SavedViewsListItem
            key={item.id}
            title={item.label}
            meta={item.meta ?? ""}
            density={density}
            selected={Boolean(item.selected)}
          />
        ))}
      </div>
    </div>
  );
}
