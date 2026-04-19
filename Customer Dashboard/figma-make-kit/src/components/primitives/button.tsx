import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../lib/cn";

const variantClasses = {
  default: "cdmk-button--default",
  secondary: "cdmk-button--secondary",
  outline: "cdmk-button--outline",
  ghost: "cdmk-button--ghost"
} as const;

const sizeClasses = {
  default: "cdmk-button--size-default",
  sm: "cdmk-button--size-sm",
  icon: "cdmk-button--size-icon"
} as const;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={cn("cdmk-button", variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
