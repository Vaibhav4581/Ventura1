import type { IconName } from "@/lib/brand";

/* Duotone icon family: strokes use `currentColor`; amber accents use
   var(--icon-accent); marks placed on amber use var(--icon-ink).
   24px grid, 1.8px stroke, round joins. Looks balanced on light cells
   (navy stroke + amber) and on navy medallions (white stroke + amber). */

const A = "var(--icon-accent, #f7941d)"; // amber accent
const K = "var(--icon-ink, #0f1535)"; // ink mark on amber

const paths: Record<IconName, React.ReactNode> = {
  building: (
    <>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h6A1.5 1.5 0 0 1 13 5.5V21" />
      <path d="M13 10h5.5A1.5 1.5 0 0 1 20 11.5V21" />
      <path d="M3 21h18" />
      <rect x="6.4" y="7" width="1.9" height="1.9" rx=".4" fill={A} stroke="none" />
      <rect x="9.2" y="7" width="1.9" height="1.9" rx=".4" fill={A} stroke="none" />
      <rect x="6.4" y="11" width="1.9" height="1.9" rx=".4" fill={A} stroke="none" />
      <rect x="9.2" y="11" width="1.9" height="1.9" rx=".4" fill={A} stroke="none" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.6 8.4 13.3 13.3 8.4 15.6 10.7 10.7Z" fill={A} stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="3.6" fill={A} stroke="none" />
      <circle cx="8" cy="8" r="3.6" />
      <path d="m10.6 10.6 8.4 8.4M16 16l2-2M19 19l2-2" />
    </>
  ),
  beam: (
    <>
      <path d="M5 5h14M5 19h14" />
      <path d="M9 5v14M15 5v14" />
      <rect x="9" y="11" width="6" height="2" fill={A} stroke="none" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2 5 13h5l-1 9 9-12h-5l1-8z" fill={A} stroke="none" />
      <path d="M13 2 5 13h5l-1 9 9-12h-5l1-8z" />
    </>
  ),
  ruler: (
    <>
      <rect x="3" y="8.5" width="18" height="7" rx="1.5" />
      <path d="M3 8.5h4.5v7H3z" fill={A} stroke="none" />
      <path d="M11 8.5v3.4M15 8.5v2.4M19 8.5v3.4" />
    </>
  ),
  trowel: (
    <>
      <path d="M3.5 4.2 14 8.2l-6.2 6.2L3.5 4.2z" fill={A} stroke="none" />
      <path d="M3.5 4.2 14 8.2l-6.2 6.2z" />
      <path d="m12 12.4 7.5 7.5M16.6 16l2.9 1-1 2.9" />
    </>
  ),
  snow: (
    <>
      <path d="M12 2.5v19M4 7l16 10M20 7 4 17" />
      <path d="M12 6 9.7 4.2M12 6l2.3-1.8M12 18l-2.3 1.8M12 18l2.3 1.8" />
      <path d="M7.1 8.4 4.4 7.3 4.9 4.4M16.9 8.4l2.7-1.1-.5-2.9M7.1 15.6l-2.7 1.1.5 2.9M16.9 15.6l2.7 1.1-.5 2.9" />
      <circle cx="12" cy="12" r="1.7" fill={A} stroke="none" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2.8c.55 4.2 2.45 6.1 6.6 6.6-4.15.5-6.05 2.4-6.6 6.6-.55-4.2-2.45-6.1-6.6-6.6 4.15-.5 6.05-2.4 6.6-6.6Z" fill={A} stroke="none" />
      <path d="M18.6 14.4c.2 1.6 1 2.4 2.6 2.6-1.6.2-2.4 1-2.6 2.6-.2-1.6-1-2.4-2.6-2.6 1.6-.2 2.4-1 2.6-2.6Z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c3 2.6 3 15.4 0 18M12 3c-3 2.6-3 15.4 0 18" />
      <circle cx="12" cy="12" r="2.1" fill={A} stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z" />
      <path d="m8.7 12 2.3 2.3L15.6 9.6" stroke={A} />
    </>
  ),
  coin: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5.4" fill={A} stroke="none" />
      <path d="M12 9.1v5.8M10.4 10.4c.4-.7 3.2-1 3.2.4 0 1.6-3.2.9-3.2 2.4 0 1.2 2.8 1.1 3.2.4" stroke={K} strokeWidth="1.4" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h13" />
      <path d="m13 6 6 6-6 6" stroke={A} />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" fill={A} stroke="none" />
      <path d="m8 12 2.8 2.8L16.4 9.2" stroke={K} />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      <circle cx="17" cy="7" r="2" fill={A} stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.2" />
      <path d="m3.6 6.5 8.4 5.6 8.4-5.6" stroke={A} />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c5-5.5 7-8.6 7-11a7 7 0 1 0-14 0c0 2.4 2 5.5 7 11Z" />
      <circle cx="12" cy="10" r="2.4" fill={A} stroke="none" />
    </>
  ),
};

export function Icon({
  name,
  size = 24,
  className,
  title,
}: {
  name: IconName;
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
