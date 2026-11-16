import type { BarTone } from "@/data/beloira";

export const TONE_FILL: Record<BarTone, string> = {
  primary: "var(--primary)",
  mid: "var(--body)",
  dark: "var(--ink)",
};

export const AXIS_TICK = { fill: "var(--body)", fontSize: 12, fontFamily: "var(--font-sans)" };
export const LABEL_STYLE = {
  fill: "var(--ink)",
  fontSize: 12,
  fontWeight: 600,
  fontFamily: "var(--font-sans)",
};

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type TooltipPayload = { name?: string; value?: number | string; color?: string; payload?: Record<string, unknown> };

export function ChartTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div role="status" className="rounded-lg border border-border bg-background px-3 py-2 text-xs shadow-card">
      {label && <p className="mb-1 font-semibold text-ink">{label}</p>}
      {payload.map((p) => (
        <p key={String(p.name)} className="tabular-nums text-body">
          {p.name}: <span className="font-semibold text-ink">{p.value}{unit}</span>
        </p>
      ))}
    </div>
  );
}
