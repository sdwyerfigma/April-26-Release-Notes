"use client";

import { useState } from "react";
import {
  BarChart3,
  Building2,
  CircleDollarSign,
  Filter,
  LayoutDashboard,
  Plus,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
  TriangleAlert,
  Users,
} from "lucide-react";

import { RevenueTable } from "@/components/dashboard/revenue-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  customerAccounts,
  healthFilters,
  segmentFilters,
  type CustomerHealth,
  type CustomerSegment,
} from "@/lib/customer-data";
import { cn } from "@/lib/utils";

const navigationItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Accounts", icon: Building2 },
  { label: "Revenue", icon: CircleDollarSign, active: true },
  { label: "Pipeline", icon: TrendingUp },
  { label: "Contacts", icon: Users },
  { label: "Reports", icon: BarChart3 },
];

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
});

type SegmentFilter = CustomerSegment | "All";
type HealthFilter = CustomerHealth | "All";

function filterLabel(label: string) {
  return label === "All" ? "All" : label;
}

export function CustomerDashboardScreen() {
  const [draftQuery, setDraftQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>("All");
  const [healthFilter, setHealthFilter] = useState<HealthFilter>("All");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredAccounts = customerAccounts.filter((account) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [
        account.name,
        account.industry,
        account.owner,
        account.region,
        account.lastActivity,
      ]
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
  const averageGrowth =
    filteredAccounts.length === 0
      ? 0
      : Math.round(filteredAccounts.reduce((sum, account) => sum + account.growth, 0) / filteredAccounts.length);
  const activeFilterCount =
    (searchQuery.trim() ? 1 : 0) +
    (segmentFilter !== "All" ? 1 : 0) +
    (healthFilter !== "All" ? 1 : 0);

  function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchQuery(draftQuery);
  }

  function resetFilters() {
    setDraftQuery("");
    setSearchQuery("");
    setSegmentFilter("All");
    setHealthFilter("All");
  }

  return (
    <main className="min-h-screen bg-[var(--app-background)] text-[var(--app-foreground)]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1680px] gap-6 p-4 lg:p-6">
        <aside className="hidden w-[280px] shrink-0 flex-col rounded-[28px] bg-[var(--app-sidebar)] px-5 py-6 text-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.24)] lg:flex">
          <div className="flex items-center gap-3 border-b border-white/10 pb-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-300">Customer Dashboard</div>
              <div className="font-semibold">Revenue Ops</div>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors",
                    item.active
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-slate-300 hover:bg-white/8 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto rounded-[24px] border border-white/10 bg-white/6 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Quarter target</p>
                <p className="mt-2 text-2xl font-semibold">$4.8M</p>
              </div>
              <Badge className="border border-emerald-300/30 bg-emerald-400/12 text-emerald-200">+12%</Badge>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Revenue is pacing ahead of plan, with enterprise expansions leading the quarter.
            </p>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <Card className="overflow-hidden">
            <CardHeader className="gap-4 border-b border-[var(--app-border)] pb-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-3">
                  <Badge className="w-fit border border-blue-200 bg-blue-50 text-blue-700">Sales-focused CRM view</Badge>
                  <div className="space-y-1">
                    <CardTitle className="font-[var(--font-display)] text-3xl text-slate-950">
                      Customer revenue dashboard
                    </CardTitle>
                    <CardDescription className="max-w-3xl text-base">
                      Monitor customer ARR, expansion upside, and renewal health from one common CRM-style
                      workspace built for desktop account reviews.
                    </CardDescription>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">
                    <Share2 className="h-4 w-4" />
                    Export view
                  </Button>
                  <Button>
                    <Plus className="h-4 w-4" />
                    New account
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 lg:hidden">
                {navigationItems.map((item) => (
                  <Badge
                    key={item.label}
                    variant="outline"
                    className={cn(
                      "rounded-full px-3 py-1.5",
                      item.active && "border-blue-200 bg-blue-50 text-blue-700",
                    )}
                  >
                    {item.label}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card className="bg-[var(--app-panel-muted)]">
              <CardHeader className="pb-3">
                <CardDescription>Visible ARR</CardDescription>
                <CardTitle className="text-3xl">{compactCurrencyFormatter.format(totalArr)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">{filteredAccounts.length} customer accounts in the current view</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--app-panel-muted)]">
              <CardHeader className="pb-3">
                <CardDescription>Expansion upside</CardDescription>
                <CardTitle className="text-3xl">{compactCurrencyFormatter.format(totalExpansion)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">Cross-sell and seat growth opportunities highlighted in the table</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--app-panel-muted)]">
              <CardHeader className="pb-3">
                <CardDescription>Average growth</CardDescription>
                <CardTitle className="text-3xl">{averageGrowth >= 0 ? "+" : ""}{averageGrowth}%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">Revenue trend based on the customers currently visible</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--app-panel-muted)]">
              <CardHeader className="pb-3">
                <CardDescription>Renewal risk</CardDescription>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <TriangleAlert className="h-6 w-6 text-amber-600" />
                  {renewalRiskCount}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">Accounts currently marked at risk for renewal conversations</p>
              </CardContent>
            </Card>
          </section>

          <Card className="min-h-0 overflow-hidden">
            <CardHeader className="gap-5 border-b border-[var(--app-border)] pb-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl">Customer revenue table</CardTitle>
                  <CardDescription>
                    Search across account name, owner, industry, and region, then slice the view with fast button
                    filters.
                  </CardDescription>
                </div>

                <form className="flex w-full max-w-xl flex-col gap-3 sm:flex-row" onSubmit={handleSearchSubmit}>
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      value={draftQuery}
                      onChange={(event) => setDraftQuery(event.target.value)}
                      className="pl-9"
                      placeholder="Search customer, owner, industry, or region"
                    />
                  </div>
                  <Button type="submit" className="sm:min-w-[120px]">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </form>
              </div>

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <Filter className="h-3.5 w-3.5" />
                    Segment filter
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {segmentFilters.map((filterValue) => (
                      <Button
                        key={filterValue}
                        variant={segmentFilter === filterValue ? "default" : "outline"}
                        size="sm"
                        aria-pressed={segmentFilter === filterValue}
                        onClick={() => setSegmentFilter(filterValue)}
                      >
                        {filterLabel(filterValue)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Renewal health
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {healthFilters.map((filterValue) => (
                      <Button
                        key={filterValue}
                        variant={healthFilter === filterValue ? "default" : "outline"}
                        size="sm"
                        aria-pressed={healthFilter === filterValue}
                        onClick={() => setHealthFilter(filterValue)}
                      >
                        {filterLabel(filterValue)}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="flex flex-col gap-3 border-b border-[var(--app-border)] px-6 py-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-medium text-slate-700">
                    {filteredAccounts.length} accounts • {currencyFormatter.format(totalArr)} ARR
                  </span>
                  {activeFilterCount > 0 ? (
                    <Badge className="border border-blue-200 bg-blue-50 text-blue-700">
                      {activeFilterCount} active {activeFilterCount === 1 ? "filter" : "filters"}
                    </Badge>
                  ) : null}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-fit"
                  onClick={resetFilters}
                  disabled={activeFilterCount === 0}
                >
                  Clear filters
                </Button>
              </div>

              <RevenueTable accounts={filteredAccounts} onReset={resetFilters} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
