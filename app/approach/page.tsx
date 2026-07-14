import type { Metadata } from "next";
import styles from "./approach.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { pages } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";

const ap = pages.approach;

export const metadata: Metadata = pageMeta({
  title: "Our Approach",
  description:
    "How Ventura Builders & Developers delivers: a five-stage process from brief to handover, with safety and quality built into every site.",
  path: "/approach/",
  image: "/imagery/roads.jpg",
});

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "Our Approach", path: "/approach/" },
]);

export default function ApproachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow={ap.header.eyebrow} title={ap.header.title} lead={ap.header.lead} />

        {/* ---------------- Process ---------------- */}
        <section className={`section ${styles.process}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{ap.process.eyebrow}</span>
              <h2 className={styles.title}>{ap.process.title}</h2>
              <p className={styles.lead}>{ap.process.lead}</p>
            </Reveal>
            <ol className={styles.steps}>
              {ap.process.steps.map((step, i) => (
                <Reveal key={step.title} as="li" delay={i * 60} className={styles.step}>
                  <span className={styles.stepNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepIcon} aria-hidden="true">
                    <Icon name={step.icon} size={24} />
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- Safety (navy band) ---------------- */}
        <section className={`section ${styles.safety}`}>
          <div className="container">
            <Reveal className={styles.safetyHead}>
              <span className={styles.ctaEyebrow}>{ap.safety.eyebrow}</span>
              <h2 className={styles.safetyTitle}>{ap.safety.title}</h2>
              <p className={styles.safetyLead}>{ap.safety.lead}</p>
            </Reveal>
            <div className={styles.glassGrid}>
              {ap.safety.points.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <Card variant="glass" icon={p.icon} title={p.title}>{p.text}</Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Quality ---------------- */}
        <section className={`section ${styles.quality}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{ap.quality.eyebrow}</span>
              <h2 className={styles.title}>{ap.quality.title}</h2>
              <p className={styles.lead}>{ap.quality.lead}</p>
            </Reveal>
            <ul className={styles.checkGrid}>
              {ap.quality.points.map((item, i) => (
                <Reveal key={item} as="li" delay={i * 50} className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <Icon name="check" size={22} />
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Environment ---------------- */}
        <section className={`section ${styles.environment}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{ap.environment.eyebrow}</span>
              <h2 className={styles.title}>{ap.environment.title}</h2>
              <p className={styles.lead}>{ap.environment.lead}</p>
            </Reveal>
            <ul className={styles.checkGrid}>
              {ap.environment.points.map((item, i) => (
                <Reveal key={item} as="li" delay={i * 50} className={styles.checkItem}>
                  <span className={styles.checkIcon} aria-hidden="true">
                    <Icon name="check" size={22} />
                  </span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          eyebrow={ap.cta.eyebrow}
          title={ap.cta.title}
          text={ap.cta.text}
          primary={{ href: "/contact", label: "Get a quote" }}
          secondary={{ href: "/projects", label: "View our work" }}
        />
      </main>
      <Footer />
    </>
  );
}
