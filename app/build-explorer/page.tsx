import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { BuildExplorer } from "@/components/ui/BuildExplorer";
import { pageMeta } from "@/lib/seo";
import { home, sampleCopy } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Build Explorer",
  description: "Explore the interactive assembly of a Ventura project from foundations to handover.",
  path: "/build-explorer/",
});

export default function BuildExplorerPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="section">
          <div className="container">
            <span className="eyebrow">Interactive Process</span>
            <h1 style={{ marginBottom: "var(--space-4)" }}>The Build Explorer</h1>
            <p style={{ color: "var(--neutral-600)", maxWidth: "60ch" }}>
              Scroll to watch a Ventura building assemble from the ground up, stage by stage — drag the model at any point to rotate it.
            </p>
          </div>
        </section>

        <BuildExplorer />

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
