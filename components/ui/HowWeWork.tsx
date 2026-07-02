"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HowWeWork.module.css";
import { howWeWork } from "@/lib/brand";

type IconName = "compass" | "ruler" | "check" | "building" | "key";

function StepIcon({ name }: { name: IconName }) {
  switch (name) {
    case "compass":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      );
    case "ruler":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.3 15.3l-7.1-7.1a2 2 0 0 0-2.82 0l-7.1 7.1a2 2 0 0 0 0 2.82l7.1 7.1a2 2 0 0 0 2.82 0l7.1-7.1a2 2 0 0 0 0-2.82z"></path>
          <path d="M6 12l2-2"></path>
          <path d="M10 16l2-2"></path>
          <path d="M14 20l2-2"></path>
        </svg>
      );
    case "check":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
      );
    case "building":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path>
          <path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path>
          <path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
      );
    case "key":
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
        </svg>
      );
    default:
      return null;
  }
}

/* Per-step scroll weights across the pinned section. Steps 1–4 get full bands;
   Handover gets a short tail so it settles and releases the pin promptly rather
   than lingering over an empty viewport. STEP_EDGES[i]..[i+1] is step i's band
   in 0–1 progress. Everything downstream (step index, blueprint draw windows,
   floor fade) is derived from these edges, not a fixed 0.2 grid. */
