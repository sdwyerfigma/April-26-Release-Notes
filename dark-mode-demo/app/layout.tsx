import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Light Mode Demo",
  description: "Pixel-focused browser demo for the museum homepage light mode."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
