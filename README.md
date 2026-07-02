# Ventura Builders & Developers — Website

Corporate website for **Ventura Builders & Developers** (`venturabuilders.africa`).
Built with **Next.js (static export)** and deployed to **Cloudflare Pages**.

> **Milestone 1 — Brand Design System** is live for client approval:
> **https://ventura-brand-guide.pages.dev/brand-guide/**

## What's here

| Path | Purpose |
| --- | --- |
| `app/brand-guide/page.tsx` | The brand design system (the current deliverable) |
| `app/page.tsx` | Temporary home — routes reviewers to the brand guide |
| `app/globals.css` | Design tokens (CSS variables) + base styles |
| `tokens/tokens.json` | Source design tokens in **W3C Design Tokens** format |
| `lib/tokens.ts` | Typed token metadata + WCAG contrast utilities |
| `lib/brand.ts` | Brand strategy, voice and content |
| `components/ui/*` | Production components (Button, Card, Badge, Field, Stat, Icon, Logo) |
| `components/brand/*` | Brand-guide section boards |
| `public/logo/*` | Logo variants (colour, white knockout, mono) |

## Standards applied

- **W3C Design Tokens** (primitive → semantic tiers) — `tokens/tokens.json`
- **WCAG 2.2 AA** colour contrast — every text/UI pair verified (4.5:1 / 3:1)
- **8-pt spacing grid** + **Major-Third (1.25) modular type scale**
- Gestalt / visual-hierarchy layout; `prefers-reduced-motion` honoured

## Develop

```bash
npm install
npm run dev          # http://localhost:3000  (then visit /brand-guide)
```

## Build (static export)

```bash
npm run build        # outputs static site to ./out
```

## Deploy (Cloudflare Pages)

```bash
npm run build
npx wrangler pages deploy out --project-name=ventura-brand-guide --branch=main
```

Project: **ventura-brand-guide** · Production URL: `https://ventura-brand-guide.pages.dev`

## Next milestones

1. Client approval of the brand design system.
2. Landing page (hero, services, projects, contact) — reuses these tokens/components.
3. Inner pages (`/about`, `/services`, `/contact`) + contact form via a Cloudflare Pages Function → `info@venturabuilders.africa`.
4. Connect the `venturabuilders.africa` custom domain.
5. Phase 2 — print company brochure.

_Placeholders pending client input: real project photography, confirmed phone/address._
