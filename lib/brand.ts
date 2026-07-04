/* Brand strategy & content shown on the guide and reused across the site. */

export const brand = {
  name: "Ventura Builders & Developers",
  shortName: "Ventura Builders",
  domain: "venturabuilders.africa",
  email: "info@venturabuilders.africa",
  tagline: "Build with confidence.",
  positioning:
    "Engineering-grade reliability and safety for residential, commercial and industrial builds across the region.",
};

export const archetype = {
  primary: "The Builder (Creator)",
  secondary: "The Hero",
  description:
    "Capable, dependable and precise — a maker that turns ambitious plans into solid, lasting structures, and a hero that overcomes site challenges so clients can build a better future with confidence.",
  traits: ["Dependable", "Precise", "Bold", "Safety-first", "Grounded"],
};

export const goldenCircle = [
  {
    ring: "Why",
    text: "We believe everyone deserves to build with confidence — structures that are safe, lasting and worthy of trust.",
  },
  {
    ring: "How",
    text: "By working to international standards, putting safety first, and delivering best value through disciplined planning and quality control.",
  },
  {
    ring: "What",
    text: "Main contracting, design & build, turnkey projects, steel structures, MEP, fit-out and specialist cold-room works.",
  },
];

export const voicePrinciples = [
  { title: "Clear, not clever", text: "Plain language that a client, an engineer and an investor all understand. Lead with the point." },
  { title: "Confident, not boastful", text: "State capability with evidence — projects, standards, numbers — never empty superlatives." },
  { title: "Human and respectful", text: "We speak to people, not 'stakeholders'. Warm, professional, and straight." },
  { title: "Safety runs through it", text: "Care for people and quality is implied in how we say things, not just what we say." },
];

export const sampleCopy = {
  eyebrow: "Residential · Commercial · Industrial",
  headline: "Build with confidence.",
  subhead:
    "Ventura Builders & Developers delivers safe, high-quality construction — engineered to international standards and finished on time.",
  ctaPrimary: "Get a quote",
  ctaSecondary: "View our work",
};

/* Services. `blurb` = home cards, `detail` = /services cards; the remaining
   fields drive the per-service detail pages (/services/<slug>). Copy describes
   CAPABILITY — what we do and how — never claimed past contracts. */
