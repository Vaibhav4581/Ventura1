import type { MetadataRoute } from "next";
import { brand, services } from "@/lib/brand";

/* Static sitemap emitted to out/sitemap.xml at build.
   Public marketing routes only — the internal /brand-guide is excluded.
   `force-static` is required for metadata routes under `output: export` (Next 16). */
export const dynamic = "force-static";

const BASE = `https://${brand.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/projects/", priority: 0.9 },
    { path: "/about/", priority: 0.8 },
    { path: "/services/", priority: 0.8 },
    ...services.map((s) => ({ path: `/services/${s.slug}/`, priority: 0.7 })),
    { path: "/approach/", priority: 0.7 },
    { path: "/contact/", priority: 0.7 },
    { path: "/careers/", priority: 0.5 },
    { path: "/privacy/", priority: 0.3 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
