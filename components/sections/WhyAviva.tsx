"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Brain, RefreshCw, TrendingUp } from "lucide-react";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { Glow } from "@/components/ui/Glow";
import { useLang } from "@/lib/LanguageContext";
import ToolsGrid from "@/components/ui/ToolsGrid";

const cardMeta = [
  {
    icon: Brain,
    border: "rgba(224,64,160,0.3)",
    glow: "rgba(224,64,160,0.15)",
    iconColor: "#E040A0",
    number: "01",
  },
  {
    icon: RefreshCw,
    border: "rgba(155,89,245,0.3)",
    glow: "rgba(155,89,245,0.15)",
    iconColor: "#9B59F5",
    number: "02",
  },
  {
    icon: TrendingUp,
    border: "rgba(155,89,245,0.3)",
    glow: "rgba(155,89,245,0.15)",
    iconColor: "#9B59F5",
    number: "03",
  },
];


export default function WhyAviva() {
  const { t } = useLang();
  const cards = cardMeta.map((m, i) => ({
    ...m,
    title: t.whyAviva.cards[i].title,
    body: t.whyAviva.cards[i].body,
  }));

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      style={{ isolation: "isolate", background: "rgb(18, 14, 32)" }}
    >
      {/* Tool-stack image — screen-blended, decorative background */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        viewport={{ once: true }}
        aria-hidden
        className="absolute z-0 pointer-events-none"
        style={{
          width: "auto",
          height: "100%",
          right: "clamp(-8%, -3vw, -3%)",
          top: "0%",
          bottom: "0%",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      >
        <Image
          src="/background-images/tool-stack.png"
          alt=""
          width={800}
          height={1200}
          className="h-full w-auto object-cover"
          style={{ filter: "none" }}
        />
      </motion.div>

      {/* Fade right screen edge */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-0"
        style={{
          width: "120px",
          top: 0,
          bottom: 0,
          right: 0,
          background:
            "linear-gradient(to left, rgb(18,14,32) 0%, transparent 100%)",
        }}
      />
      {/* Fade top edge */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-0"
        style={{
          height: "80px",
          left: 0,
          right: 0,
          top: 0,
          background:
            "linear-gradient(to bottom, rgb(18,14,32) 0%, transparent 100%)",
        }}
      />
      {/* Fade bottom edge */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-0"
        style={{
          height: "120px",
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(to top, rgb(18,14,32) 0%, transparent 100%)",
        }}
      />
      {/* Fade left edge of image — very wide smooth blend */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-0"
        style={{
          width: "clamp(40%, 45vw, 70%)",
          top: 0,
          bottom: 0,
          right: 0,
          background:
            "linear-gradient(to right, rgb(18,14,32) 0%, rgb(18,14,32) 25%, rgba(18,14,32,0.85) 48%, rgba(18,14,32,0.4) 72%, transparent 100%)",
        }}
      />
      {/* Ambient purple glow behind image */}
      <div
        aria-hidden
        className="absolute pointer-events-none z-0"
        style={{
          width: "clamp(500px, 55vw, 800px)",
          height: "clamp(500px, 55vw, 800px)",
          right: "-15%",
          top: "-20%",
          background:
            "radial-gradient(ellipse at 65% 45%, rgba(155,89,245,0.1) 0%, rgba(224,64,160,0.07) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Background glows */}
      <Glow color="pink" size={700} className="top-1/2 left-1/4 z-0" />
      <Glow color="orange" size={500} className="top-1/4 right-0 z-0" />
      <Glow color="pink" size={400} className="bottom-0 left-1/2 z-0" />

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
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
            <SectionLabel>{t.whyAviva.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white mt-4 mb-5 leading-tight"
          >
            {t.whyAviva.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base sm:text-lg leading-relaxed"
          >
            {t.whyAviva.sub}
          </motion.p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-16 sm:mb-20 md:mb-24"
        >
          {cards.map(
            ({ icon: Icon, title, body, border, glow, iconColor, number }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                className="glass-card group relative p-5 sm:p-6 md:p-8 overflow-hidden cursor-default sm:[&:nth-child(3)]:col-span-2 md:[&:nth-child(3)]:col-span-1"
                whileHover={{
                  y: -6,
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                }}
                style={{ "--card-border": border } as React.CSSProperties}
              >
                {/* Card glow on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[16px]"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 70%)`,
                  }}
                />

                {/* Top border accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[16px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${iconColor}, transparent)`,
                  }}
                />

                {/* Number + Icon row */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${glow} 0%, rgba(255,255,255,0.04) 100%)`,
                      border: `1px solid ${border}`,
                    }}
                  >
                    <Icon size={24} style={{ color: iconColor }} />
                  </div>
                  <span
                    className="font-display font-bold text-5xl leading-none select-none opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ color: iconColor }}
                  >
                    {number}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 sm:mb-3">
                  {title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">{body}</p>
              </motion.div>
            ),
          )}
        </motion.div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <SectionLabel>{t.whyAviva.toolsLabel}</SectionLabel>
          </motion.div>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* ── Tools strip ── */}
        <div className="relative mb-16">
          <ToolsGrid variant="bordered" />
        </div>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/about">
            <ButtonOutline>{t.whyAviva.learnMore}</ButtonOutline>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