export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  blurb: string;
  detail: string;
  image: string;
  imageAlt: string;
  intro: string[];
  includes: string[];
  sectors: string[]; // industries[].title values this service most often serves
};
export const services: Service[] = [
  {
    slug: "main-contracting",
    title: "Main Contracting",
    icon: "building",
    blurb: "End-to-end delivery of civil and structural works.",
    detail:
      "We act as principal contractor on civil and structural works — coordinating every trade, supplier and inspection so your project moves on a single, accountable programme.",
    image: "/imagery/mixeduse.jpg",
    imageAlt: "Tower cranes over a mid-rise development at blue hour",
    intro: [
      "As principal contractor, we take responsibility for the whole site — every trade, supplier, inspection and programme milestone under one accountable team.",
      "You get a single point of contact, a clear reporting rhythm and a programme we hold ourselves to. From groundworks to final inspections, we manage the moving parts so you always know exactly where the build stands.",
    ],
    includes: [
      "Full site establishment, management and security",
      "Programme planning and weekly progress reporting",
      "Trade and subcontractor coordination",
      "Materials procurement and quality inspection",
      "HSE management enforced on site",
      "Documented, defect-free handover",
    ],
    sectors: ["Commercial", "Industrial", "Residential", "Civil & Infrastructure"],
  },
  {
    slug: "design-and-build",
    title: "Design & Build",
    icon: "compass",
    blurb: "Single-point responsibility from concept to handover.",
    detail:
      "One contract from concept to completion. Our design-and-build teams align architecture, engineering and construction early to cut risk, cost and time.",
    image: "/imagery/planning.jpg",
    imageAlt: "Architectural drawings, hard hat and tablet on a site planning table at dusk",
    intro: [
      "One contract, one team, one accountable partner from first sketch to final handover. Design & build brings the architects, engineers and builders to the same table from day one.",
      "Aligning design and construction early closes the gaps where cost and time usually escape — buildability is tested while the design is still on paper, and pricing is grounded in how the building will actually be built.",
    ],
    includes: [
      "Brief development and feasibility",
      "Architectural and engineering design coordination",
      "Cost planning that develops with the design",
      "Statutory approvals support",
      "Construction by the same accountable team",
      "Commissioning and handover",
    ],
    sectors: ["Residential", "Commercial", "Hospitality"],
  },
  {
    slug: "turnkey-projects",
    title: "Turnkey Projects",
    icon: "key",
    blurb: "Fully finished, ready-to-use facilities.",
    detail:
      "Hand us the brief and take the keys at the end. We deliver fully finished, commissioned facilities ready to occupy and operate from day one.",
    image: "/imagery/lobby.jpg",
    imageAlt: "Finished commercial lobby at handover — polished stone and warm lighting at dusk",
    intro: [
      "Hand us the brief; take back the keys. Turnkey delivery means we carry the project end to end — design, construction, services, finishes and commissioning — and hand over a facility that is ready to occupy and operate.",
      "It suits clients who want certainty more than involvement: one fixed scope, one programme, and a single team responsible for everything between the two.",
    ],
    includes: [
      "End-to-end scope, design through commissioning",
      "Fixed, transparent scope and programme",
      "Services, fit-out and finishes included",
      "Testing and commissioning of every system",
      "Operator training and documentation",
      "Ready-to-operate handover",
    ],
    sectors: ["Commercial", "Industrial", "Health & Education"],
  },
  {
    slug: "steel-structures",
    title: "Steel Structures",
    icon: "beam",
    blurb: "Warehouses, sheds and industrial steel buildings.",
    detail:
      "Fabrication and erection of warehouses, sheds and industrial steel buildings — engineered for span, load and speed of construction.",
    image: "/imagery/steelframe.jpg",
    imageAlt: "Steel frame erection at blue hour — crane hook lifting a beam into place",
    intro: [
      "Warehouses, workshops, sheds and industrial buildings — engineered steel structures designed for span, load and speed of construction.",
      "We coordinate structural design, fabrication and erection as one package, with connections, cladding and finishes specified for decades of hard use.",
    ],
    includes: [
      "Structural steel design coordination",
      "Fabrication to engineering specification",
      "Erection by trained, competent site teams",
      "Roofing, cladding and insulation",
      "Mezzanines, gantries and platforms",
      "Protective coatings and finishes",
    ],
    sectors: ["Industrial", "Commercial", "Civil & Infrastructure"],
  },
  {
    slug: "mep-contracting",
    title: "MEP Contracting",
    icon: "bolt",
    blurb: "Mechanical, electrical and plumbing systems.",
    detail:
      "Mechanical, electrical and plumbing systems designed, installed and tested to keep your building safe, efficient and compliant.",
    image: "/imagery/mep.jpg",
    imageAlt: "Neat electrical conduit and ductwork runs in an exposed ceiling during services installation",
    intro: [
      "Mechanical, electrical and plumbing systems are the working heart of a building. We design, install, test and commission them to be safe, efficient and ready for the loads they will actually carry.",
      "Our MEP teams work inside the main build programme — coordinated with structure and finishes so services go in once, correctly, without rework.",
    ],
    includes: [
      "Electrical reticulation and distribution",
      "Plumbing, drainage and water systems",
      "Ventilation and air-conditioning (HVAC)",
      "Fire detection and protection coordination",
      "Testing, commissioning and certification",
      "Maintenance documentation at handover",
    ],
    sectors: ["Commercial", "Industrial", "Health & Education"],
  },
  {
    slug: "interior-fit-out",
    title: "Interior & Fit-out",
    icon: "ruler",
    blurb: "Offices, retail and residential interiors.",
    detail:
      "Office, retail and residential interiors finished to specification — from partitions and ceilings to joinery, flooring and final detailing.",
    image: "/imagery/interiors.jpg",
    imageAlt: "Open-plan office interior in the final stage of fit-out at dusk",
    intro: [
      "Offices, retail and residential interiors finished to specification — partitions, ceilings, joinery, flooring and the final detail that decides how a space feels.",
      "We fit out new shells and transform occupied buildings alike, sequencing the work to keep disruption low and finish quality high.",
    ],
    includes: [
      "Space planning and detailed setting-out",
      "Partitions, ceilings and acoustic treatments",
      "Joinery, fittings and fixtures",
      "Flooring, tiling and decoration",
      "Lighting and small-power coordination",
      "Snag-free, deep-cleaned handover",
    ],
    sectors: ["Commercial", "Residential", "Hospitality"],
  },
  {
    slug: "renovations",
    title: "Renovations",
    icon: "trowel",
    blurb: "Upgrades, extensions and refurbishments.",
    detail:
      "Upgrades, extensions and refurbishments that modernise existing buildings with minimal disruption to the people using them.",
    image: "/imagery/renovation.jpg",
    imageAlt: "Existing building wrapped in neat scaffolding during refurbishment at dusk",
    intro: [
      "Upgrades, extensions and refurbishments that modernise existing buildings — without losing what made them worth keeping.",
      "Working in and around occupied buildings takes planning. We sequence the work, protect the people using the space, and keep you informed at every stage.",
    ],
    includes: [
      "Condition assessment and scoping",
      "Structural alterations and extensions",
      "Re-roofing, waterproofing and repairs",
      "Electrical, plumbing and HVAC upgrades",
      "Phased programmes for occupied buildings",
      "Compliance and safety upgrades",
    ],
    sectors: ["Residential", "Commercial", "Health & Education"],
  },
  {
    slug: "cold-rooms",
    title: "Cold & Chilled Rooms",
    icon: "snow",
    blurb: "Specialist temperature-controlled facilities.",
    detail:
      "Specialist temperature-controlled facilities — cold rooms, chillers and freezer stores — built and insulated to hold precise conditions.",
    image: "/imagery/coldroom.jpg",
    imageAlt: "New commercial cold room — insulated panels, stainless shelving and a hygienic coved floor",
    intro: [
      "Specialist temperature-controlled facilities — cold rooms, chillers and freezer stores — built and insulated to hold precise conditions, reliably.",
      "From panel systems and doors to refrigeration coordination and hygienic floor details, every element is specified for the duty the facility has to perform.",
    ],
    includes: [
      "Insulated panel supply and installation",
      "Hygienic floors, coves and drainage",
      "Refrigeration plant coordination",
      "Rapid and sectional door systems",
      "Temperature monitoring provisions",
      "Commissioning and performance verification",
    ],
    sectors: ["Industrial", "Commercial", "Hospitality"],
  },
];

export const values: { title: string; icon: IconName; text: string }[] = [
  { title: "Innovation", icon: "spark", text: "Bringing modern methods and technology to every site." },
  { title: "International Standards", icon: "globe", text: "Meeting and exceeding global quality benchmarks." },
  { title: "Safety First", icon: "shield", text: "Everyone goes home safe — no compromise on HSE." },
  { title: "Best Value", icon: "coin", text: "Optimal returns through disciplined cost control." },
];

/* Sectors we build for. Six sectors aligns with the "6 sectors served" stat. */
export const industries: { title: string; icon: IconName; text: string }[] = [
  { title: "Residential", icon: "key", text: "Homes and housing developments built to last." },
  { title: "Commercial", icon: "building", text: "Offices, retail and mixed-use developments." },
  { title: "Industrial", icon: "beam", text: "Warehouses, factories and logistics facilities." },
  { title: "Hospitality", icon: "compass", text: "Hotels, lodges and leisure destinations." },
  { title: "Health & Education", icon: "shield", text: "Clinics, schools and institutional buildings." },
  { title: "Civil & Infrastructure", icon: "globe", text: "Roads, site works and public infrastructure." },
];

/* Portfolio. NOTE: imagery is AI-generated ILLUSTRATIVE imagery (navy-duotone
   treated) — entries describe build TYPES we deliver, not claimed contracts,
   so there are deliberately no locations, areas, dates or client names.
   Replace with real Ventura projects + photography before launch.
   `sector` must match an industries[].title (drives /projects segmentation).
   The homepage features the first six — one per sector. */
