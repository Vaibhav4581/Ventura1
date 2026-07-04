import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { CaseStudy } from "@/components/ui/CaseStudy";
import { pageMeta } from "@/lib/seo";
import { home, sampleCopy } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Case Study: Private Residence",
  description: "One project — drawn, modelled, built, delivered.",
  path: "/case-study/",
});

export default function CaseStudyPage() {
  return (
    <>
      <Header />
      <main id="main">
        <CaseStudy />
        
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
