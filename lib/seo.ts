/* Structured-data builders (JSON-LD). Everything emitted here must stay
   truthful and consistent with visible page content — no ratings, reviews or
   claims the client hasn't substantiated. LocalBusiness (with postal address /
   phone) stays deferred until real contact details land. */

import type { Metadata } from "next";
import { brand, type Service } from "./brand";

const BASE = `https://${brand.domain}`;

/* Per-page metadata with a self-referencing canonical and full OG/Twitter
   objects. Next merges metadata shallowly per field, so a page that sets only
   { openGraph: { title } } would WIPE the layout's og:image — always build
   page metadata through this helper instead. `path` uses a trailing slash to
   match `trailingSlash: true` (e.g. "/projects/"). */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  /* Use when `title` is already the full brand title (home page) — skips the
     layout's "%s — brand" template and the og suffix. */
  absoluteTitle?: boolean;
}): Metadata {
  const image = opts.image ?? "/imagery/hero-build.jpg";
  const fullTitle = opts.absoluteTitle ? opts.title : `${opts.title} — ${brand.name}`;
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      siteName: brand.name,
      locale: "en_GB",
      title: fullTitle,
      description: opts.description,
      url: opts.path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [image],
    },
  };
}

export type Crumb = { name: string; path: string };

/* BreadcrumbList for inner pages: pass e.g.
   [{ name: "Home", path: "/" }, { name: "Services", path: "/services/" }] */
export function breadcrumbsJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.detail,
    url: `${BASE}/services/${service.slug}/`,
    areaServed: "Zambia",
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: BASE,
    },
  };
}