export type Project = {
  img: string;
  title: string;
  sector: string;
  summary: string;
  services: string[]; // services[].title values typically involved
};
export const projects: Project[] = [
  {
    img: "warehouse",
    title: "Steel-frame warehousing & logistics",
    sector: "Industrial",
    summary:
      "Long-span steel structures with high-bay storage, loading docks and office pods — engineered for throughput and decades of duty.",
    services: ["Steel Structures", "Main Contracting"],
  },
  {
    img: "offices",
    title: "Commercial office developments",
    sector: "Commercial",
    summary:
      "Modern workplaces with efficient floor plates, full building services and the lobby and façade finishes that set the tone at the door.",
    services: ["Main Contracting", "MEP Contracting"],
  },
  {
    img: "homes",
    title: "Private residences & housing",
    sector: "Residential",
    summary:
      "Family homes and housing developments delivered design-to-keys, with the finish quality and supervision a home deserves.",
    services: ["Design & Build", "Interior & Fit-out"],
  },
  {
    img: "lodge",
    title: "Hotel & leisure developments",
    sector: "Hospitality",
    summary:
      "Lodges, hotels and leisure destinations where acoustics, services and finish quality carry the entire guest experience.",
    services: ["Main Contracting", "Interior & Fit-out"],
  },
  {
    img: "campus",
    title: "Clinics, schools & campuses",
    sector: "Health & Education",
    summary:
      "Institutional buildings built around the people who use them — safe sites beside live facilities, hygienic finishes, dependable services.",
    services: ["Main Contracting", "Renovations"],
  },
  {
    img: "roads",
    title: "Roads, earthworks & site services",
    sector: "Civil & Infrastructure",
    summary:
      "Bulk earthworks, roads, drainage and services — the groundwork every dependable development stands on.",
    services: ["Main Contracting"],
  },
  {
    img: "mixeduse",
    title: "Mixed-use developments",
    sector: "Commercial",
    summary:
      "Retail, office and residential uses combined on one site — phased so early stages can open while later ones build.",
    services: ["Turnkey Projects", "Design & Build"],
  },
  {
    img: "power",
    title: "Power & utility connections",
    sector: "Civil & Infrastructure",
    summary:
      "Electrical reticulation, water and drainage coordinated with the authorities — utilities brought safely to where the build needs them.",
    services: ["MEP Contracting", "Main Contracting"],
  },
  {
    img: "interiors",
    title: "Workplace interiors & fit-out",
    sector: "Commercial",
    summary:
      "Interiors planned to the millimetre — partitions, joinery, lighting and finishes that turn a shell into a place people want to work.",
    services: ["Interior & Fit-out", "MEP Contracting"],
  },
];

export const stats = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 15, suffix: "+", label: "Years of experience" },
  { value: 6, suffix: "", label: "Sectors served" },
  { value: 100, suffix: "%", label: "Safety commitment" },
];

/* Contact details. NOTE: phone + address are PLACEHOLDERS pending the client —
   only `email` is confirmed. Surface them as clearly marked placeholders until
   real details land (see docs/ROADMAP.md "Open items"). */
export const contact = {
  email: brand.email,
  phone: "+243 817 106 314",
  phonePlaceholder: false,
  whatsapp: "+91 87438 89943",
  address: "Ventura Builders & Developers SARL\nOffice 2F15, 2nd floor. Hypnose Building.\n826 Av. Mama Yemo crossing Tabora,\nLubumbashi, DRC.",
  addressPlaceholder: false,
};

/* Site navigation. Route-aware inner pages (M3); full sitemap (M7).
   A nav entry is either a single link or a labelled group (dropdown). */
export type NavLink = { label: string; href: string };
export type NavGroup = { label: string; children: NavLink[] };
export type NavEntry = NavLink | NavGroup;
export const isNavGroup = (e: NavEntry): e is NavGroup => "children" in e;

export const nav: NavEntry[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Sectors", href: "/projects" },
  { label: "Approach", href: "/approach" },
  { label: "Careers", href: "/careers" },
  { label: "CSR", href: "/csr" },
  /*
  {
    label: "New",
    children: [
      { label: "How we work", href: "/how-we-work" },
      { label: "Build Explorer", href: "/build-explorer" },
      { label: "Site Cam Time-Lapse", href: "/site-cam" },
      { label: "Our Structure", href: "/our-structure" },
      { label: "Site map", href: "/site-map" },
      { label: "Anatomy of a wall", href: "/anatomy-of-a-wall" },
      { label: "Case Study", href: "/project-views" },
    ],
  },
  */
  { label: "Contact", href: "/contact" },
];

/* Secondary links surfaced in the footer only. */
export const footerLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "CSR Policies", href: "/csr" },
];

/* FAQ — shown on /contact with FAQPage structured data. Honest answers only:
   no invented prices, timelines or certifications. */
export const faqs: { q: string; a: string }[] = [
  {
    q: "What kinds of projects do you take on?",
    a: "Residential, commercial and industrial work across Democratic Republic of Congo (DRC) — from family homes and renovations to warehouses, offices and specialist cold rooms. If you're not sure whether your project fits, ask: we'll tell you straight.",
  },
  {
    q: "How do I get a quote?",
    a: "Send the form or email us with whatever you have — a brief, drawings, or just an idea. We'll come back within two business days to arrange a conversation, then follow with a clear, costed plan. No obligation.",
  },
  {
    q: "Do you handle drawings, permits and approvals?",
    a: "Yes. Our design & build service covers architecture, engineering and statutory approvals. If you already have an architect, we price and build from your drawings and support the approvals process.",
  },
  {
    q: "How long will my project take?",
    a: "Honestly: it depends on scope, site and approvals. What we commit to is a realistic programme before work starts — and disciplined reporting against it every week while we build.",
  },
  {
    q: "What standards do you build to?",
    a: "International standards for materials, methods and finish, with safety procedures enforced on every site. Quality is inspected and signed off at each stage — not just at the end.",
  },
  {
    q: "Where do you work?",
    a: "We're based in Lubumbashi and deliver projects across Democratic Republic of Congo (DRC). For the wider region, talk to us about your site and we'll confirm what's possible.",
  },
];

