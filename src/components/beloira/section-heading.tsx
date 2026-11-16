import { cn } from "@/lib/utils";
import { FadeUp } from "./fade-up";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, intro, id, className, align = "left" }: Props) {
  return (
    <FadeUp
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h2 id={id} className="text-h2 mt-4 text-ink">
        {title}
      </h2>
      {intro && <p className="mt-5 text-lg text-body">{intro}</p>}
    </FadeUp>
  );
}
