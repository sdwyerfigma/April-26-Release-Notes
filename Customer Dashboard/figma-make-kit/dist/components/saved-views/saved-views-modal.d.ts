import type { SavedView } from "../../data/customer-data";
export type SavedViewsModalProps = {
    items: SavedView[];
    title?: string;
    description?: string;
    density?: "standard" | "compact";
    maxVisibleItems?: number;
};
export declare function SavedViewsModal({ items, title, description, density, maxVisibleItems }: SavedViewsModalProps): import("react/jsx-runtime").JSX.Element;
