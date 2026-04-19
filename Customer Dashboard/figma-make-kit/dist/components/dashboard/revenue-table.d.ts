import type { CustomerAccount } from "../../data/customer-data";
export type RevenueTableProps = {
    accounts: CustomerAccount[];
    onReset: () => void;
};
export declare function RevenueTable({ accounts, onReset }: RevenueTableProps): import("react/jsx-runtime").JSX.Element;
