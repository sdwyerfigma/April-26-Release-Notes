import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Badge } from "../primitives/badge";
import { Button } from "../primitives/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../primitives/table";
const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: "compact"
});
function initialsFromName(name) {
    return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();
}
function healthBadgeClasses(health) {
    if (health === "Healthy") {
        return "cdmk-health-badge cdmk-health-badge--healthy";
    }
    if (health === "At Risk") {
        return "cdmk-health-badge cdmk-health-badge--risk";
    }
    return "cdmk-health-badge cdmk-health-badge--attention";
}
export function RevenueTable({ accounts, onReset }) {
    if (accounts.length === 0) {
        return (_jsxs("div", { className: "cdmk-empty-state", children: [_jsx("div", { className: "cdmk-empty-state__icon", children: _jsx(ArrowDownRight, { size: 20 }) }), _jsxs("div", { className: "cdmk-empty-state__body", children: [_jsx("h3", { children: "No accounts match this view" }), _jsx("p", { children: "Try a broader search or clear the filters to bring revenue accounts back into scope." })] }), _jsx(Button, { variant: "outline", onClick: onReset, children: "Reset filters" })] }));
    }
    return (_jsx("div", { className: "cdmk-table-scroll", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "cdmk-table__row--static", children: [_jsx(TableHead, { children: "Customer" }), _jsx(TableHead, { children: "Owner" }), _jsx(TableHead, { children: "Segment" }), _jsx(TableHead, { className: "cdmk-text-right", children: "ARR" }), _jsx(TableHead, { className: "cdmk-text-right", children: "Growth" }), _jsx(TableHead, { className: "cdmk-text-right", children: "Expansion" }), _jsx(TableHead, { children: "Renewal" }), _jsx(TableHead, { children: "Health" })] }) }), _jsx(TableBody, { children: accounts.map((account) => {
                        const isPositive = account.growth >= 0;
                        return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "cdmk-table__customer-cell", children: _jsxs("div", { className: "cdmk-account-cell", children: [_jsx("div", { className: "cdmk-account-cell__avatar", children: initialsFromName(account.name) }), _jsxs("div", { className: "cdmk-account-cell__body", children: [_jsx("div", { className: "cdmk-account-cell__title", children: account.name }), _jsxs("div", { className: "cdmk-account-cell__subtitle", children: [account.industry, " \u2022 ", account.region] }), _jsx("div", { className: "cdmk-account-cell__meta", children: account.lastActivity })] })] }) }), _jsx(TableCell, { className: "cdmk-table__owner-cell", children: account.owner }), _jsx(TableCell, { children: _jsx(Badge, { variant: "outline", className: cn("cdmk-segment-badge", account.segment === "Enterprise" && "cdmk-segment-badge--enterprise"), children: account.segment }) }), _jsx(TableCell, { className: "cdmk-text-right cdmk-table__metric-cell", children: compactCurrencyFormatter.format(account.arr) }), _jsx(TableCell, { className: "cdmk-text-right", children: _jsxs("span", { className: cn("cdmk-growth", isPositive ? "cdmk-growth--positive" : "cdmk-growth--negative"), children: [isPositive ? _jsx(ArrowUpRight, { size: 16 }) : _jsx(ArrowDownRight, { size: 16 }), isPositive ? "+" : "", account.growth, "%"] }) }), _jsx(TableCell, { className: "cdmk-text-right", children: compactCurrencyFormatter.format(account.expansionOpportunity) }), _jsx(TableCell, { children: account.renewalDate }), _jsx(TableCell, { children: _jsx(Badge, { className: healthBadgeClasses(account.health), children: account.health }) })] }, account.id));
                    }) })] }) }));
}
