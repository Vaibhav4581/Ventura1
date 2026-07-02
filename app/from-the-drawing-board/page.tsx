import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { DrawingBoard } from "@/components/ui/DrawingBoard";
import { pageMeta } from "@/lib/seo";
import { home, sampleCopy } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "From the drawing board",
  description: "Every Ventura build starts as a precise set of drawings — structure, crane positions and services, planned before a sod is turned.",
  path: "/from-the-drawing-board/",
});

export default function FromTheDrawingBoardPage() {
  return (
    <>
      <Header />
      <main id="main">
        <DrawingBoard />
        
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
