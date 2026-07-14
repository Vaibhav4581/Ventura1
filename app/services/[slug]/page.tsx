import type { Metadata } from "next";
import Link from "next/link";
import styles from "./service.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd, serviceJsonLd } from "@/lib/seo";

/* One static page per service (proposal: "detailed overview of construction
   capabilities"). Next 16: `params` is a Promise — always await it. */

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug)!;
  return pageMeta({
    title: `${s.title} | Services`,
    description: `${s.blurb} Delivered across Democratic Republic of Congo (DRC) by Ventura Builders & Developers, Lubumbashi — get a clear, costed plan.`,
    path: `/services/${s.slug}/`,
    image: s.image,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug)!;
  const related = services.filter((x) => x.slug !== s.slug);

  const jsonLd = [
    breadcrumbsJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services/" },
      { name: s.title, path: `/services/${s.slug}/` },
    ]),
    serviceJsonLd(s),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow="What we do" title={s.title} lead={s.blurb} />

        {/* ---------------- Overview ---------------- */}
        <section className={`section ${styles.overview}`}>
          <div className="container">
            <div className={styles.grid}>
              <Reveal className={styles.body}>
                <span className="eyebrow">Overview</span>
                <h2 className={styles.title}>How we deliver {s.title.toLowerCase()}</h2>
                {s.intro.map((para) => (
                  <p key={para} className={styles.para}>{para}</p>
                ))}
                <Link href="/approach" className={styles.moreLink}>
                  See how we work <Icon name="arrow" size={18} />
                </Link>
              </Reveal>
              <Reveal className={styles.media} delay={120}>
                <figure className={styles.figure}>
                  <img src={s.image} alt={s.imageAlt} loading="lazy" />
                </figure>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- What's included ---------------- */}
        <section className={`section ${styles.includes}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">Scope</span>
              <h2 className={styles.title}>What&apos;s included</h2>
              <p className={styles.lead}>
                The core of every {s.title.toLowerCase()} engagement — scoped precisely to
                your project before we start.
              </p>
            </Reveal>
            <ul className={styles.checkGrid}>
              {s.includes.map((item, i) => (
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

        {/* ---------------- Where it fits ---------------- */}
        <section className={`section ${styles.fit}`}>
          <div className="container">
            <Reveal className={styles.head}>
              <span className="eyebrow">Where it fits</span>
              <h2 className={styles.title}>Sectors and related services</h2>
            </Reveal>
            <div className={styles.fitGrid}>
              <Reveal className={styles.fitCol}>
                <h3 className={styles.subTitle}>Sectors we serve with this service</h3>
                <div className={styles.pills}>
                  {s.sectors.map((sector) => (
                    <Link
                      key={sector}
                      href={`/projects?sector=${encodeURIComponent(sector)}`}
                      className={styles.pill}
                    >
                      {sector}
                    </Link>
                  ))}
                </div>
              </Reveal>
              <Reveal className={styles.fitCol} delay={80}>
                <h3 className={styles.subTitle}>Related services</h3>
                <div className={styles.pills}>
                  {related.map((r) => (
                    <Link key={r.slug} href={`/services/${r.slug}`} className={styles.pill}>
                      {r.title}
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <CtaBand
          eyebrow="Build with confidence"
          title={`Planning ${s.title.toLowerCase()} work?`}
          text="Tell us what you're building and we'll come back with a clear, costed plan — no obligation."
          primary={{ href: "/contact", label: "Get a quote" }}
          secondary={{ href: "/services", label: "All services" }}
        />
      </main>
      <Footer />
    </>
  );
}
