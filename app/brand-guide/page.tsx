import type { Metadata } from "next";
import styles from "@/components/brand/guide.module.css";
import { Board } from "@/components/brand/Board";
import { Swatch } from "@/components/brand/Swatch";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Field } from "@/components/ui/Field";
import { Stat } from "@/components/ui/Stat";
import { Icon } from "@/components/ui/Icon";
import { brandColors, neutralColors, stateColors, typeScale, spacingScale, motionTokens } from "@/lib/tokens";
import { brand, archetype, goldenCircle, voicePrinciples, sampleCopy, services, values, stats, type IconName } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Brand Design System",
  description:
    "Logo, colour, typography, components, iconography, data-visualisation, imagery, motion and voice for Ventura Builders & Developers — built to international standards (W3C design tokens, WCAG 2.2 AA, 8-pt grid).",
  /* Internal page: robots.txt disallows crawling, but only noindex prevents
     indexing via external links. */
  robots: { index: false, follow: false },
};

const TOC = [
  ["strategy", "Strategy"],
  ["logo", "Logo"],
  ["colour", "Colour"],
  ["type", "Type"],
  ["grid", "Grid"],
  ["components", "Components"],
  ["icons", "Icons"],
  ["data", "Data-viz"],
  ["imagery", "Imagery"],
  ["motion", "Motion"],
  ["voice", "Voice"],
  ["applied", "Applied"],
];

const iconList: { name: IconName; label: string }[] = [
  { name: "building", label: "Building" }, { name: "compass", label: "Design" },
  { name: "key", label: "Turnkey" }, { name: "beam", label: "Steel" },
  { name: "bolt", label: "MEP" }, { name: "ruler", label: "Fit-out" },
  { name: "trowel", label: "Renovation" }, { name: "snow", label: "Cold room" },
  { name: "shield", label: "Safety" }, { name: "globe", label: "Standards" },
  { name: "spark", label: "Innovation" }, { name: "coin", label: "Value" },
  { name: "phone", label: "Call" }, { name: "mail", label: "Email" },
  { name: "pin", label: "Location" }, { name: "check", label: "Done" },
];

const barData = [
  { label: "Residential", pct: 90, accent: true },
  { label: "Warehouse", pct: 70 },
  { label: "Commercial", pct: 62 },
  { label: "Industrial", pct: 48 },
  { label: "Education", pct: 35 },
];

