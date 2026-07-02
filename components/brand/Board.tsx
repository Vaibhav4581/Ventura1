import styles from "./guide.module.css";
import { Reveal } from "@/components/ui/Reveal";

/* A numbered section of the guide, with the international standard it satisfies. */
export function Board({
  index,
  id,
  title,
  sub,
  standard,
  alt,
  dark,
  children,
}: {
  index: string;
  id: string;
  title: string;
  sub?: string;
  standard?: React.ReactNode;
  alt?: boolean;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${styles.board} ${alt ? styles.boardAlt : ""} ${dark ? styles.boardDark : ""}`}
    >
      <div className="container">
        <Reveal>
          <header className={styles.boardHead}>
            <div className={styles.boardIndex}>{index}</div>
            <div className={styles.boardTitleWrap}>
              <h2 className={styles.boardTitle}>{title}</h2>
              {sub ? <p className={styles.boardSub}>{sub}</p> : null}
              {standard ? (
                <p className={styles.standard}>
                  <span aria-hidden="true">📐</span>
                  {standard}
                </p>
              ) : null}
            </div>
          </header>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