/* Homepage section copy (kept here, not inlined in the page). */
export const home = {
  about: {
    eyebrow: "Who we are",
    title: "A builder you can rely on, from first plan to final handover",
    lead: "Ventura Builders & Developers is a construction and development company delivering residential, commercial and industrial projects across Democratic Republic of Congo (DRC) and the wider region.",
    body: [
      "We take single-point responsibility for the whole build — planning, engineering, construction and finishing — so you have one accountable team and one clear line of communication from day one.",
      "Every project runs to international standards, with disciplined cost control and safety built into each decision on site. The result is work that's delivered on time, on budget, and made to last.",
    ],
    points: [
      "Single point of responsibility, design through handover",
      "International standards and rigorous quality control",
      "Safety-first delivery on every site",
      "Disciplined planning, costing and programming",
    ],
    image: "/imagery/team.jpg",
    imageAlt: "Site team in hi-vis walking towards the works at sunrise",
  },
  services: {
    eyebrow: "What we do",
    title: "Construction services, end to end",
    lead: "From main contracting to specialist cold rooms — single-point responsibility, delivered to international standards.",
  },
  values: {
    eyebrow: "Why Ventura",
    title: "The principles we build on",
    lead: "Four commitments shape how we work — and what you can count on from us on every project.",
  },
  safety: {
    eyebrow: "Safety & quality",
    title: "Everyone goes home safe — and the work outlasts us",
    lead: "Safety and quality aren't add-ons; they're how we build. Our teams work to clear HSE procedures and a quality system that's checked at every stage.",
    points: [
      { icon: "shield" as IconName, title: "Safety-first culture", text: "Site-wide HSE procedures, toolbox talks and protective standards — no shortcuts, ever." },
      { icon: "check" as IconName, title: "Quality assured", text: "Specifications, inspections and sign-offs at every stage, so nothing is left to chance." },
      { icon: "globe" as IconName, title: "International standards", text: "We build to recognised global benchmarks for materials, methods and finish." },
    ],
  },
  industries: {
    eyebrow: "Sectors we serve",
    title: "Capability across six sectors",
    lead: "From homes to heavy industry, we bring the same discipline and standards to every kind of build.",
  },
  projects: {
    eyebrow: "Our work",
    title: "Built to a higher standard",
    lead: "A look at the kinds of projects we deliver — across sectors, scales and finishes.",
    note: "Imagery is illustrative — it shows the kinds of projects we deliver, not photographs of specific Ventura contracts. It will be replaced with Ventura's own project photography.",
  },
  cta: {
    eyebrow: "Build with confidence",
    title: "Ready to start your project?",
    text: "Tell us what you're building and we'll come back with a clear, costed plan — no obligation.",
  },
};

