import type { Metadata } from "next";
import styles from "./csr.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { csr } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Corporate Social Responsibility",
  description: csr.header.lead,
  path: "/csr/",
});

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "Corporate Social Responsibility", path: "/csr/" },
]);

export default function CSRPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <PageHeader 
          eyebrow={csr.header.eyebrow} 
          title={csr.header.title} 
          lead={csr.header.lead} 
        />

        {/* ---------------- Stats Strip ---------------- */}
        <section className={`section ${styles.statsSection}`}>
          <div className="container">
            <Reveal className={styles.statBand}>
              {csr.stats.map((s, i) => (
                <div key={i} className={styles.statItem}>
                  <div className={styles.statValue}>
                    {s.value}
                    {s.suffix && <span className={styles.statSuffix}>{s.suffix}</span>}
                  </div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------------- Pillars ---------------- */}
        <section className={`section ${styles.pillars}`}>
          <div className="container">
            <div className={styles.pillarGrid}>
              {csr.pillars.map((pillar, i) => (
                <Reveal key={i} delay={i * 100} className={styles.pillarCard}>
                  <div className={styles.pillarHeader}>
                    <div className={styles.iconWrap}>
                      <Icon name={pillar.icon} size={32} />
                    </div>
                    <h2 className={styles.pillarTitle}>{pillar.title}</h2>
                  </div>
                  <p className={styles.pillarLead}>{pillar.lead}</p>
                  <ul className={styles.bulletList}>
                    {pillar.bullets.map((bullet, j) => (
                      <li key={j} className={styles.bulletItem}>{bullet}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Governance & Contact ---------------- */}
        <section className={`section ${styles.governance}`}>
          <div className="container">
            <Reveal className={styles.govBlock}>
              <span className={styles.govEyebrow}>Accountability</span>
              <p className={styles.govText}>{csr.governance}</p>
              <div className={styles.contactBlock}>
                {csr.contact}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <CtaBand
          eyebrow="Start your project"
          title="Ready to build?"
          text="Discuss your project with a team that values quality, safety, and community impact."
          primary={{ href: "/contact", label: "Contact us" }}
          secondary={{ href: "/about", label: "About Ventura" }}
        />
      </main>
      <Footer />
    </>
  );
}
