'use client'

import { useLang } from '@/lib/LanguageContext'
import { PageHero } from './PageHero'
import { ServicesHeroFloatingCards } from './ServicesHeroFloatingCards'

type HeroKey = keyof ReturnType<typeof useLang>['t']['pageHeroes']

export function TranslatedPageHero({ heroKey }: { heroKey: HeroKey }) {
  const { t } = useLang()
  const h = t.pageHeroes[heroKey]
  return (
    <PageHero
      label={h.label}
      title={h.title}
      titleGradient={h.titleGradient}
      description={h.description}
    >
      {heroKey === 'services' && <ServicesHeroFloatingCards />}
    </PageHero>
  )
}
