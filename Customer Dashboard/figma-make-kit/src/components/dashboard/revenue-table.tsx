import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { CustomerAccount } from "../../data/customer-data";
import { cn } from "../../lib/cn";
import { Badge } from "../primitives/badge";
import { Button } from "../primitives/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../primitives/table";

export type RevenueTableProps = {
  accounts: CustomerAccount[];
  onReset: () => void;
};

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact"
});

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function healthBadgeClasses(health: CustomerAccount["health"]) {
  if (health === "Healthy") {
    return "cdmk-health-badge cdmk-health-badge--healthy";
  }

  if (health === "At Risk") {
    return "cdmk-health-badge cdmk-health-badge--risk";
  }

  return "cdmk-health-badge cdmk-health-badge--attention";
}

export function RevenueTable({ accounts, onReset }: RevenueTableProps) {
  if (accounts.length === 0) {
    return (
      <div className="cdmk-empty-state">
        <div className="cdmk-empty-state__icon">
          <ArrowDownRight size={20} />
        </div>
        <div className="cdmk-empty-state__body">
          <h3>No accounts match this view</h3>
          <p>Try a broader search or clear the filters to bring revenue accounts back into scope.</p>
        </div>
        <Button variant="outline" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    );
  }

  return (
    <div className="cdmk-table-scroll">
      <Table>
        <TableHeader>
          <TableRow className="cdmk-table__row--static">
            <TableHead>Customer</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead className="cdmk-text-right">ARR</TableHead>
            <TableHead className="cdmk-text-right">Growth</TableHead>
            <TableHead className="cdmk-text-right">Expansion</TableHead>
            <TableHead>Renewal</TableHead>
            <TableHead>Health</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => {
            const isPositive = account.growth >= 0;

            return (
              <TableRow key={account.id}>
                <TableCell className="cdmk-table__customer-cell">
                  <div className="cdmk-account-cell">
                    <div className="cdmk-account-cell__avatar">{initialsFromName(account.name)}</div>
                    <div className="cdmk-account-cell__body">
                      <div className="cdmk-account-cell__title">{account.name}</div>
                      <div className="cdmk-account-cell__subtitle">
                        {account.industry} • {account.region}
                      </div>
                      <div className="cdmk-account-cell__meta">{account.lastActivity}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="cdmk-table__owner-cell">{account.owner}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "cdmk-segment-badge",
                      account.segment === "Enterprise" && "cdmk-segment-badge--enterprise"
                    )}
                  >
                    {account.segment}
                  </Badge>
                </TableCell>
                <TableCell className="cdmk-text-right cdmk-table__metric-cell">
                  {compactCurrencyFormatter.format(account.arr)}
                </TableCell>
                <TableCell className="cdmk-text-right">
                  <span
                    className={cn(
                      "cdmk-growth",
                      isPositive ? "cdmk-growth--positive" : "cdmk-growth--negative"
                    )}
                  >
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    {isPositive ? "+" : ""}
                    {account.growth}%
                  </span>
                </TableCell>
                <TableCell className="cdmk-text-right">{compactCurrencyFormatter.format(account.expansionOpportunity)}</TableCell>
                <TableCell>{account.renewalDate}</TableCell>
                <TableCell>
                  <Badge className={healthBadgeClasses(account.health)}>{account.health}</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
