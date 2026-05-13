'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import type { Service } from '@/data/services'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { Glow } from '@/components/ui/Glow'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface Props {
  service: Service
}

const categoryAccent: Record<string, string> = {
  marketing: '#E040A0',
  creative:  '#FFB76C',
  web:       '#9B59F5',
}

export default function ServiceDetailPage({ service }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComp = (Icons as any)[service.icon] as React.ElementType | undefined
  const accent = categoryAccent[service.category] ?? '#E040A0'

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <Glow color="pink"   size={700} className="top-1/2 left-1/4" />
        <Glow color="orange" size={500} className="top-1/3 right-1/4" />

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Back link */}
            <motion.div variants={fadeUp} className="mb-8">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                <ArrowLeft size={14} />
                All Services
              </Link>
            </motion.div>

            <motion.div variants={fadeUp}>
              <SectionLabel>{service.categoryLabel}</SectionLabel>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="w-16 h-16 rounded-2xl flex items-center justify-center mt-4 mb-6"
              style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
            >
              {IconComp && <IconComp size={28} style={{ color: accent }} />}
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-7xl text-white leading-[1.05] mb-6"
            >
              {service.title}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10"
            >
              {service.description}
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link href="/contact">
                <ButtonPrimary size="lg">Get Started →</ButtonPrimary>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div variants={fadeUp} className="mb-10">
              <SectionLabel>What&apos;s Included</SectionLabel>
              <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl 3xl:text-5xl text-white mt-3">
                Everything you need to succeed
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6"
            >
              {service.benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="glass-card p-5 flex items-start gap-4 group"
                >
                  <CheckCircle2
                    size={20}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: accent }}
                  />
                  <span className="text-white/75 text-sm leading-relaxed group-hover:text-white transition-colors duration-200">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA inline */}
      <section className="pb-12 sm:pb-16 md:pb-20 lg:pb-24">
        <div className="container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-6 sm:p-8 md:p-12 lg:p-16 text-center"
            style={{
              background: `linear-gradient(135deg, ${accent}12, rgba(255,255,255,0.02))`,
              border: `1px solid ${accent}25`,
            }}
          >
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
            />
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl 3xl:text-5xl text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/55 text-sm sm:text-base mb-8 max-w-lg mx-auto">
              Let&apos;s talk about your project and how {service.title} can help your brand grow.
            </p>
            <Link href="/contact">
              <ButtonPrimary size="lg">Book a Free Consultation →</ButtonPrimary>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
