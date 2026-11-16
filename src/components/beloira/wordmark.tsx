import { SITE } from "@/data/beloira";
import { cn } from "@/lib/utils";

/** Plain text wordmark. Intentionally not a logo. */
export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("wordmark", className)}>{SITE.wordmark}</span>;
}
