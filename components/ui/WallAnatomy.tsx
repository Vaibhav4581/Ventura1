"use client";

import { useState } from "react";
import styles from "./WallAnatomy.module.css";
import { wallAnatomy } from "@/lib/brand";

/* Detail geometry (viewBox 0 0 640 410). Bands run OUTSIDE (left) → INSIDE
   (right), sized roughly to scale with a min width for the thin layers. Kept
   next to the drawing; the spec copy lives in lib/brand.ts. */
const WALL_TOP = 72;
const WALL_BOT = 358;
const WALL_H = WALL_BOT - WALL_TOP;

type Band = { id: string; x: number; w: number };
const BANDS: Band[] = [
  { id: "render", x: 72, w: 30 },
  { id: "block", x: 102, w: 250 },
  { id: "insulation", x: 352, w: 120 },
  { id: "services", x: 472, w: 55 },
  { id: "plasterboard", x: 527, w: 30 },
  { id: "finish", x: 557, w: 18 },
];

const PINS: Record<string, { x: number; y: number }> = {
  render: { x: 87, y: 104 },
  block: { x: 214, y: 104 },
  insulation: { x: 412, y: 104 },
  services: { x: 499, y: 104 },
  plasterboard: { x: 542, y: 104 },
  finish: { x: 566, y: 300 },
};

const BAND_FILL: Record<string, string> = {
  render: "#e9ded0",
  block: "#dfe3ea",
  insulation: "#fbf1cf",
  services: "#eef2f7",
  plasterboard: "#eff1f4",
  finish: "#dbe7f0",
};

/* Top dimension line — labels per prompt (finish is too thin to dimension). */
const DIMS = [
  { x: 72, w: 30, label: "20" },
  { x: 102, w: 250, label: "200" },
  { x: 352, w: 120, label: "100" },
  { x: 472, w: 55, label: "40" },
  { x: 527, w: 30, label: "15" },
];
const DIM_Y = 54;
const BOUNDS = [72, 102, 352, 472, 527, 557, 575];

/* Blockwork coursing: horizontal beds + staggered vertical perpends. */
const BLOCK_LINES = (() => {
  const x0 = 102, x1 = 352, ch = 38;
  const beds: { y: number }[] = [];
  const perps: { x: number; y1: number; y2: number }[] = [];
  for (let y = WALL_TOP + ch; y < WALL_BOT; y += ch) beds.push({ y });
  let row = 0;
  for (let y = WALL_TOP; y < WALL_BOT; y += ch) {
    const off = row % 2 ? 62 : 31;
    for (let x = x0 + off; x < x1; x += 62) {
      perps.push({ x, y1: y, y2: Math.min(y + ch, WALL_BOT) });
    }
    row++;
  }
  return { beds, perps };
})();

/* Insulation batt "squiggle": a spring bouncing between two rails. */
const INSUL_PATH = (() => {
  const ix0 = 358, ix1 = 466, mid = (ix0 + ix1) / 2, step = 18;
  let d = `M ${mid} ${WALL_TOP + 4}`;
  let t = true;
  for (let y = WALL_TOP + 4; y < WALL_BOT - 4; y += step) {
    const cx = t ? ix1 : ix0;
    d += ` Q ${cx} ${y + step / 2} ${mid} ${Math.min(y + step, WALL_BOT - 4)}`;
    t = !t;
  }
  return d;
})();

/* Stainless wall ties bridging the cavity (with a central drip). */
const TIE_YS = [132, 240];
const tiePath = (y: number) =>
  `M348 ${y} L408 ${y} L414 ${y + 7} L420 ${y} L478 ${y}`;

const { intro, totals, note, layers } = wallAnatomy;

