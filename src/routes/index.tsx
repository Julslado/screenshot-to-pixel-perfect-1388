import { createFileRoute } from "@tanstack/react-router";
import { BeloiraPage } from "@/components/beloira/beloira-page";
import { SITE } from "@/data/beloira";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
    ],
  }),
  component: BeloiraPage,
});
