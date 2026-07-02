"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DrawingBoard.module.css";
import { drawingBoard } from "@/lib/brand";

export function DrawingBoard() {
  const [activeStage, setActiveStage] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const buildingRef = useRef<SVGPathElement>(null);
  const craneRef = useRef<SVGPathElement>(null);
  const annotationRef = useRef<SVGPathElement>(null);
  const dimTextRef = useRef<SVGTextElement>(null);
  
  const cranePhotoRef = useRef<HTMLImageElement>(null);
  const residencePhotoRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress from 0 (top of section hits viewport top) 
        // to 1 (bottom of section hits viewport bottom)
        const totalScrollable = rect.height - viewportHeight;
        
        if (totalScrollable <= 0) return;
        
        // scrolled amount relative to section top
        const scrolled = -rect.top;
        
        if (scrolled > 10 && !hasScrolled) {
          setHasScrolled(true);
        }

        let progress = scrolled / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));

        // 1. Blueprint drawing (0 to 0.42)
        // Building: 0 to 0.14
        const pBuilding = Math.min(1, Math.max(0, progress / 0.14));
        if (buildingRef.current) buildingRef.current.style.strokeDashoffset = (1 - pBuilding).toString();
        
        // Crane: 0.14 to 0.28
        const pCrane = Math.min(1, Math.max(0, (progress - 0.14) / 0.14));
        if (craneRef.current) craneRef.current.style.strokeDashoffset = (1 - pCrane).toString();

        // Annotations: 0.28 to 0.42
        const pAnnotation = Math.min(1, Math.max(0, (progress - 0.28) / 0.14));
        if (annotationRef.current) annotationRef.current.style.strokeDashoffset = (1 - pAnnotation).toString();
        if (dimTextRef.current) dimTextRef.current.style.opacity = pAnnotation > 0.8 ? "1" : "0";

        // 2. Cross-fades (photo layers)
        // Crane photo: fades in 0.45 to 0.55
        const pCranePhoto = Math.min(1, Math.max(0, (progress - 0.45) / 0.1));
        if (cranePhotoRef.current) cranePhotoRef.current.style.opacity = pCranePhoto.toString();

        // Residence photo: fades in 0.72 to 0.82
        const pResPhoto = Math.min(1, Math.max(0, (progress - 0.72) / 0.1));
        if (residencePhotoRef.current) residencePhotoRef.current.style.opacity = pResPhoto.toString();

        // Overlay kicks in when either photo starts showing
        if (overlayRef.current) {
          overlayRef.current.style.opacity = pCranePhoto > 0 ? "1" : "0";
        }

        // 3. Stage index for React state (UI updates)
        let newStage = 0;
        if (progress >= 0.72) {
          newStage = 2;
        } else if (progress >= 0.45) {
          newStage = 1;
        }

        setActiveStage((prev) => {
          if (prev !== newStage) return newStage;
          return prev;
        });
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hasScrolled]);

  return (
    <section className={styles.section} ref={sectionRef} aria-label="Project stages from drawing to completion">
      <div className={styles.pin}>
        {/* Stage 0: Blueprint Grid */}
        <div className={styles.blueprintBg} aria-hidden="true" />
        
        {/* Stage 0: SVG Art */}
        <div className={styles.svgContainer} aria-hidden="true">
          <svg className={styles.svgArt} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
            {/* Building */}
            <path
              ref={buildingRef}
              className={styles.pathBuilding}
              pathLength="1"
              d="M 150 550 L 150 250 L 350 250 L 350 550 M 150 350 L 350 350 M 150 450 L 350 450 M 200 550 L 200 250 M 250 550 L 250 250 M 300 550 L 300 250"
            />
            {/* Crane */}
            <path
              ref={craneRef}
              className={styles.pathCrane}
              pathLength="1"
              d="M 450 550 L 450 150 M 430 170 L 470 170 M 430 220 L 470 220 M 430 270 L 470 270 M 430 320 L 470 320 M 430 370 L 470 370 M 430 420 L 470 420 M 430 470 L 470 470 M 430 520 L 470 520 M 450 150 L 300 150 M 450 150 L 700 150 M 450 100 L 350 150 M 450 100 L 600 150 M 650 150 L 650 300 M 640 300 L 660 300"
            />
            {/* Annotation (Dimension line) */}
            <path
              ref={annotationRef}
              className={styles.pathAnnotation}
              pathLength="1"
              d="M 120 250 L 120 550 M 110 250 L 130 250 M 110 550 L 130 550"
            />
            <text
              ref={dimTextRef}
              x="100"
              y="400"
              fill="var(--amber-500)"
              fontSize="16"
              fontFamily="var(--font-mono, monospace)"
              textAnchor="middle"
              transform="rotate(-90 100,400)"
              style={{ opacity: 0, transition: "opacity var(--dur-fast) var(--ease-out)" }}
            >
              {drawingBoard.blueprint.dimension}
            </text>
          </svg>
        </div>

        {/* Title Block */}
        <div className={`${styles.titleBlock} ${activeStage > 0 ? styles.titleBlockHidden : ""}`} aria-hidden="true">
          {drawingBoard.blueprint.titleBlock}
        </div>

        {/* Stage 1 & 2: Photos */}
        <img
          ref={cranePhotoRef}
          src={drawingBoard.images.crane}
          alt=""
          aria-hidden="true"
          className={styles.photoLayer}
          loading="lazy"
        />
        <img
          ref={residencePhotoRef}
          src={drawingBoard.images.residence}
          alt=""
          aria-hidden="true"
          className={styles.photoLayer}
          loading="lazy"
        />

        {/* Dark overlay to make text readable over photos */}
        <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />

        {/* Content / Copy Container */}
        <div className={`container ${styles.content}`}>
          <div className={styles.contentInner}>
            <div className={styles.copyBox}>
              <span className={styles.eyebrow}>{drawingBoard.stages[activeStage].eyebrow}</span>
              <h2 className={styles.title}>{drawingBoard.stages[activeStage].title}</h2>
              <p className={styles.description}>{drawingBoard.stages[activeStage].description}</p>
            </div>
          </div>
        </div>

        {/* Stage Indicators */}
        <div className={styles.indicators} aria-hidden="true">
          {drawingBoard.stages.map((_, i) => (
            <div key={i} className={`${styles.dot} ${i === activeStage ? styles.dotActive : ""}`} />
          ))}
        </div>

        {/* Scroll Hint */}
        <div className={`${styles.scrollHint} ${hasScrolled ? styles.scrollHintHidden : ""}`} aria-hidden="true">
          <span>Scroll to build</span>
          <div className={styles.scrollHintLine} />
        </div>
      </div>

      {/* Screen-reader only summary of stages */}
      <ol className="sr-only">
        {drawingBoard.stages.map((stage, i) => (
          <li key={i}>
            <strong>{stage.title}:</strong> {stage.description}
          </li>
        ))}
      </ol>
    </section>
  );
}