/* Inner-page copy (M3). One object per route, mirroring `home`. */
export const pages = {
  about: {
    header: {
      eyebrow: "About Ventura",
      title: "Built with confidence",
      lead: "We deliver safe, high-quality construction and development across Democratic Republic of Congo (DRC) and the wider region — to international standards, with confidence at the core.",
    },
    story: {
      eyebrow: "Our story",
      title: "Plans become structures you can stand behind",
      paragraphs: [
        "Ventura Builders & Developers was founded on a simple belief: that every client deserves to build with confidence — on time, on budget, and to a standard that lasts.",
        "We bring experienced engineers, project managers and tradespeople together under one accountable team, taking projects from first concept through to final handover. Residential, commercial or industrial, the discipline is the same.",
        "From foundations to fit-out we hold the line on safety and quality — because the structures we put up carry people's homes, work and ambitions.",
      ],
      image: "/imagery/planning.jpg",
      imageAlt: "Construction drawings and hard hat on a site planning table",
    },
    purpose: {
      eyebrow: "Our purpose",
      title: "Why we build",
      lead: "Three questions guide every project we take on.",
    },
    values: {
      eyebrow: "Our values",
      title: "What we stand for",
      lead: "The commitments that shape how we work on every site.",
    },
    cta: {
      eyebrow: "Build with confidence",
      title: "Let's build something that lasts",
      text: "Tell us about your project and our team will come back with a clear, costed plan.",
    },
  },
  services: {
    header: {
      eyebrow: "What we do",
      title: "Construction services, end to end",
      lead: "Single-point responsibility across the full build — from main contracting and design-build to specialist steel, MEP and cold-room works.",
    },
    sectors: {
      eyebrow: "Sectors we serve",
      title: "Capability across six sectors",
      lead: "From homes to heavy industry, we bring the same discipline and standards to every kind of build.",
    },
    cta: {
      eyebrow: "Build with confidence",
      title: "Have a project in mind?",
      text: "Tell us what you're building and we'll come back with a clear, costed plan — no obligation.",
    },
  },
  contact: {
    header: {
      eyebrow: "Contact",
      title: "Let's talk about your project",
      lead: "Send us the details and we'll get back to you with next steps. Prefer email? Reach us directly any time.",
    },
    form: {
      title: "Send us a message",
      lead: "Fill in the form and we'll respond within two business days.",
    },
    details: {
      title: "Reach us directly",
      hoursLabel: "Office hours",
      hours: "Mon–Sat, 08:00–18:00 CAT",
    },
    faq: {
      eyebrow: "Questions",
      title: "Frequently asked questions",
      lead: "Straight answers to the things clients usually ask first. Anything else — just ask.",
    },
  },
  projects: {
    header: {
      eyebrow: "Our work",
      title: "Built to a higher standard",
      lead: "The kinds of projects we deliver, across six sectors. Filter by sector to see how we work on builds like yours.",
    },
    filter: {
      label: "Filter by sector",
      all: "All sectors",
    },
    note: "Imagery is illustrative — it shows the kinds of projects we deliver, not photographs of specific Ventura contracts. It will be replaced with Ventura's own project photography.",
    cta: {
      eyebrow: "Build with confidence",
      title: "Have a project like these?",
      text: "Tell us what you're building and we'll come back with a clear, costed plan — no obligation.",
    },
  },
  approach: {
    header: {
      eyebrow: "How we work",
      title: "A disciplined path from brief to handover",
      lead: "Every Ventura project follows the same disciplined sequence — so you always know what's happening, what comes next, and what it costs.",
    },
    process: {
      eyebrow: "The process",
      title: "Five stages, one accountable team",
      lead: "Single-point responsibility means each stage hands cleanly to the next — no gaps, no finger-pointing.",
      steps: [
        {
          icon: "compass" as IconName,
          title: "Brief & consultation",
          text: "We listen first: your goals, site, budget and timeline. You get straight answers about what's achievable — and what it will take.",
        },
        {
          icon: "ruler" as IconName,
          title: "Design & costing",
          text: "Architecture, engineering and a transparent cost plan develop together, so the design you approve can actually be built for the price.",
        },
        {
          icon: "check" as IconName,
          title: "Planning & approvals",
          text: "Programme, permits and procurement are locked down before work starts. Long-lead items are ordered early so the site never waits.",
        },
        {
          icon: "building" as IconName,
          title: "Construction",
          text: "Disciplined site management with weekly reporting, stage inspections and safety enforced from day one — visible progress, no surprises.",
        },
        {
          icon: "key" as IconName,
          title: "Handover & aftercare",
          text: "Commissioning, documentation and training — and we stay reachable after handover, because a building's life starts where our site work ends.",
        },
      ],
    },
    safety: {
      eyebrow: "Safety",
      title: "Safety is non-negotiable",
      lead: "We'd rather lose a day than risk a person. These commitments hold on every Ventura site, every shift.",
      points: [
        {
          icon: "shield" as IconName,
          title: "Induction & PPE",
          text: "Everyone on site is inducted, equipped and accountable — workers and visitors alike.",
        },
        {
          icon: "spark" as IconName,
          title: "Toolbox talks",
          text: "Short, regular safety briefings keep risks visible and standards fresh.",
        },
        {
          icon: "check" as IconName,
          title: "Planned high-risk work",
          text: "Method statements and risk assessments put dangerous work on paper before it happens on site.",
        },
        {
          icon: "compass" as IconName,
          title: "Trained supervision",
          text: "Competent, accountable supervisors hold the standard on every shift.",
        },
        {
          icon: "bolt" as IconName,
          title: "Incident prevention",
          text: "Near-misses are reported and investigated, so small lessons prevent big ones.",
        },
        {
          icon: "trowel" as IconName,
          title: "Clean, secure sites",
          text: "Housekeeping isn't cosmetic — a tidy site is a safe, productive one.",
        },
      ],
    },
    quality: {
      eyebrow: "Quality",
      title: "Checked at every stage, signed off once",
      lead: "Quality isn't a final inspection — it's a habit running through procurement, workmanship and supervision.",
      points: [
        "Specified materials from approved suppliers",
        "Stage inspections and sign-offs at every milestone",
        "Qualified, accountable supervision on site",
        "Snag-free handover with full documentation",
      ],
    },
    environment: {
      eyebrow: "Environment",
      title: "Building responsibly",
      lead: "Construction shapes places for decades — so we manage its footprint while we build, not after.",
      points: [
        "Energy-efficient design and solar readiness",
        "Waste reduction, reuse and recycling on site",
        "Dust, noise and runoff control around neighbours",
        "Full compliance with environmental regulations",
        "Local sourcing and local hiring wherever possible",
      ],
    },
    cta: {
      eyebrow: "Build with confidence",
      title: "Let's put this process to work",
      text: "Tell us about your project and we'll show you exactly how we'd deliver it.",
    },
  },
  careers: {
    hero: {
      eyebrow: "Careers",
      title: "Building Tomorrow, Together",
      body: "Do you live for a challenge, have a passion for making a lasting impact, and are fueled by curiosity? At Ventura, we're not just building projects — we're building history that will support generations to come. If you're ready to make a difference, this is the place for you.",
      cta: { label: "Explore Jobs at Ventura", href: "#opportunities" }
    },
    whyVentura: {
      title: "Why Ventura?",
      paragraphs: [
        "At Ventura, we are committed to fostering an inclusive culture where every individual feels a profound sense of belonging and value. Our dedication to safety and well-being ensures that our colleagues are supported with rigorous safety measures and comprehensive benefits, allowing them to focus on achieving exceptional results with confidence.",
        "Importantly, we invest in our people by providing them with the tools, training, and opportunities to grow and explore diverse career paths within our portfolio across DRC. Our commitment extends to the communities where we operate, as we strive to make a positive impact through sustainable and meaningful projects. By aligning our efforts with a shared purpose, we reinforce a legacy of excellence and positive change."
      ],
      images: [
        "/imagery/crane.jpg",
        "/imagery/steelframe.jpg",
        "/imagery/planning.jpg"
      ]
    },
    intro: {
      title: "Ventura Careers",
      body: "We're proud to offer robust training and development opportunities to encourage constant learning and growth, so our colleagues are empowered to do their best work and reach their full potential."
    },
    professionals: {
      title: "Professionals",
      intro: "Our professional staff powers our projects, leading and supporting teams. Whether you work in engineering, project management, or one of our corporate functions, you have the opportunity to be a part of a world-class team. Regardless of experience level or discipline, professionals at Ventura play an integral role in supporting customer goals, advancing Ventura's leadership, and delivering success one project at a time.",
      cta: { label: "Join Our Team", href: "mailto:info@venturabuilders.africa" },
      departments: [
        { title: "Engineering", image: "/imagery/planning.jpg" },
        { title: "Construction", image: "/imagery/steelframe.jpg" },
        { title: "Project Management", image: "/imagery/crane.jpg" },
        { title: "Procurement", image: "/imagery/mixeduse.jpg" },
        { title: "Quality & Safety", image: "/imagery/team.jpg" },
        { title: "Corporate Affairs", image: "/imagery/residence.jpg" }
      ]
    },
    craft: {
      title: "Skilled Trades & Site Teams",
      intro: "Our site teams demand the technical skills required to build a new tomorrow. That's why Ventura's world-class projects are backed by the highest safety standards in the industry. We emphasize continuous learning, trade certifications, and career advancement, supporting long-term growth with a clear roadmap for the future.",
      locations: [
        { title: "Heavy Machinery & Plant", image: "/imagery/crane.jpg" },
        { title: "Structural & Steel", image: "/imagery/steelframe.jpg" },
        { title: "MEP & Technical Services", image: "/imagery/mixeduse.jpg" }
      ]
    },
    programs: {
      title: "Additional Career Programs",
      intro: "As investment in construction surges across the DRC, we need passionate individuals ready to help us build the future. To meet this moment, Ventura offers a range of dynamic career pathways for people with different life experiences, including our Internship and Apprenticeship Programs, and New Graduates Program.",
      items: [
        { title: "New Graduates Program", body: "For recent or upcoming graduates, we offer development opportunities that will help you launch your career in the engineering and construction industry.", image: "/imagery/planning.jpg" },
        { title: "Internship Program", body: "Our Internship Program allows students to go beyond the classroom and gain first-hand knowledge of the construction industry, while also making a positive impact.", image: "/imagery/team.jpg" },
        { title: "Apprenticeship Program", body: "Our Apprenticeship Program provides hands-on, on-site training alongside experienced professionals to help you build a career in the skilled construction trades.", image: "/imagery/steelframe.jpg" }
      ]
    },
    life: {
      title: "Life at Ventura",
      intro: "We work every day to foster a culture that values and seeks out many perspectives, and encourages colleagues to explore, think innovatively, and grow professionally.",
      benefits: [
        { title: "Benefits & Perks", body: "The health and well-being of our colleagues and their families is our top priority. We offer competitive compensation and professional development opportunities.", image: "/imagery/team.jpg" },
        { title: "Diversity & Inclusion", body: "We work to ensure that every colleague feels that they belong as part of 'One Team,' and are respected and rewarded for what they bring.", image: "/imagery/planning.jpg" },
        { title: "Safety First", body: "Nothing is more important than the safety of our colleagues. We are steadfast in our commitment to ensuring that everyone returns home safely.", image: "/imagery/steelframe.jpg" }
      ]
    },
    testimonials: {
      title: "Hear From Our People",
      items: [
        { quote: "When I first came to Ventura, I looked around and noticed the passion. The company is full of people who are fundamentally passionate about our customers' missions and the projects that we get to build.", author: "Afolabi Sanusi", position: "Project Manager" },
        { quote: "Apart from the incredible projects that we do, what sets us apart is the amazingly diverse teams that we have at Ventura. We are such diverse people, but what fits us all together is our Ventura culture.", author: "Grace Sununu", position: "Lead Engineer" },
        { quote: "Safety isn't just a poster on the wall here; it is how we operate every single day. I've been on many sites, but the standard of care and coordination at Ventura is unmatched.", author: "Didier Mwamba", position: "Site Foreman" },
        { quote: "The level of precision expected from us is incredibly high, but so is the support we get. It's an environment that constantly pushes you to learn and master your discipline.", author: "Sarah Katanga", position: "Quantity Surveyor" },
        { quote: "Working with top-tier equipment makes a huge difference. Ventura invests heavily not just in the best machinery, but in training us to operate it safely and efficiently on major sites.", author: "Jean-Luc Kabasele", position: "Heavy Equipment Operator" }
      ]
    }
  },

  privacy: {
    header: {
      eyebrow: "Privacy",
      title: "Privacy policy",
      lead: "How we handle the information you share with us — plainly stated.",
    },
    updated: "Last updated: 11 June 2026",
    sections: [
      {
        title: "What we collect",
        body: [
          "When you contact us through the form on this site, we collect the details you choose to share: your name, email address, phone number, company and the description of your project.",
          "This website does not use advertising trackers and does not set marketing cookies.",
        ],
      },
      {
        title: "How we use it",
        body: [
          "We use your details solely to respond to your enquiry and discuss your project. We do not sell, rent or trade your information, and we will not add you to marketing lists without your consent.",
        ],
      },
      {
        title: "Where it goes",
        body: [
          "Form submissions are delivered to our team inbox (info@venturabuilders.africa) via our hosting provider, Cloudflare. The website itself keeps no database of submissions.",
        ],
      },
      {
        title: "How long we keep it",
        body: [
          "We keep correspondence for as long as needed to deal with your enquiry and any project that follows from it, then delete it.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "You may ask us at any time what information we hold about you, ask us to correct it, or ask us to delete it. Email info@venturabuilders.africa and we will act on it promptly.",
        ],
      },
    ],
  },
};

