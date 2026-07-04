"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProjectViews.module.css";
import { projectViews } from "@/lib/brand";

type View = "drawn" | "built" | "numbers";
const VIEWS: { id: View; label: string }[] = [
  { id: "drawn", label: "Drawn" },
  { id: "built", label: "Built" },
  { id: "numbers", label: "Numbers" },
];

// Scroll bands across the pinned section: 0–0.4 Drawn, 0.4–0.75 Built,
// 0.75–1 Numbers. Views cross-fade over a small window around each boundary.
const B1 = 0.4;
const B2 = 0.75;
const FADE = 0.06; // half-width of each cross-fade window
// Middle of each band — where a "jump" lands.
const BAND_CENTERS = [B1 / 2, (B1 + B2) / 2, (B2 + 1) / 2];

const { intro, name, meta, builtImage, builtAlt, caption, numbers } = projectViews;

export function ProjectViews() {
  const sectionRef = useRef<HTMLElement>(null);
  const drawnRef = useRef<HTMLDivElement>(null);
  const builtRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const prefersReducedRef = useRef(false);

  // React state only tracks the active view index (for the label highlight);
  // the cross-fade opacities are written imperatively per frame via refs.
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    prefersReducedRef.current = prefersReduced;
    // Reduced motion: no scrubbing — CSS lays the three views out as a static
    // stacked sequence (all visible), so we don't touch opacity or listen to
    // scroll here.
    if (prefersReduced) return;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const smoothstep = (t: number) => {
      t = clamp01(t);
      return t * t * (3 - 2 * t);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        if (scrollableDistance <= 0) return;

        // Scroll progress 0 → 1 across the pinned section.
        const p = clamp01(-rect.top / scrollableDistance);

        // Two boundary transitions (Drawn→Built, Built→Numbers) drive three
        // opacities so exactly one or two adjacent views are ever visible.
        const t1 = smoothstep((p - (B1 - FADE)) / (2 * FADE));
        const t2 = smoothstep((p - (B2 - FADE)) / (2 * FADE));
        if (drawnRef.current) drawnRef.current.style.opacity = String(1 - t1);
        if (builtRef.current) builtRef.current.style.opacity = String(t1 * (1 - t2));
        if (numbersRef.current) numbersRef.current.style.opacity = String(t2);

        // Active view = the band p currently sits in.
        const idx = p < B1 ? 0 : p < B2 ? 1 : 2;
        setActive((prev) => (prev === idx ? prev : idx));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Measure once after layout settles.
    requestAnimationFrame(onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Optional "jump": clicking a label scrolls the page to that view's band.
  const jumpTo = (idx: number) => {
    if (prefersReducedRef.current) return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    if (scrollableDistance <= 0) return;
    const sectionTop = window.scrollY + rect.top;
    window.scrollTo({ top: sectionTop + BAND_CENTERS[idx] * scrollableDistance, behavior: "smooth" });
  };

  return (
    <>
      {/* Intro (normal flow, above the pinned scene) */}
      <section className={`section ${styles.introSection}`}>
        <div className="container">
          <header className={styles.intro}>
            <span className="eyebrow">{intro.eyebrow}</span>
            <h2 className={styles.introTitle}>{intro.title}</h2>
            <p className={styles.introLead}>{intro.lead}</p>
          </header>
        </div>
      </section>

      {/* Pinned scroll section — the three views transition as you scroll. */}
      <section ref={sectionRef} className={styles.scroller} id="project-views">
        {/* SR-only description of the three views */}
        <div className="sr-only">
          <h3>{name}</h3>
          <p>{meta}</p>
          <ul>
            <li>Drawn: the plan we drew.</li>
            <li>Built: the building we delivered.</li>
            <li>
              Numbers:{" "}
              {numbers.map((n, i) => (
                <span key={n.label}>
                  {n.value} {n.label}
                  {i < numbers.length - 1 ? "; " : "."}
                </span>
              ))}
            </li>
          </ul>
        </div>

        <div className={styles.pin}>
          {/* Overlay: project identity + passive progress indicator */}
          <div className={styles.overlay}>
            <div className={`container ${styles.overlayInner}`}>
              <div className={styles.identity}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.meta}>{meta}</p>
              </div>
              <div className={styles.segmented} role="group" aria-label="Views of this project">
                {VIEWS.map((v, idx) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`${styles.segBtn} ${active === idx ? styles.segBtnActive : ""}`}
                    aria-current={active === idx ? "true" : undefined}
                    onClick={() => jumpTo(idx)}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stage: three stacked views, cross-faded on scroll. */}
          <div className={styles.stage} aria-hidden="true">
            {/* ---- Drawn ---- */}
            <div ref={drawnRef} className={`${styles.view} ${styles.drawn}`}>
              <svg
                className={styles.plan}
                viewBox="20 6 520 330"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* outer wall */}
                <rect x="40" y="40" width="480" height="280" className={styles.wall} pathLength="1" />

                {/* interior partitions */}
                <g className={styles.wallThin}>
                  <line x1="40" y1="175" x2="250" y2="175" pathLength="1" />
                  <line x1="250" y1="40" x2="250" y2="320" pathLength="1" />
                  <line x1="320" y1="40" x2="320" y2="320" pathLength="1" />
                  <line x1="320" y1="180" x2="520" y2="180" pathLength="1" />
                  <line x1="410" y1="180" x2="410" y2="320" pathLength="1" />
                </g>

                {/* door-swing arcs (cyan) */}
                <g className={styles.swing}>
                  <path d="M250 210 A28 28 0 0 1 278 238" pathLength="1" />
                  <line x1="250" y1="210" x2="250" y2="238" pathLength="1" />
                  <path d="M320 110 A28 28 0 0 0 292 138" pathLength="1" />
                  <line x1="320" y1="110" x2="320" y2="138" pathLength="1" />
                </g>

                {/* overall dimension line (amber) */}
                <g>
                  <line x1="40" y1="26" x2="520" y2="26" className={styles.dim} pathLength="1" />
                  <line x1="40" y1="20" x2="40" y2="32" className={styles.dim} pathLength="1" />
                  <line x1="520" y1="20" x2="520" y2="32" className={styles.dim} pathLength="1" />
                  <rect x="258" y="14" width="44" height="20" fill="#0c2a5e" className={styles.dimLabel} />
                  <text x="280" y="25" className={styles.dimText} textAnchor="middle" dominantBaseline="central">
                    14.4 m
                  </text>
                </g>

                {/* room labels */}
                <g className={styles.roomLabel}>
                  <text x="145" y="255" textAnchor="middle">Living</text>
                  <text x="145" y="112" textAnchor="middle">Kitchen</text>
                  <text x="285" y="180" textAnchor="middle" transform="rotate(-90 285 180)">Hall</text>
                  <text x="420" y="115" textAnchor="middle">Bed 1</text>
                  <text x="365" y="255" textAnchor="middle">Bath</text>
                  <text x="465" y="255" textAnchor="middle">Bed 2</text>
                </g>
              </svg>
              <span className={styles.tag}>As drawn</span>
            </div>

            {/* ---- Built ---- */}
            <div ref={builtRef} className={styles.view}>
              <img className={styles.photo} src={builtImage} alt={builtAlt} loading="lazy" />
              <span className={styles.tag}>As built</span>
            </div>

            {/* ---- Numbers ---- */}
            <div ref={numbersRef} className={`${styles.view} ${styles.numbers}`}>
              <ul className={styles.metricGrid}>
                {numbers.map((n) => (
                  <li key={n.label} className={styles.metric}>
                    <span className={styles.metricValue}>{n.value}</span>
                    <span className={styles.metricLabel}>{n.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Caption */}
          <div className={styles.captionBar}>
            <div className="container">
              <p className={styles.caption}>{caption}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
