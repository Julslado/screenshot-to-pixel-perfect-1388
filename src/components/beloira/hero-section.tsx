import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CTA, HERO, IMAGES } from "@/data/beloira";
import { cn } from "@/lib/utils";
import { useAccess } from "./access-context";
import { CountUp } from "./count-up";

export function HeroSection() {
  const { openNda } = useAccess();

  return (
    <section
      id="overview"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden bg-ink text-ink-foreground"
    >
      <img
        src={IMAGES.hero}
        alt={IMAGES.heroAlt}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-page flex flex-1 flex-col justify-center pb-10 pt-16 lg:pb-14 lg:pt-24">
        <div className="max-w-3xl">
          <p className="eyebrow text-ink-foreground/80">
            <span className="mr-3 hidden h-px w-8 sm:inline-block translate-y-[-3px] bg-ink-foreground/60 align-middle" aria-hidden="true" />
            {HERO.eyebrow}
          </p>
          <h1 id="hero-title" className="text-display mt-6">
            {HERO.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-foreground/85 md:text-xl">{HERO.subtitle}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-ink-foreground text-ink hover:bg-ink-foreground/90"
              onClick={openNda}
            >
              {CTA.nda}
            </Button>
            <Button size="lg" variant="outline-light" onClick={() => toast(CTA.teaserToast)}>
              {CTA.teaser}
            </Button>
          </div>
          <p className="mt-4 text-sm text-ink-foreground/70">{HERO.microcopy}</p>
        </div>
      </div>

      <div className="container-page pb-6 lg:pb-10">
        <ul
          aria-label="Key metrics"
          className={cn(
            "glass-strip no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-xl",
            "sm:grid sm:grid-cols-6 sm:overflow-visible lg:grid-cols-5",
          )}
        >
          {HERO.metrics.map((metric, i) => (
            <li
              key={metric.label}
              className={cn(
                "flex min-w-[72%] shrink-0 snap-start flex-col justify-between gap-3 p-5 sm:min-w-0 lg:p-6",
                "border-ink-foreground/15 [&:not(:first-child)]:border-l",
                i < 2 ? "sm:col-span-3" : "sm:col-span-2",
                "lg:col-span-1",
                // grid dividers for the 2+3 tablet layout
                i === 2 && "sm:border-l-0 lg:border-l",
                i >= 2 && "sm:border-t lg:border-t-0",
              )}
            >
              <p className="metric whitespace-nowrap text-[2.5rem] lg:text-[2.25rem] xl:text-[2.75rem]">
                {metric.kind === "number" ? (
                  <>
                    {metric.prefix}
                    <CountUp value={metric.value} decimals={metric.decimals} />
                    {metric.unit && (
                      <span
                        className={cn(
                          "text-[0.5em] font-semibold tracking-normal",
                          metric.unit !== "%" && "ml-1.5",
                        )}
                      >
                        {metric.unit}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-[0.82em]">{metric.text}</span>
                )}
              </p>
              <p className="text-sm leading-snug text-ink-foreground/80">{metric.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
