import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
const variantClasses = {
    default: "cdmk-button--default",
    secondary: "cdmk-button--secondary",
    outline: "cdmk-button--outline",
    ghost: "cdmk-button--ghost"
};
const sizeClasses = {
    default: "cdmk-button--size-default",
    sm: "cdmk-button--size-sm",
    icon: "cdmk-button--size-icon"
};
export function Button({ className, variant = "default", size = "default", type, ...props }) {
    return (_jsx("button", { type: type ?? "button", className: cn("cdmk-button", variantClasses[variant], sizeClasses[size], className), ...props }));
}
