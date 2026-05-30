'use client'

import { useLang } from '@/lib/LanguageContext'
import { PageHero } from './PageHero'
import { ServicesHeroFloatingCards } from './ServicesHeroFloatingCards'

type HeroKey = keyof ReturnType<typeof useLang>['t']['pageHeroes']

export function TranslatedPageHero({ heroKey }: { heroKey: HeroKey }) {
  const { t } = useLang()
  const h = t.pageHeroes[heroKey]
  const bgImageMap: Partial<Record<HeroKey, string>> = {
    work: '/background-images/rule-your-brand.webp',
  }

  return (
    <PageHero
      label={h.label}
      title={h.title}
      titleGradient={h.titleGradient}
      description={h.description}
      titleSize={heroKey === "services" ? "sm" : "default"}
      bgImage={bgImageMap[heroKey]}
    >
      {heroKey === 'services' && <ServicesHeroFloatingCards />}
    </PageHero>
  )
}
