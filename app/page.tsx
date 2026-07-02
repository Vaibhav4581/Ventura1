import type { Metadata } from "next";
import Link from "next/link";
import styles from "./home.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CtaBand } from "@/components/ui/CtaBand";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Stat } from "@/components/ui/Stat";
import { Marquee } from "@/components/ui/Marquee";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import {
  brand,
  sampleCopy,
  services,
  values,
  industries,
  projects,
  stats,
  home,
} from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Ventura Builders & Developers — Build with confidence.",
  description: brand.positioning,
  path: "/",
  absoluteTitle: true,
});

/* Homepage features the first six portfolio entries; /projects has them all. */
const featuredProjects = projects.slice(0, 6);

export default function Home() {
  return (
    <>
      {/* Hero photo is a CSS background — browsers discover it late, making it
         the LCP bottleneck. React hoists these preloads into <head>; the media
         attrs keep each viewport to a single hero download. */}
      <link
        rel="preload"
        as="image"
        href="/imagery/hero-build.webp"
        type="image/webp"
        fetchPriority="high"
        media="(min-width: 769px)"
      />
      <link
        rel="preload"
        as="image"
        href="/imagery/hero-build-mobile.webp"
        type="image/webp"
        fetchPriority="high"
        media="(max-width: 768px)"
      />
      <Header />
      <main id="main">
        {/* ---------------- Hero ---------------- */}
        <section className={styles.hero}>
          <div className="container">
            <Reveal className={styles.heroInner}>
              <span className={styles.heroEyebrow}>{sampleCopy.eyebrow}</span>
              <h1 className={styles.heroTitle}>{sampleCopy.headline}</h1>
              <p className={styles.heroText}>{sampleCopy.subhead}</p>
              <div className={styles.heroCtas}>
                <Button href="/contact" variant="primary" size="lg" icon="arrow">
                  {sampleCopy.ctaPrimary}
                </Button>
                <Button href="/projects" variant="ghost" size="lg" className={styles.onDark}>
                  {sampleCopy.ctaSecondary}
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Trust / stats ---------------- */}
        <section className={`section ${styles.statsSection}`}>
          <div className="container">
            <Reveal className={styles.statBand}>
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </Reveal>
          </div>
        </section>

        {/* ---------------- Capability ticker ---------------- */}
        <Marquee items={industries.map((i) => i.title)} />

        {/* ---------------- About ---------------- */}
        <section id="about" className={`section ${styles.about}`}>
          <div className="container">
            <div className={styles.aboutGrid}>
              <Reveal className={styles.aboutBody}>
                <span className="eyebrow">{home.about.eyebrow}</span>
                <h2 className={styles.sectionTitle}>{home.about.title}</h2>
                <p className={styles.sectionLead}>{home.about.lead}</p>
                {home.about.body.map((para) => (
                  <p key={para} className={styles.aboutPara}>{para}</p>
                ))}
                <ul className={styles.checklist}>
                  {home.about.points.map((pt) => (
                    <li key={pt} className={styles.checkItem}>
                      <Icon name="check" size={22} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/about" className={styles.moreLink}>
                  More about Ventura <Icon name="arrow" size={18} />
                </Link>
              </Reveal>
              <Reveal className={styles.aboutMedia} delay={120}>
                <figure className={styles.aboutFigure}>
                  <img src={home.about.image} alt={home.about.imageAlt} loading="lazy" />
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- Services ---------------- */}
        <section id="services" className={`section ${styles.services}`}>
          <div className="container">
            <Reveal className={styles.sectionHead}>
              <span className="eyebrow">{home.services.eyebrow}</span>
              <h2 className={styles.sectionTitle}>{home.services.title}</h2>
              <p className={styles.sectionLead}>{home.services.lead}</p>
            </Reveal>
            <div className={styles.cardGrid}>
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 60}>
                  <Link href={`/services/${s.slug}`} className={styles.cardLink}>
                    <Card variant="service" icon={s.icon} title={s.title}>{s.blurb}</Card>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal className={styles.sectionActions}>
              <Button href="/services" variant="secondary" icon="arrow">View all services</Button>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Why us / values ---------------- */}
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <Reveal className={styles.sectionHead}>
              <span className="eyebrow">{home.values.eyebrow}</span>
              <h2 className={styles.sectionTitle}>{home.values.title}</h2>
              <p className={styles.sectionLead}>{home.values.lead}</p>
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

        {/* ---------------- Safety & quality (navy band) ---------------- */}
        <section className={`section ${styles.safety}`}>
          <div className="container">
            <Reveal className={styles.safetyHead}>
              <span className={styles.ctaEyebrow}>{home.safety.eyebrow}</span>
              <h2 className={styles.safetyTitle}>{home.safety.title}</h2>
              <p className={styles.safetyLead}>{home.safety.lead}</p>
            </Reveal>
            <div className={styles.glassGrid}>
              {home.safety.points.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <Card variant="glass" icon={p.icon} title={p.title}>{p.text}</Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Industries / sectors ---------------- */}
        <section className={`section ${styles.industries}`}>
          <div className="container">
            <Reveal className={styles.sectionHead}>
              <span className="eyebrow">{home.industries.eyebrow}</span>
              <h2 className={styles.sectionTitle}>{home.industries.title}</h2>
              <p className={styles.sectionLead}>{home.industries.lead}</p>
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

        {/* ---------------- Featured projects (treated imagery) ---------------- */}
        <section id="projects" className={`section ${styles.projects}`}>
          <div className="container">
            <Reveal className={styles.sectionHead}>
              <span className="eyebrow">{home.projects.eyebrow}</span>
              <h2 className={styles.sectionTitle}>{home.projects.title}</h2>
              <p className={styles.sectionLead}>{home.projects.lead}</p>
            </Reveal>
            <div className={styles.projectGrid}>
              {featuredProjects.map((p, i) => (
                <Reveal key={p.img} delay={i * 60}>
                  <figure className={styles.projectCard}>
                    <img src={`/imagery/${p.img}-duo.jpg`} alt={`${p.title} (${p.sector}) — representative project imagery`} loading="lazy" />
                    <figcaption className={styles.projectMeta}>
                      <b>{p.title}</b>
                      <span>{p.sector}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <p className={styles.projectNote}>{home.projects.note}</p>
            <Reveal className={styles.sectionActions}>
              <Button href="/projects" variant="secondary" icon="arrow">View all projects</Button>
            </Reveal>
          </div>
        </section>

        {/* ---------------- CTA band ---------------- */}
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
