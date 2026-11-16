import { describe, expect, it } from "vitest";
import { annualOfficeRent, formatMillions, isFreeEmailDomain } from "./beloira";

describe("upside calculator", () => {
  it("reads c.€1.0M a year at 50% let", () => {
    expect(formatMillions(annualOfficeRent(50))).toBe("c.€1.0M");
  });
  it("reads c.€2.0M a year at 100% let", () => {
    expect(formatMillions(annualOfficeRent(100))).toBe("c.€2.0M");
  });
  it("uses 9,683 sqm × €17.50 × 12", () => {
    expect(annualOfficeRent(100)).toBeCloseTo(9683 * 17.5 * 12);
  });
});

describe("corporate email check", () => {
  it.each(["a@gmail.com", "a@hotmail.com", "a@outlook.com", "a@yahoo.com", "A@GMAIL.COM"])(
    "rejects %s",
    (email) => expect(isFreeEmailDomain(email)).toBe(true),
  );
  it("accepts a corporate domain", () => {
    expect(isFreeEmailDomain("jane@fundco.com")).toBe(false);
  });
});
