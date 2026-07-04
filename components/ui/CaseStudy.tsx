"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CaseStudy.module.css";
import { caseStudy } from "@/lib/brand";

// Smoothstep clamp helper
const sm = (v: number, min: number, max: number) => {
  if (v <= min) return 0;
  if (v >= max) return 1;
  const t = (v - min) / (max - min);
  return t * t * (3 - 2 * t);
};

export function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // HTML Chrome Refs
  const progressRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  const [activePhase, setActivePhase] = useState(0);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const photoRef = useRef<HTMLImageElement | null>(null);

  // Preload photo
  useEffect(() => {
    const img = new Image();
    img.src = caseStudy.aerialPhoto;
    img.onload = () => {
      photoRef.current = img;
      setPhotoLoaded(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx || !sectionRef.current) return;

    let raf = 0;
    let yawIdle = 0;
    
    // Geometry definitions
    const BL = [
      { id: "A", x0: 0.2, x1: 1.9, z0: -0.95, z1: 0.5, h: 1.0, rf: 0.5, winRows: 2 },
      { id: "B", x0: -1.35, x1: 0.2, z0: -1.15, z1: 0.35, h: 0.7, rf: 0.42, winRows: 1 },
      { id: "C", x0: -2.45, x1: -1.3, z0: 0.05, z1: 1.0, h: 0.42, rf: 0.34, winRows: 1 },
      { id: "P", x0: 2.1, x1: 2.95, z0: 1.25, z1: 2.05, h: 0.34, rf: 0.3, winRows: 0 }
    ];
    
    // Resize handler
    let W = window.innerWidth;
    let H = window.innerHeight;
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const dpr = Math.max(2, window.devicePixelRatio || 1);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      let p = scrollable > 0 ? -rect.top / scrollable : 0;
      p = Math.max(0, Math.min(1, p));

      // Active phase mapping: 0: 0-0.28, 1: 0.28-0.5, 2: 0.5-0.74, 3: 0.74-0.86, 4: 0.86-1.0
      let phase = 0;
      if (p >= 0.86) phase = 4;
      else if (p >= 0.74) phase = 3;
      else if (p >= 0.5) phase = 2;
      else if (p >= 0.28) phase = 1;
      
      if (phase !== activePhase) setActivePhase(phase);

      // Update progress bar
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      // Base canvas setup
      ctx.clearRect(0, 0, W, H);
      
      if (!prefersReduced) yawIdle += 0.0008;
      
      // Calculate derived animation states
      const p1 = Math.min(1, p / 0.28);
      const p2 = sm(p, 0.28, 0.5);
      const p3 = sm(p, 0.5, 0.74);
      const p4 = sm(p, 0.74, 0.86);
      const p5 = sm(p, 0.86, 1.0);

      // Camera orientation
      let yaw = Math.PI / 4 + yawIdle; 
      let pitch = Math.PI / 4.5;
      let dist = 8.5;
      
      if (p3 > 0) {
         yaw += p3 * (Math.PI / 8);
         pitch -= p3 * 0.15;
         dist -= p3 * 1.5;
      }
      
      // Phase crossfades
      const bgMix = p2;
      const wfFade = p3;
      const modelA = sm(p, 0.35, 0.6);
      const photoA = p4;
      const statsA = p5;
      
      // Animation parameters
      const wh = sm(p, 0.15, 0.3); // wall height scale
      const rp = sm(p, 0.25, 0.4); // roof scale

      // Map 3D to 2D
      const project = (x: number, y: number, z: number) => {
        // rotation (yaw only)
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const rx = x * cosY - z * sinY;
        const rz = x * sinY + z * cosY;
        
        // tilt (pitch)
        const pY = Math.cos(pitch);
        const pZ = Math.sin(pitch);
        const ty = y * pY - rz * pZ;
        const tz = y * pZ + rz * pY;
        
        const scale = (Math.min(W, H) * 0.45) / (tz + dist);
        return {
          x: rx * scale,
          y: ty * scale,
          z: tz,
          sx: W / 2 + rx * scale,
          sy: H / 2 + ty * scale
        };
      };

      // Helper to draw a polyline in 3D
      const drawPoly = (pts: number[][], strokeStyle: string, lineWidth: number, close = false, dash?: number, dashOffset?: number) => {
        if (pts.length === 0) return;
        ctx.beginPath();
        const p0 = project(pts[0][0], pts[0][1], pts[0][2]);
        ctx.moveTo(p0.sx, p0.sy);
        for (let i = 1; i < pts.length; i++) {
          const p = project(pts[i][0], pts[i][1], pts[i][2]);
          ctx.lineTo(p.sx, p.sy);
        }
        if (close) ctx.closePath();
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        if (dash !== undefined) ctx.setLineDash([dash, dash]);
        if (dashOffset !== undefined) ctx.lineDashOffset = dashOffset;
        ctx.stroke();
        ctx.setLineDash([]);
      };

      const drawPolyFill = (pts: number[][], fillStyle: string) => {
         if (pts.length === 0) return;
         ctx.beginPath();
         const p0 = project(pts[0][0], pts[0][1], pts[0][2]);
         ctx.moveTo(p0.sx, p0.sy);
         for (let i = 1; i < pts.length; i++) {
           const p = project(pts[i][0], pts[i][1], pts[i][2]);
           ctx.lineTo(p.sx, p.sy);
         }
         ctx.closePath();
         ctx.fillStyle = fillStyle;
         ctx.fill();
      };
      
      const drawQuad = (p1: any, p2: any, p3: any, p4: any, color: string) => {
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.lineTo(p3.sx, p3.sy);
        ctx.lineTo(p4.sx, p4.sy);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
      };
      
      // Calculate shading
      const lightDir = [-0.45, 0.85, -0.55];
      // normalize
      const len = Math.hypot(lightDir[0], lightDir[1], lightDir[2]);
      const lN = lightDir.map(v => v/len);
      
      const getShade = (nx: number, ny: number, nz: number) => {
        const dot = nx*lN[0] + ny*lN[1] + nz*lN[2];
        return 0.62 + 0.38 * Math.max(0, dot);
      };
      
      const shadeHex = (hex: string, shade: number, alpha = 1) => {
        const r = parseInt(hex.substring(0,2), 16);
        const g = parseInt(hex.substring(2,4), 16);
        const b = parseInt(hex.substring(4,6), 16);
        return `rgba(${Math.round(r*shade)},${Math.round(g*shade)},${Math.round(b*shade)},${alpha})`;
      };

      // --- Draw Site Plan (Phase 01) ---
      if (bgMix < 1 && photoA < 1) {
        const d1 = prefersReduced ? 1 : sm(p, 0.0, 0.05);
        const d2 = prefersReduced ? 1 : sm(p, 0.035, 0.105);
        const d3 = prefersReduced ? 1 : sm(p, 0.09, 0.155);
        const d4 = prefersReduced ? 1 : sm(p, 0.128, 0.19);
        const lineAlpha = (1 - bgMix) * 0.9;
        const ink = `rgba(255,255,255,${lineAlpha})`;

        // d1: Boundary
        if (d1 > 0) {
          const bPts = [[-3,0,-2.5], [3.5,0,-2.5], [3.5,0,2.5], [-3,0,2.5]];
          // self draw logic: rough length 20
          const L = 2000;
          drawPoly(bPts, ink, 2, true, L, L * (1-d1));
        }

        // d2: Building Outlines & Poche
        if (d2 > 0) {
          BL.forEach((b, i) => {
             const subD = sm(d2, i*0.2, i*0.2+0.4);
             if (subD > 0) {
                const bPts = [[b.x0,0,b.z0], [b.x1,0,b.z0], [b.x1,0,b.z1], [b.x0,0,b.z1]];
                drawPoly(bPts, ink, 1.5, true, 1000, 1000*(1-subD));
                if (subD === 1) {
                  drawPolyFill(bPts, `rgba(255,255,255,${0.1 * (1-bgMix)})`);
                }
             }
          });
        }
        
        // d3: Internal grids (Rooms)
        if (d3 > 0) {
          BL.forEach((b, i) => {
            const subD = sm(d3, i*0.2, i*0.2+0.4);
            if (subD > 0) {
              const mx = (b.x0 + b.x1) / 2;
              const mz = (b.z0 + b.z1) / 2;
              drawPoly([[mx,0,b.z0], [mx,0,b.z1]], ink, 0.5, false, 500, 500*(1-subD));
              drawPoly([[b.x0,0,mz], [b.x1,0,mz]], ink, 0.5, false, 500, 500*(1-subD));
            }
          });
        }
        
        // d4: Annotations (Amber)
        if (d4 > 0) {
          const annAlpha = d4 * (1 - bgMix) * 0.9;
          const annColor = `rgba(247,148,29,${annAlpha})`;
          ctx.fillStyle = annColor;
          ctx.font = "10px 'Courier New', monospace";
          ctx.textAlign = "center";
          BL.forEach(b => {
             const cx = (b.x0 + b.x1) / 2;
             const cz = (b.z0 + b.z1) / 2;
             const pc = project(cx, 0, cz);
             ctx.fillText(`ZONE ${b.id}`, pc.sx, pc.sy);
          });
          
          // Site area tag
          ctx.textAlign = "left";
          const pa = project(-2.8, 0, -2.2);
          ctx.fillText("AREA: 1,117 m²", pa.sx, pa.sy);
        }
      }

      // --- Draw Wireframe & Shaded Model ---
      const mixedInkR = 255*(1-bgMix) + 40*bgMix;
      const mixedInkG = 255*(1-bgMix) + 42*bgMix;
      const mixedInkB = 255*(1-bgMix) + 48*bgMix;
      
      const wfInk = `rgba(${mixedInkR},${mixedInkG},${mixedInkB},${1 - wfFade})`;

      // Helper to compute hip roof geometry
      const hipFor = (b: any, wh_scale: number, rp_scale: number) => {
         const hh = b.h * wh_scale;
         const r_h = hh + b.rf * rp_scale;
         const oh = 0.18; // overhang
         return {
           hh,
           eA: [b.x0 - oh, hh, b.z0 - oh],
           eB: [b.x1 + oh, hh, b.z0 - oh],
           eC: [b.x1 + oh, hh, b.z1 + oh],
           eD: [b.x0 - oh, hh, b.z1 + oh],
           R1: [b.x0 + 0.3, r_h, (b.z0+b.z1)/2],
           R2: [b.x1 - 0.3, r_h, (b.z0+b.z1)/2]
         };
      };

      // Sort blocks by z for simple depth sorting
      const blocks = [...BL].sort((a, b) => {
        // approximate center
        const cA = project((a.x0+a.x1)/2, 0, (a.z0+a.z1)/2);
        const cB = project((b.x0+b.x1)/2, 0, (b.z0+b.z1)/2);
        return cB.z - cA.z;
      });

      // ============================================================
      // BASEBOARD WITH GROUND FEATURES
      // ============================================================
      
      // Face visibility based on camera yaw
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const isFaceVis = (nx: number, nz: number) =>
        (-nx * sinYaw + nz * cosYaw) < 0;

      if (modelA > 0 && photoA < 1) {
        ctx.globalAlpha = modelA;
        const BB = { x0: -3.2, x1: 3.8, z0: -2.5, z1: 3.0 };
        const bbH = -0.12;
        const gS = getShade(0, 1, 0);
        
        // Top surface
        const bT0 = project(BB.x0, 0, BB.z0), bT1 = project(BB.x1, 0, BB.z0);
        const bT2 = project(BB.x1, 0, BB.z1), bT3 = project(BB.x0, 0, BB.z1);
        drawQuad(bT0, bT1, bT2, bT3, shadeHex("eae8e1", gS));
        
        // Driveway
        drawPolyFill([[-2.8,0.001,-2.3],[-0.5,0.001,-2.3],[-0.5,0.001,-0.7],[-2.8,0.001,-0.7]], shadeHex("dcd9d0", gS));
        // Lawn patches
        drawPolyFill([[-3.0,0.001,0.6],[-2.6,0.001,0.6],[-2.6,0.001,2.5],[-3.0,0.001,2.5]], shadeHex("ccd6c2", gS));
        drawPolyFill([[2.2,0.001,-1.5],[3.5,0.001,-1.5],[3.5,0.001,0.8],[2.2,0.001,0.8]], shadeHex("ccd6c2", gS));
        drawPolyFill([[-3.0,0.001,-2.3],[-2.8,0.001,-2.3],[-2.8,0.001,0.4],[-3.0,0.001,0.4]], shadeHex("c8d2be", gS));
        // Pool surround
        drawPolyFill([[-0.15,0.001,1.25],[1.95,0.001,1.25],[1.95,0.001,2.45],[-0.15,0.001,2.45]], shadeHex("d8d5cc", gS));
        // Pool water
        drawPolyFill([[0.05,0.003,1.45],[1.7,0.003,1.45],[1.7,0.003,2.25],[0.05,0.003,2.25]], shadeHex("3e97c9", 1.0));
        // Pool water ripple highlights
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 0.6;
        for (let rr = 0; rr < 4; rr++) {
          const ry = 1.55 + rr * 0.2;
          const rp0 = project(0.15, 0.004, ry), rp1 = project(1.6, 0.004, ry);
          ctx.beginPath(); ctx.moveTo(rp0.sx, rp0.sy); ctx.lineTo(rp1.sx, rp1.sy); ctx.stroke();
        }
        // Terrace slab
        drawPolyFill([[0.22,0.001,0.48],[1.88,0.001,0.48],[1.88,0.001,1.08],[0.22,0.001,1.08]], shadeHex("e8e4da", gS));
        // Terrace paving lines
        ctx.strokeStyle = `rgba(180,175,165,${modelA * 0.3})`;
        ctx.lineWidth = 0.5;
        for (let tl = 0; tl < 5; tl++) {
          const tx = 0.22 + (1.66 / 4) * tl;
          const tp0 = project(tx, 0.002, 0.48), tp1 = project(tx, 0.002, 1.08);
          ctx.beginPath(); ctx.moveTo(tp0.sx, tp0.sy); ctx.lineTo(tp1.sx, tp1.sy); ctx.stroke();
        }
        
        // Side faces of baseboard
        const bB0 = project(BB.x0, bbH, BB.z0), bB1 = project(BB.x1, bbH, BB.z0);
        const bB2 = project(BB.x1, bbH, BB.z1), bB3 = project(BB.x0, bbH, BB.z1);
        if (isFaceVis(0, 1)) drawQuad(bT3, bT2, bB2, bB3, shadeHex("d0cece", getShade(0,0,1)));
        if (isFaceVis(1, 0)) drawQuad(bT2, bT1, bB1, bB2, shadeHex("d0cece", getShade(1,0,0)));
        if (isFaceVis(0,-1)) drawQuad(bT0, bT3, bB3, bB0, shadeHex("d0cece", getShade(0,0,-1)));
        if (isFaceVis(-1,0)) drawQuad(bT1, bT0, bB0, bB1, shadeHex("d0cece", getShade(-1,0,0)));
        
        ctx.globalAlpha = 1.0;
      }

      // ============================================================
      // BUILDINGS — WIREFRAME & SHADED MODEL
      // ============================================================
      blocks.forEach(b => {
        const { hh, eA, eB, eC, eD, R1, R2 } = hipFor(b, wh, rp);
        
        // ---- WIREFRAME ----
        if (wfFade < 1 && bgMix > 0) {
          drawPoly([[b.x0,0,b.z0],[b.x1,0,b.z0],[b.x1,0,b.z1],[b.x0,0,b.z1]], wfInk, 1, true);
          drawPoly([[b.x0,hh,b.z0],[b.x1,hh,b.z0],[b.x1,hh,b.z1],[b.x0,hh,b.z1]], wfInk, 1, true);
          drawPoly([[b.x0,0,b.z0],[b.x0,hh,b.z0]], wfInk, 1);
          drawPoly([[b.x1,0,b.z0],[b.x1,hh,b.z0]], wfInk, 1);
          drawPoly([[b.x1,0,b.z1],[b.x1,hh,b.z1]], wfInk, 1);
          drawPoly([[b.x0,0,b.z1],[b.x0,hh,b.z1]], wfInk, 1);
          drawPoly([eA, eB, eC, eD], wfInk, 1, true);
          drawPoly([eA, R1], wfInk, 1); drawPoly([eD, R1], wfInk, 1);
          drawPoly([eB, R2], wfInk, 1); drawPoly([eC, R2], wfInk, 1);
          drawPoly([R1, R2], wfInk, 1);
          // Window grid on wireframe
          if (b.winRows > 0) {
            const nC = (b.x1 - b.x0) > 1.0 ? 3 : 2;
            for (let row = 0; row < b.winRows; row++) {
              const wy = hh * (b.winRows === 2 ? (row === 0 ? 0.15 : 0.58) : 0.22);
              const wh2 = hh * 0.16;
              for (let col = 0; col < nC; col++) {
                const u = (col + 1) / (nC + 1);
                const wx = b.x0 + (b.x1 - b.x0) * u;
                const halfW = (b.x1 - b.x0) * 0.055;
                drawPoly([[wx-halfW,wy,b.z1+0.01],[wx+halfW,wy,b.z1+0.01],[wx+halfW,wy+wh2,b.z1+0.01],[wx-halfW,wy+wh2,b.z1+0.01]], wfInk, 0.6, true);
              }
            }
          }
        }
        
        // ---- FILLED MODEL ----
        if (modelA > 0 && photoA < 1) {
          ctx.globalAlpha = modelA;
          const wx = b.x1 - b.x0;
          const wz = b.z1 - b.z0;
          const plH = Math.min(0.07, hh * 0.1);
          
          // 4 wall face definitions with outward normals
          const faces = [
            { bl:[b.x1,0,b.z0], br:[b.x0,0,b.z0], tl:[b.x1,hh,b.z0], tr:[b.x0,hh,b.z0], nx:0, nz:-1, fw:wx },
            { bl:[b.x0,0,b.z0], br:[b.x0,0,b.z1], tl:[b.x0,hh,b.z0], tr:[b.x0,hh,b.z1], nx:-1, nz:0, fw:wz },
            { bl:[b.x0,0,b.z1], br:[b.x1,0,b.z1], tl:[b.x0,hh,b.z1], tr:[b.x1,hh,b.z1], nx:0, nz:1, fw:wx },
            { bl:[b.x1,0,b.z1], br:[b.x1,0,b.z0], tl:[b.x1,hh,b.z1], tr:[b.x1,hh,b.z0], nx:1, nz:0, fw:wz },
          ];
          
          // Filter visible faces and sort back-to-front
          const visFaces = faces
            .filter(f => isFaceVis(f.nx, f.nz))
            .sort((a, c) => {
              const zA = project((a.bl[0]+a.br[0])/2, 0, (a.bl[2]+a.br[2])/2).z;
              const zC = project((c.bl[0]+c.br[0])/2, 0, (c.bl[2]+c.br[2])/2).z;
              return zC - zA;
            });
          
          // Draw each visible wall face
          for (const f of visFaces) {
            const sh = getShade(f.nx, 0, f.nz);
            const pBL = project(f.bl[0],f.bl[1],f.bl[2]);
            const pBR = project(f.br[0],f.br[1],f.br[2]);
            const pTL = project(f.tl[0],f.tl[1],f.tl[2]);
            const pTR = project(f.tr[0],f.tr[1],f.tr[2]);
            
            // Main wall
            drawQuad(pBL, pBR, pTR, pTL, shadeHex("f3f0e9", sh));
            
            // Plinth skirting
            if (hh > 0.05) {
              const ppL = project(f.bl[0], plH, f.bl[2]);
              const ppR = project(f.br[0], plH, f.br[2]);
              drawQuad(pBL, pBR, ppR, ppL, shadeHex("6b5c49", sh));
            }
            
            // String course (two-storey only)
            if (b.winRows === 2 && hh > 0.3) {
              const scY = hh * 0.48, scH = hh * 0.025;
              drawQuad(
                project(f.bl[0],scY,f.bl[2]), project(f.br[0],scY,f.br[2]),
                project(f.br[0],scY+scH,f.br[2]), project(f.bl[0],scY+scH,f.bl[2]),
                shadeHex("efece3", sh)
              );
            }
            
            // Soffit band (light strip at top of wall)
            if (hh > 0.1) {
              const sfY = hh * 0.93;
              drawQuad(
                project(f.bl[0],sfY,f.bl[2]), project(f.br[0],sfY,f.br[2]),
                pTR, pTL, shadeHex("efece3", sh)
              );
            }
            
            // ---- INDIVIDUAL WINDOWS ----
            if (b.winRows > 0 && hh > 0.15) {
              const nWin = f.fw > 1.0 ? 3 : 2;
              const winW = f.fw * 0.10;
              const winH = hh * 0.17;
              // Direction along face
              const dx = (f.br[0] - f.bl[0]) / f.fw;
              const dz = (f.br[2] - f.bl[2]) / f.fw;
              
              for (let row = 0; row < b.winRows; row++) {
                const baseY = b.winRows === 2
                  ? (row === 0 ? plH + hh * 0.05 : hh * 0.56)
                  : plH + hh * 0.08;
                
                for (let col = 0; col < nWin; col++) {
                  const u = (col + 1) / (nWin + 1);
                  const cx2 = f.bl[0] + (f.br[0] - f.bl[0]) * u;
                  const cz = f.bl[2] + (f.br[2] - f.bl[2]) * u;
                  const off = 0.012;
                  const ox = cx2 + f.nx * off;
                  const oz = cz + f.nz * off;
                  const hw = winW / 2;
                  
                  // Window corners
                  const w0x = ox - dx*hw, w0z = oz - dz*hw;
                  const w1x = ox + dx*hw, w1z = oz + dz*hw;
                  
                  // Frame (light)
                  const fw0 = project(w0x, baseY, w0z);
                  const fw1 = project(w1x, baseY, w1z);
                  const fw2 = project(w1x, baseY + winH, w1z);
                  const fw3 = project(w0x, baseY + winH, w0z);
                  drawQuad(fw0, fw1, fw2, fw3, shadeHex("f8f7f3", sh));
                  
                  // Glazing (blue-grey, inset)
                  const gi = 0.14;
                  const gw = hw * (1 - gi*2);
                  const gh = winH * (1 - gi*2);
                  const gy = baseY + winH * gi;
                  drawQuad(
                    project(ox-dx*gw, gy, oz-dz*gw),
                    project(ox+dx*gw, gy, oz+dz*gw),
                    project(ox+dx*gw, gy+gh, oz+dz*gw),
                    project(ox-dx*gw, gy+gh, oz-dz*gw),
                    shadeHex("8ea6ba", sh)
                  );
                  
                  // Centre mullion
                  ctx.strokeStyle = shadeHex("f0efe8", sh);
                  ctx.lineWidth = 1.2;
                  const mc0 = project(ox + f.nx*off, gy, oz + f.nz*off);
                  const mc1 = project(ox + f.nx*off, gy+gh, oz + f.nz*off);
                  ctx.beginPath(); ctx.moveTo(mc0.sx, mc0.sy); ctx.lineTo(mc1.sx, mc1.sy); ctx.stroke();
                  // Horizontal transom
                  const tmY = gy + gh * 0.6;
                  const tm0 = project(ox-dx*gw, tmY, oz-dz*gw);
                  const tm1 = project(ox+dx*gw, tmY, oz+dz*gw);
                  ctx.beginPath(); ctx.moveTo(tm0.sx, tm0.sy); ctx.lineTo(tm1.sx, tm1.sy); ctx.stroke();
                  
                  // Projecting sill
                  const sillOff = 0.018;
                  const sOx = cx2 + f.nx * sillOff;
                  const sOz = cz + f.nz * sillOff;
                  const sHw = hw * 1.15;
                  const sillH = 0.015;
                  drawQuad(
                    project(sOx-dx*sHw, baseY-sillH, sOz-dz*sHw),
                    project(sOx+dx*sHw, baseY-sillH, sOz+dz*sHw),
                    project(sOx+dx*sHw, baseY, sOz+dz*sHw),
                    project(sOx-dx*sHw, baseY, sOz-dz*sHw),
                    shadeHex("dcd9d1", sh)
                  );
                }
              }
            }
            
            // ---- CORNER VERTICAL LINES ----
            ctx.strokeStyle = `rgba(50,52,58,${0.30 * modelA})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(pBL.sx, pBL.sy); ctx.lineTo(pTL.sx, pTL.sy);
            ctx.moveTo(pBR.sx, pBR.sy); ctx.lineTo(pTR.sx, pTR.sy);
            ctx.stroke();
            
            // ---- GROUND CONTACT LINE ----
            ctx.strokeStyle = `rgba(40,42,48,${0.28 * modelA})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(pBL.sx, pBL.sy); ctx.lineTo(pBR.sx, pBR.sy); ctx.stroke();
          }
          
          // ============ HIP ROOF — ALL 4 SLOPES ============
          const rEa = project(eA[0],eA[1],eA[2]);
          const rEb = project(eB[0],eB[1],eB[2]);
          const rEc = project(eC[0],eC[1],eC[2]);
          const rEd = project(eD[0],eD[1],eD[2]);
          const rR1 = project(R1[0],R1[1],R1[2]);
          const rR2 = project(R2[0],R2[1],R2[2]);
          
          // Define 4 roof slopes
          const roofSlopes = [
            { verts: [rEa, rEb, rR2, rR1], shade: getShade(0, 0.7, -0.7), label: "back" },
            { verts: [rEd, rEa, rR1],       shade: getShade(-0.7, 0.7, 0), label: "leftHip" },
            { verts: [rEd, rEc, rR2, rR1], shade: getShade(0, 0.7, 0.7), label: "front" },
            { verts: [rEc, rEb, rR2],       shade: getShade(0.7, 0.7, 0), label: "rightHip" },
          ];
          
          // Sort by average depth (back-to-front)
          roofSlopes.sort((a, c) => {
            const aZ = a.verts.reduce((s, v) => s + v.z, 0) / a.verts.length;
            const cZ = c.verts.reduce((s, v) => s + v.z, 0) / c.verts.length;
            return cZ - aZ;
          });
          
          for (const slope of roofSlopes) {
            const v = slope.verts;
            ctx.beginPath();
            ctx.moveTo(v[0].sx, v[0].sy);
            for (let i = 1; i < v.length; i++) ctx.lineTo(v[i].sx, v[i].sy);
            ctx.closePath();
            ctx.fillStyle = shadeHex("ad5a37", slope.shade);
            ctx.fill();
            
            // Tile course lines
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(v[0].sx, v[0].sy);
            for (let i = 1; i < v.length; i++) ctx.lineTo(v[i].sx, v[i].sy);
            ctx.closePath();
            ctx.clip();
            
            ctx.strokeStyle = `rgba(60,30,16,0.14)`;
            ctx.lineWidth = 0.7;
            // Horizontal tile courses at 20/40/60/80% of slope height
            if (v.length >= 3) {
              for (const frac of [0.2, 0.4, 0.6, 0.8]) {
                ctx.beginPath();
                if (v.length === 4) {
                  // Rectangular slope
                  const lx = v[0].sx + (v[3].sx - v[0].sx)*frac;
                  const ly = v[0].sy + (v[3].sy - v[0].sy)*frac;
                  const rx = v[1].sx + (v[2].sx - v[1].sx)*frac;
                  const ry = v[1].sy + (v[2].sy - v[1].sy)*frac;
                  ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
                } else {
                  // Triangular hip
                  const lx = v[0].sx + (v[2].sx - v[0].sx)*frac;
                  const ly = v[0].sy + (v[2].sy - v[0].sy)*frac;
                  const rx = v[1].sx + (v[2].sx - v[1].sx)*frac;
                  const ry = v[1].sy + (v[2].sy - v[1].sy)*frac;
                  ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
                }
                ctx.stroke();
              }
            }
            ctx.restore();
          }
          
          // Solar panels on main house (block A) back slope
          if (b.id === "A" && rp > 0.3) {
            const spAlpha = sm(rp, 0.3, 0.8);
            ctx.globalAlpha = modelA * spAlpha;
            // Two panel groups on the back slope
            for (let pg = 0; pg < 2; pg++) {
              const u0 = 0.2 + pg * 0.35, u1 = u0 + 0.25;
              const v0 = 0.15, v1 = 0.55;
              // Interpolate on back slope (eA-eB-R2-R1)
              const panelPts = [
                { sx: rEa.sx + (rEb.sx-rEa.sx)*u0 + (rR1.sx-rEa.sx)*v0, sy: rEa.sy + (rEb.sy-rEa.sy)*u0 + (rR1.sy-rEa.sy)*v0 },
                { sx: rEa.sx + (rEb.sx-rEa.sx)*u1 + (rR1.sx-rEa.sx)*v0, sy: rEa.sy + (rEb.sy-rEa.sy)*u1 + (rR1.sy-rEa.sy)*v0 },
                { sx: rEa.sx + (rEb.sx-rEa.sx)*u1 + (rR2.sx-rEb.sx)*v1, sy: rEa.sy + (rEb.sy-rEa.sy)*u1 + (rR2.sy-rEb.sy)*v1 },
                { sx: rEa.sx + (rEb.sx-rEa.sx)*u0 + (rR1.sx-rEa.sx)*v1, sy: rEa.sy + (rEb.sy-rEa.sy)*u0 + (rR1.sy-rEa.sy)*v1 },
              ];
              ctx.beginPath();
              ctx.moveTo(panelPts[0].sx, panelPts[0].sy);
              for (let i = 1; i < 4; i++) ctx.lineTo(panelPts[i].sx, panelPts[i].sy);
              ctx.closePath();
              ctx.fillStyle = shadeHex("2b3f66", 1.0);
              ctx.fill();
              // Grid lines on panels
              ctx.strokeStyle = "rgba(255,255,255,0.25)";
              ctx.lineWidth = 0.5;
              for (let gl = 1; gl < 4; gl++) {
                const f = gl / 4;
                ctx.beginPath();
                const lx = panelPts[0].sx + (panelPts[3].sx-panelPts[0].sx)*f;
                const ly = panelPts[0].sy + (panelPts[3].sy-panelPts[0].sy)*f;
                const rx = panelPts[1].sx + (panelPts[2].sx-panelPts[1].sx)*f;
                const ry = panelPts[1].sy + (panelPts[2].sy-panelPts[1].sy)*f;
                ctx.moveTo(lx, ly); ctx.lineTo(rx, ry);
                ctx.stroke();
              }
            }
            ctx.globalAlpha = modelA;
          }
          
          // ============ DEFINITION LINES ============
          // Eave highlight
          ctx.strokeStyle = `rgba(255,255,255,${0.85 * modelA})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(rEa.sx, rEa.sy); ctx.lineTo(rEb.sx, rEb.sy);
          ctx.lineTo(rEc.sx, rEc.sy); ctx.lineTo(rEd.sx, rEd.sy);
          ctx.closePath();
          ctx.stroke();
          
          // Ridge line
          ctx.strokeStyle = `rgba(60,30,16,${0.50 * modelA})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath(); ctx.moveTo(rR1.sx, rR1.sy); ctx.lineTo(rR2.sx, rR2.sy); ctx.stroke();
          
          // Hip lines
          ctx.strokeStyle = `rgba(60,30,16,${0.35 * modelA})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(rEa.sx, rEa.sy); ctx.lineTo(rR1.sx, rR1.sy);
          ctx.moveTo(rEd.sx, rEd.sy); ctx.lineTo(rR1.sx, rR1.sy);
          ctx.moveTo(rEb.sx, rEb.sy); ctx.lineTo(rR2.sx, rR2.sy);
          ctx.moveTo(rEc.sx, rEc.sy); ctx.lineTo(rR2.sx, rR2.sy);
          ctx.stroke();
          
          // Eave line (wall top)
          ctx.strokeStyle = `rgba(40,42,48,${0.30 * modelA})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          const et0 = project(b.x0, hh, b.z0);
          const et1 = project(b.x1, hh, b.z0);
          const et2 = project(b.x1, hh, b.z1);
          const et3 = project(b.x0, hh, b.z1);
          ctx.moveTo(et0.sx, et0.sy); ctx.lineTo(et1.sx, et1.sy);
          ctx.lineTo(et2.sx, et2.sy); ctx.lineTo(et3.sx, et3.sy);
          ctx.closePath();
          ctx.stroke();
          
          ctx.globalAlpha = 1.0;
        }
      });
      
      // ============ TERRACE BALUSTRADE ============
      if (modelA > 0 && photoA < 1) {
        ctx.globalAlpha = modelA * 0.9;
        const balH = 0.12;
        const balW = 0.02;
        const terrZ = 1.05;
        // Front balustrade
        if (isFaceVis(0, 1)) {
          const tb0 = project(0.25, 0, terrZ+balW);
          const tb1 = project(1.85, 0, terrZ+balW);
          const tb2 = project(1.85, balH, terrZ+balW);
          const tb3 = project(0.25, balH, terrZ+balW);
          drawQuad(tb0, tb1, tb2, tb3, shadeHex("f0ede6", getShade(0,0,1)));
          // Balustrade verticals
          ctx.strokeStyle = `rgba(220,216,208,${modelA})`;
          ctx.lineWidth = 0.8;
          for (let bv = 0; bv < 8; bv++) {
            const bx = 0.30 + bv * 0.2;
            if (bx > 1.8) break;
            const bvp0 = project(bx, 0.02, terrZ + balW + 0.005);
            const bvp1 = project(bx, balH - 0.01, terrZ + balW + 0.005);
            ctx.beginPath(); ctx.moveTo(bvp0.sx, bvp0.sy); ctx.lineTo(bvp1.sx, bvp1.sy); ctx.stroke();
          }
        }
        // Right side balustrade
        if (isFaceVis(1, 0)) {
          const tr0 = project(1.85+balW, 0, 0.50);
          const tr1 = project(1.85+balW, 0, terrZ);
          const tr2 = project(1.85+balW, balH, terrZ);
          const tr3 = project(1.85+balW, balH, 0.50);
          drawQuad(tr0, tr1, tr2, tr3, shadeHex("f0ede6", getShade(1,0,0)));
        }
        ctx.globalAlpha = 1.0;
      }
      
      // ============ EXTERNAL STAIRCASE ============
      if (modelA > 0 && photoA < 1 && rp > 0.2) {
        ctx.globalAlpha = modelA * sm(rp, 0.2, 0.6);
        const stX0 = 1.90, stX1 = 2.30;
        const stZ0 = 0.70, stZ1 = 1.05;
        const nSteps = 5;
        for (let s = 0; s < nSteps; s++) {
          const sY = (s / nSteps) * 0.18;
          const sZ = stZ0 + ((stZ1 - stZ0) / nSteps) * s;
          const sZ1 = sZ + (stZ1 - stZ0) / nSteps;
          // Tread top
          drawPolyFill([[stX0, sY + 0.035, sZ],[stX1, sY + 0.035, sZ],[stX1, sY + 0.035, sZ1],[stX0, sY + 0.035, sZ1]],
            shadeHex("d8d5cc", getShade(0, 1, 0)));
          // Riser front
          if (isFaceVis(0, 1)) {
            drawQuad(
              project(stX0, sY, sZ1), project(stX1, sY, sZ1),
              project(stX1, sY + 0.035, sZ1), project(stX0, sY + 0.035, sZ1),
              shadeHex("c8c5be", getShade(0, 0, 1))
            );
          }
        }
        ctx.globalAlpha = 1.0;
      }

      // --- Photo & Stats (Phase 04/05) ---
      if (photoA > 0 && photoLoaded && photoRef.current) {
         ctx.globalAlpha = photoA;
         // Cover fit logic
         const img = photoRef.current;
         const imgRatio = img.width / img.height;
         const canRatio = W / H;
         let dw = W, dh = H;
         if (canRatio > imgRatio) {
            dh = W / imgRatio;
         } else {
            dw = H * imgRatio;
         }
         const dx = (W - dw) / 2;
         const dy = (H - dh) / 2;
         
         ctx.drawImage(img, dx, dy, dw, dh);
         
         // Vignette
         const vGrad = ctx.createLinearGradient(0, H*0.4, 0, H);
         vGrad.addColorStop(0, "rgba(0,0,0,0)");
         vGrad.addColorStop(1, "rgba(0,0,0,0.85)");
         ctx.fillStyle = vGrad;
         ctx.fillRect(0, 0, W, H);
         
         // Editorial caption
         ctx.fillStyle = `rgba(255,255,255,${0.96 * photoA})`;
         ctx.font = "600 12px 'Courier New', monospace";
         ctx.textAlign = "right";
         ctx.fillText("AS BUILT · PRIVATE RESIDENCE · LUBUMBASHI", W - 40, H - 40);
         ctx.fillStyle = `rgba(255,255,255,${0.66 * photoA})`;
         ctx.font = "400 11px 'Courier New', monospace";
         ctx.fillText("DESIGN & BUILD · VENTURA CONSTRUCTION", W - 40, H - 24);
         
         // Hairline rule
         ctx.strokeStyle = "rgba(255,255,255,0.4)";
         ctx.lineWidth = 1;
         ctx.beginPath();
         ctx.moveTo(W - 40, H - 54);
         ctx.lineTo(W - 80, H - 54);
         ctx.stroke();
         
         ctx.globalAlpha = 1.0;
      }
      
      // Drive DOM stats
      if (statsContainerRef.current) {
        if (statsA > 0) {
          statsContainerRef.current.style.display = "flex";
          caseStudy.stats.forEach((s, i) => {
             const card = statCardRefs.current[i];
             const val = statValueRefs.current[i];
             if (!card || !val) return;
             
             // Stagger effect
             const delay = i * 0.05;
             const cardProgress = sm(statsA, delay, 0.6 + delay);
             
             card.style.opacity = cardProgress.toString();
             card.style.transform = `translateY(${(1 - cardProgress) * 20}px)`;
             
             const rawValue = parseFloat(s.value.replace(/,/g, ""));
             const curVal = Math.round(rawValue * cardProgress);
             val.innerText = isNaN(rawValue) ? s.value : curVal.toLocaleString("en-US");
          });
        } else {
          statsContainerRef.current.style.display = "none";
        }
      }
    };
    
    raf = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [activePhase, photoLoaded]);

  const pData = caseStudy.phases[activePhase];

  return (
    <section ref={sectionRef} className={styles.section} id="case-study">
      <div className="sr-only">
        <h2>Case study: drawn, modelled, built, delivered</h2>
        <ol>
          {caseStudy.phases.map((ph, i) => (
            <li key={ph.num}>
              <strong>{ph.label}</strong>: {ph.copy}
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.pin}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        
        {/* DOM Stats Overlay */}
        <div ref={statsContainerRef} className={styles.statsOverlay} style={{ display: "none" }} aria-live="polite">
           <div className={styles.statsGrid}>
              {caseStudy.stats.map((s, i) => (
                <div key={s.label} className={styles.statCard} ref={el => { statCardRefs.current[i] = el; }}>
                   <div className={styles.statValueContainer}>
                     <span className={styles.statValue} ref={el => { statValueRefs.current[i] = el; }}>{s.value}</span>
                     {s.unit && <span className={styles.statUnit}>{s.unit}</span>}
                   </div>
                   <div className={styles.statRule} />
                   <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* HTML Chrome */}
        <div className={`${styles.chrome} ${activePhase >= 1 && activePhase <= 2 ? styles.chromeDark : styles.chromeLight}`}>
          <div className={styles.progressTrack}>
             <div ref={progressRef} className={styles.progressBar} />
          </div>
          
          <div className={styles.topBar}>
            <div className={styles.brand}>VENTURA<span className={styles.brandDot}>.</span></div>
            <div>{caseStudy.project} · Case Study</div>
          </div>
          
          <div className={styles.bottomArea}>
             <div className={styles.copyBlock}>
               <div className={styles.phaseCounter}>{pData.num} / 05</div>
               <div className={styles.eyebrow}>{pData.label}</div>
               <h2 className={styles.headline}>{pData.label}</h2>
               <p className={styles.description}>{pData.copy}</p>
             </div>
             
             <div className={styles.rail}>
               {caseStudy.phases.map((ph, i) => (
                 <div key={ph.num} className={`${styles.railItem} ${activePhase === i ? styles.railItemActive : ""}`}>
                   <span>{ph.key}</span>
                   <div className={styles.railLine} />
                 </div>
               ))}
             </div>
             
             <div className={styles.meta}>
                {caseStudy.location} · {caseStudy.delivery}
             </div>
          </div>
          
          <div className={`${styles.scrollHint} ${activePhase > 0 ? styles.scrollHintHidden : ""}`}>
             <span>Scroll</span>
             <div className={styles.scrollLine} />
          </div>
        </div>
      </div>
    </section>
  );
}
