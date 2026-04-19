import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const variantClasses = {
  default: "border-transparent bg-slate-900 text-white",
  secondary: "border-transparent bg-slate-100 text-slate-700",
  outline: "border border-[var(--app-border)] bg-white text-slate-700",
};

export type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variantClasses;
};

export function Badge({ className, variant = "secondary", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
