import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
export function Card({ className, ...props }) {
    return _jsx("div", { className: cn("cdmk-card", className), ...props });
}
export function CardHeader({ className, ...props }) {
    return _jsx("div", { className: cn("cdmk-card__header", className), ...props });
}
export function CardTitle({ className, ...props }) {
    return _jsx("h2", { className: cn("cdmk-card__title", className), ...props });
}
export function CardDescription({ className, ...props }) {
    return _jsx("p", { className: cn("cdmk-card__description", className), ...props });
}
export function CardContent({ className, ...props }) {
    return _jsx("div", { className: cn("cdmk-card__content", className), ...props });
}
