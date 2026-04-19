import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CustomerAccount } from "@/lib/customer-data";
import { cn } from "@/lib/utils";

type RevenueTableProps = {
  accounts: CustomerAccount[];
  onReset: () => void;
};

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
  notation: "compact",
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
    return "border border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (health === "At Risk") {
    return "border border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border border-amber-200 bg-amber-50 text-amber-700";
}

export function RevenueTable({ accounts, onReset }: RevenueTableProps) {
  if (accounts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
        <div className="rounded-full bg-slate-100 p-3 text-slate-500">
          <ArrowDownRight className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-950">No accounts match this view</h3>
          <p className="text-sm text-slate-500">
            Try a broader search or clear the filters to bring revenue accounts back into scope.
          </p>
        </div>
        <Button variant="outline" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Customer</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead className="text-right">ARR</TableHead>
            <TableHead className="text-right">Growth</TableHead>
            <TableHead className="text-right">Expansion</TableHead>
            <TableHead>Renewal</TableHead>
            <TableHead>Health</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accounts.map((account) => {
            const isPositive = account.growth >= 0;

            return (
              <TableRow key={account.id}>
                <TableCell className="min-w-[280px]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700">
                      {initialsFromName(account.name)}
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-950">{account.name}</div>
                      <div className="text-sm text-slate-500">
                        {account.industry} • {account.region}
                      </div>
                      <div className="text-xs text-slate-400">{account.lastActivity}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-slate-900">{account.owner}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border-slate-200 bg-slate-50 text-slate-700",
                      account.segment === "Enterprise" && "border-blue-200 bg-blue-50 text-blue-700",
                    )}
                  >
                    {account.segment}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-slate-950">
                  {compactCurrencyFormatter.format(account.arr)}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={cn(
                      "inline-flex items-center justify-end gap-1 font-semibold",
                      isPositive ? "text-emerald-700" : "text-rose-700",
                    )}
                  >
                    {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {isPositive ? "+" : ""}
                    {account.growth}%
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-slate-900">
                  {compactCurrencyFormatter.format(account.expansionOpportunity)}
                </TableCell>
                <TableCell className="font-medium text-slate-900">{account.renewalDate}</TableCell>
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
