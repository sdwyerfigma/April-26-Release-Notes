import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SavedViewsListItem } from "./saved-views-list-item";
function rowHeightForDensity(density) {
    return density === "compact" ? 32 : 36;
}
export function SavedViewsModal({ items, title = "Saved views", description = "Switch and manage default views.", density = "standard", maxVisibleItems }) {
    const visibleItems = maxVisibleItems ?? (density === "compact" ? 4 : 3);
    const scrollable = items.length > visibleItems;
    const maxHeight = rowHeightForDensity(density) * visibleItems + 8 * (visibleItems - 1);
    return (_jsxs("div", { className: "cdmk-sv-modal", children: [_jsx("div", { className: "cdmk-sv-modal__title", children: title }), _jsx("div", { className: "cdmk-sv-modal__description", children: description }), _jsx("div", { className: scrollable ? "cdmk-sv-modal__list cdmk-sv-modal__list--scrollable" : "cdmk-sv-modal__list", style: { "--cdmk-sv-max-height": `${maxHeight}px` }, children: items.map((item) => (_jsx(SavedViewsListItem, { title: item.label, meta: item.meta ?? "", density: density, selected: Boolean(item.selected) }, item.id))) })] }));
}
