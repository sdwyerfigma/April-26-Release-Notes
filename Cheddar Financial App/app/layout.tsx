import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";

import { CheddarPrototypeProvider } from "../components/cheddar-prototype-state";

import "./globals.css";

export const metadata: Metadata = {
  title: "Cheddar Financial App",
  description: "A mobile savings homescreen prototype recreated from Figma.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://mcp.figma.com/mcp/html-to-design/capture.js"
          strategy="afterInteractive"
        />
        <CheddarPrototypeProvider>{children}</CheddarPrototypeProvider>
      </body>
    </html>
  );
}
