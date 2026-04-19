import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
export function Input({ className, type = "text", ...props }) {
    return _jsx("input", { type: type, className: cn("cdmk-input", className), ...props });
}
