import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SavedViewsPill } from "./saved-views-pill";
import { cn } from "../../lib/cn";
export function SavedViewsInlineRail({ items, selectedId, label = "Saved views", showOverflowHint = false, onSelect }) {
    return (_jsxs("div", { className: "cdmk-sv-inline-rail", children: [_jsx("div", { className: "cdmk-sv-inline-rail__label", children: label }), _jsx("div", { className: cn("cdmk-sv-inline-rail__scroller", showOverflowHint && "cdmk-sv-inline-rail__scroller--hint"), children: items.map((item) => {
                    const tone = item.selected || item.id === selectedId ? "active" : item.tone ?? "default";
                    return (_jsx(SavedViewsPill, { tone: tone, "aria-pressed": item.id === selectedId || item.selected, onClick: () => onSelect?.(item.id), children: item.label }, item.id));
                }) })] }));
}
