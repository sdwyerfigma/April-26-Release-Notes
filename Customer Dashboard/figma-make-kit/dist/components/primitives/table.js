import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
export function Table({ className, ...props }) {
    return _jsx("table", { className: cn("cdmk-table", className), ...props });
}
export function TableHeader({ className, ...props }) {
    return _jsx("thead", { className: cn("cdmk-table__header", className), ...props });
}
export function TableBody({ className, ...props }) {
    return _jsx("tbody", { className: cn("cdmk-table__body", className), ...props });
}
export function TableRow({ className, ...props }) {
    return _jsx("tr", { className: cn("cdmk-table__row", className), ...props });
}
export function TableHead({ className, ...props }) {
    return _jsx("th", { className: cn("cdmk-table__head", className), ...props });
}
export function TableCell({ className, ...props }) {
    return _jsx("td", { className: cn("cdmk-table__cell", className), ...props });
}