export type IconName =
  | "building" | "compass" | "key" | "beam" | "bolt" | "ruler" | "trowel" | "snow"
  | "spark" | "globe" | "shield" | "coin" | "arrow" | "check" | "phone" | "mail" | "pin";

export const drawingBoard = {
  stages: [
    {
      eyebrow: "STEP 01",
      title: "From the drawing board",
      description: "Every Ventura build starts as a precise set of drawings — structure, crane positions and services, planned before a sod is turned.",
    },
    {
      eyebrow: "STEP 02",
      title: "Cranes up, crews mobilised",
      description: "The drawing becomes a working site — tower crane in place and the team building to programme.",
    },
    {
      eyebrow: "STEP 03",
      title: "Drawn, built, delivered",
      description: "Finished, inspected and handed over — exactly as designed.",
    },
  ],
  images: {
    crane: "/imagery/crane.jpg",
    residence: "/imagery/residence.jpg",
  },
  blueprint: {
    titleBlock: "VENTURA / Type A / Scale 1:100 / Rev A",
    dimension: "18.0 m",
  },
};

export const howWeWork = {
  steps: [
    {
      num: "01",
      icon: "compass" as IconName,
      title: "Brief & consultation",
      description: "We listen first: your goals, site, budget and timeline. You get straight answers about what's achievable — and what it will take.",
    },
    {
      num: "02",
      icon: "ruler" as IconName,
      title: "Design & costing",
      description: "Architecture, engineering and a transparent cost plan develop together, so the design you approve can actually be built for the price.",
    },
    {
      num: "03",
      icon: "check" as IconName,
      title: "Planning & approvals",
      description: "Programme, permits and procurement are locked down before work starts. Long-lead items are ordered early so the site never waits.",
    },
    {
      num: "04",
      icon: "building" as IconName,
      title: "Construction",
      description: "Disciplined site management with weekly reporting, stage inspections and safety enforced from day one — visible progress, no surprises.",
    },
    {
      num: "05",
      icon: "key" as IconName,
      title: "Handover & aftercare",
      description: "Commissioning, documentation and training — and we stay reachable after handover, because a building's life starts where our site work ends.",
    },
  ],
  images: {
    construction: "/imagery/steelframe.jpg",
    finished: "/imagery/residence.jpg",
  },
  blueprint: {
    titleBlock: "VENTURA / Type A / Scale 1:100 / Rev A",
    dimension: "18.0 m",
  },
};

/* "Site as services map" — a construction cross-section where each part of the
   build IS a Ventura service. Ordered top-to-ground; `service` is the slug of an
   existing /services/[slug] page where one exists (footings & landscaping have
   no dedicated page yet, so they omit it). Geometry (SVG boxes + pin positions)
   lives in the SiteServicesMap component; copy stays here alongside `home`. */
