import type { Metadata } from "next";
import Link from "next/link";
import styles from "./careers.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/ui/PageHeader";
import { CtaBand } from "@/components/ui/CtaBand";
import { Button } from "@/components/ui/Button";
import { pages } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd } from "@/lib/seo";

const cr = pages.careers;

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description:
    "Join Ventura Builders & Developers in Lubumbashi, DRC. We review CVs on a rolling basis.",
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
      <main id="main" className={styles.page}>
        
        {/* ---------------- Hero Section ---------------- */}
        <PageHeader 
          eyebrow={cr.hero.eyebrow} 
          title={cr.hero.title} 
          lead={cr.hero.body} 
        />

        {/* ---------------- Why Ventura Section ---------------- */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.whySplit}>
              <Reveal className={styles.masonry}>
                <div className={styles.masonryCol}>
                  <img src={cr.whyVentura.images[0]} className={styles.masonryImg} alt="Construction" />
                  <img src={cr.whyVentura.images[1]} className={styles.masonryImg} alt="Planning" />
                </div>
                <div className={styles.masonryCol}>
                  <img src={cr.whyVentura.images[2]} className={styles.masonryImg} style={{ height: "100%" }} alt="Team" />
                </div>
              </Reveal>
              <Reveal className={styles.whyContent} delay={200}>
                <h2 className={styles.sectionTitle}>{cr.whyVentura.title}</h2>
                {cr.whyVentura.paragraphs.map((p, i) => (
                  <p key={i} className={styles.paragraph}>{p}</p>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- Ventura Careers Intro ---------------- */}
        <section className={styles.sectionAlt} id="opportunities">
          <div className="container">
            <Reveal className={styles.introSplit}>
              <h2 className={styles.sectionTitle}>{cr.intro.title}</h2>
              <p className={styles.paragraph}>{cr.intro.body}</p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Sticky Sidebar Layout (Professionals, Craft, Programs) ---------------- */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.stickyLayout}>
              {/* Sidebar */}
              <aside className={styles.sidebar}>
                <a href="#professionals" className={styles.sidebarLink}>Professionals</a>
                <a href="#craft" className={styles.sidebarLink}>Skilled Trades & Site Teams</a>
                <a href="#programs" className={styles.sidebarLink}>Additional Programs</a>
              </aside>

              {/* Main Content Areas */}
              <div className={styles.mainContent}>
                
                {/* Professionals */}
                <div id="professionals" className={styles.contentBlock}>
                  <h2 className={styles.sectionTitle}>{cr.professionals.title}</h2>
                  <div>
                    <Button href={cr.professionals.cta.href} icon="arrow">
                      {cr.professionals.cta.label}
                    </Button>
                  </div>
                  <p className={styles.paragraph}>{cr.professionals.intro}</p>
                  
                  <h3 className={styles.heroEyebrow} style={{ marginTop: "20px" }}>Jobs by Department</h3>
                  <div className={styles.grid2}>
                    {cr.professionals.departments.map((dept, i) => (
                      <Link key={i} href="/careers" className={styles.linkCard}>
                        <img src={dept.image} alt={dept.title} className={styles.linkCardImg} />
                        <div className={styles.linkCardBottom}>
                          <span>{dept.title}</span>
                          <Icon name="arrow" size={18} className={styles.linkCardIcon} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Craft Professionals */}
                <div id="craft" className={styles.contentBlock}>
                  <h2 className={styles.sectionTitle}>{cr.craft.title}</h2>
                  <p className={styles.paragraph}>{cr.craft.intro}</p>
                  <div className={styles.grid3}>
                    {cr.craft.locations.map((loc, i) => (
                      <Link key={i} href="/careers" className={styles.linkCard}>
                        <img src={loc.image} alt={loc.title} className={styles.linkCardImg} />
                        <div className={styles.linkCardBottom}>
                          <span>{loc.title}</span>
                          <Icon name="arrow" size={18} className={styles.linkCardIcon} />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Programs */}
                <div id="programs" className={styles.contentBlock}>
                  <h2 className={styles.sectionTitle}>{cr.programs.title}</h2>
                  <p className={styles.paragraph}>{cr.programs.intro}</p>
                  <div className={styles.grid3}>
                    {cr.programs.items.map((prog, i) => (
                      <div key={i} className={styles.hoverCard}>
                        <img src={prog.image} className={styles.hoverCardImg} alt={prog.title} />
                        <div className={styles.hoverCardContent}>
                          <h3 className={styles.hoverCardTitle}>{prog.title}</h3>
                          <p className={styles.hoverCardBody}>{prog.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Life at Ventura ---------------- */}
        <section className={styles.sectionAlt}>
          <div className="container">
            <Reveal className={styles.introSplit}>
              <h2 className={styles.sectionTitle}>{cr.life.title}</h2>
              <p className={styles.paragraph}>{cr.life.intro}</p>
            </Reveal>

            <div className={styles.grid3}>
              {cr.life.benefits.map((ben, i) => (
                <div key={i} className={styles.hoverCard}>
                  <img src={ben.image} className={styles.hoverCardImg} alt={ben.title} />
                  <div className={styles.hoverCardContent}>
                    <h3 className={styles.hoverCardTitle}>{ben.title}</h3>
                    <p className={styles.hoverCardBody}>{ben.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Testimonials ---------------- */}
        <section className={styles.section}>
          <div className="container">
            <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "40px" }}>{cr.testimonials.title}</h2>
            <div className={styles.grid2}>
              {cr.testimonials.items.map((item, i) => (
                <div key={i} className={styles.testimonial}>
                  <p className={styles.testimonialQuote}>"{item.quote}"</p>
                  <div>
                    <div className={styles.testimonialAuthor}>{item.author}</div>
                    <div className={styles.testimonialPos}>{item.position}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EOE */}
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <div className="container">
            <p className={styles.eoe}>
              Ventura Builders & Developers is an Equal Opportunity Employer. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, sexual orientation, gender identity and expression, age, national origin, disability, or any other characteristic protected by law.
            </p>
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <CtaBand
          eyebrow="Join our team"
          title="Ready to build with us?"
          text="Send us your CV and we will keep you in mind for future openings that match your skills."
          primary={{ href: "/contact", label: "Contact us" }}
          secondary={{ href: "/about", label: "About Ventura" }}
        />

      </main>
      <Footer />
    </>
  );
}
