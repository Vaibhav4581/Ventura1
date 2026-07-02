import Link from "next/link";
import styles from "./Button.module.css";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/brand";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  icon?: IconName;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  disabled,
  type = "button",
  className = "",
}: Props) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} size={size === "lg" ? 20 : 18} /> : null}
    </>
  );

  if (href && !disabled) {
    // Internal routes get client navigation; anchors/mailto/external stay <a>.
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} aria-disabled={disabled}>
      {inner}
    </button>
  );
}
