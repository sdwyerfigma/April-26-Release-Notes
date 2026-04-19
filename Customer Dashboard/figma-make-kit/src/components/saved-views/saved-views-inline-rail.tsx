import { SavedViewsPill } from "./saved-views-pill";
import { cn } from "../../lib/cn";
import type { SavedView } from "../../data/customer-data";

export type SavedViewsInlineRailProps = {
  items: SavedView[];
  selectedId?: string;
  label?: string;
  showOverflowHint?: boolean;
  onSelect?: (id: string) => void;
};

export function SavedViewsInlineRail({
  items,
  selectedId,
  label = "Saved views",
  showOverflowHint = false,
  onSelect
}: SavedViewsInlineRailProps) {
  return (
    <div className="cdmk-sv-inline-rail">
      <div className="cdmk-sv-inline-rail__label">{label}</div>
      <div
        className={cn(
          "cdmk-sv-inline-rail__scroller",
          showOverflowHint && "cdmk-sv-inline-rail__scroller--hint"
        )}
      >
        {items.map((item) => {
          const tone = item.selected || item.id === selectedId ? "active" : item.tone ?? "default";

          return (
            <SavedViewsPill
              key={item.id}
              tone={tone}
              aria-pressed={item.id === selectedId || item.selected}
              onClick={() => onSelect?.(item.id)}
            >
              {item.label}
            </SavedViewsPill>
          );
        })}
      </div>
    </div>
  );
}
