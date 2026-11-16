import { Check, Folder, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DATA_ROOM } from "@/data/beloira";
import { cn } from "@/lib/utils";
import { useAccess } from "./access-context";
import { FadeUp } from "./fade-up";
import { SectionHeading } from "./section-heading";

type Phase = 1 | 2;

/*
 * Preview only. Every folder opens the NDA modal; no documents are served.
 * The pricing text below is gated in React state only and is present in the client bundle.
 * Before any real use, move gated content behind a server-side, authenticated data room.
 */

function PhaseToggle({ phase, onChange }: { phase: Phase; onChange: (p: Phase) => void }) {
  const options: { value: Phase; label: string; caption: string }[] = [
    { value: 1, label: DATA_ROOM.phase1Label, caption: DATA_ROOM.phase1Caption },
    { value: 2, label: DATA_ROOM.phase2Label, caption: DATA_ROOM.phase2Caption },
  ];
  return (
    <div role="radiogroup" aria-label="Data room phase" className="inline-flex rounded-lg border border-border bg-background p-1">
      {options.map((o) => {
        const active = phase === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
                e.preventDefault();
                const next: Phase = phase === 1 ? 2 : 1;
                onChange(next);
                (e.currentTarget.parentElement?.querySelectorAll("button")[next - 1] as HTMLButtonElement)?.focus();
              }
            }}
            tabIndex={active ? 0 : -1}
            className={cn(
              "flex min-h-11 flex-col items-start rounded-md px-4 py-1.5 text-left transition-colors sm:px-5",
              active ? "bg-ink text-ink-foreground" : "text-ink hover:bg-surface",
            )}
          >
            <span className="text-sm font-bold">{o.label}</span>
            <span className={cn("text-xs", active ? "text-ink-foreground/75" : "text-body")}>{o.caption}</span>
          </button>
        );
      })}
    </div>
  );
}

function PricingTeaser() {
  const { ndaRequested, openNda } = useAccess();
  return (
    <div className="card-base relative min-h-[22rem] overflow-hidden p-6 sm:p-8">
      <p className="eyebrow text-primary">
        {ndaRequested ? DATA_ROOM.pricing.unlockedLabel : DATA_ROOM.pricing.lockedLabel}
      </p>
      <p
        className={cn(
          "mt-6 text-lg leading-relaxed text-ink transition-[filter] duration-500",
          !ndaRequested && "locked-blur",
        )}
        aria-hidden={!ndaRequested}
      >
        {DATA_ROOM.pricing.text}
      </p>
      {!ndaRequested && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/50 p-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-ink-foreground">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm font-semibold text-ink">Pricing guidance is shared after NDA.</p>
          <Button onClick={openNda}>{DATA_ROOM.pricing.cta}</Button>
        </div>
      )}
    </div>
  );
}

export function DataRoomSection() {
  const [phase, setPhase] = useState<Phase>(1);
  const { openNda } = useAccess();

  return (
    <section id="data-room" aria-labelledby="data-room-title" className="section-pad bg-surface">
      <div className="container-page">
        <SectionHeading id="data-room-title" eyebrow={DATA_ROOM.eyebrow} title={DATA_ROOM.title} intro={DATA_ROOM.sub} />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <FadeUp className="lg:col-span-7">
            <PhaseToggle phase={phase} onChange={setPhase} />
            <ul className="card-base mt-6 divide-y divide-border overflow-hidden" aria-label={`Data room folders, ${phase === 1 ? DATA_ROOM.phase1Label : DATA_ROOM.phase2Label} view`}>
              {DATA_ROOM.folders.map((f) => {
                const outOfPhase = phase === 1 && f.phase === 2;
                const included = phase === 2 && f.phase === 1;
                const locked = f.locked || outOfPhase;
                return (
                  <li key={f.n}>
                    <button
                      type="button"
                      onClick={openNda}
                      className={cn(
                        "group flex min-h-14 w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-surface focus-visible:-outline-offset-2",
                        (outOfPhase || included) && "text-body",
                      )}
                    >
                      <span className={cn("metric w-6 shrink-0 text-sm", outOfPhase ? "text-body/60" : "text-body")}>
                        {String(f.n).padStart(2, "0")}
                      </span>
                      <Folder
                        className={cn("h-5 w-5 shrink-0", outOfPhase ? "text-body/50" : "text-ink")}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "flex-1 text-[15px] font-medium leading-snug",
                          outOfPhase ? "text-body/80" : "text-ink",
                        )}
                      >
                        {f.name}
                        {f.locked && (
                          <span className="locked-blur ml-2 hidden text-body sm:inline" aria-hidden="true">
                            Guidance corridor
                          </span>
                        )}
                      </span>
                      {included && (
                        <span className="flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" /> Included
                        </span>
                      )}
                      {locked && !included && (
                        <Lock className={cn("h-4 w-4 shrink-0", f.locked ? "text-primary" : "text-body/70")} aria-label="Locked" />
                      )}
                      <span className="sr-only">. Preview only, request access to open.</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </FadeUp>

          <FadeUp className="lg:col-span-5" delay={0.05}>
            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <PricingTeaser />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
