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
  Users
} from "lucide-react";

import {
  customerAccounts,
  healthFilters,
  segmentFilters,
  type CustomerAccount,
  type CustomerHealth,
  type CustomerSegment
} from "../../data/customer-data";
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

type SegmentFilter = CustomerSegment | "All";
type HealthFilter = CustomerHealth | "All";

export type CustomerDashboardProps = {
  accounts?: CustomerAccount[];
  title?: string;
  subtitle?: string;
  viewBadge?: string;
};

function filterLabel(label: string) {
  return label === "All" ? "All" : label;
}

export function CustomerDashboard({
  accounts = customerAccounts,
  title = "Customer revenue dashboard",
  subtitle = "Monitor customer ARR, expansion upside, and renewal health from one common CRM-style workspace built for desktop account reviews.",
  viewBadge = "Sales-focused CRM view"
}: CustomerDashboardProps) {
  const [draftQuery, setDraftQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<SegmentFilter>("All");
  const [healthFilter, setHealthFilter] = useState<HealthFilter>("All");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredAccounts = accounts.filter((account) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
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
    <main className="cdmk-root">
      <div className="cdmk-shell">
        <aside className="cdmk-sidebar">
          <div className="cdmk-sidebar__brand">
            <div className="cdmk-sidebar__brand-icon">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="cdmk-sidebar__brand-eyebrow">Customer Dashboard</div>
              <div className="cdmk-sidebar__brand-title">Revenue Ops</div>
            </div>
          </div>

          <nav className="cdmk-sidebar__nav">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={cn("cdmk-sidebar__nav-item", item.active && "cdmk-sidebar__nav-item--active")}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="cdmk-sidebar__target">
            <div className="cdmk-sidebar__target-row">
              <div>
                <p className="cdmk-sidebar__target-label">Quarter target</p>
                <p className="cdmk-sidebar__target-value">$4.8M</p>
              </div>
              <Badge className="cdmk-sidebar__target-badge">+12%</Badge>
            </div>
            <p className="cdmk-sidebar__target-copy">
              Revenue is pacing ahead of plan, with enterprise expansions leading the quarter.
            </p>
          </div>
        </aside>

        <div className="cdmk-main">
          <Card className="cdmk-hero-card">
            <CardHeader className="cdmk-hero-card__header">
              <div className="cdmk-hero-card__top">
                <div className="cdmk-hero-card__copy">
                  <Badge className="cdmk-view-badge">{viewBadge}</Badge>
                  <div>
                    <CardTitle className="cdmk-hero-card__title">{title}</CardTitle>
                    <CardDescription className="cdmk-hero-card__description">{subtitle}</CardDescription>
                  </div>
                </div>

                <div className="cdmk-hero-card__actions">
                  <Button variant="outline">
                    <Share2 size={16} />
                    Export view
                  </Button>
                  <Button>
                    <Plus size={16} />
                    New account
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <section className="cdmk-kpi-grid">
            <Card className="cdmk-kpi-card">
              <CardHeader className="cdmk-kpi-card__header">
                <CardDescription>Visible ARR</CardDescription>
                <CardTitle className="cdmk-kpi-card__title">{compactCurrencyFormatter.format(totalArr)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{filteredAccounts.length} customer accounts in the current view</p>
              </CardContent>
            </Card>

            <Card className="cdmk-kpi-card">
              <CardHeader className="cdmk-kpi-card__header">
                <CardDescription>Expansion upside</CardDescription>
                <CardTitle className="cdmk-kpi-card__title">{compactCurrencyFormatter.format(totalExpansion)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Cross-sell and seat growth opportunities highlighted in the table</p>
              </CardContent>
            </Card>

            <Card className="cdmk-kpi-card">
              <CardHeader className="cdmk-kpi-card__header">
                <CardDescription>Average growth</CardDescription>
                <CardTitle className="cdmk-kpi-card__title">
                  {averageGrowth >= 0 ? "+" : ""}
                  {averageGrowth}%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Revenue trend based on the customers currently visible</p>
              </CardContent>
            </Card>

            <Card className="cdmk-kpi-card">
              <CardHeader className="cdmk-kpi-card__header">
                <CardDescription>Renewal risk</CardDescription>
                <CardTitle className="cdmk-kpi-card__title cdmk-kpi-card__title--with-icon">
                  <TriangleAlert size={22} className="cdmk-warning-icon" />
                  {renewalRiskCount}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Accounts currently marked at risk for renewal conversations</p>
              </CardContent>
            </Card>
          </section>

          <Card className="cdmk-table-card">
            <CardHeader className="cdmk-table-card__header">
              <div className="cdmk-table-card__top">
                <div className="cdmk-table-card__copy">
                  <CardTitle className="cdmk-table-card__title">Customer revenue table</CardTitle>
                  <CardDescription>
                    Search across account name, owner, industry, and region, then slice the view with fast button
                    filters.
                  </CardDescription>
                </div>

                <form className="cdmk-search-form" onSubmit={handleSearchSubmit}>
                  <div className="cdmk-search-field">
                    <Search size={16} className="cdmk-search-field__icon" />
                    <Input
                      value={draftQuery}
                      onChange={(event) => setDraftQuery(event.target.value)}
                      className="cdmk-search-field__input"
                      placeholder="Search customer, owner, industry, or region"
                    />
                  </div>
                  <Button type="submit" className="cdmk-search-form__button">
                    <Search size={16} />
                    Search
                  </Button>
                </form>
              </div>

              <div className="cdmk-filter-bands">
                <div className="cdmk-filter-group">
                  <div className="cdmk-filter-group__label">
                    <Filter size={14} />
                    Segment filter
                  </div>
                  <div className="cdmk-filter-group__controls">
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

                <div className="cdmk-filter-group">
                  <div className="cdmk-filter-group__label">Renewal health</div>
                  <div className="cdmk-filter-group__controls">
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

            <CardContent className="cdmk-table-card__content">
              <div className="cdmk-table-summary">
                <div className="cdmk-table-summary__left">
                  <span className="cdmk-table-summary__metric">
                    {filteredAccounts.length} accounts • {currencyFormatter.format(totalArr)} ARR
                  </span>
                  {activeFilterCount > 0 ? (
                    <Badge className="cdmk-active-filter-badge">
                      {activeFilterCount} active {activeFilterCount === 1 ? "filter" : "filters"}
                    </Badge>
                  ) : null}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="cdmk-table-summary__reset"
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
