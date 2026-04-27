import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Connecting Code and Design Prototype",
  description: "Interactive browser prototype for the Figma mobile release notes screens."
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
