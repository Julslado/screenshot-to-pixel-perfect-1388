/**
 * Single source of truth for every piece of copy and every figure on the Beloira page.
 * Confidentiality: tenants are only ever "Tenant A" / "Tenant B". Do not add figures that
 * are not in the approved brief.
 */

export const SITE = {
  title: "Edificio Beloira | Office investment opportunity, Madrid",
  description:
    "LEED Gold office building on the M-40 in Campo de las Naciones. 50% let, 14-year WAULT. Request NDA access.",
  wordmark: "CUSHMAN & WAKEFIELD",
  division: "Capital Markets Spain",
} as const;

/** Image slots. Set a path (e.g. "/images/beloira-facade.jpg") to swap in real photography. */
export const IMAGES = {
  hero: "/images/fondoweb.jpg",
  heroAlt: "Abstract illustration of a modern glass office facade",
  building: null as string | null,
  buildingAlt: "Building image placeholder",
} as const;

export const NAV = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "market", label: "Market" },
  { id: "location", label: "Location" },
  { id: "process", label: "Process" },
  { id: "data-room", label: "Data Room" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof NAV)[number]["id"];

export const CTA = {
  header: "Request access",
  nda: "Request NDA access",
  teaser: "Download the one-page teaser ↓",
  teaserToast: "Teaser available after NDA countersignature.",
} as const;

/* ---------------------------------- Hero --------------------------------- */

export type HeroMetric =
  | { kind: "number"; value: number; decimals: number; prefix?: string; unit?: string; label: string }
  | { kind: "text"; text: string; label: string };

export const HERO = {
  eyebrow: "Office investment opportunity · Madrid",
  title: "Half let. Fully refurbished. Ready for its next owner.",
  subtitle:
    "Edificio Beloira is a LEED Gold office building on the M-40, with 14 years of WAULT already signed and a proven path to roughly double its office income.",
  microcopy: "Qualified investors only. Access is confirmed after NDA countersignature.",
  metrics: [
    { kind: "number", value: 50, decimals: 0, unit: "%", label: "let to two international occupiers" },
    { kind: "number", value: 14, decimals: 0, unit: "yrs", label: "WAULT · 7 yrs to first break" },
    {
      kind: "number",
      value: 17.5,
      decimals: 2,
      prefix: "€",
      label: "latest lease, €/sqm/month (Sept 2026)",
    },
    { kind: "text", text: "LEED Gold", label: "fully refurbished in 2022" },
    {
      kind: "number",
      value: 12300,
      decimals: 0,
      unit: "sqm",
      label: "9,683 sqm offices + 2,600 sqm semi-basement · 289 parking spaces",
    },
  ] satisfies HeroMetric[],
} as const;

/* ------------------------------- Highlights ------------------------------ */

export type HighlightIcon = "clock" | "flask" | "leaf" | "trending" | "route";

export const HIGHLIGHTS = {
  eyebrow: "Investment highlights",
  title: "Five reasons Beloira earns its place in a portfolio",
  items: [
    {
      icon: "clock",
      figure: "14 yrs",
      title: "Long, secure income",
      short: "WAULT 14 years; 7 to first break.",
      long: "Two international occupiers on long leases. A 7-year WAULB and a 14-year WAULT give your underwriting a visible base.",
    },
    {
      icon: "flask",
      figure: "1 of 1",
      title: "Mission-critical tenant",
      short: "The only building in Madrid able to host Tenant A's laboratory.",
      long: "An international healthcare technology company chose Beloira for a capability no other Madrid building could offer. That makes the occupier hard to replace and the income sticky.",
    },
    {
      icon: "leaf",
      figure: "LEED Gold",
      title: "Refurbished in 2022",
      short: "All systems and common areas renewed.",
      long: "The heavy capex is done. Two connected buildings, each with ground floor, four upper floors and a garden floor. The buyer's lever is finish and amenity, not building systems.",
    },
    {
      icon: "trending",
      figure: "c.2×",
      title: "Upside already proven",
      short: "Full occupancy roughly doubles office income.",
      long: "Tenant B, an international industrial group, signed in September 2026 at €17.50/sqm/month. The next lease is a repeat of a proven deal.",
    },
    {
      icon: "route",
      figure: "M-40",
      title: "Visible, connected address",
      short: "M-40 frontage; IFEMA, N-II and A-10 close.",
      long: "Direct frontage on Madrid's orbital ring road, with easy access to the main arteries north and east.",
    },
  ] satisfies {
    icon: HighlightIcon;
    figure: string;
    title: string;
    short: string;
    long: string;
  }[],
} as const;

