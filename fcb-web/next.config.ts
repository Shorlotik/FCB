import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  experimental: {
    optimizePackageImports: ["@react-three/drei", "framer-motion", "three"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  /** Старые URL с Bitrix (fcb.by) → новые маршруты Next */
  async redirects() {
    return [
      { source: "/company", destination: "/about", permanent: true },
      { source: "/company/", destination: "/about", permanent: true },
      { source: "/uslugi", destination: "/services", permanent: true },
      { source: "/uslugi/", destination: "/services", permanent: true },
      { source: "/uslugi/:slug", destination: "/services/:slug", permanent: true },
      { source: "/privacy.pdf", destination: "/privacy", permanent: false },
      { source: "/cookies.pdf", destination: "/privacy#cookies", permanent: false },
    ];
  },
};

export default nextConfig;
