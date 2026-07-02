import type { Metadata } from "next";
import styles from "./about.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Card } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { Reveal } from "@/components/ui/Reveal";
import { pages, values, stats, goldenCircle } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";

const about = pages.about;

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Ventura Builders & Developers is a construction and development company delivering safe, high-quality projects to international standards. Build with confidence.",
  path: "/about/",
  image: "/imagery/planning.jpg",
});

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "About", path: "/about/" },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow={about.header.eyebrow} title={about.header.title} lead={about.header.lead} />

        {/* ---------------- Story ---------------- */}
        <section className={`section ${styles.story}`}>
          <div className="container">
            <div className={styles.storyGrid}>
              <Reveal className={styles.storyBody}>
                <span className="eyebrow">{about.story.eyebrow}</span>
                <h2 className={styles.title}>{about.story.title}</h2>
                {about.story.paragraphs.map((p) => (
                  <p key={p} className={styles.para}>{p}</p>
                ))}
              </Reveal>
              <Reveal className={styles.storyMedia} delay={120}>
                <figure className={styles.figure}>
                  <img src={about.story.image} alt={about.story.imageAlt} loading="lazy" />
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- Purpose (Golden Circle) ---------------- */}
        <section className={`section ${styles.purpose}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{about.purpose.eyebrow}</span>
              <h2 className={styles.title}>{about.purpose.title}</h2>
              <p className={styles.lead}>{about.purpose.lead}</p>
            </Reveal>
            <div className={styles.purposeGrid}>
              {goldenCircle.map((g, i) => (
                <Reveal key={g.ring} delay={i * 60}>
                  <article className={styles.purposeCard}>
                    <span className={styles.ring}>{g.ring}</span>
                    <p className={styles.ringText}>{g.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Values ---------------- */}
        <section className={`section ${styles.values}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{about.values.eyebrow}</span>
              <h2 className={styles.title}>{about.values.title}</h2>
              <p className={styles.lead}>{about.values.lead}</p>
            </Reveal>
            <div className={styles.cardGrid}>
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 60}>
                  <Card variant="value" icon={v.icon} title={v.title}>{v.text}</Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Stats ---------------- */}
        <section className={`section ${styles.statsSection}`}>
          <div className="container">
            <Reveal className={styles.statBand}>
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </Reveal>
          </div>
        </section>

        <CtaBand
          eyebrow={about.cta.eyebrow}
          title={about.cta.title}
          text={about.cta.text}
          primary={{ href: "/contact", label: "Get a quote" }}
          secondary={{ href: "/services", label: "Our services" }}
        />
      </main>
      <Footer />
    </>
  );
}
