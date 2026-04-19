import type { SavedView } from "../../data/customer-data";
export type SavedViewsInlineRailProps = {
    items: SavedView[];
    selectedId?: string;
    label?: string;
    showOverflowHint?: boolean;
    onSelect?: (id: string) => void;
};
export declare function SavedViewsInlineRail({ items, selectedId, label, showOverflowHint, onSelect }: SavedViewsInlineRailProps): import("react/jsx-runtime").JSX.Element;
