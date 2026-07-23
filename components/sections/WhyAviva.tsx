"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { useLang } from "@/lib/LanguageContext";
import ToolsGrid from "@/components/ui/ToolsGrid";

const cardMeta = [
  { glow: "rgba(224,64,160,0.15)", iconColor: "#E040A0", number: "01" },
  { glow: "rgba(255,183,108,0.15)", iconColor: "#FFB76C", number: "02" },
  { glow: "rgba(155,89,245,0.15)", iconColor: "#9B59F5", number: "03" },
];

const BG = "#0a0a0f";

export default function WhyAviva() {
  const { t } = useLang();
  const cards = cardMeta.map((m, i) => ({
    ...m,
    title: t.whyAviva.cards[i].title,
    body: t.whyAviva.cards[i].body,
  }));

  return (
    <>
      {/* ── Section 1: Who We Are + Cards ── */}
      <section
        id="about"
        className="section-padding relative"
        style={{ background: BG }}
      >
        <div className="container relative z-10">
          {/* Headline */}
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

          {/* Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ borderRadius: "20px", overflow: "hidden" }}
          >
            {cards.map(({ title, body, iconColor, glow, number }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="group relative p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-5 cursor-default min-h-[300px] md:min-h-[340px] [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r border-white/[0.06]"
                style={{ background: BG }}
                whileHover={{
                  background: `radial-gradient(circle at 30% 0%, ${glow} 0%, ${BG} 60%)`,
                  transition: { duration: 0.4 },
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${iconColor}, transparent)`,
                  }}
                />
                <span
                  className="font-display font-extrabold text-[80px] leading-none select-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300 absolute top-6 right-8"
                  style={{ color: iconColor }}
                >
                  {number}
                </span>
                <div className="flex flex-col gap-5 pt-8">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Tools & CTA — with background image ── */}
      <section
        className="py-14 sm:py-20 lg:py-28 relative overflow-hidden"
        style={{ isolation: "isolate", background: BG }}
      >
        {/* Tool-stack decorative background image — full-width, subtle */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          viewport={{ once: true }}
          aria-hidden
          className="hidden sm:block absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: 0.35 }}
        >
          <Image
            src="/services-images/ai-marketing.webp"
            alt=""
            aria-hidden
            width={1600}
            height={1200}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Dark overlay above the image */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "rgba(10,10,15,0.62)" }}
        />

        {/* Edge fades — soften into the section on all sides */}
        <div
          aria-hidden
          className="absolute pointer-events-none z-0"
          style={{
            height: "120px",
            left: 0,
            right: 0,
            top: 0,
            background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none z-0"
          style={{
            height: "120px",
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to top, ${BG} 0%, transparent 100%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none z-0"
          style={{
            width: "160px",
            top: 0,
            bottom: 0,
            left: 0,
            background: `linear-gradient(to right, ${BG} 0%, transparent 100%)`,
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none z-0"
          style={{
            width: "160px",
            top: 0,
            bottom: 0,
            right: 0,
            background: `linear-gradient(to left, ${BG} 0%, transparent 100%)`,
          }}
        />
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none z-0"
          style={{
            width: "clamp(500px, 55vw, 800px)",
            height: "clamp(500px, 55vw, 800px)",
            right: "-15%",
            top: "-20%",
            background:
              "radial-gradient(ellipse at 65% 45%, rgba(155,89,245,0.14) 0%, rgba(224,64,160,0.08) 45%, transparent 70%)",
          }}
        />

        <div className="container relative z-10">
          {/* Divider + label */}
          <div className="flex items-center gap-6 mb-10 sm:mb-14 lg:mb-16">
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

          {/* Tools grid */}
          <div className="relative mb-10 sm:mb-14 lg:mb-16">
            <ToolsGrid variant="bordered" />
          </div>

          {/* CTA */}
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
    </>
  );
}
