import type { Metadata } from "next";
import styles from "./contact.module.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/ui/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { pages, contact, faqs } from "@/lib/brand";
import { pageMeta, breadcrumbsJsonLd, faqJsonLd } from "@/lib/seo";

const ct = pages.contact;

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Tell us about your construction project and our team will respond with next steps. Reach Ventura Builders & Developers by form or email.",
  path: "/contact/",
  image: "/imagery/offices.jpg",
});

const jsonLd = [
  breadcrumbsJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact/" },
  ]),
  faqJsonLd(faqs),
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main">
        <PageHeader eyebrow={ct.header.eyebrow} title={ct.header.title} lead={ct.header.lead} />

        <section className={`section ${styles.contact}`}>
          <div className="container">
            <div className={styles.grid}>
              <Reveal className={styles.formCol}>
                <h2 className={styles.formTitle}>{ct.form.title}</h2>
                <p className={styles.formLead}>{ct.form.lead}</p>
                <ContactForm />
              </Reveal>

              <Reveal className={styles.detailsCol} delay={120}>
                <div className={styles.detailsCard}>
                  <h2 className={styles.detailsTitle}>{ct.details.title}</h2>
                  <ul className={styles.list}>
                    <li>
                      <Icon name="mail" size={20} />
                      <a href={`mailto:${contact.email}`} className={styles.link}>{contact.email}</a>
                    </li>
                    <li>
                      <Icon name="phone" size={20} />
                      <span>
                        {contact.phone}
                        {contact.phonePlaceholder ? <em className={styles.note}> (placeholder)</em> : null}
                      </span>
                    </li>
                    <li>
                      <Icon name="pin" size={20} />
                      <span>
                        {contact.address}
                        {contact.addressPlaceholder ? <em className={styles.note}> (placeholder)</em> : null}
                      </span>
                    </li>
                  </ul>
                  <div className={styles.hours}>
                    <span className={styles.hoursLabel}>{ct.details.hoursLabel}</span>
                    <span>{ct.details.hours}</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className={`section ${styles.faq}`}>
          <div className="container">
            <Reveal className={styles.faqHead}>
              <span className="eyebrow">{ct.faq.eyebrow}</span>
              <h2 className={styles.faqTitle}>{ct.faq.title}</h2>
              <p className={styles.faqLead}>{ct.faq.lead}</p>
            </Reveal>
            <div className={styles.faqList}>
              {faqs.map((f, i) => (
                <Reveal key={f.q} delay={i * 40}>
                  {/* Native disclosure — accessible with zero JS */}
                  <details className={styles.faqItem}>
                    <summary className={styles.faqQ}>
                      {f.q}
                      <Icon name="arrow" size={18} className={styles.faqChevron} />
                    </summary>
                    <p className={styles.faqA}>{f.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
