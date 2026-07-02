import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { WallAnatomy } from "@/components/ui/WallAnatomy";
import { pageMeta } from "@/lib/seo";
import { home, sampleCopy } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Anatomy of a wall",
  description:
    "A 1:5 detail section of a Ventura external wall, outside to inside — six layers, each mapped to the trade and material behind it. Tap a layer to see the spec.",
  path: "/anatomy-of-a-wall/",
});

export default function AnatomyOfAWallPage() {
  return (
    <>
      <Header />
      <main id="main">
        <WallAnatomy />

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
