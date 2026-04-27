import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dark Mode Demo",
  description: "Inverted dark-mode browser demo for the museum homepage screen."
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
