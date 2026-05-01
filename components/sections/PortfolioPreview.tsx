"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/LanguageContext";

const previewProjects = [
  projects.find((p) => p.id === "c1")!,
  projects.find((p) => p.id === "c11")!,
  projects.find((p) => p.id === "c31")!,
];

const categoryAccent: Record<
  string,
  { color: string; border: string; glow: string }
> = {
  Designs: {
    color: "#E040A0",
    border: "rgba(224,64,160,0.3)",
    glow: "rgba(224,64,160,0.12)",
  },
  Print: {
    color: "#9B59F5",
    border: "rgba(155,89,245,0.3)",
    glow: "rgba(155,89,245,0.12)",
  },
  Reels: {
    color: "#4A9EFF",
    border: "rgba(74,158,255,0.3)",
    glow: "rgba(74,158,255,0.12)",
  },
  AI: {
    color: "#FFB76C",
    border: "rgba(255,183,108,0.3)",
    glow: "rgba(255,183,108,0.12)",
  },
};

export default function PortfolioPreview() {
  const { t } = useLang();

  return (
    <section className="pt-[96px] pb-16 relative overflow-hidden">
      {/* Left decorative image */}
      <Image
        src="/background-images/communication.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-[600px] pointer-events-none select-none"
        style={{
          opacity: 0.85,
          maskImage:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 85%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Right decorative image */}
      <Image
        src="/background-images/floating-bubble.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="absolute -right-8 top-1/2 -translate-y-1/2 w-[600px] pointer-events-none select-none"
        style={{
          opacity: 0.65,
          maskImage:
            "linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(270deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, transparent 85%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Bottom tear divider */}
      <Image
        src="/background-images/tear.png"
        alt=""
        aria-hidden
        width={1440}
        height={80}
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none select-none"
        style={{
          opacity: 0.07,
          height: "80px",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />

      <div className="container relative z-10">
        {/* ── Headline ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.portfolio.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-5 leading-tight"
          >
            <span className="text-gradient-warm">{t.portfolio.title}</span>
            <br />
            {t.portfolio.titleLine2}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-lg leading-relaxed"
          >
            {t.portfolio.sub}
          </motion.p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {previewProjects.map((project) => {
            const accent =
              categoryAccent[project.category] ?? categoryAccent.Designs;

            return (
              <motion.div
                key={project.slug}
                variants={scaleIn}
                className="group relative rounded-[20px] overflow-hidden cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1.5 will-change-transform"
                style={{ border: `1px solid ${accent.border}` }}
              >
                <Link href={`/work/${project.slug}`} className="block">
                  {/* Image */}
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-80 md:h-96 xl:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Hover colour tint */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at 50% 100%, ${accent.glow} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Persistent dark overlay — bottom */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,5,10,1) 0%, rgba(5,5,10,0.92) 35%, rgba(5,5,10,0.5) 60%, rgba(5,5,10,0.1) 80%, transparent 100%)",
                    }}
                  />
                  {/* Persistent dark overlay — top */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(5,5,10,0.85) 0%, rgba(5,5,10,0.4) 25%, transparent 50%)",
                    }}
                  />

                  {/* Category badge — above all overlays */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-pill"
                      style={{
                        background: `${accent.glow}`,
                        border: `1px solid ${accent.border}`,
                        color: accent.color,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {project.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-white/70 uppercase tracking-wider mb-1">
                          {project.client}
                        </p>
                        <h3 className="font-display font-bold text-white text-base leading-snug">
                          {project.title}
                        </h3>
                      </div>
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        style={{ background: accent.color }}
                      >
                        <ArrowUpRight size={16} className="text-white" />
                      </div>
                    </div>

                    {/* Results strip */}
                    {project.results && (
                      <div className="flex gap-5 mt-3 pt-3 border-t border-white/[0.07]">
                        {project.results.map((r) => (
                          <div key={r.label}>
                            <span
                              className="font-display font-bold text-sm"
                              style={{ color: accent.color }}
                            >
                              {r.value}
                            </span>
                            <span className="text-white/80 text-xs ml-1.5">
                              {r.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Top border accent on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accent.color}, transparent)`,
                    }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/30 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
          >
            {projects.length} {t.portfolio.acrossCategories}
          </motion.p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/work">
            <ButtonOutline>{t.portfolio.viewAll}</ButtonOutline>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
