import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, CTA } from "@/data/beloira";
import { useAccess } from "./access-context";
import { FadeUp } from "./fade-up";
import { SectionHeading } from "./section-heading";

export function ContactSection() {
  const { openNda } = useAccess();
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad bg-background">
      <div className="container-page">
        <SectionHeading id="contact-title" eyebrow={CONTACT.eyebrow} title={CONTACT.title} />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-5">
          {CONTACT.people.map((p, i) => (
            <FadeUp key={p.email} delay={i * 0.05}>
              <address className="card-base card-lift flex h-full items-start gap-5 p-6 not-italic sm:p-8">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface text-lg font-bold text-ink"
                  aria-hidden="true"
                >
                  {p.initials}
                </span>
                <div className="min-w-0">
                  <p className="text-lg font-bold text-ink">{p.name}</p>
                  <p className="text-[15px] text-body">{p.role}</p>
                  <a
                    href={`mailto:${p.email}`}
                    className="mt-4 inline-flex min-h-11 max-w-full items-center gap-2 break-all text-[15px] font-semibold text-ink underline-offset-4 hover:text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {p.email}
                  </a>
                </div>
              </address>
            </FadeUp>
          ))}
        </div>
        <p className="mt-6 text-sm text-body">{CONTACT.phone}</p>

        <FadeUp className="mt-16 flex flex-col items-center border-t border-border pt-16 text-center">
          <Button size="lg" onClick={openNda}>
            {CTA.nda}
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
