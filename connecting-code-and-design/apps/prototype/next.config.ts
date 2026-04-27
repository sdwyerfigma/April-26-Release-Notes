import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@connecting-code-and-design/assets",
    "@connecting-code-and-design/components",
    "@connecting-code-and-design/docs",
    "@connecting-code-and-design/homepage",
    "@connecting-code-and-design/icons",
    "@connecting-code-and-design/tokens"
  ],
  turbopack: {
    root: path.join(__dirname, "../..")
  }
};

export default nextConfig;
