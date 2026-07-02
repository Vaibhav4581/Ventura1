import type { Metadata } from "next";
import styles from "./projects.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { pages } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";
import { ProjectsExplorer } from "./ProjectsExplorer";

const pj = pages.projects;

export const metadata: Metadata = pageMeta({
  title: "Projects",
  description:
    "Explore the kinds of projects Ventura Builders & Developers delivers across Zambia — filter the portfolio by sector.",
  path: "/projects/",
  image: "/imagery/mixeduse.jpg",
});

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects/" },
]);

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow={pj.header.eyebrow} title={pj.header.title} lead={pj.header.lead} />

        {/* ---------------- Segmented portfolio ---------------- */}
        <section className={`section ${styles.portfolio}`}>
          <div className="container">
            <ProjectsExplorer />
            <p className={styles.note}>{pj.note}</p>
          </div>
        </section>

        <CtaBand
          eyebrow={pj.cta.eyebrow}
          title={pj.cta.title}
          text={pj.cta.text}
          primary={{ href: "/contact", label: "Get a quote" }}
          secondary={{ href: "/services", label: "Our services" }}
        />
      </main>
      <Footer />
    </>
  );
}
