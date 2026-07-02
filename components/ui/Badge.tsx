import styles from "./Badge.module.css";

type Tone = "navy" | "amber" | "blue" | "neutral" | "success" | "warning" | "error";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
