import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { ProjectViews } from "@/components/ui/ProjectViews";
import { pageMeta } from "@/lib/seo";
import { home, sampleCopy } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "One project, three views",
  description:
    "The same Ventura project seen three ways — the plan we drew, the building we delivered, and the numbers behind it.",
  path: "/project-views/",
});

export default function ProjectViewsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <ProjectViews />

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
