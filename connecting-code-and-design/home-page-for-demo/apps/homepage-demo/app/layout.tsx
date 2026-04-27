import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Page Demo",
  description: "Focused browser demo for the pixel-perfect museum homepage."
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
