export const customerAccounts = [
    {
        id: "cloudcore-logistics",
        name: "CloudCore Logistics",
        industry: "Logistics",
        owner: "Mia Chen",
        region: "North America East",
        segment: "Enterprise",
        arr: 420000,
        expansionOpportunity: 85000,
        health: "Healthy",
        growth: 18,
        renewalDate: "Jul 15, 2026",
        lastActivity: "QBR confirmed for next Wednesday"
    },
    {
        id: "northstar-retail",
        name: "Northstar Retail Group",
        industry: "Retail",
        owner: "Jordan Patel",
        region: "North America West",
        segment: "Enterprise",
        arr: 382000,
        expansionOpportunity: 54000,
        health: "Needs Attention",
        growth: 9,
        renewalDate: "Jun 21, 2026",
        lastActivity: "Pricing review requested by procurement"
    },
    {
        id: "harbor-health",
        name: "Harbor Health Systems",
        industry: "Healthcare",
        owner: "Avery Brooks",
        region: "Midwest",
        segment: "Enterprise",
        arr: 335000,
        expansionOpportunity: 67000,
        health: "Healthy",
        growth: 14,
        renewalDate: "Aug 8, 2026",
        lastActivity: "Pilot for analytics module started"
    },
    {
        id: "summit-peak-energy",
        name: "Summit Peak Energy",
        industry: "Energy",
        owner: "Priya Nair",
        region: "South",
        segment: "Mid-Market",
        arr: 228000,
        expansionOpportunity: 39000,
        health: "At Risk",
        growth: -4,
        renewalDate: "May 30, 2026",
        lastActivity: "Champion changed roles last week"
    },
    {
        id: "bluewave-studios",
        name: "Bluewave Studios",
        industry: "Media",
        owner: "Isaac Romero",
        region: "Canada",
        segment: "Mid-Market",
        arr: 176000,
        expansionOpportunity: 44000,
        health: "Healthy",
        growth: 21,
        renewalDate: "Sep 14, 2026",
        lastActivity: "Expansion conversation scheduled"
    },
    {
        id: "atlas-bio",
        name: "Atlas Bio Labs",
        industry: "Life Sciences",
        owner: "Mia Chen",
        region: "North America East",
        segment: "Mid-Market",
        arr: 164000,
        expansionOpportunity: 26000,
        health: "Needs Attention",
        growth: 6,
        renewalDate: "Jul 2, 2026",
        lastActivity: "Usage flat since February"
    },
    {
        id: "lumen-hospitality",
        name: "Lumen Hospitality",
        industry: "Hospitality",
        owner: "Jordan Patel",
        region: "South",
        segment: "SMB",
        arr: 96000,
        expansionOpportunity: 18000,
        health: "Healthy",
        growth: 12,
        renewalDate: "Jun 11, 2026",
        lastActivity: "Adoption campaign completed"
    },
    {
        id: "redwood-construction",
        name: "Redwood Construction",
        industry: "Construction",
        owner: "Avery Brooks",
        region: "Midwest",
        segment: "SMB",
        arr: 84000,
        expansionOpportunity: 12000,
        health: "At Risk",
        growth: -7,
        renewalDate: "May 22, 2026",
        lastActivity: "Budget freeze mentioned on last call"
    },
    {
        id: "cobalt-fintech",
        name: "Cobalt Fintech",
        industry: "Financial Services",
        owner: "Priya Nair",
        region: "EMEA",
        segment: "Mid-Market",
        arr: 212000,
        expansionOpportunity: 51000,
        health: "Healthy",
        growth: 17,
        renewalDate: "Oct 3, 2026",
        lastActivity: "Security review passed"
    },
    {
        id: "orchard-works",
        name: "Orchard Works",
        industry: "Manufacturing",
        owner: "Isaac Romero",
        region: "APAC",
        segment: "SMB",
        arr: 72000,
        expansionOpportunity: 14000,
        health: "Needs Attention",
        growth: 4,
        renewalDate: "Aug 27, 2026",
        lastActivity: "Admin user asking for support credits"
    },
    {
        id: "delta-public-sector",
        name: "Delta Public Sector",
        industry: "Government",
        owner: "Mia Chen",
        region: "North America East",
        segment: "Enterprise",
        arr: 468000,
        expansionOpportunity: 92000,
        health: "Healthy",
        growth: 11,
        renewalDate: "Nov 18, 2026",
        lastActivity: "Multi-year renewal terms under review"
    },
    {
        id: "meridian-commerce",
        name: "Meridian Commerce",
        industry: "E-commerce",
        owner: "Priya Nair",
        region: "North America West",
        segment: "Mid-Market",
        arr: 148000,
        expansionOpportunity: 32000,
        health: "Needs Attention",
        growth: 8,
        renewalDate: "Jun 5, 2026",
        lastActivity: "Board wants ROI summary before upsell"
    }
];
export const segmentFilters = ["All", "Enterprise", "Mid-Market", "SMB"];
export const healthFilters = ["All", "Healthy", "Needs Attention", "At Risk"];
export const defaultSavedViews = [
    { id: "all", label: "All" },
    { id: "renewals", label: "Renewals", tone: "active", selected: true },
    { id: "expansion", label: "Expansion" },
    { id: "strategic", label: "Strategic" }
];
export const overflowSavedViews = [
    { id: "all", label: "All" },
    { id: "renewals", label: "Renewals", tone: "active", selected: true },
    { id: "expansion", label: "Expansion" },
    { id: "strategic", label: "Strategic" },
    { id: "emea", label: "EMEA" },
    { id: "apac", label: "APAC" },
    { id: "north-am", label: "North Am" },
    { id: "top-25", label: "Top 25" },
    { id: "at-risk", label: "At Risk" },
    { id: "exec", label: "Exec" }
];
export const modalSavedViews = [
    { id: "quarterly-review", label: "Quarterly review", meta: "Default • 12 accounts", selected: true },
    { id: "renewals-at-risk", label: "Renewals at risk", meta: "5 accounts • shared" },
    { id: "expansion-watchlist", label: "Expansion watchlist", meta: "8 accounts • Mia Chen" }
];
export const modalOverflowSavedViews = [
    { id: "quarterly-review", label: "Quarterly review", meta: "Default • 12 accounts", selected: true },
    { id: "renewals-at-risk", label: "Renewals at risk", meta: "5 accounts • shared" },
    { id: "expansion-watchlist", label: "Expansion watchlist", meta: "8 accounts • Mia Chen" },
    { id: "strategic-accounts", label: "Strategic accounts", meta: "6 accounts • AMER" },
    { id: "emea-renewals", label: "EMEA renewals", meta: "4 accounts • shared" },
    { id: "apac-growth", label: "APAC growth", meta: "7 accounts • Kenji" },
    { id: "top-25-arr", label: "Top 25 ARR", meta: "25 accounts • exec" },
    { id: "at-risk-qbrs", label: "At-risk QBRs", meta: "3 accounts • CS team" },
    { id: "churn-watch", label: "Churn watch", meta: "5 accounts • weekly" },
    { id: "board-review", label: "Board review", meta: "9 accounts • leadership" }
];
export const themeTokens = {
    colors: {
        appBackground: "#f3f5f8",
        appForeground: "#0f172a",
        appPanel: "#ffffff",
        appPanelMuted: "#f8fafc",
        appSidebar: "#0f172a",
        appBorder: "#dbe3ec",
        appMuted: "#64748b",
        appAccent: "#2563eb",
        appAccentSoft: "#eff6ff",
        appSuccess: "#047857",
        appWarning: "#b45309",
        appDanger: "#b91c1c",
        savedViewPillSoft: "#eff6ff",
        savedViewPillSoftBorder: "#bfdbfe",
        savedViewListBorder: "#e2e8f0"
    },
    radius: {
        shell: "28px",
        card: "24px",
        control: "12px",
        pill: "999px",
        savedViewModal: "18px"
    }
};