export type SiteZone = {
  id: string;
  num: string;
  title: string;
  blurb: string;
  service?: Service["slug"];
};
export const siteServices: {
  intro: { eyebrow: string; title: string; lead: string };
  zones: SiteZone[];
} = {
  intro: {
    eyebrow: "What we do",
    title: "One site, every service",
    lead: "A Ventura site is our services made physical — from the crane running the whole programme down to the footings it all stands on. Tap any part of the build to see the service behind it.",
  },
  zones: [
    {
      id: "crane",
      num: "1",
      title: "Main contracting & project management",
      blurb:
        "We run the whole site on one programme — every trade coordinated, one point of accountability from groundbreaking to handover.",
      service: "main-contracting",
    },
    {
      id: "structure",
      num: "2",
      title: "Structure & steel building",
      blurb:
        "Reinforced concrete and structural-steel frames, engineered and erected to specification.",
      service: "steel-structures",
    },
    {
      id: "mep",
      num: "3",
      title: "MEP contracting",
      blurb:
        "Mechanical, electrical and plumbing — power, water, HVAC and low-voltage, routed through the building.",
      service: "mep-contracting",
    },
    {
      id: "fitout",
      num: "4",
      title: "Interior & fit-out",
      blurb:
        "Joinery, finishes and interiors that turn raw structure into a space ready to use.",
      service: "interior-fit-out",
    },
    {
      id: "facade",
      num: "5",
      title: "Cladding, facade & design-build",
      blurb:
        "The building envelope — cladding and glazing, designed and installed as one package.",
      service: "design-and-build",
    },
    {
      id: "footings",
      num: "6",
      title: "Groundworks & foundations",
      blurb:
        "Site setup, earthworks and reinforced foundations, set out and inspected before anything rises.",
    },
    {
      id: "landscaping",
      num: "7",
      title: "Landscaping & external works",
      blurb:
        "Hard and soft landscaping, paving, pools and the finished setting around the build.",
    },
  ],
};

/* "Anatomy of a wall" — a 1:5 external-wall detail, outside → inside, where each
   layer maps to a Ventura trade/material. Ordered outer-to-inner. Geometry (SVG
   band boxes + pin positions) lives in the WallAnatomy component; the spec copy
   stays here alongside `home`. Illustrative only — see `note`. */
export type WallLayer = {
  id: string;
  num: string;
  title: string;
  thickness: string;
  material: string;
  trade: string;
  function: string;
  standard: string;
};
export const wallAnatomy: {
  intro: { eyebrow: string; title: string; lead: string };
  totals: { wall: string; uValue: string; mark: string };
  note: string;
  layers: WallLayer[];
} = {
  intro: {
    eyebrow: "How we build",
    title: "Anatomy of a wall",
    lead: "Every external wall is six trades stacked millimetre by millimetre. Here's a 1:5 detail section, outside to inside — tap any layer to see the material, the trade behind it and how it's built.",
  },
  totals: {
    wall: "~355 mm",
    uValue: "~0.30 W/m²K",
    mark: "As drawn, as built",
  },
  note: "Illustrative — a real project carries the engineer's specification.",
  layers: [
    {
      id: "render",
      num: "1",
      title: "External render & finish",
      thickness: "15–20 mm",
      material: "Polymer-modified cement render, painted",
      trade: "Envelope / finishes",
      function: "Weatherproofs the wall and forms the external face",
      standard: "Applied in coats with mesh at junctions; breathable and crack-resistant.",
    },
    {
      id: "block",
      num: "2",
      title: "Blockwork (structural leaf)",
      thickness: "200 mm",
      material: "Concrete masonry blocks, sand–cement mortar",
      trade: "Structure / main contracting",
      function: "The loadbearing skin that carries floors and roof",
      standard: "Laid to coursing, reinforced at openings; joints raked to key the render.",
    },
    {
      id: "insulation",
      num: "3",
      title: "Cavity insulation",
      thickness: "100 mm",
      material: "Rigid board or mineral wool",
      trade: "Building envelope",
      function: "Thermal and acoustic barrier for comfortable, efficient interiors",
      standard: "Held by stainless wall ties at 450 mm centres; DPC and cavity trays at openings.",
    },
    {
      id: "services",
      num: "4",
      title: "Services zone (MEP)",
      thickness: "25–50 mm",
      material: "Conduit, back boxes and pipework",
      trade: "MEP contracting",
      function: "Routes power, data and plumbing before the wall is closed",
      standard: "Set out to drawings; voids planned not cut in later; fire-stopped at penetrations.",
    },
    {
      id: "plasterboard",
      num: "5",
      title: "Plasterboard & skim",
      thickness: "12.5 + 3 mm",
      material: "Plasterboard on dabs, gypsum skim",
      trade: "Interior fit-out",
      function: "Clean, true, fire-rated internal lining ready to decorate",
      standard: "Boards staggered, joints taped; skimmed to a smooth matt finish.",
    },
    {
      id: "finish",
      num: "6",
      title: "Internal finish",
      thickness: "1–8 mm",
      material: "Paint, tile or feature finish",
      trade: "Interior fit-out",
      function: "The surface the client sees and touches",
      standard: "Low-VOC paints; tiling to wet areas over a waterproof backing.",
    },
  ],
};

/* "One project, three views" — the same project as its plan (drawn), its
   finished photo (built) and its key numbers. NOTE: name, meta and every
   `numbers` value are PLACEHOLDERS — swap for a real Ventura project (with the
   client's agreement) before launch. Structured alongside `home`. */
export const projectViews = {
  intro: {
    eyebrow: "One project, three views",
    title: "The plan, the building, the numbers",
    lead: "The same project seen three ways — the drawing we set out from, the building we handed over, and the figures behind it.",
  },
  name: "Private residence — Lubumbashi",
  meta: "Residential · design and build · 2024",
  builtImage: "/imagery/residence.jpg",
  builtAlt: "The finished residence",
  caption:
    "One project — the plan we drew, the building we delivered, and the numbers behind it.",
  /* Placeholder figures — replace with a real project's data. */
  numbers: [
    { label: "Contract value", value: "On request" },
    { label: "Programme", value: "32 weeks" },
    { label: "Floor area", value: "280 m²" },
    { label: "Storeys", value: "2" },
    { label: "Bedrooms", value: "4" },
    { label: "Services", value: "5 in-house" },
  ],
};

export const buildExplorer = [
  { num: "01", title: "Site and foundations", description: "Site setup, earthworks and reinforced foundations — set out and inspected before anything rises." },
  { num: "02", title: "Structure", description: "Reinforced concrete and structural-steel frame, coordinated trade by trade on one programme." },
  { num: "03", title: "Services (MEP)", description: "Mechanical, electrical and plumbing routed through the core — power, water, HVAC and low-voltage." },
  { num: "04", title: "Cladding and fit-out", description: "Facade, glazing and interior finishes — the envelope and fit-out that make it ready to use." },
  { num: "05", title: "Handover", description: "Quality-checked and signed off stage by stage, then handed over complete." }
];

