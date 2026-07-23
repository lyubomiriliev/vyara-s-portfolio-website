import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "export",
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  // Pin the workspace root to this project so Next ignores the stray
  // package-lock.json one directory up (silences the multi-lockfile warning).
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
