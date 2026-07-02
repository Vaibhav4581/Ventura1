"use client";

import { useState } from "react";
import styles from "./OrgChart.module.css";
import { orgChart } from "@/lib/brand";

type ZoneId = "intro" | "crane" | "leadership" | "civil" | "mep" | "core" | "foundation";

export function OrgChart() {
  const [activeZone, setActiveZone] = useState<ZoneId>("intro");

  const handleZoneClick = (zone: ZoneId) => {
    setActiveZone(prev => prev === zone ? "intro" : zone);
  };

  // SVG coordinates and sizes for hit areas
  const hitAreas = {
    crane: { x: 20, y: 30, w: 600, h: 100 }, // Spans the top
    leadership: { x: 180, y: 150, w: 380, h: 156 }, // Top 3 floors
    civil: { x: 70, y: 250, w: 110, h: 180 }, // Left wing
    mep: { x: 560, y: 250, w: 110, h: 180 }, // Right wing
    core: { x: 330, y: 140, w: 80, h: 300 }, // Center core
    foundation: { x: 160, y: 440, w: 420, h: 70 }, // Base
  };

  const getPanelData = () => {
    switch (activeZone) {
      case "crane":
        return {
          title: orgChart.crane.label,
          desc: "The enabling functions that drive and support every project from above.",
          items: orgChart.crane.items,
          icon: "CR"
        };
      case "leadership":
        return {
          title: "Leadership & Management",
          desc: "The top floors guiding company strategy and overall project execution.",
          items: orgChart.floors.slice(0, 3).map(f => f.label),
          icon: "LD"
        };
      case "civil":
        return {
          title: orgChart.wings[0].label,
          desc: "The structural wing delivering concrete, steel, and architectural builds.",
          items: orgChart.wings[0].roles,
          icon: "CV"
        };
      case "mep":
        return {
          title: orgChart.wings[1].label,
          desc: "The mechanical, electrical, and plumbing wing bringing the building to life.",
          items: orgChart.wings[1].roles,
          icon: "MP"
        };
      case "core":
        return {
          title: orgChart.core.label,
          desc: "Central assurance running through every level of the company.",
          items: orgChart.core.items,
          icon: "CO"
        };
      case "foundation":
        return {
          title: "Workforce",
          desc: orgChart.foundation.note,
          items: ["Working Labors", "Site Operators"],
          icon: "FD"
        };
      default:
        return {
          title: "Our Structure",
          desc: orgChart.intro,
          items: [],
          icon: "OS"
        };
    }
  };

  const panelData = getPanelData();
  const hasSelection = activeZone !== "intro";

  return (
    <section className={styles.section} id="org-chart">
      <div className={styles.intro}>
        <h2 className={styles.title}>Our structure</h2>
        <p className={styles.subtitle}>{orgChart.intro}</p>
      </div>

      <div className={styles.filters} role="group" aria-label="Filter organization zones">
        {[
          { id: "crane", label: "Crane" },
          { id: "leadership", label: "Leadership" },
          { id: "civil", label: "Civil" },
          { id: "core", label: "Core" },
          { id: "mep", label: "MEP" },
          { id: "foundation", label: "Foundation" }
        ].map((filter) => (
          <button
            key={filter.id}
            className={styles.filterChip}
            aria-pressed={activeZone === filter.id}
            onClick={() => handleZoneClick(filter.id as ZoneId)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={styles.blueprintContainer}>
        <div 
          className={styles.svgWrapper} 
          data-has-selection={hasSelection}
        >
          <svg 
            viewBox="0 0 740 600" 
            className={styles.svg} 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <pattern id="hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#d6e4ff" strokeWidth="1.5" opacity="0.3" />
              </pattern>
            </defs>

            {/* --- CRANE (x: ~60-160, spanning to 600) --- */}
            <g data-active={activeZone === "crane" || !hasSelection}>
              {/* Mast */}
              <line x1="100" y1="90" x2="100" y2="440" stroke="#d6e4ff" strokeWidth="2" />
              <line x1="130" y1="90" x2="130" y2="440" stroke="#d6e4ff" strokeWidth="2" />
              {/* X-bracing mast */}
              {[...Array(11)].map((_, i) => (
                <g key={i}>
                  <line x1="100" y1={100 + i * 30} x2="130" y2={130 + i * 30} stroke="#d6e4ff" strokeWidth="1" />
                  <line x1="100" y1={130 + i * 30} x2="130" y2={100 + i * 30} stroke="#d6e4ff" strokeWidth="1" />
                  <line x1="100" y1={130 + i * 30} x2="130" y2={130 + i * 30} stroke="#d6e4ff" strokeWidth="1" />
                </g>
              ))}
              
              {/* Cab */}
              <rect x="80" y="90" width="20" height="30" fill="none" stroke="#d6e4ff" strokeWidth="2" />
              <line x1="80" y1="105" x2="100" y2="105" stroke="#d6e4ff" strokeWidth="1" />
              
              {/* A-Frame Apex */}
              <polyline points="100,90 115,50 130,90" fill="none" stroke="#d6e4ff" strokeWidth="2" />
              
              {/* Jib (reaching right) */}
              <polyline points="130,90 600,90 600,75 130,75" fill="none" stroke="#ffb14d" strokeWidth="2" />
              {[...Array(23)].map((_, i) => (
                <line key={`jib-${i}`} x1={130 + i * 20} y1="90" x2={150 + i * 20} y2="75" stroke="#ffb14d" strokeWidth="1" />
              ))}
              <line x1="115" y1="50" x2="300" y2="75" stroke="#d6e4ff" strokeWidth="1.5" />
              <line x1="115" y1="50" x2="450" y2="75" stroke="#d6e4ff" strokeWidth="1" />

              {/* Counter-jib (reaching left) */}
              <polyline points="100,90 30,90 30,75 100,75" fill="none" stroke="#d6e4ff" strokeWidth="2" />
              <line x1="115" y1="50" x2="40" y2="75" stroke="#d6e4ff" strokeWidth="1.5" />
              <rect x="40" y="60" width="25" height="15" fill="#d6e4ff" opacity="0.3" />

              {/* Hook & Lifts */}
              <line x1="500" y1="90" x2="500" y2="130" stroke="#d6e4ff" strokeWidth="1.5" />
              <path d="M495,130 Q500,140 505,130" fill="none" stroke="#d6e4ff" strokeWidth="2" />
              <rect x="470" y="140" width="60" height="20" fill="none" stroke="#ffb14d" strokeWidth="1.4" strokeDasharray="3 3" />
              <text x="500" y="154" fill="#ffb14d" fontSize="10" fontFamily="monospace" textAnchor="middle">PROJECT</text>

              {/* Labels */}
              <text x="40" y="140" fill="#d6e4ff" fontSize="12" fontFamily="monospace" fontWeight="bold">The Crane</text>
              <line x1="40" y1="145" x2="90" y2="145" stroke="#d6e4ff" strokeWidth="1.2" strokeDasharray="3 3" />
            </g>

            {/* --- BUILDING FLOORS (Leadership) --- */}
            <g data-active={activeZone === "leadership" || !hasSelection}>
              {[0, 1, 2].map((i) => {
                const y = 160 + i * 52;
                return (
                  <g key={`floor-${i}`}>
                    {/* Floor slabs */}
                    <line x1="180" y1={y} x2="560" y2={y} stroke="#d6e4ff" strokeWidth="2" />
                    <line x1="180" y1={y + 52} x2="560" y2={y + 52} stroke="#d6e4ff" strokeWidth="2" />
                    {/* Walls */}
                    <line x1="180" y1={y} x2="180" y2={y + 52} stroke="#d6e4ff" strokeWidth="2" />
                    <line x1="560" y1={y} x2="560" y2={y + 52} stroke="#d6e4ff" strokeWidth="2" />
                    {/* Internal lines */}
                    <line x1="220" y1={y} x2="220" y2={y + 52} stroke="#d6e4ff" strokeWidth="1.4" opacity="0.5" />
                    <line x1="520" y1={y} x2="520" y2={y + 52} stroke="#d6e4ff" strokeWidth="1.4" opacity="0.5" />
                    {/* Label */}
                    <rect x="310" y={y + 16} width="120" height="20" rx="10" fill="#0c2a5e" stroke="#d6e4ff" strokeWidth="1.2" />
                    <text x="370" y={y + 30} fill="#d6e4ff" fontSize="11" fontFamily="monospace" textAnchor="middle">
                      {orgChart.floors[i].level}: {orgChart.floors[i].label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* --- CIVIL WING (Left) + Bottom 2 Floors --- */}
            <g data-active={activeZone === "civil" || !hasSelection}>
              {/* Lower floors of main building that connect */}
              {[3, 4].map((i) => {
                const y = 160 + i * 52;
                return (
                  <g key={`floor-${i}`}>
                    <line x1="180" y1={y} x2="340" y2={y} stroke="#d6e4ff" strokeWidth="2" />
                    <line x1="180" y1={y + 52} x2="340" y2={y + 52} stroke="#d6e4ff" strokeWidth="2" />
                    <line x1="180" y1={y} x2="180" y2={y + 52} stroke="#d6e4ff" strokeWidth="2" />
                    <rect x="190" y={y + 16} width="140" height="20" rx="10" fill="#0c2a5e" stroke="#d6e4ff" strokeWidth="1.2" opacity="0.6" />
                    <text x="260" y={y + 30} fill="#d6e4ff" fontSize="10" fontFamily="monospace" textAnchor="middle">
                      {orgChart.floors[i].level}: {orgChart.floors[i].label}
                    </text>
                  </g>
                );
              })}
              
              {/* Civil Wing Extension */}
              <rect x="90" y="316" width="90" height="104" fill="none" stroke="#d6e4ff" strokeWidth="2" />
              <line x1="90" y1="368" x2="180" y2="368" stroke="#d6e4ff" strokeWidth="2" />
              <text x="135" y="340" fill="#d6e4ff" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CIVIL</text>
              <text x="135" y="355" fill="#d6e4ff" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.7">TEAM</text>
              <line x1="100" y1="420" x2="170" y2="420" stroke="#d6e4ff" strokeWidth="1.2" strokeDasharray="2 2" />
            </g>

            {/* --- MEP WING (Right) + Bottom 2 Floors --- */}
            <g data-active={activeZone === "mep" || !hasSelection}>
              {/* Lower floors right side */}
              {[3, 4].map((i) => {
                const y = 160 + i * 52;
                return (
                  <g key={`floor-mep-${i}`}>
                    <line x1="400" y1={y} x2="560" y2={y} stroke="#d6e4ff" strokeWidth="2" />
                    <line x1="400" y1={y + 52} x2="560" y2={y + 52} stroke="#d6e4ff" strokeWidth="2" />
                    <line x1="560" y1={y} x2="560" y2={y + 52} stroke="#d6e4ff" strokeWidth="2" />
                  </g>
                );
              })}
              
              {/* MEP Wing Extension */}
              <rect x="560" y="316" width="90" height="104" fill="none" stroke="#d6e4ff" strokeWidth="2" />
              <line x1="560" y1="368" x2="650" y2="368" stroke="#d6e4ff" strokeWidth="2" />
              <text x="605" y="340" fill="#d6e4ff" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">MEP</text>
              <text x="605" y="355" fill="#d6e4ff" fontSize="9" fontFamily="monospace" textAnchor="middle" opacity="0.7">TEAM</text>
              <line x1="570" y1="420" x2="640" y2="420" stroke="#d6e4ff" strokeWidth="1.2" strokeDasharray="2 2" />
            </g>

            {/* --- CORE (Center Shaft) --- */}
            <g data-active={activeZone === "core" || !hasSelection}>
              <rect x="340" y="160" width="60" height="260" fill="none" stroke="#ffb14d" strokeWidth="1.4" strokeDasharray="6 4" />
              <line x1="340" y1="160" x2="400" y2="420" stroke="#ffb14d" strokeWidth="1" opacity="0.3" />
              <line x1="400" y1="160" x2="340" y2="420" stroke="#ffb14d" strokeWidth="1" opacity="0.3" />
              
              <rect x="330" y="270" width="80" height="40" fill="#0c2a5e" stroke="#ffb14d" strokeWidth="1" />
              <text x="370" y="285" fill="#ffb14d" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">CORE</text>
              <text x="370" y="298" fill="#ffb14d" fontSize="9" fontFamily="monospace" textAnchor="middle">SERVICES</text>
            </g>

            {/* --- FOUNDATION --- */}
            <g data-active={activeZone === "foundation" || !hasSelection}>
              {/* Ground Line */}
              <line x1="50" y1="440" x2="690" y2="440" stroke="#d6e4ff" strokeWidth="3" />
              {/* Hatched Foundation Block */}
              <rect x="170" y="440" width="400" height="50" fill="url(#hatch)" stroke="#d6e4ff" strokeWidth="2" />
              <rect x="250" y="455" width="240" height="20" fill="#0c2a5e" />
              <text x="370" y="468" fill="#d6e4ff" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                WORKING LABORS — OUR FOUNDATION
              </text>
            </g>

            {/* --- ANNOTATIONS --- */}
            <g data-active={!hasSelection}>
              {/* Dimension right */}
              <line x1="680" y1="160" x2="680" y2="490" stroke="#ffb14d" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="675" y1="160" x2="685" y2="160" stroke="#ffb14d" strokeWidth="1" />
              <line x1="675" y1="490" x2="685" y2="490" stroke="#ffb14d" strokeWidth="1" />
              <text x="695" y="335" fill="#ffb14d" fontSize="9" fontFamily="monospace" transform="rotate(-90 695 335)" textAnchor="middle">
                DEPTH: LEADERSHIP TO FOUNDATION
              </text>

              {/* Arrow bottom */}
              <line x1="90" y1="520" x2="650" y2="520" stroke="#d6e4ff" strokeWidth="1.2" strokeDasharray="3 3" />
              <polygon points="90,520 100,515 100,525" fill="#d6e4ff" />
              <polygon points="650,520 640,515 640,525" fill="#d6e4ff" />
              <rect x="310" y="510" width="120" height="20" fill="#0c2a5e" />
              <text x="370" y="524" fill="#d6e4ff" fontSize="10" fontFamily="monospace" textAnchor="middle">
                DELIVERY STRUCTURE
              </text>

              {/* Title block */}
              <rect x="510" y="550" width="180" height="30" fill="none" stroke="#d6e4ff" strokeWidth="1" />
              <text x="520" y="565" fill="#d6e4ff" fontSize="8" fontFamily="monospace">VENTURA · Organisation</text>
              <text x="520" y="575" fill="#d6e4ff" fontSize="8" fontFamily="monospace">SCALE NTS / Rev A / Sheet 01-01</text>
            </g>

            {/* --- HIT AREAS --- */}
            <g>
              {(Object.keys(hitAreas) as (keyof typeof hitAreas)[]).map((zone) => (
                <rect
                  key={zone}
                  x={hitAreas[zone].x}
                  y={hitAreas[zone].y}
                  width={hitAreas[zone].w}
                  height={hitAreas[zone].h}
                  className={styles.zoneHitArea}
                  role="button"
                  tabIndex={0}
                  aria-label={`Highlight ${zone} zone`}
                  aria-pressed={activeZone === zone}
                  onClick={() => handleZoneClick(zone)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleZoneClick(zone);
                    }
                  }}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      <div className={styles.detailPanel} aria-live="polite">
        <div className={styles.panelHeader}>
          <div className={styles.panelIcon}>{panelData.icon}</div>
          <h3 className={styles.panelTitle}>{panelData.title}</h3>
        </div>
        <div className={styles.panelContent}>
          <p className={styles.panelDesc}>{panelData.desc}</p>
          {panelData.items.length > 0 && (
            <ul className={styles.panelList}>
              {panelData.items.map((item, idx) => (
                <li key={idx} className={styles.panelItem}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      {/* Screen reader only list of structure */}
      <div className="sr-only">
        <h3>Organization Structure Data</h3>
        <p>{orgChart.intro}</p>
        {/* We can expand on this for full a11y, but for now the text is sufficient */}
      </div>

    </section>
  );
}
