"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { nav, sampleCopy, isNavGroup } from "@/lib/brand";

/* Sticky site header — glass bar with logo, nav and the primary CTA.
   Client component for the mobile menu toggle (Esc + link-click close)
   and the active-route highlight. Reused across the marketing site. */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null); // open dropdown group
  const progressRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Reading-progress bar + elevation once the page scrolls. rAF-throttled,
  // passive listener; the bar tracks direct user scroll (not an autonomous
  // animation), so it is fine under prefers-reduced-motion.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight;
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        }
        setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Active for the route itself and its children (/services covers /services/x).
  const isActive = (href: string) =>
    pathname === href || pathname === `${href}/` || pathname.startsWith(`${href}/`);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the desktop dropdown on Escape or a click outside the nav.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  // A group is "active" when any of its child routes is active.
  const groupActive = (children: { href: string }[]) => children.some((c) => isActive(c.href));

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <a href="#main" className={styles.skip}>Skip to content</a>
      <span ref={progressRef} className={styles.progress} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Ventura Builders & Developers — home">
          <Logo variant="color" height={64} className={styles.brandMark} />
          <span className={styles.wordmark} aria-hidden="true">
            <span className={styles.wordmarkName}>Ventura</span>
            <span className={styles.wordmarkSub}>Builders &amp; Developers</span>
          </span>
        </Link>

        <nav ref={navRef} className={styles.nav} aria-label="Primary">
          {nav.map((l) =>
            isNavGroup(l) ? (
              <div
                key={l.label}
                className={styles.dropdown}
                onMouseEnter={() => setMenuOpen(l.label)}
                onMouseLeave={() => setMenuOpen(null)}
              >
                <button
                  type="button"
                  className={`${styles.trigger} ${groupActive(l.children) ? styles.linkActive : ""}`}
                  aria-haspopup="true"
                  aria-expanded={menuOpen === l.label}
                  onClick={() => setMenuOpen((v) => (v === l.label ? null : l.label))}
                >
                  <span className={styles.newDot} aria-hidden="true" />
                  {l.label}
                  <svg className={`${styles.caret} ${menuOpen === l.label ? styles.caretOpen : ""}`} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={`${styles.menu} ${menuOpen === l.label ? styles.menuActive : ""}`} role="menu">
                  {l.children.map((c) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      role="menuitem"
                      className={`${styles.menuLink} ${isActive(c.href) ? styles.menuLinkActive : ""}`}
                      aria-current={isActive(c.href) ? "page" : undefined}
                      onClick={() => setMenuOpen(null)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className={`${styles.link} ${isActive(l.href) ? styles.linkActive : ""}`}
                aria-current={isActive(l.href) ? "page" : undefined}
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className={styles.cta}>
          <Button href="/contact" variant="primary" icon="arrow">{sampleCopy.ctaPrimary}</Button>
        </div>

        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`} aria-hidden="true" />
        </button>
      </div>

      <div id="site-menu" className={`${styles.panel} ${open ? styles.panelOpen : ""}`} hidden={!open}>
        <nav className={`container ${styles.panelNav}`} aria-label="Mobile">
          {nav.map((l) =>
            isNavGroup(l) ? (
              <div key={l.label} className={styles.panelGroup}>
                <span className={styles.panelGroupLabel}>{l.label}</span>
                {l.children.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className={`${styles.panelLink} ${styles.panelSubLink} ${isActive(c.href) ? styles.panelLinkActive : ""}`}
                    aria-current={isActive(c.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={l.label}
                href={l.href}
                className={`${styles.panelLink} ${isActive(l.href) ? styles.panelLinkActive : ""}`}
                aria-current={isActive(l.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            )
          )}
          <Button href="/contact" variant="primary" icon="arrow" className={styles.panelCta}>
            {sampleCopy.ctaPrimary}
          </Button>
        </nav>
      </div>
    </header>
  );
}
