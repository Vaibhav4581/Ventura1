import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — "ultra-fast, max security, low maintenance".
  output: "export",
  // Static export can't use the default image optimizer; serve images as-is.
  images: { unoptimized: true },
  // Emit /route/index.html so any static host (Cloudflare Pages) serves clean URLs.
  trailingSlash: true,
  // Inline the (small) CSS into <head> — removes render-blocking stylesheet
  // round-trips, the main LCP cost on slow connections for first-time visitors.
  experimental: { inlineCss: true },
};

export default nextConfig;
