import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@connecting-code-and-design/homepage"],
  turbopack: {
    root: path.join(__dirname, "../..")
  }
};

export default nextConfig;
