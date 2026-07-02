"use client";

import { useEffect, useState } from "react";
import styles from "./BackToTop.module.css";

/* Floating back-to-top control — appears after the first viewport-and-a-half.
   Smooth scroll comes from the global `scroll-behavior: smooth`, which the
   reduced-motion override disables. After scrolling we blur so focus returns
   to the document body (not the skip-link), and move the reading point to the
   top landmark for keyboard/SR users. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.scrollTo({ top: 0 });
    e.currentTarget.blur();
  };

  return (
    <button
      type="button"
      className={`${styles.btn} ${show ? styles.show : ""}`}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={toTop}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 19V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 11l6-6 6 6" stroke="var(--amber-500)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
