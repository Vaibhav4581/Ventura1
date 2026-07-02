import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const SITE_URL = `https://${brand.domain}`;

// Display / headings — bold geometric sans, matches the logo wordmark.
const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

// Body / UI.
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Ventura Builders & Developers — safe, high-quality construction for residential, commercial and industrial projects, engineered to international standards. Build with confidence.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ventura Builders & Developers — Build with confidence.",
    template: "%s — Ventura Builders & Developers",
  },
  description,
  icons: { icon: "/favicon-512.png", apple: "/favicon-512.png" },
  /* NOTE: no `alternates` here — a layout-level canonical is INHERITED by
     every page and would point them all at "/". Each page sets its own
     self-referencing canonical via lib/seo.ts pageMeta(). */
  openGraph: {
    type: "website",
    siteName: brand.name,
    title: "Ventura Builders & Developers — Build with confidence.",
    description,
    url: SITE_URL,
    locale: "en_GB",
    images: ["/imagery/hero-build.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ventura Builders & Developers — Build with confidence.",
    description,
    images: ["/imagery/hero-build.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1b2c7a",
};

/* Organization structured data. LocalBusiness/postal address is deferred until
   real contact details land (phone + street address are placeholders). */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo/logo.svg`,
  email: brand.email,
  description: brand.positioning,
  slogan: brand.tagline,
  areaServed: "ZM",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
