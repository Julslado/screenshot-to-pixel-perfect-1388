import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { AccessProvider } from "./access-context";
import { ContactSection } from "./contact-section";
import { DataRoomSection } from "./data-room-section";
import { HeroSection } from "./hero-section";
import { HighlightsSection } from "./highlights-section";
import { LocationSection } from "./location-section";
import { MarketSection } from "./market-section";
import { NdaModal } from "./nda-modal";
import { ProcessSection } from "./process-section";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function BeloiraPage() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <AccessProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-lg bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">
            <HeroSection />
            <HighlightsSection />
            <MarketSection />
            <LocationSection />
            <ProcessSection />
            <DataRoomSection />
            <ContactSection />
          </main>
          <SiteFooter />
          <NdaModal />
          <Toaster position="bottom-center" />
        </AccessProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
