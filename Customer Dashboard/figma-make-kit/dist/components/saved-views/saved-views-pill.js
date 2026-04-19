import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
export function SavedViewsPill({ children, className, tone = "default", type, ...props }) {
    return (_jsx("button", { type: type ?? "button", className: cn("cdmk-sv-pill", `cdmk-sv-pill--${tone}`, className), ...props, children: children }));
}
