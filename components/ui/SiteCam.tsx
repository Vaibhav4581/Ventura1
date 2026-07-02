"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SiteCam.module.css";
import { siteCam } from "@/lib/brand";

export function SiteCam() {
  const sectionRef = useRef<HTMLElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Intersection Observer to pause animations when out of view
    let observer: IntersectionObserver | undefined;
    if (sectionRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => setIsPaused(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(sectionRef.current);
    }

    // Fast-forwarding timestamp logic
    let intervalId: ReturnType<typeof setInterval>;
    
    // Start timestamp: 2024-03-11 08:14:02
    let currentTime = new Date("2024-03-11T08:14:02").getTime();

    const tick = () => {
      // Advance by 37 minutes
      currentTime += 37 * 60 * 1000;
      
      if (timeRef.current) {
        const d = new Date(currentTime);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const hh = String(d.getHours()).padStart(2, "0");
        const min = String(d.getMinutes()).padStart(2, "0");
        const ss = String(d.getSeconds()).padStart(2, "0");
        
        timeRef.current.textContent = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      }
    };

    if (!prefersReduced && !isPaused) {
      intervalId = setInterval(tick, 90);
    }

    return () => {
      if (observer) observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPaused]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${isPaused ? styles.paused : ""}`}>
      {/* Screen Reader Only Description */}
      <div className="sr-only">
        <p>A fast-forward time-lapse of a construction site camera. A tower crane moves back and forth while the building structure assembles floor by floor.</p>
      </div>

      <div className={styles.camWrapper} aria-hidden="true">
        <svg
          className={styles.svgScene}
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" className={styles.skyGradTop} />
              <stop offset="100%" className={styles.skyGradBot} />
            </linearGradient>
          </defs>

          {/* Sky background */}
          <rect width="1000" height="600" fill="url(#skyGrad)" />
          
          {/* Ground */}
          <rect y="450" width="1000" height="150" className={styles.ground} />

          {/* Photographic background with dark overlay */}
          <image href="/imagery/steelframe.jpg" x="0" y="0" width="1000" height="600" preserveAspectRatio="xMidYMid slice" />
          <rect width="1000" height="600" className={styles.photoOverlay} />

          {/* Foliage / site framing elements */}
          <path d="M0 600 L0 500 Q 50 480 80 520 T 150 550 L150 600 Z" className={styles.foliage} />
          <path d="M1000 600 L1000 450 Q 920 450 880 500 T 800 600 Z" className={styles.foliage} />

          {/* --- The Building Sequence --- */}
          <g transform="translate(300, 0)">
            {/* Floor 1 */}
            <g className={`${styles.buildingSlab} ${styles.floor1}`}>
              <rect x="0" y="400" width="400" height="10" />
              <line x1="50" y1="410" x2="50" y2="450" className={styles.buildingColumn} />
              <line x1="200" y1="410" x2="200" y2="450" className={styles.buildingColumn} />
              <line x1="350" y1="410" x2="350" y2="450" className={styles.buildingColumn} />
            </g>
            {/* Floor 2 */}
            <g className={`${styles.buildingSlab} ${styles.floor2}`}>
              <rect x="0" y="320" width="400" height="10" />
              <line x1="50" y1="330" x2="50" y2="400" className={styles.buildingColumn} />
              <line x1="200" y1="330" x2="200" y2="400" className={styles.buildingColumn} />
              <line x1="350" y1="330" x2="350" y2="400" className={styles.buildingColumn} />
            </g>
            {/* Floor 3 */}
            <g className={`${styles.buildingSlab} ${styles.floor3}`}>
              <rect x="0" y="240" width="400" height="10" />
              <line x1="50" y1="250" x2="50" y2="320" className={styles.buildingColumn} />
              <line x1="200" y1="250" x2="200" y2="320" className={styles.buildingColumn} />
              <line x1="350" y1="250" x2="350" y2="320" className={styles.buildingColumn} />
            </g>
            {/* Floor 4 */}
            <g className={`${styles.buildingSlab} ${styles.floor4}`}>
              <rect x="0" y="160" width="400" height="10" />
              <line x1="50" y1="170" x2="50" y2="240" className={styles.buildingColumn} />
              <line x1="200" y1="170" x2="200" y2="240" className={styles.buildingColumn} />
              <line x1="350" y1="170" x2="350" y2="240" className={styles.buildingColumn} />
            </g>
            {/* Floor 5 (Roof) */}
            <g className={`${styles.buildingSlab} ${styles.floor5}`}>
              <rect x="0" y="80" width="400" height="10" />
              <line x1="50" y1="90" x2="50" y2="160" className={styles.buildingColumn} />
              <line x1="200" y1="90" x2="200" y2="160" className={styles.buildingColumn} />
              <line x1="350" y1="90" x2="350" y2="160" className={styles.buildingColumn} />
            </g>
          </g>

          {/* --- The Crane --- */}
          {/* Mast */}
          <g className={styles.craneSteel}>
            <line x1="750" y1="500" x2="750" y2="50" />
            <line x1="780" y1="500" x2="780" y2="50" />
            <path d="M750 480 L780 460 M750 460 L780 440 M750 440 L780 420 M750 420 L780 400 M750 400 L780 380 M750 380 L780 360 M750 360 L780 340 M750 340 L780 320 M750 320 L780 300 M750 300 L780 280 M750 280 L780 260 M750 260 L780 240 M750 240 L780 220 M750 220 L780 200 M750 200 L780 180 M750 180 L780 160 M750 160 L780 140 M750 140 L780 120 M750 120 L780 100 M750 100 L780 80 M750 80 L780 60" />
          </g>
          
          {/* Slewing Top Assembly */}
          <g className={styles.slewGroup}>
            {/* Apex */}
            <path d="M750 50 L765 10 L780 50" className={styles.craneSteel} />
            {/* Jib */}
            <line x1="200" y1="50" x2="750" y2="50" className={styles.craneAmber} />
            <path d="M200 50 L765 10" className={styles.craneCable} />
            <path d="M250 50 L300 40 L350 50 L400 35 L450 50 L500 30 L550 50 L600 25 L650 50 L700 20 L750 50" className={styles.craneSteel} />
            {/* Counter-jib */}
            <line x1="780" y1="50" x2="950" y2="50" className={styles.craneSteel} />
            <path d="M950 50 L765 10" className={styles.craneCable} />
            <rect x="910" y="50" width="30" height="20" fill="#3a404c" />
            
            {/* Trolley and Hoist */}
            <g className={styles.trolleyGroup}>
              <rect x="250" y="52" width="20" height="8" fill="#141a22" />
              <g className={styles.hookGroup}>
                <line x1="260" y1="60" x2="260" y2="180" className={styles.craneCable} />
                <path d="M255 180 L265 180 L260 190 Z" fill="#e07e0a" />
              </g>
            </g>
          </g>

        </svg>

        {/* Camera UI Overlay */}
        <div className={styles.camOverlay} aria-hidden="true">
          {/* Top Bar */}
          <div className={styles.topBar}>
            <div>
              {siteCam.camId} &middot; {siteCam.location}
            </div>
            <div className={styles.recGroup}>
              <div className={styles.recDot} />
              <span>REC</span>
              <span ref={timeRef} style={{ marginLeft: "var(--space-3)" }}>
                2024-03-11 08:14:02
              </span>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className={styles.bottomBar}>
            <div>
              <span className={styles.playSymbol} />
              {siteCam.speedLabel}
            </div>
            <div>{siteCam.tagline}</div>
          </div>
          
          {/* Corners */}
          <div className={`${styles.bracket} ${styles.bracketTL}`} />
          <div className={`${styles.bracket} ${styles.bracketTR}`} />
          <div className={`${styles.bracket} ${styles.bracketBL}`} />
          <div className={`${styles.bracket} ${styles.bracketBR}`} />
        </div>
      </div>

      <div className={styles.infoBlock}>
        <h2 className={styles.heading}>A Ventura site, in motion</h2>
        <p className={styles.subline}>Every build, from groundbreaking to handover — delivered.</p>
      </div>
    </section>
  );
}