const STEP_WEIGHTS = [1, 1, 1, 1, 0.5];
const STEP_EDGES = (() => {
  const total = STEP_WEIGHTS.reduce((a, b) => a + b, 0);
  const edges = [0];
  let acc = 0;
  for (const w of STEP_WEIGHTS) {
    acc += w;
    edges.push(acc / total);
  }
  return edges; // [0, 0.222, 0.444, 0.667, 0.889, 1]
})();

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const buildingGroupRef = useRef<SVGGElement>(null);
  const craneGroupRef = useRef<SVGGElement>(null);
  const annoGroupRef = useRef<SVGGElement>(null);
  const floorGroupRef = useRef<SVGGElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [cranePaused, setCranePaused] = useState(false);

  // Single scroll subscription for the section's whole lifetime (mirrors
  // Header.tsx): rAF-throttled, passive. Backgrounds, blueprint draw-in and
  // floor reveal are driven imperatively via refs; React state only changes
  // when the active step index / scroll flag actually flips (functional
  // setState so the effect never needs those values in its deps).
  useEffect(() => {
    let raf = 0;

    // Under reduced motion the blueprint is shown fully drawn (no scrubbing).
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

    // Sketch a group in line-by-line: each <path> owns a sub-slice of the
    // group's scroll window, so segments draw one after another (not as one
    // block). paths use pathLength="1" → offset 1 = hidden, 0 = fully drawn.
    // A small overlap lets each line start just before the previous finishes,
    // so it reads like a flowing hand-sketch. No CSS transition — pure scrub.
    const OVERLAP = 0.15;
    const drawGroupStaggered = (g: SVGGElement | null, groupLocal: number) => {
      if (!g) return;
      const paths = g.querySelectorAll<SVGPathElement>("path");
      const N = paths.length;
      if (N === 0) return;
      paths.forEach((el, i) => {
        const span = 1 / N;
        // Overlap pulls each line's start slightly early — but clamp to 0 so the
        // first line never starts before the window: at groupLocal 0 = fully blank.
        const start = Math.max(0, i * span - span * OVERLAP);
        const end = (i + 1) * span;
        const localForThis = clamp01((groupLocal - start) / (end - start));
        el.style.strokeDashoffset = String(1 - localForThis);
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const scrollableDistance = rect.height - window.innerHeight;
        if (scrollableDistance <= 0) return;

        // Scroll progress 0 → 1 across the pinned section.
        let p = -rect.top / scrollableDistance;
        p = Math.max(0, Math.min(1, p));

        setScrolled((prev) => {
          const next = p > 0.02;
          return prev === next ? prev : next;
        });

        // Active step = the band p currently sits in (weighted, see STEP_EDGES).
        let currentStep = 0;
        for (let i = 0; i < STEP_EDGES.length - 1; i++) {
          if (p >= STEP_EDGES[i]) currentStep = i;
        }
        currentStep = Math.min(currentStep, 4);
        setActiveStep((prev) => (prev === currentStep ? prev : currentStep));

        // Blueprint sketches itself in across the blueprint span — Brief → Design
        // → Planning, i.e. 0 → STEP_EDGES[3]. Windows are fractions of that span
        // (derived, not hardcoded): building first, then the tower crane, then
        // the amber dimension line + programme motif, all finished before the
        // Planning band ends. Recomputed every frame; up-scroll reverses it.
        const bpEnd = STEP_EDGES[3];
        const win = (from: number, to: number) =>
          clamp01((p - from * bpEnd) / ((to - from) * bpEnd));
        const bLocal = prefersReduced ? 1 : win(0.03, 0.45); // building
        const cLocal = prefersReduced ? 1 : win(0.42, 0.74); // crane
        const aLocal = prefersReduced ? 1 : win(0.72, 0.97); // annotations
        drawGroupStaggered(buildingGroupRef.current, bLocal);
        drawGroupStaggered(craneGroupRef.current, cLocal);
        drawGroupStaggered(annoGroupRef.current, aLocal);
        if (annoGroupRef.current) {
          annoGroupRef.current.style.opacity = String(prefersReduced ? 1 : aLocal);
        }

        // Construction step — floors/cladding fade in over that step's band.
        if (floorGroupRef.current) {
          const subP = clamp01((p - STEP_EDGES[3]) / (STEP_EDGES[4] - STEP_EDGES[3]));
          floorGroupRef.current.style.opacity = String(prefersReduced ? 1 : subP);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Measure once after layout settles (not synchronously on mount) so the
    // pinned section doesn't shift on the first frame.
    requestAnimationFrame(onScroll);

    // Pause the crane animation whenever the section scrolls out of view.
    let observer: IntersectionObserver | undefined;
    if (sectionRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => setCranePaused(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="how-we-work">
      {/* Accessibility / SR Only Content */}
      <div className="sr-only">
        <h2>How we work</h2>
        <ol>
          {howWeWork.steps.map((step) => (
            <li key={step.num}>
              <strong>{step.title}</strong>: {step.description}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.pin} aria-hidden="true">
        
        {/* Layer 0: Step 01, 02, 03 - Blueprint Grid */}
        <div className={`${styles.bgLayer} ${styles.blueprintBg} ${activeStep < 3 ? styles.bgActive : ""}`} />
        
        {/* Blueprint line-art (Design + Planning steps). Each group sketches in
           on scroll via stroke-dashoffset set imperatively per frame (see the
           scroll handler) — no CSS transition on that property. */}
        <div className={`${styles.svgContainer} ${activeStep < 3 ? styles.bgActive : ""}`}>
          <svg className={styles.svgArt} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            {/* 1 — building: outline, then floor lines, then columns, then door
               (one <path> per line so they sketch in one after another) */}
            <g ref={buildingGroupRef}>
              {/* base outline + roof */}
              <path className={styles.pathBuilding} pathLength="1" d="M300 500 L300 200 L500 150 L700 200 L700 500 Z" />
              {/* floor lines */}
              <path className={styles.pathBuilding} pathLength="1" d="M300 400 L700 400.01" />
              <path className={styles.pathBuilding} pathLength="1" d="M300 300 L700 300.01" />
              {/* columns */}
              <path className={styles.pathBuilding} pathLength="1" d="M400 500 L400.01 200" />
              <path className={styles.pathBuilding} pathLength="1" d="M500 500 L500.01 150" />
              <path className={styles.pathBuilding} pathLength="1" d="M600 500 L600.01 200" />
              {/* door */}
              <path className={styles.pathBuilding} pathLength="1" d="M450 500 L450 400 L550 400 L550 500 Z" />
            </g>

            {/* 2 — tower crane: mast, apex, jib, counter-jib, counterweight,
               stays, then hoist cable + hook (one <path> per line, drawn in
               structural order so it "erects" as you scroll) */}
            <g ref={craneGroupRef}>
              {/* mast */}
              <path className={styles.pathCrane} pathLength="1" d="M770 500 L770.01 130" />
              {/* apex A-frame */}
              <path className={styles.pathCrane} pathLength="1" d="M755 130 L785 130 L770 100 L755 130" />
              {/* jib (working arm, over the building) */}
              <path className={styles.pathCrane} pathLength="1" d="M770 150 L560 150.01" />
              {/* counter-jib */}
              <path className={styles.pathCrane} pathLength="1" d="M770 150 L850 150.01" />
              {/* counterweight block */}
              <path className={styles.pathCrane} pathLength="1" d="M830 150 L850 150 L850 168 L830 168 L830 150" />
              {/* forestay to jib tip */}
              <path className={styles.pathCrane} pathLength="1" d="M770 100 L575 150" />
              {/* backstay to counter-jib tip */}
              <path className={styles.pathCrane} pathLength="1" d="M770 100 L845 150" />
              {/* hoist cable */}
              <path className={styles.pathCrane} pathLength="1" d="M620 150 L620.01 258" />
              {/* hook */}
              <path className={styles.pathCrane} pathLength="1" d="M611 258 L629 258.01 M620 258 L620.01 272" />
            </g>

            {/* 3 — amber dimension line + programme/checklist motif (draws last).
               Line first, then the two end ticks (one <path> each). */}
            <g ref={annoGroupRef} className={styles.annoGroup}>
              <path className={styles.pathAnnotation} pathLength="1" d="M300 545 L700 545.01" />
              <path className={styles.pathAnnotation} pathLength="1" d="M300 535 L300.01 555" />
              <path className={styles.pathAnnotation} pathLength="1" d="M700 535 L700.01 555" />
              <text
                x="500"
                y="578"
                style={{ fill: "var(--amber-500)" }}
                fontSize="18"
                fontFamily="var(--font-mono, monospace)"
                textAnchor="middle"
              >
                {howWeWork.blueprint.dimension}
              </text>
              {/* programme / approvals bars */}
              <rect x="90" y="110" width="150" height="14" fill="rgba(255,255,255,0.18)" />
              <rect x="90" y="110" width="60" height="14" style={{ fill: "var(--amber-500)" }} />
              <rect x="90" y="134" width="150" height="14" fill="rgba(255,255,255,0.18)" />
              <rect x="90" y="134" width="95" height="14" style={{ fill: "var(--amber-500)" }} />
              <rect x="90" y="158" width="150" height="14" fill="rgba(255,255,255,0.18)" />
              <rect x="90" y="158" width="40" height="14" style={{ fill: "var(--amber-500)" }} />
            </g>
          </svg>
        </div>

        {/* Blueprint Title Block (Steps 1, 2, 3) */}
        <div className={`${styles.titleBlock} ${activeStep < 3 ? "" : styles.titleBlockHidden}`}>
          {howWeWork.blueprint.titleBlock}
        </div>

        {/* Layer 1: Step 04 - Construction Photo */}
        <div className={`${styles.bgLayer} ${activeStep === 3 ? styles.bgActive : ""}`}>
          <img 
            src={howWeWork.images.construction} 
            alt="" 
            loading="lazy" 
            className={styles.photoLayer} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
          {/* SVG Crane Animation over Construction Photo */}
          <svg 
            className={styles.craneSvg} 
            viewBox="0 0 1000 600" 
            preserveAspectRatio="xMidYMid meet"
            style={{ animationPlayState: cranePaused ? "paused" : "running" }}
          >
            {/* The fading in building floors */}
            <g ref={floorGroupRef} className={styles.floorGroup}>
              <rect x="300" y="450" width="400" height="50" fill="rgba(20, 20, 30, 0.7)" />
              <rect x="300" y="400" width="400" height="50" fill="rgba(20, 20, 30, 0.7)" />
              <rect x="300" y="350" width="400" height="50" fill="rgba(20, 20, 30, 0.7)" />
              <rect x="300" y="300" width="400" height="50" fill="rgba(20, 20, 30, 0.7)" />
            </g>

            {/* Static latticed mast (two verticals + X cross-bracing) + base */}
            <g className={styles.craneSteel}>
              <path d="M442 150 L442 582 M470 150 L470 582" />
              <path d="M442 150 L470 204 L442 258 L470 312 L442 366 L470 420 L442 474 L470 528 L442 582" />
              <path d="M470 150 L442 204 L470 258 L442 312 L470 366 L442 420 L470 474 L442 528 L470 582" />
              <path d="M442 582 L416 600 M470 582 L496 600 M410 600 L502 600" />
            </g>

            {/* Slewing assembly — apex, jib truss, counter-jib + counterweight,
               cab, trolley and hoist. Rotates slowly around the mast top. */}
            <g className={styles.slew} style={{ animationPlayState: cranePaused ? "paused" : "running" }}>
              {/* slewing ring + operator cab */}
              <rect className={styles.craneFill} x="434" y="144" width="46" height="8" rx="2" />
              <rect className={styles.craneFill} x="474" y="152" width="30" height="26" rx="2" />
              <path className={styles.craneSteel} d="M478 159 L500 159" />

              {/* apex A-frame above the slewing unit */}
              <path className={styles.craneSteel} d="M446 150 L454 94 L462 150 M454 150 L454 94" />

              {/* jib (working arm): amber top chord + steel bottom chord & truss */}
              <path className={styles.craneAmber} d="M470 150 L884 150" />
              <path className={styles.craneSteel} d="M480 172 L868 172 M884 150 L868 172" />
              <path
                className={styles.craneSteel}
                d="M470 150 L500 172 L530 150 L560 172 L590 150 L620 172 L650 150 L680 172 L710 150 L740 172 L770 150 L800 172 L830 150 L860 172 L884 150"
              />

              {/* counter-jib + counterweight block */}
              <path
                className={styles.craneSteel}
                d="M438 150 L300 150 M438 168 L316 168 M300 150 L316 168 M438 150 L416 168 L394 150 L372 168 L350 150 L328 168 L306 150"
              />
              <rect className={styles.craneFill} x="286" y="150" width="34" height="44" rx="2" />

              {/* tie bars (fore/back stays) from apex to the chord tips */}
              <path className={styles.craneSteel} d="M454 94 L876 150 M454 94 L304 150" />

              {/* trolley riding the jib; hook + cable raise/lower together */}
              <g className={styles.trolley} style={{ animationPlayState: cranePaused ? "paused" : "running" }}>
                <rect className={styles.craneFill} x="632" y="166" width="24" height="12" rx="2" />
                <rect className={styles.craneCable} x="642.5" y="178" width="3" height="150" />
                <g className={styles.hook} style={{ animationPlayState: cranePaused ? "paused" : "running" }}>
                  <rect className={styles.craneFill} x="636" y="322" width="16" height="12" rx="1" />
                  <path className={styles.craneSteel} d="M644 334 C644 344 652 344 652 334" />
                  {/* suspended load (small beam) */}
                  <rect className={styles.craneLoad} x="622" y="340" width="44" height="9" rx="1" />
                </g>
              </g>
            </g>
          </svg>
        </div>

        {/* Layer 2: Step 05 - Finished Residence Photo */}
        <div className={`${styles.bgLayer} ${activeStep === 4 ? styles.bgActive : ""}`}>
          <img 
            src={howWeWork.images.finished} 
            alt="" 
            loading="lazy" 
            className={styles.photoLayer} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        </div>

        {/* Scroll Hint */}
        <div className={`${styles.scrollHint} ${scrolled ? styles.scrollHintHidden : ""}`}>
          <span>Scroll to build</span>
          <div className={styles.scrollHintLine} />
        </div>

        {/* Side Indicators */}
        <div className={styles.indicators}>
          {howWeWork.steps.map((_, i) => (
            <div key={i} className={`${styles.dot} ${activeStep === i ? styles.dotActive : ""}`} />
          ))}
        </div>

        {/* Foreground content — all five cards stacked in one grid cell so the
           panel sizes to the tallest step; only the active card is opaque and
           steps cross-fade (opacity transition → disabled by reduced-motion). */}
        <div className={styles.content}>
          <div className={`container ${styles.contentInner}`}>
            <div className={styles.card}>
              {howWeWork.steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`${styles.step} ${activeStep === i ? styles.stepActive : ""}`}
                  aria-hidden={activeStep === i ? undefined : true}
                >
                  <span className={styles.ghostNumber}>{step.num}</span>
                  <span className={styles.iconTile}>
                    <StepIcon name={step.icon as IconName} />
                  </span>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p className={styles.cardDesc}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
