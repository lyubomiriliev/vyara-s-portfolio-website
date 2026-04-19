'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import Link from 'next/link'
import { services, categories } from '@/data/services'
import { staggerContainer, scaleIn } from '@/lib/animations'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
import { useLang } from '@/lib/LanguageContext'

type FilterCategory = 'all' | 'marketing' | 'creative' | 'web'

export default function ServicesPage() {
  const { t } = useLang()
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const tabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t.services.allServices },
    ...categories.map(c => ({ id: c.id as FilterCategory, label: c.label })),
  ]

  const filtered = activeFilter === 'all'
    ? services
    : services.filter(s => s.category === activeFilter)

  return (
    <section className="section-padding">
      <div className="container">
        {/* Tab filter */}
        <div className="flex gap-3 flex-wrap justify-center mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-5 py-2 rounded-pill text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === tab.id
                  ? 'text-white shadow-glow-pink'
                  : 'glass-card text-white/60 hover:text-white'
              }`}
              style={activeFilter === tab.id ? { background: 'linear-gradient(135deg, #FFB76C, #FF419D)' } : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services grid */}
        <AnimatePresence mode="wait">
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
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
