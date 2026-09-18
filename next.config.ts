import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/:lang/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
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
