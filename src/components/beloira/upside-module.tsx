import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { UPSIDE } from "@/data/beloira";
import { annualOfficeRent, formatMillions } from "@/lib/beloira";
import { ChartSkeleton } from "./chart-skeleton";
import { FadeUp } from "./fade-up";

const UpsideBar = lazy(() => import("./charts/upside-bar"));

export function UpsideModule() {
  const [pct, setPct] = useState<number>(UPSIDE.defaultPct);
  const rent = annualOfficeRent(pct);
  const max = annualOfficeRent(UPSIDE.max);
  const label = formatMillions(rent);

  return (
    <FadeUp className="mt-12 rounded-xl bg-surface p-6 sm:p-8 lg:mt-16 lg:p-12">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <h3 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{UPSIDE.title}</h3>
          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <label id="upside-label" className="text-sm font-semibold text-ink">
                {UPSIDE.sliderLabel}
              </label>
              <span className="metric text-2xl text-ink" aria-hidden="true">
                {pct}%
              </span>
            </div>
            <Slider
              className="mt-3"
              min={UPSIDE.min}
              max={UPSIDE.max}
              step={UPSIDE.step}
              value={[pct]}
              onValueChange={(v) => setPct(v[0] ?? UPSIDE.defaultPct)}
              aria-labelledby="upside-label"
              thumbLabel={UPSIDE.sliderLabel}
              thumbValueText={`${pct}% let, ${label} a year`}
            />
            <div className="flex justify-between text-xs text-body" aria-hidden="true">
              <span>{UPSIDE.min}%</span>
              <span>{UPSIDE.max}%</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="text-sm font-semibold text-body">Annual office rent</p>
          <p className="metric mt-2 text-5xl text-primary md:text-6xl" aria-live="polite">
            {label} <span className="text-xl font-semibold tracking-normal text-ink md:text-2xl">a year</span>
          </p>
          <div className="mt-6 h-16">
            <ClientOnly fallback={<ChartSkeleton className="h-16" />}>
              <Suspense fallback={<ChartSkeleton className="h-16" />}>
                <UpsideBar value={rent} max={max} />
              </Suspense>
            </ClientOnly>
          </div>
        </div>
      </div>
      <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-body">{UPSIDE.caption}</p>
    </FadeUp>
  );
}
