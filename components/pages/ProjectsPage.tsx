'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '@/lib/LanguageContext'

interface WebProject {
  id: string
  name: string
  client: string
  logo: string
  thumbnail: string
  description: { en: string; bg: string }
  url: string
  category: string
  accentColor: string
  tech: string[]
}

const projects: WebProject[] = [
  {
    id: 'mbcenter',
    name: 'MB Center',
    client: 'MB Center',
    logo: '/websites/mbc-logo-black.png',
    thumbnail: '/websites/images/mbcenter.webp',
    description: {
      en: 'Premium automotive service centre website with multi-language support, service booking flow, and a refined brand experience built for luxury clientele.',
      bg: 'Уебсайт за премиум автомобилен сервиз с многоезична поддръжка, система за резервации и изискано брандиране за луксозна клиентела.',
    },
    url: 'https://mbcenter.bg/bg/',
    category: 'Business Website',
    accentColor: '#1a1a2e',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n'],
  },
  {
    id: 'robohub',
    name: 'RoboHub Pro',
    client: 'RoboHub Pro',
    logo: '/websites/robohub-logo.png',
    thumbnail: '/websites/images/robohub.webp',
    description: {
      en: 'A cutting-edge platform for robotics and automation products, featuring an immersive product showcase, technical specs display, and seamless e-commerce integration.',
      bg: 'Платформа за роботика и автоматизация с продуктова витрина, технически спецификации и безпроблемна e-commerce интеграция.',
    },
    url: 'https://robohubpro.com/en/',
    category: 'E-Commerce',
    accentColor: '#0f1729',
    tech: ['Next.js', 'Framer Motion', 'TypeScript', 'Stripe'],
  },
  {
    id: 'activegym',
    name: 'Active Gym',
    client: 'Active Gym',
    logo: '/websites/active-gym-logo.webp',
    thumbnail: '/websites/images/activegym.webp',
    description: {
      en: 'High-energy fitness brand website with class schedules, membership plans, and a performance-first design that drives gym sign-ups and member retention.',
      bg: 'Уебсайт за фитнес бранд с програми за тренировки, членски планове и дизайн, ориентиран към конверсии.',
    },
    url: 'https://activegym.eu/en/',
    category: 'Fitness & Health',
    accentColor: '#1a0a0a',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'CMS'],
  },
  {
    id: 'pulsePadel',
    name: 'Pulse Padel',
    client: 'Pulse Padel',
    logo: '/websites/pulse-padel-logo.png',
    thumbnail: '/websites/images/pulse-padel.webp',
    description: {
      en: 'Dynamic sports club website for an elite padel venue — online court booking, tournament management, and a brand identity that captures the energy of the sport.',
      bg: 'Уебсайт за елитен падел клуб с онлайн резервации на кортове, управление на турнири и брандиране, което предава енергията на спорта.',
    },
    url: 'https://pulse-padel.com/',
    category: 'Sports & Recreation',
    accentColor: '#0a1a0f',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Booking API'],
  },
  {
    id: 'smartstrips',
    name: 'Smart Strips',
    client: 'Smart Strips',
    logo: '/websites/smart-strips-logo.png',
    thumbnail: '/websites/images/smart-strips.jpg',
    description: {
      en: 'Modern e-commerce store for smart LED lighting products — product configurator, comparison tools, and a clean UX that converts browsers into buyers.',
      bg: 'Модерен e-commerce магазин за смарт LED осветление с конфигуратор на продукти и изчистен UX, ориентиран към продажби.',
    },
    url: 'https://smartstrips.bg/bg',
    category: 'E-Commerce',
    accentColor: '#0a0a1a',
    tech: ['Next.js', 'Shopify', 'Tailwind CSS', 'Analytics'],
  },
  {
    id: 'pawsheaven',
    name: "Paws Heaven",
    client: "Paws Heaven",
    logo: '/websites/paws-heaven-logo.png',
    thumbnail: '/websites/images/paws-heaven.webp',
    description: {
      en: 'Warm and inviting pet care platform with service booking, grooming gallery, and trust-building design that connects pet owners with expert care.',
      bg: 'Платформа за грижи за домашни любимци с резервации, галерия и дизайн, изграждащ доверие между собственици и специалисти.',
    },
    url: 'https://paws-heaven.com/',
    category: 'Pet Care',
    accentColor: '#1a0f0a',
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'EmailJS'],
  },
  {
    id: 'trending',
    name: 'Trending.bg',
    client: 'Trending.bg',
    logo: '/websites/trending-logo.png',
    thumbnail: '/websites/images/trending.jpg',
    description: {
      en: 'High-traffic Bulgarian news and lifestyle media platform — blazing fast load times, SEO-optimised architecture, and a clean editorial design for maximum engagement.',
      bg: 'Медийна платформа с висок трафик — светкавично бърза, SEO-оптимизирана архитектура и изчистен редакционен дизайн за максимален ангажимент.',
    },
    url: 'https://trending.bg/',
    category: 'Media & News',
    accentColor: '#0f0a1a',
    tech: ['Next.js', 'TypeScript', 'CMS', 'CDN'],
  },
]

