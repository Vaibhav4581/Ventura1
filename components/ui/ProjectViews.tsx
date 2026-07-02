"use client";

import { useState } from "react";
import styles from "./ProjectViews.module.css";
import { projectViews } from "@/lib/brand";

type View = "drawn" | "built" | "numbers";
const VIEWS: { id: View; label: string }[] = [
  { id: "drawn", label: "Drawn" },
  { id: "built", label: "Built" },
  { id: "numbers", label: "Numbers" },
];

const { intro, name, meta, builtImage, builtAlt, caption, numbers } = projectViews;

export function ProjectViews() {
  const [view, setView] = useState<View>("drawn");
  // Remount key for the plan SVG. The draw-in animation plays on first mount;
  // bumping this on each "Drawn" selection remounts the SVG so it replays.
  const [drawKey, setDrawKey] = useState(0);
  const selectView = (v: View) => {
    setView(v);
    if (v === "drawn") setDrawKey((k) => k + 1);
  };

  return (
    <section className={`section ${styles.section}`} id="project-views">
      <div className="container">
        <header className={styles.intro}>
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className={styles.introTitle}>{intro.title}</h2>
          <p className={styles.introLead}>{intro.lead}</p>
        </header>

        {/* Header row: project identity + segmented control */}
        <div className={styles.bar}>
          <div className={styles.identity}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.meta}>{meta}</p>
          </div>
          <div className={styles.segmented} role="group" aria-label="Choose a view of this project">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`${styles.segBtn} ${view === v.id ? styles.segBtnActive : ""}`}
                aria-pressed={view === v.id}
                onClick={() => selectView(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stage: all three views stacked in one cell, cross-faded via opacity. */}
        <div className={styles.stage} aria-live="polite">
          {/* ---- Drawn ---- */}
          <div
            className={`${styles.view} ${styles.drawn} ${view === "drawn" ? styles.viewActive : ""}`}
            aria-hidden={view !== "drawn"}
          >
            <svg
              key={drawKey}
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
          <div
            className={`${styles.view} ${styles.built} ${view === "built" ? styles.viewActive : ""}`}
            aria-hidden={view !== "built"}
          >
            <img className={styles.photo} src={builtImage} alt={builtAlt} loading="lazy" />
            <span className={styles.tag}>As built</span>
          </div>

          {/* ---- Numbers ---- */}
          <div
            className={`${styles.view} ${styles.numbers} ${view === "numbers" ? styles.viewActive : ""}`}
            aria-hidden={view !== "numbers"}
          >
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

        <p className={styles.caption}>{caption}</p>
      </div>
    </section>
  );
}
