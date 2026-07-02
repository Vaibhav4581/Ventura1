/* Cloudflare Pages Function — POST /api/contact
   Validates a contact-form submission and emails it to the Ventura inbox via
   the `send_email` binding (Cloudflare Email Service). The client form has a
   mailto: fallback, so non-2xx responses degrade gracefully.

   GO-LIVE DEPENDENCY: email only sends once the SENDER domain is onboarded to
   Email Sending (`wrangler email sending enable venturabuilders.africa` +
   SPF/DKIM DNS). That requires the domain to be on Cloudflare (M5). Until then
   `env.EMAIL` is absent and this returns 503 → the form uses its mailto: link. */

type SendEmailMessage = {
  to: string | string[];
  from: { email: string; name?: string };
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
};
interface EmailBinding {
  send(message: SendEmailMessage): Promise<{ messageId?: string }>;
}
interface Env {
  EMAIL?: EmailBinding;
}
interface PagesContext {
  request: Request;
  env: Env;
}

const TO = "info@venturabuilders.africa";
const FROM = "website@venturabuilders.africa"; // must be on the onboarded sender domain
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ESCAPES[c]);

export async function onRequestPost(context: PagesContext): Promise<Response> {
  let body: Record<string, string>;
  try {
    body = (await context.request.json()) as Record<string, string>;
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill the hidden field — accept silently, send nothing.
  if (body.website) return json({ ok: true });

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const message = (body.message || "").trim();
  const phone = (body.phone || "").trim();
  const company = (body.company || "").trim();

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: "Please complete the required fields." }, 400);
  }

  if (!context.env.EMAIL) {
    // Sender domain not onboarded yet — tell the client to use its mailto fallback.
    return json({ ok: false, error: "Email service unavailable." }, 503);
  }

  const text = [
    "New enquiry from the Ventura website",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    company ? `Company: ${company}` : null,
    "",
    "Message:",
    message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const html = [
    "<h2>New enquiry from the Ventura website</h2>",
    `<p><strong>Name:</strong> ${esc(name)}</p>`,
    `<p><strong>Email:</strong> ${esc(email)}</p>`,
    phone ? `<p><strong>Phone:</strong> ${esc(phone)}</p>` : "",
    company ? `<p><strong>Company:</strong> ${esc(company)}</p>` : "",
    "<p><strong>Message:</strong></p>",
    `<p>${esc(message).replace(/\n/g, "<br>")}</p>`,
  ].join("");

  try {
    await context.env.EMAIL.send({
      to: TO,
      from: { email: FROM, name: "Ventura Website" },
      replyTo: email,
      subject: `Website enquiry — ${name}`,
      text,
      html,
    });
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "Could not send your message." }, 502);
  }
}