export const siteCam = { 
  camId: "CAM 01", 
  location: "VENTURA SITE", 
  tagline: "Ventura builds — start to finish", 
  speedLabel: "TIME-LAPSE ×720" 
};

export const orgChart = {
  intro: "We are structured like the buildings we deliver — leadership at the top, delivery teams as the frame, every function in its place, the workforce as the foundation.",
  floors: [
    { level: "F4", label: "Company management" },
    { level: "F3", label: "Board of directors" },
    { level: "F2", label: "General manager" },
    { level: "F1", label: "Execution team" },
    { level: "G", label: "Project manager" }
  ],
  wings: [
    { id: "civil", label: "Civil team", roles: ["Project engineer","Site engineer","Foreman & technicians"] },
    { id: "mep", label: "MEP team", roles: ["MEP manager","Project engineer","Site engineer","Foreman & technicians"] }
  ],
  core: { label: "Core services", items: ["Quality — QA / QC","Health & safety (HSE)","Transport & machinery"] },
  crane: { label: "The crane — enabling functions", items: ["Techno-commercial","Tender & contracts","Finance & accounts","Planning & design","HR team","Document control"] },
  foundation: { label: "Working labors — our foundation", note: "The base every Ventura project stands on." }
};

export const caseStudy = {
  project: "Private Residence",
  location: "Lubumbashi, DRC",
  delivery: "Design & Build",
  aerialPhoto: "/imagery/residence.jpg",
  aerialAlt: "Aerial view of the completed residence and estate",
  phases: [
    { num: "01", key: "Plan",      label: "The site plan",         copy: "Four buildings, terrace and pool — set out as a measured drawing." },
    { num: "02", key: "Model",     label: "Lifted into a model",   copy: "Stepped wings, hipped roofs and the lantern take shape in three dimensions." },
    { num: "03", key: "Build",     label: "The finished estate",   copy: "Terracotta roofs, solar array, terrace and pool — complete to specification." },
    { num: "04", key: "Delivered", label: "As built, for real",    copy: "The estate photographed from the air on handover." },
    { num: "05", key: "Numbers",   label: "The project, quantified", copy: "Key figures behind the build — to be confirmed against the project record." }
  ],
  stats: [
    { value: "1,150", unit: "m²", label: "Built area" },
    { value: "14",    unit: "months", label: "Programme" },
    { value: "4",     unit: "", label: "Buildings on site" },
    { value: "12",    unit: "kWp", label: "Solar array" },
    { value: "68",    unit: "m²", label: "Swimming pool" },
    { value: "6",     unit: "", label: "Trades in-house" }
  ]
};

export const csr = {
  header: {
    eyebrow: "Corporate Social Responsibility",
    title: "Corporate Social Responsibility",
    lead: "At Ventura Construction Limited, we build more than structures — we build trust, opportunity and lasting value for the communities in which we work. Headquartered in Lubumbashi and operating across the Copperbelt region of the DRC and Zambia, we recognise that responsible construction means caring for our people, protecting the environment, strengthening local communities and conducting business with integrity."
  },
  pillars: [
    {
      title: "People, health & safety",
      lead: "The safety and wellbeing of everyone affected by our work is our first responsibility.",
      icon: "shield" as IconName,
      bullets: [
        "Comply with, and strive to exceed, applicable health and safety legislation and recognised HSE standards.",
        "Provide appropriate PPE, safe systems of work, and enforce safe handling of materials and substances.",
        "Give every worker the information, instruction, supervision and training to work competently.",
        "Consult employees on health and safety, and allocate the resources to uphold these commitments.",
        "Prioritise injury and accident prevention while fostering worker wellbeing."
      ]
    },
    {
      title: "Communities & local economy",
      lead: "We share the benefits of our growth with the communities that host our projects.",
      icon: "building" as IconName,
      bullets: [
        "Prioritise local recruitment and develop Congolese and regional talent through training and apprenticeships.",
        "Source from local suppliers and subcontractors wherever quality and specification allow.",
        "Invest in community initiatives and engage openly with the communities affected by our work.",
        "Respect the rights, culture and dignity of the people and neighbourhoods around our sites."
      ]
    },
    {
      title: "Environmental responsibility",
      lead: "We advance superior environmental standards and cultivate a sustainable environment in which we operate.",
      icon: "globe" as IconName,
      bullets: [
        "Design and build energy-efficient structures using both traditional and cutting-edge materials.",
        "Promote recycled and sustainable materials, and use renewable technologies such as heat recovery, air-source heat pumps and solar energy harvesting.",
        "Minimise or eliminate hazardous emissions to air, water and soil wherever possible; manage construction waste responsibly.",
        "Adhere to all relevant building, planning and environmental regulations and emerging standards.",
        "Collaborate with suppliers and clients to share best practice and reduce impact."
      ]
    },
    {
      title: "Integrity, quality & ethical business",
      lead: "Our reputation for reliability rests on doing things properly.",
      icon: "check" as IconName,
      bullets: [
        "Source high-quality materials locally and internationally, inspected through our quality assessment unit before use.",
        "Deliver services that meet client specifications, on time and to a continuously improving standard.",
        "Conduct business with honesty and transparency; maintain zero tolerance for bribery and corruption.",
        "Ensure clients receive optimal, best-value returns on their investment."
      ]
    }
  ],
  governance: "Responsibility for this statement sits with Ventura's management, supported by our HSE, Quality (QA/QC) and Planning & Design functions. We review it periodically, monitor performance, and report progress to our clients and stakeholders.",
  stats: [
    { label: "Local workforce", value: 85, suffix: "%" },
    { label: "Incident-free days", value: 1240, suffix: "" },
    { label: "Community projects", value: 12, suffix: "" },
    { label: "Apprenticeships offered", value: 45, suffix: "" }
  ],
  contact: "Ventura Builders & Developers SARL · Office 2F15, 2nd floor. Hypnose Building. · 826 Av. Mama Yemo crossing Tabora, Lubumbashi, DRC. · info@venturabuilders.africa · +91 87438 89943 (whatsapp) · +243 817 106 314"
};
