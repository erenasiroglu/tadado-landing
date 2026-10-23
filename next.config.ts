import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  experimental: {
    // Inline the (small) global CSS into the HTML so it no longer blocks first paint.
    inlineCss: true,
    optimizePackageImports: ["motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/tr/blog/tabu-nasil-oynanir",
        destination: "/tr/blog/yasakli-kelimeler-nasil-oynanir",
        permanent: true,
      },
      {
        source: "/en/blog/how-to-play-charades-heads-up",
        destination: "/en/blog/how-to-play-heads-up",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
