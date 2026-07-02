import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { SiteCam } from "@/components/ui/SiteCam";
import { pageMeta } from "@/lib/seo";
import { home, sampleCopy } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Site Cam Time-Lapse",
  description: "Watch a fast-forward time-lapse of a Ventura construction site, from groundbreaking to handover.",
  path: "/site-cam/",
});

export default function SiteCamPage() {
  return (
    <>
      <Header />
      <main id="main">
        {/* The Site Cam Hero */}
        <SiteCam />

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
