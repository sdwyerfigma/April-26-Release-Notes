import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BarChart3, Building2, CircleDollarSign, Filter, LayoutDashboard, Plus, Search, Share2, Sparkles, TrendingUp, TriangleAlert, Users } from "lucide-react";
import { customerAccounts, healthFilters, segmentFilters } from "../../data/customer-data";
import { cn } from "../../lib/cn";
import { RevenueTable } from "./revenue-table";
import { Badge } from "../primitives/badge";
import { Button } from "../primitives/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../primitives/card";
import { Input } from "../primitives/input";
const navigationItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Accounts", icon: Building2 },
    { label: "Revenue", icon: CircleDollarSign, active: true },
    { label: "Pipeline", icon: TrendingUp },
    { label: "Contacts", icon: Users },
    { label: "Reports", icon: BarChart3 }
];
const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
});
const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    notation: "compact"
});
function filterLabel(label) {
    return label === "All" ? "All" : label;
}
export function CustomerDashboard({ accounts = customerAccounts, title = "Customer revenue dashboard", subtitle = "Monitor customer ARR, expansion upside, and renewal health from one common CRM-style workspace built for desktop account reviews.", viewBadge = "Sales-focused CRM view" }) {
    const [draftQuery, setDraftQuery] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [segmentFilter, setSegmentFilter] = useState("All");
    const [healthFilter, setHealthFilter] = useState("All");
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredAccounts = accounts.filter((account) => {
        const matchesQuery = normalizedQuery.length === 0 ||
            [account.name, account.industry, account.owner, account.region, account.lastActivity]
                .join(" ")
                .toLowerCase()
                .includes(normalizedQuery);
        const matchesSegment = segmentFilter === "All" || account.segment === segmentFilter;
        const matchesHealth = healthFilter === "All" || account.health === healthFilter;
        return matchesQuery && matchesSegment && matchesHealth;
    });
    const totalArr = filteredAccounts.reduce((sum, account) => sum + account.arr, 0);
    const totalExpansion = filteredAccounts.reduce((sum, account) => sum + account.expansionOpportunity, 0);
    const renewalRiskCount = filteredAccounts.filter((account) => account.health === "At Risk").length;
    const averageGrowth = filteredAccounts.length === 0
        ? 0
        : Math.round(filteredAccounts.reduce((sum, account) => sum + account.growth, 0) / filteredAccounts.length);
    const activeFilterCount = (searchQuery.trim() ? 1 : 0) +
        (segmentFilter !== "All" ? 1 : 0) +
        (healthFilter !== "All" ? 1 : 0);
    function handleSearchSubmit(event) {
        event.preventDefault();
        setSearchQuery(draftQuery);
    }
    function resetFilters() {
        setDraftQuery("");
        setSearchQuery("");
        setSegmentFilter("All");
        setHealthFilter("All");
    }
    return (_jsx("main", { className: "cdmk-root", children: _jsxs("div", { className: "cdmk-shell", children: [_jsxs("aside", { className: "cdmk-sidebar", children: [_jsxs("div", { className: "cdmk-sidebar__brand", children: [_jsx("div", { className: "cdmk-sidebar__brand-icon", children: _jsx(Sparkles, { size: 18 }) }), _jsxs("div", { children: [_jsx("div", { className: "cdmk-sidebar__brand-eyebrow", children: "Customer Dashboard" }), _jsx("div", { className: "cdmk-sidebar__brand-title", children: "Revenue Ops" })] })] }), _jsx("nav", { className: "cdmk-sidebar__nav", children: navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (_jsxs("button", { className: cn("cdmk-sidebar__nav-item", item.active && "cdmk-sidebar__nav-item--active"), children: [_jsx(Icon, { size: 16 }), item.label] }, item.label));
                            }) }), _jsxs("div", { className: "cdmk-sidebar__target", children: [_jsxs("div", { className: "cdmk-sidebar__target-row", children: [_jsxs("div", { children: [_jsx("p", { className: "cdmk-sidebar__target-label", children: "Quarter target" }), _jsx("p", { className: "cdmk-sidebar__target-value", children: "$4.8M" })] }), _jsx(Badge, { className: "cdmk-sidebar__target-badge", children: "+12%" })] }), _jsx("p", { className: "cdmk-sidebar__target-copy", children: "Revenue is pacing ahead of plan, with enterprise expansions leading the quarter." })] })] }), _jsxs("div", { className: "cdmk-main", children: [_jsx(Card, { className: "cdmk-hero-card", children: _jsx(CardHeader, { className: "cdmk-hero-card__header", children: _jsxs("div", { className: "cdmk-hero-card__top", children: [_jsxs("div", { className: "cdmk-hero-card__copy", children: [_jsx(Badge, { className: "cdmk-view-badge", children: viewBadge }), _jsxs("div", { children: [_jsx(CardTitle, { className: "cdmk-hero-card__title", children: title }), _jsx(CardDescription, { className: "cdmk-hero-card__description", children: subtitle })] })] }), _jsxs("div", { className: "cdmk-hero-card__actions", children: [_jsxs(Button, { variant: "outline", children: [_jsx(Share2, { size: 16 }), "Export view"] }), _jsxs(Button, { children: [_jsx(Plus, { size: 16 }), "New account"] })] })] }) }) }), _jsxs("section", { className: "cdmk-kpi-grid", children: [_jsxs(Card, { className: "cdmk-kpi-card", children: [_jsxs(CardHeader, { className: "cdmk-kpi-card__header", children: [_jsx(CardDescription, { children: "Visible ARR" }), _jsx(CardTitle, { className: "cdmk-kpi-card__title", children: compactCurrencyFormatter.format(totalArr) })] }), _jsx(CardContent, { children: _jsxs("p", { children: [filteredAccounts.length, " customer accounts in the current view"] }) })] }), _jsxs(Card, { className: "cdmk-kpi-card", children: [_jsxs(CardHeader, { className: "cdmk-kpi-card__header", children: [_jsx(CardDescription, { children: "Expansion upside" }), _jsx(CardTitle, { className: "cdmk-kpi-card__title", children: compactCurrencyFormatter.format(totalExpansion) })] }), _jsx(CardContent, { children: _jsx("p", { children: "Cross-sell and seat growth opportunities highlighted in the table" }) })] }), _jsxs(Card, { className: "cdmk-kpi-card", children: [_jsxs(CardHeader, { className: "cdmk-kpi-card__header", children: [_jsx(CardDescription, { children: "Average growth" }), _jsxs(CardTitle, { className: "cdmk-kpi-card__title", children: [averageGrowth >= 0 ? "+" : "", averageGrowth, "%"] })] }), _jsx(CardContent, { children: _jsx("p", { children: "Revenue trend based on the customers currently visible" }) })] }), _jsxs(Card, { className: "cdmk-kpi-card", children: [_jsxs(CardHeader, { className: "cdmk-kpi-card__header", children: [_jsx(CardDescription, { children: "Renewal risk" }), _jsxs(CardTitle, { className: "cdmk-kpi-card__title cdmk-kpi-card__title--with-icon", children: [_jsx(TriangleAlert, { size: 22, className: "cdmk-warning-icon" }), renewalRiskCount] })] }), _jsx(CardContent, { children: _jsx("p", { children: "Accounts currently marked at risk for renewal conversations" }) })] })] }), _jsxs(Card, { className: "cdmk-table-card", children: [_jsxs(CardHeader, { className: "cdmk-table-card__header", children: [_jsxs("div", { className: "cdmk-table-card__top", children: [_jsxs("div", { className: "cdmk-table-card__copy", children: [_jsx(CardTitle, { className: "cdmk-table-card__title", children: "Customer revenue table" }), _jsx(CardDescription, { children: "Search across account name, owner, industry, and region, then slice the view with fast button filters." })] }), _jsxs("form", { className: "cdmk-search-form", onSubmit: handleSearchSubmit, children: [_jsxs("div", { className: "cdmk-search-field", children: [_jsx(Search, { size: 16, className: "cdmk-search-field__icon" }), _jsx(Input, { value: draftQuery, onChange: (event) => setDraftQuery(event.target.value), className: "cdmk-search-field__input", placeholder: "Search customer, owner, industry, or region" })] }), _jsxs(Button, { type: "submit", className: "cdmk-search-form__button", children: [_jsx(Search, { size: 16 }), "Search"] })] })] }), _jsxs("div", { className: "cdmk-filter-bands", children: [_jsxs("div", { className: "cdmk-filter-group", children: [_jsxs("div", { className: "cdmk-filter-group__label", children: [_jsx(Filter, { size: 14 }), "Segment filter"] }), _jsx("div", { className: "cdmk-filter-group__controls", children: segmentFilters.map((filterValue) => (_jsx(Button, { variant: segmentFilter === filterValue ? "default" : "outline", size: "sm", "aria-pressed": segmentFilter === filterValue, onClick: () => setSegmentFilter(filterValue), children: filterLabel(filterValue) }, filterValue))) })] }), _jsxs("div", { className: "cdmk-filter-group", children: [_jsx("div", { className: "cdmk-filter-group__label", children: "Renewal health" }), _jsx("div", { className: "cdmk-filter-group__controls", children: healthFilters.map((filterValue) => (_jsx(Button, { variant: healthFilter === filterValue ? "default" : "outline", size: "sm", "aria-pressed": healthFilter === filterValue, onClick: () => setHealthFilter(filterValue), children: filterLabel(filterValue) }, filterValue))) })] })] })] }), _jsxs(CardContent, { className: "cdmk-table-card__content", children: [_jsxs("div", { className: "cdmk-table-summary", children: [_jsxs("div", { className: "cdmk-table-summary__left", children: [_jsxs("span", { className: "cdmk-table-summary__metric", children: [filteredAccounts.length, " accounts \u2022 ", currencyFormatter.format(totalArr), " ARR"] }), activeFilterCount > 0 ? (_jsxs(Badge, { className: "cdmk-active-filter-badge", children: [activeFilterCount, " active ", activeFilterCount === 1 ? "filter" : "filters"] })) : null] }), _jsx(Button, { variant: "ghost", size: "sm", className: "cdmk-table-summary__reset", onClick: resetFilters, disabled: activeFilterCount === 0, children: "Clear filters" })] }), _jsx(RevenueTable, { accounts: filteredAccounts, onReset: resetFilters })] })] })] })] }) }));
}
