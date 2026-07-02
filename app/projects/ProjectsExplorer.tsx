"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./projects.module.css";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { projects, industries, pages } from "@/lib/brand";

const pj = pages.projects;
/* Chips come from the sectors actually present in projects[] (ordered to match
   industries[]), so a filter can never show an empty grid. */
const sectors = industries
  .map((i) => i.title)
  .filter((t) => projects.some((p) => p.sector === t));

/* Reads ?sector= and syncs it into state. Isolated in a render-null child so
   the useSearchParams Suspense bailout (static export) swallows only this —
   the chips and the full grid stay in the prerendered HTML. */
function SectorSync({ onSector }: { onSector: (s: string | null) => void }) {
  const param = useSearchParams().get("sector");
  useEffect(() => {
    onSector(param && sectors.includes(param) ? param : null);
  }, [param, onSector]);
  return null;
}

/* Sector segmentation for the portfolio ("portfolio segmentation" in the
   proposal scope). The URL is the source of truth: chips update ?sector= and
   SectorSync folds it back into state, so deep links from the service pages
   (/projects/?sector=<name>) and back/forward both work. */
export function ProjectsExplorer() {
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter((p) => p.sector === active) : projects;

  const select = (s: string | null) => {
    setActive(s);
    router.replace(s ? `/projects/?sector=${encodeURIComponent(s)}` : "/projects/", {
      scroll: false,
    });
  };

  return (
    <div>
      <Suspense fallback={null}>
        <SectorSync onSector={setActive} />
      </Suspense>

      <h2 className="sr-only">Portfolio by sector</h2>

      <div className={styles.filter} role="group" aria-label={pj.filter.label}>
        <span className={styles.filterLabel}>{pj.filter.label}</span>
        <div className={styles.chips}>
          <button
            type="button"
            className={`${styles.chip} ${active === null ? styles.chipActive : ""}`}
            aria-pressed={active === null}
            onClick={() => select(null)}
          >
            {pj.filter.all}
          </button>
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.chip} ${active === s ? styles.chipActive : ""}`}
              aria-pressed={active === s}
              onClick={() => select(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.count} aria-live="polite">
        Showing {shown.length} of {projects.length} build types
        {active ? ` in ${active}` : ""}
      </p>

      <div className={styles.grid}>
        {shown.map((p, i) => (
          <Reveal key={p.img} delay={i * 50}>
            <article className={styles.card}>
              <figure className={styles.media}>
                <img
                  src={`/imagery/${p.img}-duo.jpg`}
                  alt={`${p.title} — representative project imagery`}
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                />
                <span className={styles.sectorBadge}>
                  <Badge tone="navy">{p.sector}</Badge>
                </span>
              </figure>
              <div className={styles.body}>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.summary}>{p.summary}</p>
                <ul className={styles.tags} aria-label="Services involved">
                  {p.services.map((s) => (
                    <li key={s}>
                      <Badge>{s}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
