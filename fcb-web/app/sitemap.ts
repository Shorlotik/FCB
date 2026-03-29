import type { MetadataRoute } from "next";
import { getAllCaseStaticIds } from "@/lib/cases";
import { getServices, getSiteMeta } from "@/lib/content";

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/cases",
  "/clients",
  "/partners",
  "/vacancy",
  "/otzyvy",
  "/contacts",
  "/client",
  "/work",
  "/search",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteMeta().url.replace(/\/$/, "");
  const now = new Date();

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  for (const s of getServices()) {
    entries.push({
      url: `${base}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const { id } of getAllCaseStaticIds()) {
    entries.push({
      url: `${base}/cases/${id}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
