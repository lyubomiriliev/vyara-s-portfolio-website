'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { staggerContainer, fadeUp, scaleIn } from '@/lib/animations'
import { projects, projectCategories } from '@/data/projects'
import { useLang } from '@/lib/LanguageContext'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Category = typeof projectCategories[number]

const mediaItems = [
  { src: '/designs/design1.jpg', span: 'tall' },
  { src: '/designs/design2.jpg', span: 'normal' },
  { src: '/designs/design3.jpg', span: 'normal' },
  { src: '/designs/design4.jpg', span: 'wide' },
  { src: '/designs/design5.jpg', span: 'normal' },
  { src: '/designs/design6.jpg', span: 'tall' },
  { src: '/designs/design7.jpg', span: 'normal' },
  { src: '/designs/design8.jpg', span: 'normal' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All')

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <div className="relative">

      {/* ── Projects Grid ── */}
      <section className="section-padding">
        <div className="container">

          {/* Filter bar */}
          <div className="flex items-center gap-1 justify-center mb-14 flex-wrap">
            {projectCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="relative px-6 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer group"
              >
                <span className={`relative z-10 transition-colors duration-200 ${
                  activeFilter === cat ? 'text-white' : 'text-white/45 hover:text-white/80'
                }`}>
                  {cat}
                </span>
                {activeFilter === cat && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-pill bg-white/[0.08] border border-white/[0.1]"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] rounded-2xl overflow-hidden border border-white/[0.05]"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container">
        <div className="h-px bg-white/[0.06]" />
      </div>

      {/* ── Media Gallery ── */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <div>
              <motion.div variants={fadeUp}>
                <SectionLabel>Gallery</SectionLabel>
              </motion.div>
              <motion.h2 variants={fadeUp} className="font-display text-4xl md:text-5xl text-white mt-2 leading-tight">
                Behind the Craft
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-white/45 text-base max-w-xs leading-relaxed">
              A selection of raw visuals from our design process and production work.
            </motion.p>
          </motion.div>

          {/* Masonry-style grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {mediaItems.map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.04 }}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: { slug: string; title: string; client: string; category: string; coverImage: string; year?: string }
  index: number
}) {
  const { t } = useLang()

  return (
    <motion.div variants={scaleIn} className="relative bg-bg-primary group">
      <Link href={`/work/${project.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverImage}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          {/* Dim on hover for text readability */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

          {/* Arrow badge */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/0 border border-white/0 flex items-center justify-center
                          group-hover:bg-white group-hover:border-white transition-all duration-300 translate-x-2 opacity-0
                          group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowUpRight size={16} className="text-black" />
          </div>
        </div>

        {/* Meta */}
        <div className="p-5 flex items-start justify-between gap-4 bg-bg-primary border-t border-white/[0.05]">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35 mb-1.5">
              {project.client}
            </p>
            <h3 className="font-display font-bold text-base text-white leading-snug truncate">
              {project.title}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-pill border border-white/10 text-white/40">
              {project.category}
            </span>
            {project.year && (
              <span className="text-[10px] text-white/25 font-medium">{project.year}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
