"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BuildExplorer.module.css";
import { buildExplorer } from "@/lib/brand";

type Edge = {
  a: [number, number, number];
  b: [number, number, number];
  stage: number;
  weight: number;
};

// Generate building geometry
function generateGeometry(): Edge[] {
  const edges: Edge[] = [];
  const W = 100; // half-width
  const H = 100; // floor height
  const FLOORS = 4;

  // Helper to add edge
  const add = (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, stage: number, weight: number) => {
    edges.push({ a: [x1, y1, z1], b: [x2, y2, z2], stage, weight });
  };

  const addBox = (w: number, y1: number, y2: number, stage: number, weight: number) => {
    // Bottom
    add(-w, y1, -w, w, y1, -w, stage, weight);
    add(w, y1, -w, w, y1, w, stage, weight);
    add(w, y1, w, -w, y1, w, stage, weight);
    add(-w, y1, w, -w, y1, -w, stage, weight);
    // Top
    add(-w, y2, -w, w, y2, -w, stage, weight);
    add(w, y2, -w, w, y2, w, stage, weight);
    add(w, y2, w, -w, y2, w, stage, weight);
    add(-w, y2, w, -w, y2, -w, stage, weight);
    // Verticals
    add(-w, y1, -w, -w, y2, -w, stage, weight);
    add(w, y1, -w, w, y2, -w, stage, weight);
    add(w, y1, w, w, y2, w, stage, weight);
    add(-w, y1, w, -w, y2, w, stage, weight);
  };

  // Stage 0: Ground slab
  addBox(110, -10, 0, 0, 2);

  // Stage 1: Structure (Frame)
  for (let f = 0; f <= FLOORS; f++) {
    const y = f * H;
    // Floor outlines
    if (f > 0) {
      add(-W, y, -W, W, y, -W, 1, 1.6);
      add(W, y, -W, W, y, W, 1, 1.6);
      add(W, y, W, -W, y, W, 1, 1.6);
      add(-W, y, W, -W, y, -W, 1, 1.6);
    }
    // Cross bracing between floors
    if (f < FLOORS) {
      const ny = (f + 1) * H;
      // Z=-W face
      add(-W, y, -W, W, ny, -W, 1, 1.2);
      add(W, y, -W, -W, ny, -W, 1, 1.2);
      // X=W face
      add(W, y, -W, W, ny, W, 1, 1.2);
      add(W, ny, -W, W, y, W, 1, 1.2);
      // Z=W face
      add(W, y, W, -W, ny, W, 1, 1.2);
      add(-W, y, W, W, ny, W, 1, 1.2);
      // X=-W face
      add(-W, y, W, -W, ny, -W, 1, 1.2);
      add(-W, ny, W, -W, y, -W, 1, 1.2);
    }
  }
  // Columns
  add(-W, 0, -W, -W, FLOORS * H, -W, 1, 1.6);
  add(W, 0, -W, W, FLOORS * H, -W, 1, 1.6);
  add(W, 0, W, W, FLOORS * H, W, 1, 1.6);
  add(-W, 0, W, -W, FLOORS * H, W, 1, 1.6);

  // Stage 2: MEP Core
  addBox(30, 0, FLOORS * H + 20, 2, 1.2);

  // Stage 3: Cladding (Mullions & Spandrels)
  const claddingW = W + 5;
  for (let z = -W; z <= W; z += 25) {
    add(claddingW, 0, z, claddingW, FLOORS * H, z, 3, 0.8);
    add(-claddingW, 0, z, -claddingW, FLOORS * H, z, 3, 0.8);
  }
  for (let x = -W; x <= W; x += 25) {
    add(x, 0, claddingW, x, FLOORS * H, claddingW, 3, 0.8);
    add(x, 0, -claddingW, x, FLOORS * H, -claddingW, 3, 0.8);
  }
  for (let f = 0; f < FLOORS; f++) {
    const y = f * H + 50;
    add(-claddingW, y, -claddingW, claddingW, y, -claddingW, 3, 0.8);
    add(claddingW, y, -claddingW, claddingW, y, claddingW, 3, 0.8);
    add(claddingW, y, claddingW, -claddingW, y, claddingW, 3, 0.8);
    add(-claddingW, y, claddingW, -claddingW, y, -claddingW, 3, 0.8);
  }

  // Stage 4: Parapet, Roof Plant, Flag
  const ph = FLOORS * H;
  addBox(claddingW, ph, ph + 15, 4, 2); // Parapet
  addBox(20, ph, ph + 30, 4, 1.6); // Plant box

  // Flag
  add(0, ph + 30, 0, 0, ph + 70, 0, 4, 1.6); // pole
  add(0, ph + 70, 0, 30, ph + 60, 0, 4, 1.6); // flag top
  add(30, ph + 60, 0, 0, ph + 50, 0, 4, 1.6); // flag bottom

  return edges;
}