export const UPSIDE = {
  title: "See the upside",
  sliderLabel: "Let share of the offices",
  officeGlaSqm: 9683,
  rentEurSqmMonth: 17.5,
  min: 50,
  max: 100,
  step: 5,
  defaultPct: 50,
  caption:
    "Illustrative. Based on 9,683 sqm office GLA at €17.50/sqm/month. Excludes parking and semi-basement. Subject to verification against the rent roll.",
} as const;

/* --------------------------------- Market -------------------------------- */

export const MARKET = {
  eyebrow: "Market context",
  title: "Phase 2 is the tightest corner of Campo de las Naciones",
  intro:
    "Campo de las Naciones holds c.575,000 sqm, 4.2% of Madrid's office stock. 62% of it is Grade A or B+. Beloira sits in Phase 2, Ribera del Loira.",
  footnote:
    "Source: C&W Research, Campo de las Naciones market snapshot and main transactions 2026. Volume and median calculated from the transaction list. Draft data, subject to verification.",
  tabs: {
    occupiers: {
      label: "Occupiers",
      chartTitle: "Vacancy rate by phase (%)",
      data: [
        { phase: "Phase 1", allGrades: 15.6, gradeA: 11, highlight: false },
        { phase: "Phase 2 (Beloira)", allGrades: 8.0, gradeA: 7, highlight: true },
        { phase: "Phase 3", allGrades: 18.5, gradeA: 13, highlight: false },
      ],
      metrics: [
        { figure: "7%", text: "Grade A/B+ vacancy in Phase 2, the lowest of the three phases" },
        { figure: "11,623 sqm", text: "taken up in 9 deals in Q2 2026, c.50% of 2025's 23,318 sqm" },
      ],
      takeaway: "Demand is returning, and it is selective.",
    },
    rents: {
      label: "Rents",
      chartTitle: "€/sqm/month",
      data: [
        { name: "Beloira latest lease", value: 17.5, tone: "primary" },
        { name: "Campo de las Naciones average", value: 16.5, tone: "mid" },
        { name: "Campo de las Naciones prime", value: 21.75, tone: "dark" },
      ],
      metrics: [
        { figure: "+6%", text: "Beloira's €17.50 versus €16.50 market average" },
        { figure: "c.20%", text: "below the Campo de las Naciones prime rent of €21.75" },
      ],
      takeaway: "Beloira's rent has room to run.",
    },
    capital: {
      label: "Capital",
      chartTitle: "Madrid prime office yield by submarket (%)",
      data: [
        { name: "CBD", value: 4.25, tone: "mid" },
        { name: "City Centre", value: 5.0, tone: "mid" },
        { name: "Decentralised", value: 6.35, tone: "primary" },
        { name: "Out of Town", value: 7.5, tone: "mid" },
      ],
      metrics: [
        { figure: "12", text: "decentralised office deals in the 2026 list" },
        { figure: "€613M", text: "combined volume" },
        { figure: "5.9–8.5%", text: "yield range, median c.6.9%" },
      ],
      takeaway: "Domestic capital leads; international buyers are returning.",
    },
  },
} as const;

export type BarTone = "primary" | "mid" | "dark";

/* -------------------------------- Location ------------------------------- */

export const LOCATION = {
  eyebrow: "Location & connectivity",
  title: "Visible. Connected. Next to IFEMA.",
  intro:
    "Beloira fronts the M-40 directly, with easy access to the N-II and A-10 and IFEMA close by.",
  mapCaption: "Schematic map, not to scale.",
  pins: [
    {
      id: "beloira",
      name: "Edificio Beloira",
      description: "Ribera del Loira, Phase 2 of Campo de las Naciones.",
      x: 47,
      y: 54,
      primary: true,
    },
    {
      id: "ifema",
      name: "IFEMA",
      description: "Madrid's trade-fair and congress grounds, close to the building.",
      x: 70,
      y: 36,
      primary: false,
    },
    {
      id: "m40",
      name: "M-40",
      description: "Madrid's orbital ring road. Beloira has direct frontage.",
      x: 26,
      y: 74,
      primary: false,
    },
    {
      id: "n2a10",
      name: "N-II / A-10",
      description: "Main arteries north and east, with easy access from the building.",
      x: 80,
      y: 80,
      primary: false,
    },
  ],
  district: {
    title: "A district in transition",
    body: "Occupiers now choose on experience as much as on address. The area's services are still maturing, so the building's own amenity layer is the new owner's clearest lever.",
  },
  factsTitle: "Building facts",
  facts: [
    { icon: "building", text: "Two connected buildings, ground + 4 floors + garden floor" },
    { icon: "ruler", text: "9,683 sqm office GLA · 2,600 sqm semi-basement" },
    { icon: "car", text: "289 parking spaces" },
    { icon: "leaf", text: "LEED Gold · full refurbishment completed in 2022" },
  ],
} as const;

