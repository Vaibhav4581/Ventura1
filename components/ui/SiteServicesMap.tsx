"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./SiteServicesMap.module.css";
import { siteServices } from "@/lib/brand";

/* Geometry for the cross-section (viewBox 0 0 640 470). `bbox` positions the
   amber highlight overlay over each zone; `pin` places its numbered marker.
   Kept next to the drawing it describes; copy lives in lib/brand.ts. */
type Box = { x: number; y: number; w: number; h: number };
const GEOMETRY: Record<string, { bbox: Box; pin: { x: number; y: number } }> = {
  crane: { bbox: { x: 196, y: 54, w: 350, h: 46 }, pin: { x: 300, y: 72 } },
  structure: { bbox: { x: 205, y: 95, w: 220, h: 56 }, pin: { x: 315, y: 123 } },
  mep: { bbox: { x: 205, y: 151, w: 220, h: 54 }, pin: { x: 315, y: 178 } },
  fitout: { bbox: { x: 205, y: 205, w: 220, h: 50 }, pin: { x: 315, y: 230 } },
  facade: { bbox: { x: 205, y: 255, w: 220, h: 45 }, pin: { x: 315, y: 278 } },
  footings: { bbox: { x: 193, y: 300, w: 244, h: 56 }, pin: { x: 315, y: 328 } },
  landscaping: { bbox: { x: 26, y: 270, w: 172, h: 52 }, pin: { x: 110, y: 300 } },
};

const { intro, zones } = siteServices;