export function WallAnatomy() {
  // Blockwork (the structural leaf) selected first.
  const [activeId, setActiveId] = useState(layers[1].id);
  const selectZone = (id: string) => setActiveId(id);

  const active = layers.find((l) => l.id === activeId) ?? layers[1];
  const hiBand = BANDS.find((b) => b.id === active.id) ?? BANDS[1];

  return (
    <section className={`section ${styles.section}`} id="wall-anatomy">
      <div className="container">
        <header className={styles.head}>
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className={styles.title}>{intro.title}</h2>
          <p className={styles.lead}>{intro.lead}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.figureWrap}>
            <div className={styles.figure}>
              {/* Decorative-with-controls: SVG is aria-hidden; the chip buttons
                 below are the accessible controls, plus the sr-only list. */}
              <svg
                className={styles.svg}
                viewBox="0 0 640 410"
                role="img"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <pattern id="wa-stipple" width="7" height="7" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2.5" r="0.9" fill="rgba(27,44,122,0.5)" />
                    <circle cx="5.5" cy="5.5" r="0.9" fill="rgba(27,44,122,0.5)" />
                  </pattern>
                </defs>

                {/* paper */}
                <rect x="0" y="0" width="640" height="410" fill="#f7f4ec" />

                {/* layer bands (base fill + boundary strokes) */}
                {BANDS.map((b) => (
                  <rect
                    key={`band-${b.id}`}
                    x={b.x}
                    y={WALL_TOP}
                    width={b.w}
                    height={WALL_H}
                    fill={BAND_FILL[b.id]}
                    className={styles.stroke}
                    strokeWidth="2"
                  />
                ))}

                {/* 1 — render stipple */}
                <rect x="72" y={WALL_TOP} width="30" height={WALL_H} fill="url(#wa-stipple)" />

                {/* 2 — blockwork coursing */}
                <g className={styles.thin}>
                  {BLOCK_LINES.beds.map((l, i) => (
                    <line key={`bed-${i}`} x1="102" y1={l.y} x2="352" y2={l.y} />
                  ))}
                  {BLOCK_LINES.perps.map((l, i) => (
                    <line key={`perp-${i}`} x1={l.x} y1={l.y1} x2={l.x} y2={l.y2} />
                  ))}
                </g>

                {/* 3 — insulation squiggle */}
                <path d={INSUL_PATH} className={styles.thin} fill="none" strokeWidth="1.6" />

                {/* wall ties across the cavity */}
                {TIE_YS.map((y) => (
                  <path key={`tie-${y}`} d={tiePath(y)} className={styles.stroke} fill="none" strokeWidth="2.4" />
                ))}

                {/* 4 — services zone: conduit, back box, cable */}
                <g>
                  <line x1="500" y1={WALL_TOP} x2="500" y2={WALL_BOT} className={styles.thin} strokeDasharray="4 4" />
                  <circle cx="500" cy="122" r="11" fill="#ffffff" className={styles.stroke} strokeWidth="1.8" />
                  <circle cx="500" cy="122" r="3.2" className={styles.thin} fill="none" />
                  <rect x="484" y="214" width="32" height="44" rx="2" fill="#dfe3ea" className={styles.stroke} strokeWidth="1.8" />
                  <line x1="490" y1="226" x2="510" y2="226" className={styles.amberThin} />
                  <circle cx="500" cy="248" r="2" className={styles.thin} fill="none" />
                  <path d="M500 133 C494 150 508 166 500 182 C494 196 508 206 500 214" className={styles.thin} fill="none" />
                </g>

                {/* 5 — plasterboard on dabs (two board faces) */}
                <g>
                  <line x1="531" y1={WALL_TOP} x2="531" y2={WALL_BOT} className={styles.thin} />
                  <line x1="552" y1={WALL_TOP} x2="552" y2={WALL_BOT} className={styles.thin} />
                  {[120, 200, 280].map((cy) => (
                    <ellipse key={`dab-${cy}`} cx="528" cy={cy} rx="3" ry="9" fill="#d7d2c4" className={styles.thin} />
                  ))}
                </g>

                {/* 6 — internal finish face */}
                <line x1="573" y1={WALL_TOP} x2="573" y2={WALL_BOT} className={styles.amberThin} />

                {/* DPC / cavity tray near the base */}
                <path d="M72 344 L352 344 L472 324 L575 324" className={styles.stroke} fill="none" strokeWidth="3" />
                <path d="M72 340 L352 340 L472 320 L575 320" className={styles.amberThin} fill="none" />
                <text x="150" y="336" className={styles.svgNote}>DPC / cavity tray</text>

                {/* dimension line (top) */}
                <g>
                  <line x1="72" y1={DIM_Y} x2="575" y2={DIM_Y} className={styles.stroke} strokeWidth="1.4" />
                  {BOUNDS.map((x) => (
                    <g key={`dim-${x}`}>
                      <line x1={x} y1={DIM_Y - 4} x2={x} y2={DIM_Y + 4} className={styles.thin} />
                      <line x1={x} y1={DIM_Y} x2={x} y2={WALL_TOP} className={styles.dimExt} />
                    </g>
                  ))}
                  {DIMS.map((d) => (
                    <text key={`dimlabel-${d.x}`} x={d.x + d.w / 2} y={DIM_Y - 8} className={styles.dimText} textAnchor="middle">
                      {d.label}
                    </text>
                  ))}
                </g>

                {/* OUTSIDE / INSIDE */}
                <text x="34" y={WALL_TOP + WALL_H / 2} className={styles.sideLabel} textAnchor="middle" transform={`rotate(-90 34 ${WALL_TOP + WALL_H / 2})`}>
                  OUTSIDE
                </text>
                <text x="606" y={WALL_TOP + WALL_H / 2} className={styles.sideLabel} textAnchor="middle" transform={`rotate(90 606 ${WALL_TOP + WALL_H / 2})`}>
                  INSIDE
                </text>

                {/* active highlight overlay */}
                <rect
                  className={styles.highlight}
                  x={hiBand.x}
                  y={WALL_TOP}
                  width={hiBand.w}
                  height={WALL_H}
                />

                {/* transparent hit areas */}
                {BANDS.map((b) => (
                  <rect
                    key={`hit-${b.id}`}
                    className={styles.hit}
                    x={b.x}
                    y={WALL_TOP}
                    width={b.w}
                    height={WALL_H}
                    onClick={() => selectZone(b.id)}
                  />
                ))}

                {/* numbered pins */}
                {layers.map((l) => {
                  const p = PINS[l.id];
                  const on = l.id === activeId;
                  return (
                    <g key={`pin-${l.id}`} className={styles.pinGroup} onClick={() => selectZone(l.id)}>
                      <circle cx={p.x} cy={p.y} r={on ? 14 : 11} className={`${styles.pin} ${on ? styles.pinActive : ""}`} />
                      <text x={p.x} y={p.y} className={styles.pinText} textAnchor="middle" dominantBaseline="central">
                        {l.num}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* title-block footer strip */}
              <div className={styles.titleBlock} aria-hidden="true">
                <div className={styles.tbCell}>
                  <span className={styles.tbLabel}>Total wall</span>
                  <span className={styles.tbValue}>{totals.wall}</span>
                </div>
                <div className={styles.tbCell}>
                  <span className={styles.tbLabel}>U-value (indicative)</span>
                  <span className={styles.tbValue}>{totals.uValue}</span>
                </div>
                <div className={styles.tbCell}>
                  <span className={styles.tbMark}>{totals.mark}</span>
                </div>
              </div>
            </div>
            <p className={styles.illustrative}>{note}</p>
          </div>

          {/* detail panel (announced on change) */}
          <div className={styles.panel} aria-live="polite">
            <span className={styles.panelNum} aria-hidden="true">{active.num}</span>
            <h3 className={styles.panelTitle}>{active.title}</h3>
            <dl className={styles.spec}>
              <div className={styles.specRow}>
                <dt className={styles.specKey}>Thickness</dt>
                <dd className={styles.specVal}>{active.thickness}</dd>
              </div>
              <div className={styles.specRow}>
                <dt className={styles.specKey}>Material</dt>
                <dd className={styles.specVal}>{active.material}</dd>
              </div>
              <div className={styles.specRow}>
                <dt className={styles.specKey}>Trade</dt>
                <dd className={styles.specVal}>{active.trade}</dd>
              </div>
              <div className={styles.specRow}>
                <dt className={styles.specKey}>Function</dt>
                <dd className={styles.specVal}>{active.function}</dd>
              </div>
            </dl>
            <p className={styles.panelStandard}>{active.standard}</p>
          </div>
        </div>

        {/* chips: the accessible controls (keyboard + tap) */}
        <ul className={styles.chips}>
          {layers.map((l) => {
            const on = l.id === activeId;
            return (
              <li key={l.id}>
                <button
                  type="button"
                  className={`${styles.chip} ${on ? styles.chipActive : ""}`}
                  aria-pressed={on}
                  onClick={() => selectZone(l.id)}
                >
                  <span className={styles.chipNum} aria-hidden="true">{l.num}</span>
                  {l.title}
                </button>
              </li>
            );
          })}
        </ul>

        {/* screen-reader summary of every layer + spec */}
        <ol className="sr-only">
          {layers.map((l) => (
            <li key={l.id}>
              <strong>{l.title}</strong> ({l.thickness}) — {l.material}. Trade: {l.trade}. {l.function}. {l.standard}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
