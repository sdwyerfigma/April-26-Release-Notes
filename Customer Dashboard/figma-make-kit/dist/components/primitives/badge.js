import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
const variantClasses = {
    default: "cdmk-badge--default",
    secondary: "cdmk-badge--secondary",
    outline: "cdmk-badge--outline"
};
export function Badge({ className, variant = "secondary", ...props }) {
    return _jsx("div", { className: cn("cdmk-badge", variantClasses[variant], className), ...props });
}