export function SiteServicesMap() {
  // Crane selected first — it "sits over everything" (project management).
  const [activeId, setActiveId] = useState(zones[0].id);
  const selectZone = (id: string) => setActiveId(id);

  const active = zones.find((z) => z.id === activeId) ?? zones[0];
  const hi = GEOMETRY[active.id].bbox;

  return (
    <section className={`section ${styles.section}`} id="site-map">
      <div className="container">
        <header className={styles.head}>
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className={styles.title}>{intro.title}</h2>
          <p className={styles.lead}>{intro.lead}</p>
        </header>

        <div className={styles.layout}>
          <div className={styles.figure}>
            {/* Decorative-with-controls: the drawing is aria-hidden; the chip
               buttons below are the accessible controls, plus the sr-only list. */}
            <svg
              className={styles.svg}
              viewBox="0 0 640 470"
              role="img"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <pattern
                  id="ssm-hatch"
                  width="7"
                  height="7"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(27,44,122,0.4)" strokeWidth="1.3" />
                </pattern>
              </defs>

              {/* ---- Backdrop ---- */}
              <rect x="0" y="0" width="640" height="300" fill="#e9f1fb" />
              <circle cx="86" cy="70" r="26" fill="rgba(247,148,29,0.16)" />
              <rect x="0" y="300" width="640" height="170" fill="#efe7d5" />
              <rect x="0" y="356" width="640" height="114" fill="#e6dac3" />
              <line x1="0" y1="300" x2="640" y2="300" className={styles.stroke} fill="none" strokeWidth="2.5" />

              {/* ---- Footings (below ground) ---- */}
              <g>
                <rect x="193" y="300" width="244" height="16" fill="url(#ssm-hatch)" className={styles.stroke} strokeWidth="2" />
                <rect x="210" y="316" width="54" height="36" fill="url(#ssm-hatch)" className={styles.stroke} strokeWidth="2" />
                <rect x="366" y="316" width="54" height="36" fill="url(#ssm-hatch)" className={styles.stroke} strokeWidth="2" />
                <line x1="237" y1="300" x2="237" y2="316" className={styles.stroke} fill="none" strokeWidth="3" />
                <line x1="393" y1="300" x2="393" y2="316" className={styles.stroke} fill="none" strokeWidth="3" />
              </g>

              {/* ---- Facade / glazed ground floor ---- */}
              <g>
                <rect x="205" y="255" width="220" height="45" fill="#d6e6f5" className={styles.stroke} strokeWidth="2" />
                <line x1="241" y1="255" x2="241" y2="300" className={styles.thin} fill="none" />
                <line x1="277" y1="255" x2="277" y2="300" className={styles.thin} fill="none" />
                <line x1="349" y1="255" x2="349" y2="300" className={styles.thin} fill="none" />
                <line x1="385" y1="255" x2="385" y2="300" className={styles.thin} fill="none" />
                <line x1="205" y1="278" x2="425" y2="278" className={styles.thin} fill="none" />
                <rect x="300" y="276" width="30" height="24" fill="#bcd6ef" className={styles.thin} />
              </g>

              {/* ---- Fit-out floor ---- */}
              <g>
                <rect x="205" y="205" width="220" height="50" fill="#f6f1e7" className={styles.stroke} strokeWidth="2" />
                <rect x="298" y="232" width="16" height="23" fill="#e8dec9" className={styles.thin} />
                <rect x="226" y="238" width="36" height="15" fill="#e8dec9" className={styles.thin} />
                <line x1="360" y1="205" x2="360" y2="255" className={styles.thin} fill="none" />
                <rect x="372" y="234" width="34" height="19" fill="#e8dec9" className={styles.thin} />
              </g>

              {/* ---- MEP / services floor ---- */}
              <g>
                <rect x="205" y="151" width="220" height="54" fill="#eaf0f7" className={styles.stroke} strokeWidth="2" />
                <rect x="216" y="162" width="198" height="13" rx="3" fill="#dbe6f2" className={styles.thin} />
                <circle cx="234" cy="190" r="6" fill="#dbe6f2" className={styles.thin} />
                <circle cx="254" cy="190" r="6" fill="#dbe6f2" className={styles.thin} />
                <path d="M272 192 L287 184 L302 192 L317 184 L332 192 L347 184 L362 192" className={styles.amberThin} fill="none" />
                <line x1="405" y1="151" x2="405" y2="205" className={styles.thin} fill="none" />
              </g>

              {/* ---- Structural frame (bare, top) ---- */}
              <g>
                <line x1="205" y1="95" x2="425" y2="95" className={styles.stroke} fill="none" strokeWidth="3" />
                <line x1="205" y1="95" x2="205" y2="151" className={styles.stroke} fill="none" strokeWidth="3" />
                <line x1="315" y1="95" x2="315" y2="151" className={styles.stroke} fill="none" strokeWidth="3" />
                <line x1="425" y1="95" x2="425" y2="151" className={styles.stroke} fill="none" strokeWidth="3" />
                <path d="M205 95 L315 151 M315 95 L205 151" className={styles.thin} fill="none" />
                <path d="M315 95 L425 151 M425 95 L315 151" className={styles.thin} fill="none" />
                {/* rebar starter bars poking up (under construction) */}
                <path d="M225 95 L225 86 M255 95 L255 84 M285 95 L285 87 M345 95 L345 85 M375 95 L375 87 M405 95 L405 84" className={styles.thin} fill="none" />
              </g>

              {/* ---- Tower crane (over everything) ---- */}
              <g>
                <rect x="462" y="296" width="32" height="8" fill="#dbe6f2" className={styles.thin} />
                <line x1="470" y1="300" x2="470" y2="78" className={styles.stroke} fill="none" strokeWidth="2.5" />
                <line x1="486" y1="300" x2="486" y2="78" className={styles.stroke} fill="none" strokeWidth="2.5" />
                <path d="M470 300 L486 264 L470 228 L486 192 L470 156 L486 120 L470 84" className={styles.thin} fill="none" />
                <path d="M486 300 L470 264 L486 228 L470 192 L486 156 L470 120 L486 84" className={styles.thin} fill="none" />
                {/* apex */}
                <path d="M470 78 L478 56 L486 78" className={styles.thin} fill="none" />
                {/* jib: amber top chord + truss */}
                <line x1="486" y1="78" x2="200" y2="78" className={styles.amber} fill="none" strokeWidth="3" />
                <line x1="480" y1="90" x2="214" y2="90" className={styles.stroke} fill="none" strokeWidth="2" />
                <line x1="200" y1="78" x2="214" y2="90" className={styles.stroke} fill="none" strokeWidth="2" />
                <path d="M486 78 L466 90 L446 78 L426 90 L406 78 L386 90 L366 78 L346 90 L326 78 L306 90 L286 78 L266 90 L246 78 L226 90 L214 90" className={styles.thin} fill="none" />
                {/* counter-jib + counterweight */}
                <line x1="486" y1="78" x2="545" y2="78" className={styles.stroke} fill="none" strokeWidth="2" />
                <line x1="486" y1="90" x2="536" y2="90" className={styles.stroke} fill="none" strokeWidth="2" />
                <rect x="523" y="78" width="22" height="22" fill="#cfd8e6" className={styles.thin} />
                {/* stays */}
                <path d="M478 56 L206 78 M478 56 L540 78" className={styles.thin} fill="none" />
                {/* trolley + hook */}
                <rect x="294" y="84" width="16" height="8" fill="#cfd8e6" className={styles.thin} />
                <line x1="302" y1="92" x2="302" y2="138" className={styles.thin} fill="none" />
                <rect x="296" y="138" width="12" height="8" fill="#cfd8e6" className={styles.thin} />
                <rect x="286" y="146" width="32" height="7" fill="rgba(247,148,29,0.6)" className={styles.thin} />
              </g>

              {/* ---- Landscaping / external works ---- */}
              <g>
                <ellipse cx="92" cy="314" rx="46" ry="11" fill="#bfe0ef" className={styles.thin} />
                <line x1="72" y1="312" x2="112" y2="312" className={styles.waterLine} fill="none" />
                <line x1="80" y1="318" x2="104" y2="318" className={styles.waterLine} fill="none" />
                <line x1="24" y1="330" x2="190" y2="330" className={styles.thin} fill="none" />
                <line x1="60" y1="330" x2="60" y2="338" className={styles.thin} fill="none" />
                <line x1="120" y1="330" x2="120" y2="338" className={styles.thin} fill="none" />
                <rect x="150" y="278" width="6" height="22" fill="#8a6a4a" />
                <circle cx="153" cy="272" r="17" fill="#bcd9a8" className={styles.thin} />
                <rect x="43" y="286" width="5" height="16" fill="#8a6a4a" />
                <circle cx="45" cy="282" r="12" fill="#bcd9a8" className={styles.thin} />
              </g>

              {/* ---- Active highlight overlay ---- */}
              <rect
                className={styles.highlight}
                x={hi.x}
                y={hi.y}
                width={hi.w}
                height={hi.h}
                rx="4"
              />

              {/* ---- Transparent hit areas (click / tap + hover tint) ---- */}
              {zones.map((z) => {
                const b = GEOMETRY[z.id].bbox;
                return (
                  <rect
                    key={`hit-${z.id}`}
                    className={styles.hit}
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    onClick={() => selectZone(z.id)}
                  />
                );
              })}

              {/* ---- Numbered pins ---- */}
              {zones.map((z) => {
                const p = GEOMETRY[z.id].pin;
                const on = z.id === activeId;
                return (
                  <g
                    key={`pin-${z.id}`}
                    className={styles.pinGroup}
                    onClick={() => selectZone(z.id)}
                  >
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={on ? 15 : 11}
                      className={`${styles.pin} ${on ? styles.pinActive : ""}`}
                    />
                    <text x={p.x} y={p.y} className={styles.pinText} textAnchor="middle" dominantBaseline="central">
                      {z.num}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* ---- Detail panel (announced on change) ---- */}
          <div className={styles.panel} aria-live="polite">
            <span className={styles.panelNum} aria-hidden="true">{active.num}</span>
            <h3 className={styles.panelTitle}>{active.title}</h3>
            <p className={styles.panelBlurb}>{active.blurb}</p>
            {active.service ? (
              <Link href={`/services/${active.service}/`} className={styles.panelLink}>
                View service <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>

        {/* ---- Chips: the accessible controls (keyboard + tap) ---- */}
        <ul className={styles.chips}>
          {zones.map((z) => {
            const on = z.id === activeId;
            return (
              <li key={z.id}>
                <button
                  type="button"
                  className={`${styles.chip} ${on ? styles.chipActive : ""}`}
                  aria-pressed={on}
                  onClick={() => selectZone(z.id)}
                >
                  <span className={styles.chipNum} aria-hidden="true">{z.num}</span>
                  {z.title}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Screen-reader summary of every zone + service */}
        <ol className="sr-only">
          {zones.map((z) => (
            <li key={z.id}>
              <strong>{z.title}</strong>: {z.blurb}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
