import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { SiteServicesMap } from "@/components/ui/SiteServicesMap";
import { pageMeta } from "@/lib/seo";
import { home, sampleCopy } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "One site, every service",
  description:
    "See how Ventura's services map onto a real construction site — from the crane running the whole programme down to the footings. Explore the build part by part.",
  path: "/site-map/",
});

export default function SiteMapPage() {
  return (
    <>
      <Header />
      <main id="main">
        <SiteServicesMap />

        <CtaBand
          id="contact"
          eyebrow={home.cta.eyebrow}
          title={home.cta.title}
          text={home.cta.text}
          primary={{ href: "/contact", label: sampleCopy.ctaPrimary }}
          secondary={{ href: "/projects", label: sampleCopy.ctaSecondary }}
        />
      </main>
      <Footer />
    </>
  );
}
