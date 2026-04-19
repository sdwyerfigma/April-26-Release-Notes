import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

export type SavedViewsListItemProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  meta: string;
  selected?: boolean;
  density?: "standard" | "compact";
};

export function SavedViewsListItem({
  className,
  title,
  meta,
  selected = false,
  density = "standard",
  ...props
}: SavedViewsListItemProps) {
  return (
    <div
      className={cn(
        "cdmk-sv-list-item",
        `cdmk-sv-list-item--${density}`,
        selected ? "cdmk-sv-list-item--selected" : "cdmk-sv-list-item--default",
        className
      )}
      {...props}
    >
      <div className="cdmk-sv-list-item__title">{title}</div>
      <div className="cdmk-sv-list-item__meta">{meta}</div>
    </div>
  );
}
