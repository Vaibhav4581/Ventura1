import type { Metadata } from "next";
import styles from "./careers.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { brand, pages } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";

const cr = pages.careers;

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description:
    "Join Ventura Builders & Developers in Lusaka, Zambia — engineers, quantity surveyors, supervisors and skilled trades. We review CVs on a rolling basis.",
  path: "/careers/",
  image: "/imagery/team.jpg",
});

const crumbs = breadcrumbsJsonLd([
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers/" },
]);

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow={cr.header.eyebrow} title={cr.header.title} lead={cr.header.lead} />

        {/* ---------------- Why Ventura ---------------- */}
        <section className={`section ${styles.why}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{cr.why.eyebrow}</span>
              <h2 className={styles.title}>{cr.why.title}</h2>
              <p className={styles.lead}>{cr.why.lead}</p>
            </Reveal>
            <div className={styles.cardGrid}>
              {cr.why.points.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <Card variant="value" icon={p.icon} title={p.title}>{p.text}</Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Roles ---------------- */}
        <section className={`section ${styles.roles}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">{cr.roles.eyebrow}</span>
              <h2 className={styles.title}>{cr.roles.title}</h2>
              <p className={styles.lead}>{cr.roles.lead}</p>
            </Reveal>
            <ul className={styles.checkGrid}>
              {cr.roles.list.map((role, i) => (
                <Reveal key={role} as="li" delay={i * 50} className={styles.checkItem}>
                  <Icon name="check" size={22} />
                  <span>{role}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          eyebrow={cr.apply.eyebrow}
          title={cr.apply.title}
          text={cr.apply.text}
          primary={{
            href: `mailto:${brand.email}?subject=${encodeURIComponent("Application — Ventura Builders & Developers")}`,
            label: "Email your CV",
            icon: "mail",
          }}
          secondary={{ href: "/about", label: "About Ventura" }}
        />
      </main>
      <Footer />
    </>
  );
}
