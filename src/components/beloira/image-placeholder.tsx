import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { src: string | null; alt: string; className?: string };

/** Renders the real image when `src` is set, otherwise a neutral light-grey placeholder. */
export function ImageSlot({ src, alt, className }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("h-full w-full rounded-xl object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <Building2 className="h-10 w-10 text-body/60" strokeWidth={1.25} aria-hidden="true" />
    </div>
  );
}
