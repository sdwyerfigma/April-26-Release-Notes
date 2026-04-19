import type { HTMLAttributes } from "react";
export type SavedViewsListItemProps = HTMLAttributes<HTMLDivElement> & {
    title: string;
    meta: string;
    selected?: boolean;
    density?: "standard" | "compact";
};
export declare function SavedViewsListItem({ className, title, meta, selected, density, ...props }: SavedViewsListItemProps): import("react/jsx-runtime").JSX.Element;
