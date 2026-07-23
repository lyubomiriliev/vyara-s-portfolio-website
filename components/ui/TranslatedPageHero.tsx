"use client";

import { useLang } from "@/lib/LanguageContext";
import { PageHero } from "./PageHero";
import { ServicesHeroFloatingCards } from "./ServicesHeroFloatingCards";

type HeroKey = keyof ReturnType<typeof useLang>["t"]["pageHeroes"];

export function TranslatedPageHero({ heroKey }: { heroKey: HeroKey }) {
  const { t } = useLang();
  const h = t.pageHeroes[heroKey];
  const bgImageMap: Partial<Record<HeroKey, string>> = {
    work: "/services-images/social-media-management.webp",
  };

  return (
    <PageHero
      label={h.label}
      title={h.title}
      titleGradient={h.titleGradient}
      description={h.description}
      titleSize={heroKey === "services" ? "sm" : "default"}
      bgImage={bgImageMap[heroKey]}
      fullHeight={heroKey === "work"}
    >
      {heroKey === "services" && <ServicesHeroFloatingCards />}
    </PageHero>
  );
}
