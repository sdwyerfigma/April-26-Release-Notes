import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
export declare function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>): import("react/jsx-runtime").JSX.Element;
