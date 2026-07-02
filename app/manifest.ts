import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

/* Web app manifest — corporate-completeness touch (theme colour, icon).
   `force-static` is required for metadata routes under `output: export`. */
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.shortName,
    description: brand.positioning,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#1b2c7a",
    icons: [{ src: "/favicon-512.png", sizes: "512x512", type: "image/png" }],
  };
}
