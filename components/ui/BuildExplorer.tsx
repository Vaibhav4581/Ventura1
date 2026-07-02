"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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

export function BuildExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [activeStage, setActiveStage] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);

  // Rotation state
  const yawRef = useRef(0.6);
  const pitchRef = useRef(0.5);
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const stopAutoRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let resizeObserver: ResizeObserver;
    
    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      stopAutoRef.current = true;
    }

    const draw = () => {
      // Auto rotate
      if (!stopAutoRef.current && !draggingRef.current && !prefersReduced) {
        yawRef.current += 0.002;
      }

      // Handle Resize
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
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
      // Building is from Y=0 to 480. Center vertically by offsetting Y.
      const cy = rect.height / 2 + 140; 
      
      const cyaw = Math.cos(yawRef.current);
      const syaw = Math.sin(yawRef.current);
      const cpitch = Math.cos(pitchRef.current);
      const spitch = Math.sin(pitchRef.current);
      
      // Global scale to fit the 480px tall building into a 380px tall canvas with padding
      const scale = 0.55;

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
          px: cx + (x1 * scale) * persp,
          py: cy - (y2 * scale) * persp, // Canvas Y is inverted
          depth: z2
        };
      };

      // Filter and project edges
      const projectedEdges = GEOMETRY
        .filter(e => e.stage <= activeStage)
        .map(e => {
          const pA = project(e.a);
          const pB = project(e.b);
          // Average depth for basic painter's sorting (not perfect for intersecting lines, but okay for wireframe)
          const depth = (pA.depth + pB.depth) / 2;
          return { pA, pB, weight: e.weight, depth };
        })
        .sort((e1, e2) => e2.depth - e1.depth); // Draw furthest first

      // Draw edges
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#111111"; // Ink
      
      for (const edge of projectedEdges) {
        ctx.lineWidth = edge.weight * (1 / (1 + edge.depth * 0.0015)); // scale weight by perspective slightly
        ctx.beginPath();
        ctx.moveTo(edge.pA.px, edge.pA.py);
        ctx.lineTo(edge.pB.px, edge.pB.py);
        ctx.stroke();
      }

      // Watermark
      ctx.fillStyle = "rgba(17,17,17,0.3)";
      ctx.font = "10px var(--font-mono, monospace)";
      ctx.textAlign = "right";
      ctx.fillText("VENTURA · GA · rotating", rect.width - 15, rect.height - 15);

      ctx.restore();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    resizeObserver = new ResizeObserver(() => {
      // Trigger a draw on next frame
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, [activeStage]);

  // Pointer events for dragging
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    draggingRef.current = true;
    stopAutoRef.current = true;
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

  // Replay logic
  useEffect(() => {
    if (!isReplaying) return;
    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActiveStage(4);
      setIsReplaying(false);
      return;
    }

    let current = 0;
    setActiveStage(current);
    
    const interval = setInterval(() => {
      current++;
      if (current > 4) {
        setIsReplaying(false);
        clearInterval(interval);
      } else {
        setActiveStage(current);
      }
    }, 1300);

    return () => clearInterval(interval);
  }, [isReplaying]);

  const activeStageData = buildExplorer[activeStage];

  return (
    <div className={styles.explorer}>
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

      <div className={styles.canvasContainer}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          aria-label="Rotating wireframe building assembling from foundations to handover"
          role="img"
        />
        <div className={styles.controlsOverlay}>
          <button className={styles.actionButton} onClick={resetView}>
            Reset view
          </button>
          <button className={styles.actionButton} onClick={() => setIsReplaying(true)} disabled={isReplaying}>
            Replay
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.chips} role="tablist">
          {buildExplorer.map((stage, idx) => (
            <button
              key={stage.num}
              role="tab"
              aria-selected={activeStage === idx}
              className={`${styles.chip} ${activeStage === idx ? styles.chipActive : ""}`}
              onClick={() => {
                setActiveStage(idx);
                setIsReplaying(false);
              }}
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
  );
}
