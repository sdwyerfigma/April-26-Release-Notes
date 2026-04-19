import "./styles.css";

export { Button, type ButtonProps } from "./components/primitives/button";
export { Badge, type BadgeProps } from "./components/primitives/badge";
export { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/primitives/card";
export { Input } from "./components/primitives/input";
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "./components/primitives/table";

export { RevenueTable, type RevenueTableProps } from "./components/dashboard/revenue-table";
export { CustomerDashboard, type CustomerDashboardProps } from "./components/dashboard/customer-dashboard";

export { SavedViewsPill, type SavedViewsPillProps } from "./components/saved-views/saved-views-pill";
export {
  SavedViewsInlineRail,
  type SavedViewsInlineRailProps
} from "./components/saved-views/saved-views-inline-rail";
export {
  SavedViewsListItem,
  type SavedViewsListItemProps
} from "./components/saved-views/saved-views-list-item";
export {
  SavedViewsModal,
  type SavedViewsModalProps
} from "./components/saved-views/saved-views-modal";

export {
  customerAccounts,
  defaultSavedViews,
  healthFilters,
  modalOverflowSavedViews,
  modalSavedViews,
  overflowSavedViews,
  segmentFilters,
  themeTokens,
  type CustomerAccount,
  type CustomerHealth,
  type CustomerSegment,
  type SavedView,
  type SavedViewPillTone
} from "./data/customer-data";
