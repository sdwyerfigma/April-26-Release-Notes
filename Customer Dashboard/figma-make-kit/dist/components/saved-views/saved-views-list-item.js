import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
export function SavedViewsListItem({ className, title, meta, selected = false, density = "standard", ...props }) {
    return (_jsxs("div", { className: cn("cdmk-sv-list-item", `cdmk-sv-list-item--${density}`, selected ? "cdmk-sv-list-item--selected" : "cdmk-sv-list-item--default", className), ...props, children: [_jsx("div", { className: "cdmk-sv-list-item__title", children: title }), _jsx("div", { className: "cdmk-sv-list-item__meta", children: meta })] }));
}
