export type CustomerSegment = "Enterprise" | "Mid-Market" | "SMB";
export type CustomerHealth = "Healthy" | "Needs Attention" | "At Risk";
export type CustomerAccount = {
    id: string;
    name: string;
    industry: string;
    owner: string;
    region: string;
    segment: CustomerSegment;
    arr: number;
    expansionOpportunity: number;
    health: CustomerHealth;
    growth: number;
    renewalDate: string;
    lastActivity: string;
};
export type SavedViewPillTone = "default" | "active" | "soft";
export type SavedView = {
    id: string;
    label: string;
    meta?: string;
    tone?: SavedViewPillTone;
    selected?: boolean;
};
export declare const customerAccounts: CustomerAccount[];
export declare const segmentFilters: Array<CustomerSegment | "All">;
export declare const healthFilters: Array<CustomerHealth | "All">;
export declare const defaultSavedViews: SavedView[];
export declare const overflowSavedViews: SavedView[];
export declare const modalSavedViews: SavedView[];
export declare const modalOverflowSavedViews: SavedView[];
export declare const themeTokens: {
    readonly colors: {
        readonly appBackground: "#f3f5f8";
        readonly appForeground: "#0f172a";
        readonly appPanel: "#ffffff";
        readonly appPanelMuted: "#f8fafc";
        readonly appSidebar: "#0f172a";
        readonly appBorder: "#dbe3ec";
        readonly appMuted: "#64748b";
        readonly appAccent: "#2563eb";
        readonly appAccentSoft: "#eff6ff";
        readonly appSuccess: "#047857";
        readonly appWarning: "#b45309";
        readonly appDanger: "#b91c1c";
        readonly savedViewPillSoft: "#eff6ff";
        readonly savedViewPillSoftBorder: "#bfdbfe";
        readonly savedViewListBorder: "#e2e8f0";
    };
    readonly radius: {
        readonly shell: "28px";
        readonly card: "24px";
        readonly control: "12px";
        readonly pill: "999px";
        readonly savedViewModal: "18px";
    };
};
