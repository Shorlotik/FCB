import type { MetadataRoute } from "next";
import { getSiteMeta } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteMeta().url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
