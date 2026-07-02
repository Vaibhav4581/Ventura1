import Link from "next/link";
import styles from "./Footer.module.css";
import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { BackToTop } from "./BackToTop";
import { brand, contact, nav, footerLinks, isNavGroup } from "@/lib/brand";

/* Site footer — navy band with brand, contact and quick links.
   Server component. Phone + address are client-pending placeholders and are
   labelled as such until real details land. Reused across the site. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <Logo variant="white" height={44} />
          <p className={styles.blurb}>{brand.positioning}</p>
          <p className={styles.tagline}>{brand.tagline}</p>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Contact</h2>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                <Icon name="mail" size={18} /> {contact.email}
              </a>
            </li>
            <li>
              <span className={styles.contactLine}>
                <Icon name="phone" size={18} /> {contact.phone}
                {contact.phonePlaceholder ? <span className={styles.note}>(placeholder)</span> : null}
              </span>
            </li>
            <li>
              <span className={styles.contactLine}>
                <Icon name="pin" size={18} /> {contact.address}
                {contact.addressPlaceholder ? <span className={styles.note}>(placeholder)</span> : null}
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.colTitle}>Explore</h2>
          <ul className={styles.list}>
            {[...nav.flatMap((e) => (isNavGroup(e) ? e.children : [e])), ...footerLinks].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={styles.navLink}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BackToTop />
      <div className={`container ${styles.bottom}`}>
        <span>© {year} {brand.name}</span>
        <span className={styles.bottomLinks}>
          <Link href="/privacy" className={styles.bottomLink}>Privacy</Link>
          <span aria-hidden="true">·</span>
          {brand.domain}
        </span>
      </div>
    </footer>
  );
}
