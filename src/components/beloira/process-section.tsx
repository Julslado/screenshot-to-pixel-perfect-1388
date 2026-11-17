import { PROCESS } from "@/data/beloira";
import { cn } from "@/lib/utils";
import { FadeUp } from "./fade-up";
import { SectionHeading } from "./section-heading";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-pad bg-background border-t border-border">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={PROCESS.eyebrow} title={PROCESS.title} />

        <ol className="relative mt-12 grid gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {/* connector line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden="true" className="absolute bottom-8 left-[27px] top-8 w-px bg-border lg:hidden" />
          <span aria-hidden="true" className="absolute left-8 right-8 top-[43px] hidden h-px bg-border lg:block" />

          {PROCESS.steps.map((step, i) => (
            <FadeUp
              as="li"
              key={step.n}
              delay={i * 0.06}
              className="relative"
            >
              <article
                aria-current={step.current ? "step" : undefined}
                className={cn(
                  "card-base relative flex h-full gap-5 p-5 lg:flex-col lg:p-6",
                  step.current && "border-teal",
                )}
              >
                <span
                  className={cn(
                    "metric relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base",
                    step.current ? "bg-teal text-primary-foreground" : "bg-ink text-ink-foreground",
                  )}
                  aria-hidden="true"
                >
                  {step.n}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-ink">
                      <span className="sr-only">Step {step.n}: </span>
                      {step.name}
                    </h3>
                    {step.current && (
                      <span className="eyebrow rounded-full bg-teal px-2.5 py-1 text-primary-foreground">
                        {PROCESS.currentBadge}
                      </span>
                    )}
                  </div>
                  <p className="metric mt-2 text-2xl text-ink">{step.duration}</p>
                  <p className="mt-2 text-[15px] leading-snug text-body">{step.detail}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </ol>

        <FadeUp>
          <p className="mt-10 text-lg font-semibold text-ink">{PROCESS.closing}</p>
        </FadeUp>
      </div>
    </section>
  );
}
