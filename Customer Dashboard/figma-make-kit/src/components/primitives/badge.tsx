import type { HTMLAttributes } from "react";

import { cn } from "../../lib/cn";

const variantClasses = {
  default: "cdmk-badge--default",
  secondary: "cdmk-badge--secondary",
  outline: "cdmk-badge--outline"
} as const;

export type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variantClasses;
};

export function Badge({ className, variant = "secondary", ...props }: BadgeProps) {
  return <div className={cn("cdmk-badge", variantClasses[variant], className)} {...props} />;
}