export default function ProjectsPage() {
  const { t, locale } = useLang()
  const [activeId, setActiveId] = useState(projects[0].id)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Auto-advance every 3 seconds, pauses on user interaction
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveId(current => {
        const idx = projects.findIndex(p => p.id === current)
        return projects[(idx + 1) % projects.length].id
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [isPaused])

  const pauseAutoplay = () => {
    setIsPaused(true)
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 8000)
  }

  const activeIndex = projects.findIndex(p => p.id === activeId)

  const prev = () => {
    pauseAutoplay()
    if (isMobile) {
      setMobileIndex(i => Math.max(0, i - 1))
    } else {
      const newIndex = (activeIndex - 1 + projects.length) % projects.length
      setActiveId(projects[newIndex].id)
    }
  }

  const next = () => {
    pauseAutoplay()
    if (isMobile) {
      setMobileIndex(i => Math.min(projects.length - 1, i + 1))
    } else {
      const newIndex = (activeIndex + 1) % projects.length
      setActiveId(projects[newIndex].id)
    }
  }

  const mobileProject = projects[mobileIndex]

  return (
    <>
      {/* Desktop slider */}
      <section className="hidden md:block section-padding">
        <div className="w-full px-6 xl:px-12 2xl:px-20">
          {/* Slider row */}
          <div ref={containerRef} className="flex gap-3 h-[780px] items-stretch">
            {projects.map((project) => {
              const isActive = project.id === activeId
              return (
                <motion.div
                  key={project.id}
                  layout
                  animate={{
                    flexGrow: isActive ? 6 : 1,
                    opacity: isActive ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  onClick={() => { pauseAutoplay(); setActiveId(project.id) }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer flex-shrink-0"
                  style={{
                    minWidth: isActive ? 0 : 116,
                    boxShadow: isActive
                      ? '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(224,64,160,0.18)'
                      : '0 4px 24px rgba(0,0,0,0.4)',
                  }}
                  whileHover={!isActive ? { opacity: 0.9, scale: 1.01 } : {}}
                >
                  {/* Background image */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden"
                    animate={{ scale: isActive ? 1.0 : 1.05 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Image
                      src={project.thumbnail}
                      alt={project.name}
                      fill
                      className="object-cover"
                      style={{ filter: 'brightness(0.75)' }}
                    />
                  </motion.div>

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(to top, rgba(8,4,2,0.96) 0%, rgba(8,4,2,0.6) 45%, rgba(0,0,0,0.15) 75%, transparent 100%)'
                        : 'linear-gradient(to top, rgba(8,4,2,0.93) 0%, rgba(8,4,2,0.55) 55%, rgba(0,0,0,0.1) 100%)',
                    }}
                  />

                  {/* Inactive state — logo + vertical label */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 flex flex-col items-center justify-end pb-8 gap-4 px-2"
                      >
                        {/* Logo */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={project.logo}
                            alt={project.name}
                            fill
                            className="object-contain"
                            style={{ filter: 'brightness(0) invert(1)', opacity: 0.9 }}
                          />
                        </div>
                        {/* Vertical name */}
                        <span
                          className="text-white/70 text-[13px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap"
                          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                        >
                          {project.name}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active state content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0 flex flex-col justify-end p-8"
                      >
                        {/* Category pill */}
                        <span
                          className="self-start text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full mb-5"
                          style={{
                            background: 'rgba(224,64,160,0.18)',
                            border: '1px solid rgba(224,64,160,0.4)',
                            color: '#f472b6',
                          }}
                        >
                          {project.category}
                        </span>

                        {/* Logo */}
                        <div className="relative w-28 h-20 mb-4 flex items-center">
                          <Image
                            src={project.logo}
                            alt={project.name}
                            fill
                            className="object-contain"
                            style={{ filter: 'brightness(0) invert(1)' }}
                          />
                        </div>

                        {/* Name */}
                        <h3 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                          {project.name}
                        </h3>

                        {/* Description */}
                        <p className="text-white/60 text-base leading-relaxed mb-5 max-w-sm">
                          {project.description[locale as 'en' | 'bg'] ?? project.description.en}
                        </p>

                        {/* Tech */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.tech.map(t => (
                            <span
                              key={t}
                              className="text-xs px-3 py-1 rounded-md font-medium"
                              style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: 'rgba(255,255,255,0.55)',
                                border: '1px solid rgba(255,255,255,0.1)',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Princeps branding */}
                        {project.id !== 'mbcenter' && (
                          <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1.5">
                            <span className="text-white/40 text-xs font-medium tracking-[0.12em] uppercase">Powered by Princeps Group</span>
                            <Image
                              src="/websites/princeps-logo.png"
                              alt="Princeps Group"
                              width={120}
                              height={40}
                              className="h-10 w-auto object-contain"
                              style={{ opacity: 0.85 }}
                            />
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-3 flex-nowrap">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-[0.97] flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg, #E040A0, #9B59F5)' }}
                          >
                            <ExternalLink size={14} strokeWidth={2.5} />
                            Visit Website
                          </a>
                          <Link
                            href="/contact"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white whitespace-nowrap transition-colors duration-200 flex-shrink-0"
                            style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                          >
                            Similar Project
                            <ArrowRight size={13} strokeWidth={2.5} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Navigation bar */}
          <div className="flex items-center justify-between mt-8">
            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { pauseAutoplay(); setActiveId(p.id) }}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: p.id === activeId ? 28 : 8,
                    height: 8,
                    background: p.id === activeId
                      ? 'linear-gradient(135deg, #E040A0, #9B59F5)'
                      : 'rgba(255,255,255,0.18)',
                  }}
                  aria-label={`Go to ${p.name}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="Previous project"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors duration-200 cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="Next project"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile carousel */}
      <section className="md:hidden section-padding">
        <div className="container">
          {/* Mobile card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileProject.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: 480,
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
              }}
            >
              <Image
                src={mobileProject.thumbnail}
                alt={mobileProject.name}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.45) 60%, rgba(10,10,15,0.15) 100%)' }}
              />

              <div className="absolute inset-0 flex flex-col justify-end p-7">
                <span
                  className="self-start text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-3"
                  style={{ background: 'rgba(155,89,245,0.2)', border: '1px solid rgba(155,89,245,0.35)', color: '#c084fc' }}
                >
                  {mobileProject.category}
                </span>

                <div className="relative w-14 h-10 mb-3">
                  <Image
                    src={mobileProject.logo}
                    alt={mobileProject.name}
                    fill
                    className="object-contain"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">{mobileProject.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {mobileProject.description[locale as 'en' | 'bg'] ?? mobileProject.description.en}
                </p>

                <div className="flex items-center gap-3">
                  <a
                    href={mobileProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #E040A0, #9B59F5)' }}
                  >
                    <ExternalLink size={13} />
                    Visit
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white/60"
                    style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    Similar Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile nav */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIndex(i)}
                  className="transition-all duration-300 rounded-full cursor-pointer"
                  style={{
                    width: i === mobileIndex ? 24 : 7,
                    height: 7,
                    background: i === mobileIndex
                      ? 'linear-gradient(135deg, #E040A0, #9B59F5)'
                      : 'rgba(255,255,255,0.18)',
                  }}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={mobileIndex === 0}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                disabled={mobileIndex === projects.length - 1}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 transition-all cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden p-12 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(224,64,160,0.12), rgba(155,89,245,0.12), rgba(74,158,255,0.08))',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(155,89,245,0.5), transparent)' }}
            />
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ background: 'linear-gradient(135deg, #E040A0, #9B59F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              {t.projects.pageLabel}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              {t.projects.ctaTitle}{' '}
              <span style={{ background: 'linear-gradient(135deg, #E040A0, #9B59F5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t.projects.ctaTitleAccent}
              </span>
            </h2>
            <p className="text-white/55 max-w-lg mx-auto mb-8">{t.projects.ctaSub}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #E040A0, #9B59F5)' }}
            >
              {t.projects.ctaButton}
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