const GEOMETRY = generateGeometry();
const STAGE_COUNT = buildExplorer.length; // 5

export function BuildExplorer() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Assembly is driven imperatively from the scroll handler via refs, so the
  // rAF draw loop never needs to be torn down when the stage changes. React
  // state only flips when the *active stage index* actually changes (caption +
  // chips), keeping re-renders to five over the whole scroll.
  const buildProgressRef = useRef(0); // 0 → 1 across the pinned section
  const activeStageRef = useRef(0);

  // Rotation state (independent of scroll).
  const yawRef = useRef(0.6);
  const pitchRef = useRef(0.5);
  const scrollYawRef = useRef(0); // scroll nudges the yaw slightly as it builds
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  // ---- Canvas render loop (runs once for the component's lifetime) ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion: show the finished building, no scroll scrubbing, no spin.
    if (prefersReduced) {
      buildProgressRef.current = 1;
      activeStageRef.current = STAGE_COUNT - 1;
    }

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    let rafId = 0;
    let visible = true;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!visible) return;

      // Auto-rotate — always on except while dragging or under reduced motion.
      if (!prefersReduced && !draggingRef.current) {
        yawRef.current += 0.002;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear & Draw paper bg
      ctx.fillStyle = "#f7f7f4";
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Grid background
      ctx.strokeStyle = "rgba(17, 17, 17, 0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < rect.width; x += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, rect.height);
      }
      for (let y = 0; y < rect.height; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(rect.width, y);
      }
      ctx.stroke();

      const cx = rect.width / 2;
      // Building spans Y≈0..480; seat its base low so it grows upward into frame.
      const cy = rect.height * 0.72;

      // Fit the ~480-unit-tall building into ~62% of the viewport height.
      const scale = (rect.height * 0.62) / 480;

      const yaw = yawRef.current + scrollYawRef.current;
      const cyaw = Math.cos(yaw);
      const syaw = Math.sin(yaw);
      const cpitch = Math.cos(pitchRef.current);
      const spitch = Math.sin(pitchRef.current);

      const project = ([x, y, z]: [number, number, number]) => {
        // Yaw (around Y axis)
        const x1 = x * cyaw - z * syaw;
        const z1 = x * syaw + z * cyaw;

        // Pitch (around X axis)
        const y2 = y * cpitch - z1 * spitch;
        const z2 = y * spitch + z1 * cpitch;

        // Perspective
        const persp = 1 / (1 + z2 * 0.0015);

        return {
          px: cx + x1 * scale * persp,
          py: cy - y2 * scale * persp, // Canvas Y is inverted
          depth: z2,
        };
      };

      // Assembly derived from scroll: floor(progress * 5) is the active stage;
      // the fractional part fades that stage's edges in so it *builds* rather
      // than snapping between the five steps.
      const stageF = buildProgressRef.current * STAGE_COUNT;
      const activeStage = Math.max(0, Math.min(STAGE_COUNT - 1, Math.floor(stageF)));
      const frac = clamp01(stageF - activeStage);
      const revealAlpha = frac * frac * (3 - 2 * frac); // smoothstep ease

      // Filter and project edges up to the active stage.
      const projectedEdges = GEOMETRY.filter((e) => e.stage <= activeStage)
        .map((e) => {
          const pA = project(e.a);
          const pB = project(e.b);
          // Average depth for basic painter's sorting.
          const depth = (pA.depth + pB.depth) / 2;
          // Earlier stages are fully drawn; the current stage fades in.
          const alpha = e.stage < activeStage ? 1 : revealAlpha;
          return { pA, pB, weight: e.weight, depth, alpha };
        })
        .sort((e1, e2) => e2.depth - e1.depth); // Draw furthest first

      // Draw edges
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#111111"; // Ink

      for (const edge of projectedEdges) {
        ctx.globalAlpha = edge.alpha;
        ctx.lineWidth = edge.weight * (1 / (1 + edge.depth * 0.0015)); // perspective-scaled weight
        ctx.beginPath();
        ctx.moveTo(edge.pA.px, edge.pA.py);
        ctx.lineTo(edge.pB.px, edge.pB.py);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Watermark
      ctx.fillStyle = "rgba(17,17,17,0.3)";
      ctx.font = "10px var(--font-mono, monospace)";
      ctx.textAlign = "right";
      ctx.fillText("VENTURA · GA · assembling", rect.width - 15, rect.height - 15);

      ctx.restore();
    };

    rafId = requestAnimationFrame(draw);

    // Skip the (relatively cheap but pointless) redraw while off-screen.
    let observer: IntersectionObserver | undefined;
    if (sectionRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, []);

  // ---- Scroll driver: pin progress → build progress + active stage ----
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // Fully assembled, no scroll scrubbing; hide the "scroll to build" hint.
      buildProgressRef.current = 1;
      activeStageRef.current = STAGE_COUNT - 1;
      setActiveStage(STAGE_COUNT - 1);
      setScrolled(true);
      return;
    }

    let raf = 0;
    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

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
        buildProgressRef.current = p;
        // Scroll turns the model slightly as it builds (on top of auto-rotate).
        scrollYawRef.current = p * 0.9;

        setScrolled((prev) => {
          const next = p > 0.02;
          return prev === next ? prev : next;
        });

        // Active stage = clamp(floor(progress * 5), 0, 4).
        const stage = Math.max(0, Math.min(STAGE_COUNT - 1, Math.floor(p * STAGE_COUNT)));
        activeStageRef.current = stage;
        setActiveStage((prev) => (prev === stage ? prev : stage));
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

  // ---- Rotation: drag to rotate (independent of scroll) ----
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;

    yawRef.current -= dx * 0.01;
    pitchRef.current -= dy * 0.01;

    // Clamp pitch
    pitchRef.current = Math.max(-1.4, Math.min(1.4, pitchRef.current));

    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const resetView = () => {
    yawRef.current = 0.6;
    pitchRef.current = 0.5;
  };

  // Optional "jump": clicking a chip scrolls the page to that stage's band.
  const jumpToStage = (idx: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    if (scrollableDistance <= 0) return;
    const sectionTop = window.scrollY + rect.top;
    // Aim at the middle of the stage's band so it lands cleanly on that step.
    const targetP = (idx + 0.5) / STAGE_COUNT;
    window.scrollTo({ top: sectionTop + targetP * scrollableDistance, behavior: "smooth" });
  };

  const activeStageData = buildExplorer[activeStage];

  return (
    <section ref={sectionRef} className={styles.section} id="build-explorer">
      {/* SR Only description */}
      <div className="sr-only">
        <h2>Rotating wireframe building assembling from foundations to handover</h2>
        <ol>
          {buildExplorer.map((s) => (
            <li key={s.num}>
              {s.title}: {s.description}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.pin}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Rotating wireframe building assembling from foundations to handover as you scroll"
          role="img"
        />

        <div className={styles.controlsOverlay}>
          <button className={styles.actionButton} onClick={resetView}>
            Reset view
          </button>
        </div>

        {/* Scroll hint — fades out once scrolling begins */}
        <div className={`${styles.scrollHint} ${scrolled ? styles.scrollHintHidden : ""}`}>
          <span>Scroll to build</span>
          <div className={styles.scrollHintLine} />
        </div>

        {/* Progress rail */}
        <div className={styles.indicators} aria-hidden="true">
          {buildExplorer.map((_, i) => (
            <div key={i} className={`${styles.dot} ${activeStage === i ? styles.dotActive : ""}`} />
          ))}
        </div>

        {/* Foreground panel: passive stage chips + live caption */}
        <div className={styles.panel}>
          <div className={styles.panelInner}>
            <div className={styles.chips} role="list">
              {buildExplorer.map((stage, idx) => (
                <button
                  key={stage.num}
                  type="button"
                  role="listitem"
                  aria-current={activeStage === idx ? "step" : undefined}
                  className={`${styles.chip} ${activeStage === idx ? styles.chipActive : ""}`}
                  onClick={() => jumpToStage(idx)}
                >
                  Step {stage.num}
                </button>
              ))}
            </div>

            <div className={styles.caption} aria-live="polite">
              <span className={styles.captionNum}>{activeStageData.num}</span>
              <span className={styles.captionTitle}>{activeStageData.title}</span>
              <span className={styles.captionDesc}>{activeStageData.description}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
