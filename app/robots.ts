import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

// `force-static` is required for metadata routes under `output: export` (Next 16).
export const dynamic = "force-static";

const BASE = `https://${brand.domain}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* No Disallow for /brand-guide/ — blocking the fetch would stop crawlers
         from ever seeing its noindex meta, which is the real protection. */
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
