import styles from "./Marquee.module.css";

/* Capability ticker — slow, infinite drift of sector words on a navy band.
   Decorative: aria-hidden, duplicated track for a seamless loop, pause on
   hover, edge-faded, and parked by the global reduced-motion kill block. */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {doubled.map((t, i) => (
            <span key={i} className={styles.item}>
              <span className={styles.diamond} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
