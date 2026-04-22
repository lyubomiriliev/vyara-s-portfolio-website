'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { services } from '@/data/services'
import { staggerContainer, scaleIn } from '@/lib/animations'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
import { useLang } from '@/lib/LanguageContext'
import MagicBento from '@/components/ui/MagicBento'

type FilterCategory = 'all' | 'marketing' | 'creative' | 'web'

export default function ServicesPage() {
  const { t } = useLang()
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const tabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t.services.allServices },
    ...t.categoriesList.map(c => ({ id: c.id as FilterCategory, label: c.label })),
  ]

  const translatedServices = services.map((s, i) => ({
    ...s,
    ...t.servicesList[i],
  }))

  const filtered = activeFilter === 'all'
    ? translatedServices
    : translatedServices.filter(s => s.categories?.includes(activeFilter) ?? s.category === activeFilter)

  return (
    <section className="section-padding">
      <div className="container">
        {/* Tab filter */}
        <div className="mb-14 flex justify-center">
          <div className="relative inline-flex items-center gap-1 p-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className="relative z-10 py-2 px-5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                style={{ color: activeFilter === tab.id ? '#fff' : 'rgba(255,255,255,0.45)' }}
              >
                {activeFilter === tab.id && (
                  <motion.span
                    layoutId="services-pill"
                    className="absolute inset-0 rounded-full z-[-1]"
                    style={{ background: 'linear-gradient(135deg, #FFB76C, #FF419D)' }}
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services grid */}
        <AnimatePresence mode="wait">
          {activeFilter === 'marketing' ? (
            <motion.div
              key="marketing-bento"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <MagicBento
                cards={filtered.map(s => ({
                  id: s.id,
                  icon: s.icon,
                  title: s.title,
                  description: s.description,
                  benefits: s.benefits,
                }))}
                getStartedLabel={t.services.getStarted}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map(service => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const IconComp = (Icons as any)[service.icon] as React.ElementType | undefined
                return (
                  <motion.div
                    key={service.id}
                    variants={scaleIn}
                    className="glass-card p-8 flex flex-col gap-4 group"
                  >
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center
                                 group-hover:shadow-glow-pink transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, rgba(255,183,108,0.15), rgba(255,65,157,0.15))' }}
                    >
                      {IconComp && <IconComp size={26} className="text-accent-pink" />}
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl text-white">{service.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed flex-1">{service.description}</p>

                    {/* Benefits */}
                    <ul className="flex flex-col gap-2">
                      {service.benefits.map(b => (
                        <li key={b} className="flex items-center gap-2 text-xs text-white/50">
                          <span className="w-1 h-1 rounded-full bg-accent-pink flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href="/contact">
                      <ButtonPrimary size="sm" className="w-full justify-center mt-2">
                        {t.services.getStarted}
                      </ButtonPrimary>
                    </Link>
                  </motion.div>
                )
              })}

              {/* Custom service card — only in "all" view */}
              {activeFilter === 'all' && <motion.div
                variants={scaleIn}
                className="relative p-px rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #FFB76C, #FF419D, #7B5EA7)' }}
              >
                <div className="relative h-full rounded-2xl p-8 flex flex-col gap-4 overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0f0a1a, #1a0d2e)' }}
                >
                  {/* Ambient glow blob */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #FF419D, #FFB76C)' }}
                  />

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #FFB76C, #FF419D)' }}
                  >
                    <Icons.Sparkles size={26} className="text-white" />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-semibold tracking-widest uppercase"
                    style={{ background: 'linear-gradient(90deg, #FFB76C, #FF419D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    Персонализирана услуга
                  </span>

                  {/* Title */}
                  <h3 className="font-display font-bold text-2xl text-white leading-tight">
                    Не намираш това, което търсиш?
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/70 leading-relaxed flex-1">
                    Всеки бизнес е уникален. Ако имаш идея, която не попада в стандартните категории — ние я реализираме. Свържи се с нас и нека изградим нещо по мярка само за теб.
                  </p>

                  {/* CTA */}
                  <Link href="/contact">
                    <button
                      className="w-full mt-2 py-3 px-6 rounded-pill font-semibold text-sm text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #FFB76C, #FF419D)' }}
                    >
                      Свържи се с нас →
                    </button>
                  </Link>
                </div>
              </motion.div>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
