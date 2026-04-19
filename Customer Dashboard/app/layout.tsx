import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Sales-focused CRM revenue dashboard prototype with searchable customer accounts.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://mcp.figma.com/mcp/html-to-design/capture.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
