import { Building2, Car, Leaf, Ruler, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { IMAGES, LOCATION } from "@/data/beloira";
import { cn } from "@/lib/utils";
import { FadeUp } from "./fade-up";
import { ImageSlot } from "./image-placeholder";
import { SectionHeading } from "./section-heading";

const FACT_ICONS: Record<(typeof LOCATION.facts)[number]["icon"], LucideIcon> = {
  building: Building2,
  ruler: Ruler,
  car: Car,
  leaf: Leaf,
};

function SchematicMap() {
  const [selected, setSelected] = useState<string>("beloira");
  const pin = LOCATION.pins.find((p) => p.id === selected);

  return (
    <figure className="relative">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-border bg-surface">
        <svg viewBox="0 0 500 400" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
          {/* minor street grid */}
          <g stroke="var(--border)" strokeWidth="2" fill="none">
            <path d="M0 120 H500 M0 200 H500 M0 300 H500 M110 0 V400 M200 0 V400 M300 0 V400 M400 0 V400" />
            <path d="M150 160 L320 260 M180 260 L300 150" />
          </g>
          {/* M-40 orbital (curved, heavier) */}
          <path
            d="M-10 330 C 90 300, 170 260, 215 215 S 290 90, 330 -10"
            stroke="var(--body)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
          {/* N-II / A-10 corridor */}
          <path d="M235 215 L 510 140" stroke="var(--body)" strokeWidth="7" fill="none" opacity="0.4" />
          <path d="M240 225 L 510 360" stroke="var(--body)" strokeWidth="7" fill="none" opacity="0.4" />
          {/* IFEMA footprint */}
          <rect x="315" y="108" width="72" height="44" rx="4" fill="var(--border)" stroke="var(--body)" strokeOpacity="0.35" />
        </svg>

        {LOCATION.pins.map((p) => {
          const active = selected === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelected(p.id)}
              aria-pressed={active}
              aria-label={`${p.name}: show details`}
              className="group absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <span
                className={cn(
                  "relative flex items-center justify-center rounded-full border-2 border-background shadow-card transition-transform group-hover:scale-110",
                  p.primary ? "pin-pulse h-6 w-6 bg-primary" : "h-4 w-4 bg-ink",
                  active && !p.primary && "ring-2 ring-primary ring-offset-2 ring-offset-surface",
                  active && p.primary && "ring-2 ring-ink ring-offset-2 ring-offset-surface",
                )}
              />
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap rounded-md bg-background px-2 py-0.5 text-[11px] font-semibold text-ink shadow-card",
                  p.primary && "text-primary",
                )}
                aria-hidden="true"
              >
                {p.id === "beloira" ? "Beloira" : p.name}
              </span>
            </button>
          );
        })}

      </div>
      {pin && (
        <div
          aria-live="polite"
          className="mt-3 rounded-lg border border-border bg-background p-4 shadow-card sm:absolute sm:left-3 sm:top-3 sm:mt-0 sm:max-w-[16rem]"
        >
          <p className={cn("text-sm font-bold", pin.primary ? "text-primary" : "text-ink")}>{pin.name}</p>
          <p className="mt-1 text-sm leading-snug text-body">{pin.description}</p>
        </div>
      )}
      <figcaption className="mt-3 text-xs text-body">{LOCATION.mapCaption}</figcaption>
    </figure>
  );
}

export function LocationSection() {
  return (
    <section id="location" aria-labelledby="location-title" className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading id="location-title" eyebrow={LOCATION.eyebrow} title={LOCATION.title} intro={LOCATION.intro} />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <FadeUp className="lg:col-span-7">
            <SchematicMap />
          </FadeUp>

          <FadeUp className="flex flex-col gap-8 lg:col-span-5" delay={0.05}>
            <div>
              <h3 className="text-xl font-bold text-ink">{LOCATION.district.title}</h3>
              <p className="mt-3 text-body">{LOCATION.district.body}</p>
            </div>
            <ImageSlot src={IMAGES.building} alt={IMAGES.buildingAlt} className="aspect-[21/9] h-auto" />
            <div className="card-base p-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-ink">{LOCATION.factsTitle}</h3>
              <ul className="mt-5 flex flex-col gap-4">
                {LOCATION.facts.map((f) => {
                  const Icon = FACT_ICONS[f.icon];
                  return (
                    <li key={f.text} className="flex items-start gap-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink">
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="pt-1.5 text-[15px] leading-snug text-ink">{f.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
