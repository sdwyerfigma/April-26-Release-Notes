import type { HTMLAttributes } from "react";
declare const variantClasses: {
    readonly default: "cdmk-badge--default";
    readonly secondary: "cdmk-badge--secondary";
    readonly outline: "cdmk-badge--outline";
};
export type BadgeProps = HTMLAttributes<HTMLDivElement> & {
    variant?: keyof typeof variantClasses;
};
export declare function Badge({ className, variant, ...props }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
