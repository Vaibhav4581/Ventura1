import styles from "./guide.module.css";
import { contrastRatio, wcagLevel, type ColorToken } from "@/lib/tokens";

function CBadge({ label, fg, bg }: { label: string; fg: string; bg: string }) {
  const ratio = contrastRatio(fg, bg);
  const level = wcagLevel(ratio);
  const cls =
    level === "AAA" ? styles.cbAAA : level === "AA" ? styles.cbAA : level === "AA Large" ? styles.cbLarge : styles.cbFail;
  return (
    <span className={`${styles.cbadge} ${cls}`}>
      {label}: {ratio.toFixed(2)} · {level}
    </span>
  );
}

/* Colour swatch with full cross-media specs and live WCAG 2.2 contrast checks. */
export function Swatch({ c }: { c: ColorToken }) {
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchChip} style={{ background: c.hex, color: c.onText }}>
        <span>{c.name}</span>
        <span>{c.hex}</span>
      </div>
      <div className={styles.swatchBody}>
        <div className={styles.swatchName}>{c.name}</div>
        <div className={styles.swatchRole}>{c.role}</div>
        <div className={styles.specs}>
          <div className={styles.specRow}><span>HEX</span><span>{c.hex}</span></div>
          <div className={styles.specRow}><span>RGB</span><span>{c.rgb}</span></div>
          <div className={styles.specRow}><span>CMYK</span><span>{c.cmyk}</span></div>
          <div className={styles.specRow}><span>Pantone</span><span>{c.pantone}</span></div>
        </div>
        <div className={styles.contrastRow}>
          <CBadge label="On swatch" fg={c.onText} bg={c.hex} />
          <CBadge label="On white" fg={c.hex} bg="#FFFFFF" />
        </div>
      </div>
    </div>
  );
}
