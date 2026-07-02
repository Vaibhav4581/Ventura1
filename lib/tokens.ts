/* Typed token metadata that drives the /brand-guide page.
   Kept in sync with tokens/tokens.json and app/globals.css. */

export type ColorToken = {
  name: string;
  varName: string; // CSS custom property
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string; // approximate target, confirm on press
  role: string;
  onText: string; // recommended text colour to place on this swatch
};

/* ---------- WCAG 2.2 contrast utilities (computed live in the guide) ---------- */
function srgbToLin(c: number) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}
function luminance(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}
export function contrastRatio(fg: string, bg: string): number {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}
export type WcagLevel = "AAA" | "AA" | "AA Large" | "Fail";
export function wcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "AA Large";
  return "Fail";
}

/* ---------- Colour system ---------- */
export const brandColors: ColorToken[] = [
  {
    name: "Navy",
    varName: "--navy-700",
    hex: "#1B2C7A",
    rgb: "27, 44, 122",
    cmyk: "78, 64, 0, 52",
    pantone: "≈ 2755 C",
    role: "Primary — headers, footers, headings, the shield",
    onText: "#FFFFFF",
  },
  {
    name: "Accent Blue",
    varName: "--blue-500",
    hex: "#0087FF",
    rgb: "0, 135, 255",
    cmyk: "100, 47, 0, 0",
    pantone: "≈ Process Blue",
    role: "Accent — highlights, eyebrows, focus ring",
    onText: "#0F1535",
  },
  {
    name: "Link Blue",
    varName: "--blue-600",
    hex: "#0F62C7",
    rgb: "15, 98, 199",
    cmyk: "92, 51, 0, 22",
    pantone: "≈ 2387 C",
    role: "Text links (darkened to meet AA on white)",
    onText: "#FFFFFF",
  },
  {
    name: "Amber",
    varName: "--amber-500",
    hex: "#F7941D",
    rgb: "247, 148, 29",
    cmyk: "0, 40, 88, 3",
    pantone: "≈ 1375 C",
    role: "CTA & highlight — the hard-hat colour (use navy text on it)",
    onText: "#0F1535",
  },
  {
    name: "Ink",
    varName: "--navy-900",
    hex: "#0F1535",
    rgb: "15, 21, 53",
    cmyk: "72, 61, 0, 79",
    pantone: "≈ 5255 C",
    role: "Body text on light surfaces",
    onText: "#FFFFFF",
  },
];

export const neutralColors: ColorToken[] = [
  { name: "White", varName: "--white", hex: "#FFFFFF", rgb: "255, 255, 255", cmyk: "0, 0, 0, 0", pantone: "—", role: "Base surface", onText: "#0F1535" },
  { name: "Mist", varName: "--neutral-50", hex: "#F5F7FB", rgb: "245, 247, 251", cmyk: "2, 1, 0, 2", pantone: "—", role: "Alternate section background", onText: "#0F1535" },
  { name: "Cloud", varName: "--neutral-100", hex: "#ECEFF6", rgb: "236, 239, 246", cmyk: "4, 3, 0, 4", pantone: "—", role: "Subtle fills, table stripes", onText: "#0F1535" },
  { name: "Line", varName: "--neutral-200", hex: "#DFE4EF", rgb: "223, 228, 239", cmyk: "7, 5, 0, 6", pantone: "—", role: "Borders & hairlines", onText: "#0F1535" },
  { name: "Muted", varName: "--neutral-600", hex: "#4C5670", rgb: "76, 86, 112", cmyk: "32, 23, 0, 56", pantone: "≈ 7546 C", role: "Secondary / muted text (AA on white)", onText: "#FFFFFF" },
];

export const stateColors: ColorToken[] = [
  { name: "Success", varName: "--green-600", hex: "#15803D", rgb: "21, 128, 61", cmyk: "84, 0, 52, 50", pantone: "≈ 7740 C", role: "Valid input, confirmations", onText: "#FFFFFF" },
  { name: "Warning", varName: "--orange-700", hex: "#B45309", rgb: "180, 83, 9", cmyk: "0, 54, 95, 29", pantone: "≈ 1605 C", role: "Cautions, pending states", onText: "#FFFFFF" },
  { name: "Error", varName: "--red-600", hex: "#C02B1D", rgb: "192, 43, 29", cmyk: "0, 78, 85, 25", pantone: "≈ 1795 C", role: "Errors, destructive actions", onText: "#FFFFFF" },
];

/* ---------- Typography ---------- */
export type TypeStep = { name: string; cssVar: string; px: number; rem: string; usage: string };
export const typeScale: TypeStep[] = [
  { name: "Display", cssVar: "--fs-display", px: 76, rem: "4.768rem", usage: "Hero statements" },
  { name: "H1", cssVar: "--fs-h1", px: 61, rem: "3.815rem", usage: "Page titles" },
  { name: "H2", cssVar: "--fs-h2", px: 49, rem: "3.052rem", usage: "Section titles" },
  { name: "H3", cssVar: "--fs-h3", px: 39, rem: "2.441rem", usage: "Subsection titles" },
  { name: "H4", cssVar: "--fs-h4", px: 31, rem: "1.953rem", usage: "Card / block titles" },
  { name: "H5", cssVar: "--fs-h5", px: 25, rem: "1.5625rem", usage: "Lead-ins" },
  { name: "H6", cssVar: "--fs-h6", px: 20, rem: "1.25rem", usage: "Eyebrow / labels" },
  { name: "Body L", cssVar: "--fs-body-lg", px: 18, rem: "1.125rem", usage: "Intro paragraphs" },
  { name: "Body", cssVar: "--fs-body", px: 16, rem: "1rem", usage: "Default body copy" },
  { name: "Small", cssVar: "--fs-small", px: 14, rem: "0.875rem", usage: "Captions, meta" },
  { name: "Caption", cssVar: "--fs-caption", px: 13, rem: "0.8125rem", usage: "Fine print, legends" },
];

/* ---------- Spacing / radius / motion ---------- */
export const spacingScale = [
  { token: "--space-1", px: 4 }, { token: "--space-2", px: 8 }, { token: "--space-3", px: 12 },
  { token: "--space-4", px: 16 }, { token: "--space-5", px: 24 }, { token: "--space-6", px: 32 },
  { token: "--space-7", px: 48 }, { token: "--space-8", px: 64 }, { token: "--space-9", px: 80 },
  { token: "--space-10", px: 96 },
];

export const radii = [
  { token: "--radius-sm", px: 6 }, { token: "--radius-md", px: 10 },
  { token: "--radius-lg", px: 16 }, { token: "--radius-xl", px: 24 }, { token: "--radius-pill", px: 999 },
];

export const motionTokens = [
  { token: "--dur-fast", value: "150ms", usage: "Hover, small UI feedback" },
  { token: "--dur-base", value: "250ms", usage: "Most transitions, reveals" },
  { token: "--dur-slow", value: "400ms", usage: "Large/overlay transitions" },
];
