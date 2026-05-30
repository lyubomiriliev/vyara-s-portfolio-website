import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
