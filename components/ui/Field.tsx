import styles from "./Field.module.css";

type Common = {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  error?: string;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
};

/* Accessible labelled field. Errors are linked via aria-describedby. */
export function Field({
  label,
  name,
  required,
  hint,
  error,
  placeholder,
  defaultValue,
  autoComplete,
  type = "text",
  textarea,
  rows = 4,
}: Common & { type?: string; textarea?: boolean; rows?: number }) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errId = error ? `${name}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required ? <span className={styles.req} aria-hidden="true"> *</span> : null}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={`${styles.control} ${error ? styles.invalid : ""}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={`${styles.control} ${error ? styles.invalid : ""}`}
        />
      )}
      {hint ? <p id={hintId} className={styles.hint}>{hint}</p> : null}
      {error ? <p id={errId} className={styles.error}>{error}</p> : null}
    </div>
  );
}
