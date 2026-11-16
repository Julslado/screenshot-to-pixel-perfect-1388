import { cn } from "@/lib/utils";

export function ChartSkeleton({ className }: { className?: string }) {
  return <div className={cn("w-full animate-pulse rounded-lg bg-border/50", className)} aria-hidden="true" />;
}
