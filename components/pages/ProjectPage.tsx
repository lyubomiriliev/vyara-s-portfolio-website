'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Project } from '@/data/projects'
import { ButtonPrimary } from '@/components/ui/ButtonPrimary'

export default function ProjectPageContent({ project }: { project: Project }) {
  return (
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Our Work
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs uppercase tracking-[0.15em] text-accent-violet">
              {project.category}
            </span>
            {project.client && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-xs text-white/40">{project.client}</span>
              </>
            )}
            {project.year && (
              <>
                <span className="text-white/20">·</span>
                <span className="text-xs text-white/40">{project.year}</span>
              </>
            )}
          </div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white leading-tight">
            {project.title}
          </h1>
        </motion.div>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-12 w-full bg-bg-secondary"
          style={{ aspectRatio: '16/9' }}
        >
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left: description + gallery */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <p className="text-white/65 text-base sm:text-lg leading-relaxed">{project.description}</p>

            {project.images.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.slice(1).map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative rounded-xl overflow-hidden bg-bg-secondary"
                    style={{ aspectRatio: '1/1' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} ${i + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right: meta cards */}
          <div className="flex flex-col gap-5">
            {project.services.length > 0 && (
              <div className="glass-card p-6">
                <div className="text-xs uppercase tracking-[0.15em] text-white/35 mb-4">Services</div>
                <ul className="flex flex-col gap-2.5">
                  {project.services.map(s => (
                    <li key={s} className="text-sm text-white/70 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent-violet flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.results && project.results.length > 0 && (
              <div className="glass-card p-6">
                <div className="text-xs uppercase tracking-[0.15em] text-white/35 mb-4">Results</div>
                <div className="flex flex-col gap-4">
                  {project.results.map(r => (
                    <div key={r.label}>
                      <div className="font-sans font-bold text-2xl text-gradient">{r.value}</div>
                      <div className="text-xs text-white/40 mt-0.5">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center glass-card p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-xs uppercase tracking-[0.15em] text-accent-violet mb-4">
              Ready for Results?
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-white mb-6">
              Let&apos;s build something like this for you.
            </h2>
            <Link href="/contact">
              <ButtonPrimary size="lg">Start Your Project →</ButtonPrimary>
            </Link>
          </div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 pointer-events-none"
            aria-hidden
            style={{
              background: 'radial-gradient(ellipse, rgba(155,89,245,0.12), transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </div>
      </div>
    </main>
  )
}
