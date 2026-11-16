import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CTA, NAV, type SectionId } from "@/data/beloira";
import { cn } from "@/lib/utils";
import { useAccess } from "./access-context";
import { Wordmark } from "./wordmark";

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("overview");
  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        const first = visible[0];
        if (first) setActive(first.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function SiteHeader() {
  const active = useActiveSection();
  const { openNda } = useAccess();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-[var(--header-h)] border-b border-border bg-background">
      <div className="container-page flex h-full items-center justify-between gap-6">
        <a href="#overview" className="flex min-h-11 items-center text-ink" aria-label="Back to top">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative flex h-11 items-center px-3 text-sm font-medium text-body transition-colors hover:text-ink",
                    "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform",
                    active === item.id && "text-ink after:scale-x-100",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={openNda} className="hidden sm:inline-flex">
            {CTA.header}
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="!size-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-full">
              <div className="flex h-[var(--header-h)] items-center border-b border-border px-6">
                <SheetTitle className="text-ink">
                  <Wordmark />
                </SheetTitle>
              </div>
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="flex flex-col">
                  {NAV.map((item) => (
                    <li key={item.id} className="border-b border-border">
                      <a
                        href={`#${item.id}`}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active === item.id ? "true" : undefined}
                        className={cn(
                          "flex min-h-14 items-center text-xl font-semibold text-ink",
                          active === item.id && "text-primary",
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="border-t border-border p-6">
                <Button
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openNda();
                  }}
                >
                  {CTA.header}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
