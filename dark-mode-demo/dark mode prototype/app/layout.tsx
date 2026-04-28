import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dark Mode Prototype",
  description: "Pixel-focused browser prototype for the museum homepage dark mode."
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
