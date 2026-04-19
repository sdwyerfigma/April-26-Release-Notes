import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/cn";
import type { SavedViewPillTone } from "../../data/customer-data";

export type SavedViewsPillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: SavedViewPillTone;
};

export function SavedViewsPill({
  children,
  className,
  tone = "default",
  type,
  ...props
}: SavedViewsPillProps) {
  return (
    <button
      type={type ?? "button"}
      className={cn("cdmk-sv-pill", `cdmk-sv-pill--${tone}`, className)}
      {...props}
    >
      {children}
    </button>
  );
}
