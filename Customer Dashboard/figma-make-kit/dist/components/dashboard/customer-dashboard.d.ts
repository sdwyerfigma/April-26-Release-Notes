import { type CustomerAccount } from "../../data/customer-data";
export type CustomerDashboardProps = {
    accounts?: CustomerAccount[];
    title?: string;
    subtitle?: string;
    viewBadge?: string;
};
export declare function CustomerDashboard({ accounts, title, subtitle, viewBadge }: CustomerDashboardProps): import("react/jsx-runtime").JSX.Element;
