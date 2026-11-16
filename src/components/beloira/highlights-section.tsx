import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ChevronDown, Clock, FlaskConical, Leaf, Route, TrendingUp, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { HIGHLIGHTS, type HighlightIcon } from "@/data/beloira";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { FadeUp } from "./fade-up";
import { SectionHeading } from "./section-heading";
import { UpsideModule } from "./upside-module";

const ICONS: Record<HighlightIcon, LucideIcon> = {
  clock: Clock,
  flask: FlaskConical,
  leaf: Leaf,
  trending: TrendingUp,
  route: Route,
};

export function HighlightsSection() {
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setOpen((prev) => {
      const isOpen = prev.has(i);
      // Accordion on mobile (one at a time); independent in-place expansion on larger screens.
      const next = isMobile ? new Set<number>() : new Set(prev);
      if (isOpen) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="highlights" aria-labelledby="highlights-title" className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading id="highlights-title" eyebrow={HIGHLIGHTS.eyebrow} title={HIGHLIGHTS.title} />

        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6 lg:mt-16 xl:grid-cols-5 xl:gap-5">
          {HIGHLIGHTS.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            const isOpen = open.has(i);
            const panelId = `highlight-panel-${i}`;
            return (
              <FadeUp
                as="li"
                key={item.title}
                delay={i * 0.05}
                className={cn("md:col-span-2 xl:col-span-1", i >= 3 && "md:col-span-3 xl:col-span-1")}
              >
                <article className="card-base card-lift flex h-full flex-col p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface text-ink">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="metric mt-6 text-[2.5rem] text-primary [font-variant-numeric:normal]">{item.figure}</p>
                  <h3 className="mt-4 text-lg font-bold leading-snug text-ink">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{item.short}</p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        id={panelId}
                        key="panel"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0, height: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-border pt-4 mt-4 text-[15px] leading-relaxed text-body">
                          {item.long}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="-mx-2 mt-auto flex min-h-11 items-center gap-1.5 self-start rounded-md px-2 pt-4 text-sm font-semibold text-ink transition-colors hover:text-primary"
                  >
                    {isOpen ? "Show less" : "Read more"}
                    <span className="sr-only">about {item.title}</span>
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                </article>
              </FadeUp>
            );
          })}
        </ul>

        <UpsideModule />
      </div>
    </section>
  );
}
