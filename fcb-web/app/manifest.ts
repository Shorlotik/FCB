import type { MetadataRoute } from "next";
import { getSiteMeta } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  const site = getSiteMeta();
  return {
    name: site.name,
    short_name: "FCBMINSK",
    description: site.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f2ee",
    theme_color: "#0a0a0a",
    lang: "ru",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        type: "image/png",
        sizes: "180x180",
        purpose: "any",
      },
    ],
  };
}
