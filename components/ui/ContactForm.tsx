"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./ContactForm.module.css";
import { Field } from "./Field";
import { Button } from "./Button";
import { contact } from "@/lib/brand";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "message";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Contact form — posts JSON to the /api/contact Pages Function (M4).
   Degrades gracefully: client validation, honeypot, and a mailto: fallback
   if the request fails (e.g. before the Function is deployed). */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot: bots fill the hidden field — silently accept, don't send.
    if (data.website) {
      setStatus("success");
      form.reset();
      return;
    }

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Please enter your name.";
    if (!data.email?.trim()) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(data.email)) next.email = "Please enter a valid email address.";
    if (!data.message?.trim()) next.message = "Please tell us about your project.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <h3 className={styles.successTitle}>Thanks — your message is on its way.</h3>
        <p>We&apos;ve received your enquiry and will get back to you within two business days.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      {/* Honeypot — off-screen, not announced, not tabbable */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.row}>
        <Field label="Name" name="name" required autoComplete="name" error={errors.name} />
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
      </div>
      <div className={styles.row}>
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        <Field label="Company" name="company" autoComplete="organization" placeholder="Optional" />
      </div>
      <Field
        label="Project details"
        name="message"
        textarea
        rows={5}
        required
        error={errors.message}
        hint="What are you building, where, and roughly when?"
      />

      {status === "error" ? (
        <p className={styles.formError} role="alert">
          Sorry — something went wrong sending your message. Please email us directly at{" "}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>.
        </p>
      ) : null}

      <div className={styles.actions}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="arrow"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>

      <p className={styles.privacyNote}>
        We use your details only to respond to your enquiry — see our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>
    </form>
  );
}
