import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, type ComponentType } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MARKET } from "@/data/beloira";
import { ChartSkeleton } from "./chart-skeleton";
import { FadeUp } from "./fade-up";
import { SectionHeading } from "./section-heading";

const OccupiersChart = lazy(() => import("./charts/occupiers-chart"));
const RentsChart = lazy(() => import("./charts/rents-chart"));
const CapitalChart = lazy(() => import("./charts/capital-chart"));

type TabKey = keyof typeof MARKET.tabs;

const CHARTS: Record<TabKey, ComponentType> = {
  occupiers: OccupiersChart,
  rents: RentsChart,
  capital: CapitalChart,
};

/** Screen-reader equivalent of each chart. */
function ChartTable({ tab }: { tab: TabKey }) {
  if (tab === "occupiers") {
    return (
      <table className="sr-only">
        <caption>{MARKET.tabs.occupiers.chartTitle}</caption>
        <thead>
          <tr>
            <th scope="col">Phase</th>
            <th scope="col">All grades</th>
            <th scope="col">Grade A/B+</th>
          </tr>
        </thead>
        <tbody>
          {MARKET.tabs.occupiers.data.map((d) => (
            <tr key={d.phase}>
              <th scope="row">{d.phase}</th>
              <td>{d.allGrades.toFixed(1)}%</td>
              <td>{d.gradeA}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  const t = MARKET.tabs[tab];
  return (
    <table className="sr-only">
      <caption>{t.chartTitle}</caption>
      <tbody>
        {t.data.map((d) => (
          <tr key={d.name}>
            <th scope="row">{d.name}</th>
            <td>{tab === "rents" ? `€${d.value.toFixed(2)}` : `${d.value.toFixed(2)}%`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Legend({ tab }: { tab: TabKey }) {
  if (tab !== "occupiers") return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-body" aria-hidden="true">
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-body/45" /> All grades
      </li>
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-ink" /> Grade A/B+
      </li>
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Grade A/B+, Phase 2
      </li>
    </ul>
  );
}

export function MarketSection() {
  const keys = Object.keys(MARKET.tabs) as TabKey[];

  return (
    <section id="market" aria-labelledby="market-title" className="section-pad bg-surface">
      <div className="container-page">
        <SectionHeading id="market-title" eyebrow={MARKET.eyebrow} title={MARKET.title} intro={MARKET.intro} />

        <FadeUp className="mt-12 lg:mt-16">
          <Tabs defaultValue="occupiers">
            <TabsList
              aria-label="Market indicators"
              className="no-scrollbar h-auto w-full justify-start gap-1 overflow-x-auto rounded-none border-b border-border bg-transparent p-0"
            >
              {keys.map((k) => (
                <TabsTrigger
                  key={k}
                  value={k}
                  className="relative h-12 shrink-0 rounded-none bg-transparent px-5 text-[15px] font-semibold text-body shadow-none after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-transparent hover:text-ink data-[state=active]:bg-transparent data-[state=active]:text-ink data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                  {MARKET.tabs[k].label}
                </TabsTrigger>
              ))}
            </TabsList>

            {keys.map((k) => {
              const tab = MARKET.tabs[k];
              const Chart = CHARTS[k];
              return (
                <TabsContent key={k} value={k} className="mt-6">
                  <div className="card-base grid gap-10 p-6 sm:p-8 lg:grid-cols-12 lg:gap-12 lg:p-10">
                    <figure className="lg:col-span-7">
                      <figcaption className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-ink">{tab.chartTitle}</span>
                        <Legend tab={k} />
                      </figcaption>
                      <div className="mt-6 h-72 sm:h-80" aria-hidden="true">
                        <ClientOnly fallback={<ChartSkeleton className="h-full" />}>
                          <Suspense fallback={<ChartSkeleton className="h-full" />}>
                            <Chart />
                          </Suspense>
                        </ClientOnly>
                      </div>
                      <ChartTable tab={k} />
                    </figure>

                    <div className="flex flex-col gap-8 lg:col-span-5">
                      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                        {tab.metrics.map((m) => (
                          <div key={m.figure} className="border-t border-border pt-5">
                            <dt className="metric text-[2.5rem] text-primary md:text-5xl">{m.figure}</dt>
                            <dd className="mt-3 text-[15px] leading-relaxed text-body">{m.text}</dd>
                          </div>
                        ))}
                      </dl>
                      <p className="border-l-2 border-primary pl-4 text-lg font-bold leading-snug text-ink lg:mt-auto">
                        {tab.takeaway}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
          <p className="mt-6 max-w-4xl text-xs leading-relaxed text-body">{MARKET.footnote}</p>
        </FadeUp>
      </div>
    </section>
  );
}
