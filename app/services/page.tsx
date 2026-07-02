import type { Metadata } from "next";
import Link from "next/link";
import styles from "./services.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { pages, services, industries } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";

const sv = pages.services;

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Construction services end to end: main contracting, design & build, turnkey projects, steel structures, MEP, interior fit-out, renovations and cold rooms.",
  path: "/services/",
  image: "/imagery/steelframe.jpg",
});

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services/" },
]);

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow={sv.header.eyebrow} title={sv.header.title} lead={sv.header.lead} />

        {/* ---------------- Services list ---------------- */}
        <section className={`section ${styles.services}`}>
          <div className="container">
            <h2 className="sr-only">Our services</h2>
            <div className={styles.serviceGrid}>
              {services.map((s, i) => (
                <Reveal key={s.title} delay={(i % 2) * 60}>
                  <Link href={`/services/${s.slug}`} className={styles.cardLink}>
                    <Card
                      variant="service"
                      icon={s.icon}
                      title={s.title}
                      footer={<>Learn more <Icon name="arrow" size={16} /></>}
                    >
                      {s.detail}
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Sectors ---------------- */}
        <section className={`section ${styles.sectors}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{sv.sectors.eyebrow}</span>
              <h2 className={styles.title}>{sv.sectors.title}</h2>
              <p className={styles.lead}>{sv.sectors.lead}</p>
            </Reveal>
            <div className={styles.industryGrid}>
              {industries.map((ind, i) => (
                <Reveal key={ind.title} delay={i * 50}>
                  <div className={styles.industryTile}>
                    <span className={styles.industryIcon} aria-hidden="true">
                      <Icon name={ind.icon} size={24} />
                    </span>
                    <div>
                      <h3 className={styles.industryName}>{ind.title}</h3>
                      <p className={styles.industryText}>{ind.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CtaBand
          eyebrow={sv.cta.eyebrow}
          title={sv.cta.title}
          text={sv.cta.text}
          primary={{ href: "/contact", label: "Get a quote" }}
          secondary={{ href: "/about", label: "About us" }}
        />
      </main>
      <Footer />
    </>
  );
}
