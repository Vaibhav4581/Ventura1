import styles from "./Card.module.css";
import { Icon } from "./Icon";
import type { IconName } from "@/lib/brand";

type Variant = "service" | "value" | "glass" | "featured";

type Props = {
  title: string;
  children?: React.ReactNode;
  icon?: IconName;
  variant?: Variant;
  className?: string;
  footer?: React.ReactNode;
};

/* Premium card: gradient icon medallion (duotone glyph), layered shadow,
   hairline border, lift + amber sheen on hover. Optional `footer` slot for a
   trailing hint row (e.g. "Learn more" when the card is wrapped in a link). */
export function Card({ title, children, icon, variant = "service", className = "", footer }: Props) {
  return (
    <article className={`${styles.card} ${styles[variant]} ${className}`}>
      <span className={styles.sheen} aria-hidden="true" />
      {icon ? (
        <span className={styles.medallion} aria-hidden="true">
          <Icon name={icon} size={26} />
        </span>
      ) : null}
      <h3 className={styles.title}>{title}</h3>
      {children ? <p className={styles.text}>{children}</p> : null}
      {footer ? <div className={styles.footer}>{footer}</div> : null}
    </article>
  );
}
