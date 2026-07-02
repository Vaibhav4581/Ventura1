import styles from "./PageHeader.module.css";
import { Reveal } from "./Reveal";

/* Compact navy sub-hero for inner pages (/about, /services, /contact).
   Mirrors the home CTA band's gradient-mesh + dot texture for cohesion.
   Server-safe; the inner Reveal handles the scroll-in. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className={styles.header}>
      {/* Blueprint motif: dimension line, corner mark and crosshair that draw
          themselves in. Purely decorative. */}
      <svg className={styles.blueprint} viewBox="0 0 320 200" aria-hidden="true">
        <path className={styles.draw} d="M8 188h304M8 180v16M312 180v16M160 183v10" />
        <path className={styles.draw} d="M24 24h56M24 24v56M24 24l14 14" />
        <circle className={styles.drawAccent} cx="276" cy="56" r="24" />
        <path className={styles.drawAccent} d="M276 20v72M240 56h72" />
      </svg>
      <div className="container">
        <Reveal className={styles.inner}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
