import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number; as?: "div" | "li" };

/** Fade-up on scroll: 20px, 400ms, once. Disabled under prefers-reduced-motion. */
export function FadeUp({ children, className, delay = 0, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = as === "li" ? m.li : m.div;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: reduce ? 0 : 0.4, ease: "easeOut", delay: reduce ? 0 : delay }}
    >
      {children}
    </Comp>
  );
}
