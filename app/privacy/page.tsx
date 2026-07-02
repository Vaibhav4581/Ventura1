import type { Metadata } from "next";
import styles from "./privacy.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { pages } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";

const pv = pages.privacy;

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Ventura Builders & Developers handles the personal information you share through this website — plainly stated.",
  path: "/privacy/",
});

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy/" },
]);

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow={pv.header.eyebrow} title={pv.header.title} lead={pv.header.lead} />

        <section className={`section ${styles.policy}`}>
          <div className={`container ${styles.narrow}`}>
            <Reveal>
              <p className={styles.updated}>{pv.updated}</p>
            </Reveal>
            {pv.sections.map((s, i) => (
              <Reveal key={s.title} as="article" delay={i * 40} className={styles.block}>
                <h2 className={styles.blockTitle}>{s.title}</h2>
                {s.body.map((para) => (
                  <p key={para} className={styles.para}>{para}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
