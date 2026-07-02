import styles from "./CtaBand.module.css";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import type { IconName } from "@/lib/brand";

type CtaLink = { href: string; label: string; icon?: IconName };

/* Reusable closing CTA — navy gradient-mesh band with dot texture.
   Used by the homepage and every inner page (single source of the pattern). */
export function CtaBand({
  eyebrow,
  title,
  text,
  primary,
  secondary,
  id,
}: {
  eyebrow: string;
  title: string;
  text: string;
  primary: CtaLink;
  secondary?: CtaLink;
  id?: string;
}) {
  return (
    <section id={id} className={styles.ctaBand}>
      <div className="container">
        <Reveal className={styles.ctaInner}>
          <span className={styles.ctaEyebrow}>{eyebrow}</span>
          <h2 className={styles.ctaTitle}>{title}</h2>
          <p className={styles.ctaText}>{text}</p>
          <div className={styles.ctaBtns}>
            <Button href={primary.href} variant="primary" size="lg" icon={primary.icon ?? "arrow"}>
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="ghost" size="lg" className={styles.onDark}>
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
