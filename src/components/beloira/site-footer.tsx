import { FOOTER, SITE } from "@/data/beloira";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page py-12 lg:py-16">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <Wordmark />
          <p className="text-sm text-ink-foreground/75">{SITE.division}</p>
        </div>
        <p className="mt-8 max-w-3xl border-t border-ink-foreground/15 pt-8 text-sm leading-relaxed text-ink-foreground/75">
          {FOOTER.legal}
        </p>
      </div>
    </footer>
  );
}
