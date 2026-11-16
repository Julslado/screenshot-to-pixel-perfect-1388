import { UPSIDE } from "@/data/beloira";

/** Annual office rent (€) for a given let share of the office GLA. */
export function annualOfficeRent(letPct: number): number {
  return UPSIDE.officeGlaSqm * (letPct / 100) * UPSIDE.rentEurSqmMonth * 12;
}

/** "c.€1.0M" style label, one decimal. */
export function formatMillions(eur: number): string {
  return `c.€${(eur / 1_000_000).toFixed(1)}M`;
}

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "hotmail.com",
  "hotmail.es",
  "outlook.com",
  "outlook.es",
  "live.com",
  "msn.com",
  "yahoo.com",
  "yahoo.es",
  "ymail.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "gmx.com",
  "mail.com",
  "proton.me",
  "protonmail.com",
  "yandex.com",
]);

export function isFreeEmailDomain(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return FREE_EMAIL_DOMAINS.has(domain);
}
