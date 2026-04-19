import type { ButtonHTMLAttributes } from "react";
import type { SavedViewPillTone } from "../../data/customer-data";
export type SavedViewsPillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: SavedViewPillTone;
};
export declare function SavedViewsPill({ children, className, tone, type, ...props }: SavedViewsPillProps): import("react/jsx-runtime").JSX.Element;
