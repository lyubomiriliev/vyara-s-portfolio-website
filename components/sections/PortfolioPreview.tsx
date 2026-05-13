"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/LanguageContext";

const previewProjects = [
  projects.find((p) => p.id === "v1")!,
  projects.find((p) => p.id === "r1")!,
  projects.find((p) => p.id === "c1")!,
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
    color: "#FF419D",
    border: "rgba(255,65,157,0.3)",
    glow: "rgba(255,65,157,0.12)",
  },
  AI: {
    color: "#FFB76C",
    border: "rgba(255,183,108,0.3)",
    glow: "rgba(255,183,108,0.12)",
  },
  carousel: {
    color: "#FB923C",
    border: "rgba(251,146,60,0.3)",
    glow: "rgba(251,146,60,0.12)",
  },
};

export default function PortfolioPreview() {
  const { t } = useLang();

  return (
    <section className="pt-16 sm:pt-20 md:pt-[96px] pb-12 sm:pb-16 relative overflow-hidden">
      {/* Left decorative image */}
      <Image
        src="/background-images/communication.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="hidden md:block absolute -left-8 top-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] xl:w-[600px] pointer-events-none select-none"
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
        className="hidden md:block absolute -right-8 top-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] xl:w-[600px] pointer-events-none select-none"
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
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.portfolio.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white mt-4 mb-5 leading-tight"
          >
            <span className="text-gradient-warm">{t.portfolio.title}</span>
            <br />
            {t.portfolio.titleLine2}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base sm:text-lg leading-relaxed"
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16"
        >
          {previewProjects.map((project) => {
            const accentKey =
              project.type === "carousel" ? "carousel" : project.category;
            const accent = categoryAccent[accentKey] ?? categoryAccent.Designs;
            const isVideo = project.type === "video" || !!project.videoSrc;
            const badgeLabel =
              project.type === "carousel"
                ? "CAROUSEL"
                : project.type === "video"
                  ? "REELS"
                  : project.category.toUpperCase();

            return (
              <motion.div
                key={project.slug}
                variants={scaleIn}
                className="group relative rounded-[20px] overflow-hidden cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1.5 will-change-transform"
                style={{ border: `1px solid ${accent.border}`, aspectRatio: "4/5" }}
              >
                <Link href="/work" className="block h-full">
                  {/* Media */}
                  {isVideo && project.videoSrc ? (
                    <video
                      src={project.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      suppressHydrationWarning
                    />
                  ) : (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

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
                        "linear-gradient(to top, rgba(5,5,10,0.55) 0%, rgba(5,5,10,0.2) 40%, transparent 70%)",
                    }}
                  />

                  {/* Category badge — dark glass pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-pill"
                      style={{
                        background: "rgba(0,0,0,0.55)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: accent.color,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {badgeLabel}
                    </span>
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