/* --------------------------------- Process ------------------------------- */

export const PROCESS = {
  eyebrow: "Process",
  title: "A two-phase process. One deadline per phase.",
  steps: [
    { n: 1, name: "Prep", duration: "4 wks", detail: "Vendor due diligence, data room", current: false },
    {
      n: 2,
      name: "Phase 1",
      duration: "5 wks",
      detail: "Teaser, NDA, OM, non-binding offers",
      current: true,
    },
    {
      n: 3,
      name: "Phase 2",
      duration: "6 wks",
      detail: "3-5 bidders, full data room, binding offers",
      current: false,
    },
    { n: 4, name: "Sign & close", duration: "4 wks", detail: "SPA, signing and closing", current: false },
  ],
  currentBadge: "Now open",
  closing: "Launch January 2027. Non-binding offers date to be confirmed.",
} as const;

/* -------------------------------- Data room ------------------------------ */

export const DATA_ROOM = {
  eyebrow: "Data room",
  title: "Everything you need to underwrite Beloira, in one place",
  sub: "Phase 1 gives you the essentials. Shortlisted bidders unlock the full data room.",
  phase1Label: "Phase 1",
  phase2Label: "Phase 2",
  phase1Caption: "After NDA",
  phase2Caption: "Shortlisted bidders",
  folders: [
    { n: 1, name: "Executive summary and digital offering memorandum", phase: 1 },
    { n: 2, name: "Tenancy schedule and rent roll", phase: 1 },
    { n: 3, name: "Key lease abstracts (anonymised)", phase: 1 },
    { n: 4, name: "Building facts, plans and LEED certificate", phase: 1 },
    { n: 5, name: "Refurbishment summary", phase: 1 },
    { n: 6, name: "C&W market study", phase: 1 },
    { n: 7, name: "Pricing guidance", phase: 1, locked: true },
    { n: 8, name: "Full lease documents", phase: 2 },
    { n: 9, name: "Technical due diligence pack from the 2022 refurbishment", phase: 2 },
    { n: 10, name: "Tenant and laboratory overview", phase: 2 },
    { n: 11, name: "Legal and title", phase: 2 },
    { n: 12, name: "Tax and financial", phase: 2 },
    { n: 13, name: "Draft SPA and bid letter", phase: 2 },
    { n: 14, name: "Site visit booking", phase: 2 },
  ] as { n: number; name: string; phase: 1 | 2; locked?: boolean }[],
  pricing: {
    lockedLabel: "Pricing guidance",
    unlockedLabel: "Illustrative guidance",
    cta: "Request access to view",
    text: "Guidance corridor: €2,100-2,500/sqm (c.€26-31M on 12,300 sqm). 2026 decentralised median: c.€2,300/sqm. Implies a 7.6-9.1% gross yield on full ERV. Illustrative, subject to C&W valuation. Full ERV c.€2.3M: offices €17.50, semi-basement €10, parking excluded.",
  },
} as const;

/* --------------------------------- Contact ------------------------------- */

export const CONTACT = {
  eyebrow: "Contact",
  title: "Talk to the team that knows the building",
  people: [
    {
      initials: "CJ",
      name: "Carmen Jiménez",
      role: "Partner, Capital Markets",
      email: "carmen.jimenez@cushwake.com",
    },
    {
      initials: "PM",
      name: "Patricia Martín MRICS",
      role: "Partner, Capital Markets",
      email: "patricia.martin.gonzalez@cushwake.com",
    },
  ],
  phone: "Phone available on request.",
} as const;

export const FOOTER = {
  legal:
    "Cushman & Wakefield acts as exclusive agent for the vendor. This website is for information only and is not an offer. All figures are approximate and subject to verification. Private & Confidential.",
} as const;

/* ---------------------------------- NDA ---------------------------------- */

export const NDA = {
  title: "Request access to the data room",
  intro: "All fields are required. Access is confirmed after NDA countersignature.",
  investorTypes: [
    "Value-add fund",
    "SOCIMI",
    "Family office",
    "Private capital",
    "Core-plus",
    "Other",
  ],
  principalLabel: "I act as principal, or on behalf of a named principal.",
  submit: "Send request",
  sending: "Sending…",
  successTitle: "Thank you.",
  successBody:
    "We have sent the NDA to your corporate email. Once countersigned, your access opens.",
  close: "Close",
  freeEmailError: "Please use a corporate email address so we can verify your request.",
} as const;
