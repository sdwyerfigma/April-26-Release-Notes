import type { ButtonHTMLAttributes } from "react";
declare const variantClasses: {
    readonly default: "cdmk-button--default";
    readonly secondary: "cdmk-button--secondary";
    readonly outline: "cdmk-button--outline";
    readonly ghost: "cdmk-button--ghost";
};
declare const sizeClasses: {
    readonly default: "cdmk-button--size-default";
    readonly sm: "cdmk-button--size-sm";
    readonly icon: "cdmk-button--size-icon";
};
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: keyof typeof variantClasses;
    size?: keyof typeof sizeClasses;
};
export declare function Button({ className, variant, size, type, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