export default function BrandGuide() {
  return (
    <>
      {/* ---------------- Cover ---------------- */}
      <header className={styles.cover}>
        <div className="container">
          <div className={styles.coverInner}>
            <Logo variant="white" height={64} className={styles.coverLogo} />
            <span className={styles.coverEyebrow}>Brand Design System · v1.0</span>
            <h1 className={styles.coverTitle}>The way Ventura looks, sounds & builds.</h1>
            <p className={styles.coverLead}>
              A single source of truth for {brand.name} — engineered to international
              standards so every touchpoint, from this website to site signage, feels
              unmistakably Ventura.
            </p>
            <div className={styles.coverMeta}>
              <span><strong>Domain</strong> {brand.domain}</span>
              <span><strong>Standards</strong> W3C Design Tokens · WCAG 2.2 AA · 8-pt grid</span>
              <span><strong>Prepared for</strong> client approval</span>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- Sticky TOC ---------------- */}
      <nav className={styles.toc} aria-label="Brand guide sections">
        <div className="container">
          <div className={styles.tocInner}>
            <span className={styles.tocBrand}>Ventura&nbsp;BDS</span>
            <div className={styles.tocLinks}>
              {TOC.map(([id, label]) => (
                <a key={id} href={`#${id}`} className={styles.tocLink}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ---------------- 01 · Strategy ---------------- */}
      <Board
        index="01"
        id="strategy"
        title="Brand strategy"
        sub="Who Ventura is before how it looks — the foundation every design decision answers to."
        standard={<>Framework: <strong>brand archetypes</strong> + Simon Sinek&apos;s <strong>Golden Circle</strong></>}
      >
        <div className={styles.strategyTop}>
          <div>
            <span className="eyebrow">Archetype</span>
            <h3 style={{ fontSize: "var(--fs-h4)", marginTop: "var(--space-2)" }}>
              {archetype.primary} <span style={{ color: "var(--neutral-400)" }}>×</span> {archetype.secondary}
            </h3>
            <p style={{ marginTop: "var(--space-3)", color: "var(--color-text-muted)" }}>{archetype.description}</p>
            <div className={styles.traits}>
              {archetype.traits.map((t) => <Badge key={t} tone="navy">{t}</Badge>)}
            </div>
          </div>
          <div>
            <span className="eyebrow">Promise</span>
            <p style={{ fontSize: "var(--fs-h5)", fontFamily: "var(--font-display-stack)", fontWeight: 800, marginTop: "var(--space-2)", color: "var(--color-primary)" }}>
              &ldquo;{brand.tagline}&rdquo;
            </p>
            <p style={{ marginTop: "var(--space-3)", color: "var(--color-text-muted)" }}>{brand.positioning}</p>
            <p style={{ marginTop: "var(--space-4)", fontSize: "var(--fs-small)", color: "var(--color-text-muted)" }}>
              <strong style={{ color: "var(--color-primary)" }}>Visual metaphor:</strong> shield = security &amp; trust · hard hat = safety · &ldquo;V&rdquo; = forward momentum.
            </p>
          </div>
        </div>
        <div className={styles.golden}>
          {goldenCircle.map((g) => (
            <div key={g.ring} className={styles.ring}>
              <div className={styles.ringName}>{g.ring}</div>
              <p>{g.text}</p>
            </div>
          ))}
        </div>
      </Board>

      {/* ---------------- 02 · Logo ---------------- */}
      <Board
        index="02"
        id="logo"
        title="Logo usage"
        sub="The shield-and-hard-hat lockup is the brand's most valuable asset. Protect it."
        standard={<>Clear space &amp; minimum sizing per <strong>identity-system convention</strong></>}
        alt
      >
        <div className={styles.cardGrid}>
          <div className={styles.panel}>
            <div className={styles.panelLabel}>Primary · on light</div>
            <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-5)" }}>
              <Logo variant="color" height={120} />
            </div>
          </div>
          <div className={styles.panel} style={{ background: "var(--navy-700)", borderColor: "var(--navy-700)" }}>
            <div className={styles.panelLabel} style={{ color: "rgba(255,255,255,0.7)" }}>Knockout · on navy</div>
            <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-5)" }}>
              <Logo variant="white" height={120} />
            </div>
          </div>
        </div>

        <h3 className={styles.subhead}>Clear space &amp; minimum size</h3>
        <div className={styles.cardGrid}>
          <div className={styles.panel}>
            <div className={styles.panelLabel}>Clear space ≥ height of the hard hat</div>
            <div style={{ display: "inline-block", padding: "28px", outline: "2px dashed var(--blue-500)", outlineOffset: "-2px", borderRadius: "8px" }}>
              <Logo variant="color" height={84} />
            </div>
          </div>
          <div className={styles.panel}>
            <div className={styles.panelLabel}>Minimum digital size</div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", padding: "var(--space-4) 0" }}>
              <Logo variant="color" height={32} />
              <span style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-small)" }}>
                32&nbsp;px tall floor on screen (24&nbsp;mm in print) to keep &ldquo;Builders and Developers&rdquo; legible.
              </span>
            </div>
          </div>
        </div>

        <h3 className={styles.subhead}>Do &amp; don&apos;t</h3>
        <div className={styles.doDont}>
          <div className={`${styles.ddCard} ${styles.ddDo}`}>
            <div className={styles.ddHead}><Icon name="check" size={18} /> Do</div>
            <ul className={styles.ddList}>
              <li>Use the knockout version on navy or photography.</li>
              <li>Keep the full lockup&apos;s proportions locked.</li>
              <li>Give it room — respect the clear space.</li>
            </ul>
          </div>
          <div className={`${styles.ddCard} ${styles.ddDont}`}>
            <div className={styles.ddHead}>✕ Don&apos;t</div>
            <ul className={styles.ddList}>
              <li>Recolour, stretch or rotate the mark.</li>
              <li>Place the colour logo on busy or low-contrast backgrounds.</li>
              <li>Add shadows, outlines or effects.</li>
            </ul>
          </div>
        </div>
      </Board>

      {/* ---------------- 03 · Colour ---------------- */}
      <Board
        index="03"
        id="colour"
        title="Colour system"
        sub="Navy for trust, amber for energy — specified across screen, print and signage, and checked for accessibility."
        standard={<>Cross-media HEX/RGB/CMYK/Pantone · live <strong>WCAG 2.2</strong> contrast (4.5:1 text, 3:1 UI)</>}
      >
        <h3 className={styles.subhead}>Brand</h3>
        <div className={styles.swatchGrid}>
          {brandColors.map((c) => <Swatch key={c.varName} c={c} />)}
        </div>
        <h3 className={styles.subhead}>Neutrals</h3>
        <div className={styles.swatchGrid}>
          {neutralColors.map((c) => <Swatch key={c.varName} c={c} />)}
        </div>
        <h3 className={styles.subhead}>State</h3>
        <div className={styles.swatchGrid}>
          {stateColors.map((c) => <Swatch key={c.varName} c={c} />)}
        </div>
        <p style={{ marginTop: "var(--space-5)", color: "var(--color-text-muted)", fontSize: "var(--fs-small)" }}>
          Distribution follows the <strong>60-30-10</strong> rule: ~60% white/neutral, ~30% navy, ~10% amber.
          Amber never carries body text — it fails AA on white and with white text, so it pairs with navy text only.
        </p>
      </Board>

      {/* ---------------- 04 · Typography ---------------- */}
      <Board
        index="04"
        id="type"
        title="Typography"
        sub="Montserrat builds the headlines; Inter carries the reading. One geometric voice, one workhorse."
        standard={<><strong>Major-Third (1.25)</strong> modular scale · measure 45–75 characters</>}
        alt
      >
        <div className={styles.fontCards}>
          <div className={styles.fontCard}>
            <div className={`${styles.fontBig} ${styles.fontDisplay}`}>Aa</div>
            <div className={styles.fontMeta}>
              <strong style={{ color: "var(--color-text)" }}>Montserrat</strong> — display / headings
            </div>
            <div className={styles.fontRow}>
              <span className={styles.weightChip} style={{ fontWeight: 700 }}>Bold 700</span>
              <span className={styles.weightChip} style={{ fontWeight: 800 }}>Extrabold 800</span>
            </div>
          </div>
          <div className={styles.fontCard}>
            <div className={`${styles.fontBig} ${styles.fontBody}`}>Aa</div>
            <div className={styles.fontMeta}>
              <strong style={{ color: "var(--color-text)" }}>Inter</strong> — body / UI
            </div>
            <div className={styles.fontRow}>
              <span className={styles.weightChip} style={{ fontWeight: 400 }}>Regular 400</span>
              <span className={styles.weightChip} style={{ fontWeight: 500 }}>Medium 500</span>
              <span className={styles.weightChip} style={{ fontWeight: 600 }}>Semibold 600</span>
            </div>
          </div>
        </div>
        <div className={styles.typeList}>
          {typeScale.map((t) => (
            <div key={t.name} className={styles.typeRow}>
              <div className={styles.typeSample} style={{ fontSize: `var(${t.cssVar})` }}>
                {t.name === "Body" || t.name === "Small" || t.name === "Caption" || t.name.startsWith("Body")
                  ? "Build with confidence — engineered to last."
                  : "Build with confidence"}
              </div>
              <div className={styles.typeMeta}>{t.name} · {t.px}px · {t.usage}</div>
            </div>
          ))}
        </div>
      </Board>

      {/* ---------------- 05 · Grid & spacing ---------------- */}
      <Board
        index="05"
        id="grid"
        title="Grid &amp; spacing"
        sub="Everything snaps to a rhythm, so layouts feel calm and scale predictably across devices."
        standard={<><strong>8-pt spacing grid</strong> · 12-column responsive layout</>}
      >
        <h3 className={styles.subhead}>Spacing scale (8-pt)</h3>
        <div className={styles.spaceList}>
          {spacingScale.map((s) => (
            <div key={s.token} className={styles.spaceRow}>
              <span className={styles.spaceLabel}>{s.token.replace("--space-", "space ")} · {s.px}px</span>
              <span className={styles.spaceBar} style={{ width: `${s.px}px` }} />
            </div>
          ))}
        </div>
        <h3 className={styles.subhead}>12-column grid</h3>
        <div className={styles.gridDemo}>
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className={styles.gridCol}>{i + 1}</div>)}
        </div>
      </Board>

      {/* ---------------- 06 · Components ---------------- */}
      <Board
        index="06"
        id="components"
        title="UI components"
        sub="The real, accessible building blocks of the site — not mock-ups. Approve these and the site is half-built."
        standard={<>Token-driven · keyboard-focus &amp; ARIA · <strong>WCAG 2.2 AA</strong></>}
        alt
      >
        <div className={styles.showcase}>
          <div className={styles.panel}>
            <div className={styles.panelLabel}>Buttons</div>
            <div className={styles.row}>
              <Button variant="primary" icon="arrow">Get a quote</Button>
              <Button variant="secondary">Our services</Button>
              <Button variant="ghost">Learn more</Button>
              <Button variant="primary" disabled>Disabled</Button>
            </div>
            <div className={styles.row} style={{ marginTop: "var(--space-4)" }}>
              <Button variant="primary" size="lg" icon="phone">Call the team</Button>
              <Button variant="secondary" size="lg">View projects</Button>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelLabel}>Badges</div>
            <div className={styles.row}>
              <Badge tone="navy">Residential</Badge>
              <Badge tone="amber">Featured</Badge>
              <Badge tone="blue">ISO-aligned</Badge>
              <Badge tone="neutral">Draft</Badge>
              <Badge tone="success">On track</Badge>
              <Badge tone="warning">Pending</Badge>
              <Badge tone="error">Delayed</Badge>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelLabel}>Cards — services</div>
            <div className={styles.cardGrid}>
              {services.slice(0, 4).map((s) => (
                <Card key={s.title} title={s.title} icon={s.icon}>{s.blurb}</Card>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelLabel}>Cards — values</div>
            <div className={styles.cardGrid}>
              {values.map((v) => (
                <Card key={v.title} title={v.title} icon={v.icon} variant="value">{v.text}</Card>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelLabel}>Form fields</div>
            <div className={styles.fieldGrid}>
              <Field label="Full name" name="demo-name" placeholder="Jane Mwila" required />
              <Field label="Email" name="demo-email" type="email" placeholder="you@company.com" required />
              <Field label="Phone" name="demo-phone" placeholder="+260 …" hint="We&apos;ll only use this to reply." />
              <Field label="Budget" name="demo-budget" placeholder="ZMW" error="Please enter a number." />
            </div>
            <div style={{ marginTop: "var(--space-4)", maxWidth: 720 }}>
              <Field label="Project details" name="demo-msg" textarea placeholder="Tell us about your build…" />
            </div>
          </div>
        </div>
      </Board>

      {/* ---------------- 07 · Iconography ---------------- */}
      <Board
        index="07"
        id="icons"
        title="Iconography"
        sub="A single line-icon family speaks a universal, cross-cultural language across services and UI."
        standard={<>24px grid · 2px stroke · two-tone navy + amber</>}
      >
        <div className={styles.iconGrid}>
          {iconList.map((i) => (
            <div key={i.name} className={styles.iconCell}>
              <Icon name={i.name} size={30} />
              <span>{i.label}</span>
            </div>
          ))}
        </div>
      </Board>

      {/* ---------------- 08 · Data-viz ---------------- */}
      <Board
        index="08"
        id="data"
        title="Data-visualisation &amp; infographics"
        sub="Turn proof points — projects, sectors, safety — into scannable visuals. One message per graphic."
        standard={<>Chart matched to data type · animated count-up (reduced-motion safe)</>}
        alt
      >
        <div className={styles.statBand}>
          {stats.map((s) => <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} />)}
        </div>
        <div className={styles.vizGrid}>
          <div>
            <div className={styles.panelLabel}>Projects by sector (share)</div>
            <div className={styles.barChart}>
              {barData.map((b) => (
                <div key={b.label} className={styles.barWrap}>
                  <div className={`${styles.bar} ${b.accent ? styles.accent : ""}`} style={{ height: `${b.pct}%` }} />
                  <span className={styles.barLabel}>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.panelLabel}>Delivery process</div>
            <div className={styles.process}>
              {["Brief", "Design", "Build", "Handover"].map((step, i, arr) => (
                <span key={step} style={{ display: "contents" }}>
                  <span className={styles.processStep}><b>{i + 1}</b> {step}</span>
                  {i < arr.length - 1 ? <Icon name="arrow" size={18} className={styles.processArrow} /> : null}
                </span>
              ))}
            </div>
            <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)", fontSize: "var(--fs-small)" }}>
              Quantities → bars · steps → process chips · single headline metric → count-up. Keep text minimal and the flow obvious.
            </p>
          </div>
        </div>
      </Board>

      {/* ---------------- 09 · Imagery ---------------- */}
      <Board
        index="09"
        id="imagery"
        title="Imagery &amp; art direction"
        sub="Real construction, real people, real scale — unified by a navy-graded treatment."
        standard={<>Consistent duotone treatment · 4:3 / 16:9 ratios</>}
      >
        <div className={styles.imageryGrid}>
          <figure className={styles.photoTile}>
            <img src="/imagery/towers.jpg" alt="Modern towers, natural colour" loading="lazy" />
            <figcaption className={styles.photoCap}>Natural photo</figcaption>
          </figure>
          <figure className={styles.photoTile}>
            <img src="/imagery/towers-duo.jpg" alt="Same image, navy duotone treatment" loading="lazy" />
            <figcaption className={styles.photoCap}>Navy duotone — the brand treatment</figcaption>
          </figure>
          <figure className={styles.photoTile}>
            <img src="/imagery/crane-duo.jpg" alt="Crane at dusk with text overlay" loading="lazy" />
            <div className={styles.photoOverlayText}>
              <span className="eyebrow">Build with confidence</span>
              <h4>Overlay keeps headlines legible</h4>
            </div>
          </figure>
        </div>
        <div className={styles.doDont}>
          <div className={`${styles.ddCard} ${styles.ddDo}`}>
            <div className={styles.ddHead}><Icon name="check" size={18} /> Do</div>
            <ul className={styles.ddList}>
              <li>Show finished work, crews on site, and human scale.</li>
              <li>Apply the navy duotone for cohesion across sources.</li>
              <li>Keep a focal subject; leave room for headlines.</li>
            </ul>
          </div>
          <div className={`${styles.ddCard} ${styles.ddDont}`}>
            <div className={styles.ddHead}>✕ Don&apos;t</div>
            <ul className={styles.ddList}>
              <li>Use generic clip-art or heavily filtered stock.</li>
              <li>Mix wildly different colour grades in one set.</li>
              <li>Bury the subject behind text with no overlay.</li>
            </ul>
          </div>
        </div>
        <h3 className={styles.subhead}>Featured work — treatment applied</h3>
        <div className={styles.projectGrid}>
          {[
            { img: "frame", b: "Steel-frame warehouse", s: "Industrial" },
            { img: "glass", b: "Glass office tower", s: "Commercial" },
            { img: "residence", b: "Private residence", s: "Residential" },
            { img: "site", b: "Site & civil works", s: "Civil" },
            { img: "crew", b: "On-site delivery", s: "Safety-first" },
            { img: "design", b: "Design & planning", s: "Pre-construction" },
          ].map((p) => (
            <figure key={p.img} className={styles.projectCard}>
              <img src={`/imagery/${p.img}-duo.jpg`} alt={p.b} loading="lazy" />
              <figcaption className={styles.projectMeta}>
                <b>{p.b}</b>
                <span>{p.s}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p style={{ marginTop: "var(--space-4)", color: "var(--color-text-muted)", fontSize: "var(--fs-caption)" }}>
          Photography is licensed stock (Unsplash) showcasing the <em>treatment</em> — to be
          replaced with real Ventura project photography before launch.
        </p>
      </Board>

      {/* ---------------- 10 · Motion ---------------- */}
      <Board
        index="10"
        id="motion"
        title="Motion"
        sub="Movement should feel purposeful and quick — confirming actions, never showing off. Hover a card to preview."
        standard={<>Duration &amp; easing tokens · honours <strong>prefers-reduced-motion</strong></>}
        alt
      >
        <div className={styles.motionRow}>
          {motionTokens.map((m) => (
            <div key={m.token} className={styles.motionCard} style={{ "--dur": m.value } as React.CSSProperties}>
              <div className={styles.motionDemoBox}><span className={styles.motionDot} /></div>
              <div className={styles.motionMeta}>
                <b>{m.token}</b> — {m.value}<br />{m.usage}
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "var(--space-5)", color: "var(--color-text-muted)", fontSize: "var(--fs-small)" }}>
          Standard easing <code>cubic-bezier(.2,0,0,1)</code>. All motion collapses to instant for users who prefer reduced motion.
        </p>
      </Board>

      {/* ---------------- 11 · Voice ---------------- */}
      <Board
        index="11"
        id="voice"
        title="Voice &amp; tone"
        sub="Confident, clear and human — the way Ventura would talk a client through a site walk."
        standard={<>Four principles + applied sample copy</>}
      >
        <div className={styles.voiceGrid}>
          {voicePrinciples.map((v) => (
            <div key={v.title} className={styles.voiceCard}>
              <h4>{v.title}</h4>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.panel} style={{ marginTop: "var(--space-6)", maxWidth: 680 }}>
          <div className={styles.panelLabel}>Sample copy — in voice</div>
          <p style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: "var(--fs-small)", fontFamily: "var(--font-display-stack)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{sampleCopy.eyebrow}</p>
          <p style={{ fontFamily: "var(--font-display-stack)", fontWeight: 800, fontSize: "var(--fs-h4)", marginTop: "var(--space-2)" }}>{sampleCopy.headline}</p>
          <p style={{ marginTop: "var(--space-2)", color: "var(--color-text-muted)" }}>{sampleCopy.subhead}</p>
        </div>
      </Board>

      {/* ---------------- 12 · Applied ---------------- */}
      <Board
        index="12"
        id="applied"
        title="The system, applied"
        sub="A homepage hero built entirely from the tokens and components above — the brand in situ."
        standard={<>Logo + colour + type + components + voice, composed</>}
        alt
      >
        <div className={styles.heroSample}>
          <span className={styles.heroSampleEyebrow}>{sampleCopy.eyebrow}</span>
          <h3 className={styles.heroSampleTitle}>{sampleCopy.headline}</h3>
          <p className={styles.heroSampleText}>{sampleCopy.subhead}</p>
          <div className={styles.heroSampleCtas}>
            <Button variant="primary" size="lg" icon="arrow">{sampleCopy.ctaPrimary}</Button>
            <Button variant="ghost" size="lg" className={styles.onDark}>{sampleCopy.ctaSecondary}</Button>
          </div>
        </div>
      </Board>

      {/* ---------------- Footer ---------------- */}
      <footer className={styles.foot}>
        <div className="container">
          <div className={styles.footInner}>
            <Logo variant="white" height={40} />
            <span>Brand Design System v1.0 · {brand.domain} · prepared for client approval</span>
          </div>
        </div>
      </footer>
    </>
  );
}
