"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Brain, RefreshCw, TrendingUp } from "lucide-react";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
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
    border: "rgba(74,158,255,0.3)",
    glow: "rgba(74,158,255,0.15)",
    iconColor: "#4A9EFF",
    number: "03",
  },
];


export default function AboutPage() {
  const { t } = useLang();
  const cards = cardMeta.map((m, i) => ({
    ...m,
    title: t.whyAviva.cards[i].title,
    body: t.whyAviva.cards[i].body,
  }));

  return (
    <main>
      {/* ── Hero — editorial split layout ── */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{ background: "rgb(10,8,18)" }}
      >
        {/* Subtle grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Large ambient violet glow — top right */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "900px",
            height: "900px",
            right: "-200px",
            top: "-200px",
            background:
              "radial-gradient(circle, rgba(155,89,245,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Pink glow — bottom left */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            left: "-100px",
            bottom: "-100px",
            background:
              "radial-gradient(circle, rgba(224,64,160,0.1) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container relative z-10 w-full">
          <div className="pt-32 pb-20 lg:pt-0 lg:pb-0 lg:min-h-screen lg:flex lg:items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 items-center w-full">
              {/* Left — text content */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-7"
              >
                <motion.div variants={fadeUp}>
                  <SectionLabel>{t.about.pageLabel}</SectionLabel>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="font-display font-extrabold text-white leading-[0.95] tracking-tight"
                  style={{
                    fontSize: "clamp(52px, 6.5vw, 96px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {t.about.teamTitle} {t.about.teamTitleMid}{" "}
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #FFB76C 0%, #E040A0 55%, #9B59F5 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t.about.teamTitleAccent}
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-white/50 leading-relaxed"
                  style={{
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    maxWidth: "460px",
                  }}
                >
                  {t.about.pageDescription}
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  className="flex items-center gap-4 flex-wrap"
                >
                  <Link href="/contact">
                    <ButtonPrimary size="lg">{t.about.ctaButton}</ButtonPrimary>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right — stats */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3,
                }}
                className="relative flex flex-col justify-center"
              >
                {[
                  {
                    value: "7г+",
                    label: t.clients.stats[1].label,
                    accent: "#E040A0",
                  },
                  {
                    value: "17+",
                    label: t.clients.stats[0].label,
                    accent: "#9B59F5",
                  },
                  {
                    value: "100%",
                    label: t.clients.stats[2].label,
                    accent: "#FFB76C",
                  },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.45 + i * 0.12,
                    }}
                    className="flex items-baseline justify-between py-5 gap-6"
                  >
                    <span
                      className="font-display font-extrabold leading-none"
                      style={{
                        fontSize: "clamp(48px, 6vw, 80px)",
                        letterSpacing: "-0.04em",
                        color: s.accent,
                      }}
                    >
                      {s.value}
                    </span>
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-right shrink-0"
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        maxWidth: "120px",
                      }}
                    >
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Aviva cards ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "rgb(13,10,24)" }}
      >
        {/* Ambient glows */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "700px",
            height: "700px",
            left: "-200px",
            top: "-100px",
            background:
              "radial-gradient(circle, rgba(224,64,160,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            right: "-100px",
            bottom: "-100px",
            background:
              "radial-gradient(circle, rgba(155,89,245,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container relative z-10">
          {/* Editorial split — label + headline left, sub right */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-20 items-end mb-12 sm:mb-16 md:mb-20"
          >
            <div>
              <motion.div variants={fadeUp}>
                <SectionLabel>{t.whyAviva.label}</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display font-extrabold text-white mt-5 leading-[0.95] tracking-tight"
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  letterSpacing: "-0.03em",
                }}
              >
                {t.whyAviva.title}
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="text-white/50 text-base sm:text-lg leading-relaxed lg:pb-2"
            >
              {t.whyAviva.sub}
            </motion.p>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-16" />

          {/* Cards — horizontal list with left number accent */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px mb-24"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {cards.map(
              ({
                icon: Icon,
                title,
                body,
                border,
                glow,
                iconColor,
                number,
              }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="group relative p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-5 cursor-default"
                  style={{ background: "rgb(13,10,24)" }}
                  whileHover={{
                    background: `radial-gradient(circle at 30% 0%, ${glow} 0%, rgb(13,10,24) 60%)`,
                    transition: { duration: 0.4 },
                  }}
                >
                  {/* Accent top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${iconColor}, transparent)`,
                    }}
                  />

                  {/* Number */}
                  <span
                    className="font-display font-extrabold text-[80px] leading-none select-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300 absolute top-6 right-8"
                    style={{ color: iconColor }}
                  >
                    {number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${glow} 0%, rgba(255,255,255,0.03) 100%)`,
                      border: `1px solid ${border}`,
                    }}
                  >
                    <Icon size={24} style={{ color: iconColor }} />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-white mb-3 leading-snug">
                      {title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {body}
                    </p>
                  </div>
                </motion.div>
              ),
            )}
          </motion.div>

          {/* Tools strip */}
          <div className="flex items-center gap-6 mb-12">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <SectionLabel>{t.whyAviva.toolsLabel}</SectionLabel>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <div className="mb-16">
            <ToolsGrid variant="bordered" />
          </div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "rgb(10,8,18)" }}
      >
        {/* Ambient glows */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "800px",
            height: "800px",
            left: "-200px",
            top: "50%",
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, rgba(224,64,160,0.08) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "700px",
            height: "700px",
            right: "-150px",
            top: "50%",
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, rgba(155,89,245,0.09) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />

        <div className="container relative z-10">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.about.teamSectionLabel}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold text-white mt-5 leading-[0.95] tracking-tight"
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                letterSpacing: "-0.03em",
              }}
            >
              {t.about.teamSectionTitle}{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FFB76C 0%, #E040A0 55%, #9B59F5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.about.teamSectionAccent}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/45 text-base sm:text-lg leading-relaxed mt-5"
            >
              {t.about.teamSectionSub}
            </motion.p>
          </motion.div>

          {/* Founder cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Vyara */}
            <motion.div
              variants={fadeUp}
              className="group relative rounded-[24px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(224,64,160,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(224,64,160,0.18)",
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #E040A0, transparent)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 0%, rgba(224,64,160,0.08) 0%, transparent 60%)",
                }}
              />
              <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex-shrink-0">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden"
                    style={{
                      border: "2px solid rgba(224,64,160,0.3)",
                      boxShadow: "0 0 40px rgba(224,64,160,0.15)",
                    }}
                  >
                    <Image
                      src="/profile/profilepic.jpg"
                      alt="Vyara Ivanova-Ilieva"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
                      style={{ color: "#E040A0" }}
                    >
                      {t.about.founder1Role}
                    </p>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
                      {t.about.founder1Name}
                    </h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {t.about.founder1Bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      t.about.founder1Tag1,
                      t.about.founder1Tag2,
                      t.about.founder1Tag3,
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(224,64,160,0.1)",
                          border: "1px solid rgba(224,64,160,0.25)",
                          color: "rgba(224,64,160,0.9)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lyubomir */}
            <motion.div
              variants={fadeUp}
              className="group relative rounded-[24px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(155,89,245,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(155,89,245,0.18)",
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #9B59F5, transparent)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 70% 0%, rgba(155,89,245,0.08) 0%, transparent 60%)",
                }}
              />
              <div className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 p-5 sm:p-6 md:p-8 lg:p-10">
                <div className="flex-shrink-0">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden"
                    style={{
                      border: "2px solid rgba(155,89,245,0.3)",
                      boxShadow: "0 0 40px rgba(155,89,245,0.15)",
                    }}
                  >
                    <Image
                      src="/profile/profilepic2.jpg"
                      alt="Lyubomir Iliev"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 flex-1">
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-[0.2em] mb-2"
                      style={{ color: "#9B59F5" }}
                    >
                      {t.about.founder2Role}
                    </p>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight">
                      {t.about.founder2Name}
                    </h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {t.about.founder2Bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {[
                      t.about.founder2Tag1,
                      t.about.founder2Tag2,
                      t.about.founder2Tag3,
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          background: "rgba(155,89,245,0.1)",
                          border: "1px solid rgba(155,89,245,0.25)",
                          color: "rgba(155,89,245,0.9)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding relative overflow-hidden">
        <Glow color="pink" size={600} className="top-1/2 left-1/2" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-[28px] pt-12 sm:pt-16 md:pt-24 px-6 sm:px-10 md:px-20 lg:px-28 pb-0 text-center max-w-6xl mx-auto flex flex-col"
            style={{
              background:
                "linear-gradient(135deg, rgba(224,64,160,0.07), rgba(155,89,245,0.07), rgba(74,158,255,0.05))",
              border: "1px solid rgba(224,64,160,0.2)",
            }}
          >
            <video
              aria-hidden
              autoPlay
              loop
              muted
              playsInline
              suppressHydrationWarning
              className="absolute inset-0 w-full h-full object-cover rounded-[28px] pointer-events-none"
              style={{ opacity: 0.4 }}
            >
              <source src="/videos/ai-master-video.mp4" type="video/mp4" />
            </video>
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[28px]"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.85) 100%)",
              }}
            />
            <div
              className="absolute top-0 left-1/4 right-1/4 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(224,64,160,0.6), transparent)",
              }}
            />
            <div className="relative z-10">
              <motion.h2
                variants={fadeUp}
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl text-white leading-tight"
              >
                {t.about.ctaTitle}
              </motion.h2>
            </div>

            {/* Button pinned flush to bottom center */}
            <motion.div
              variants={fadeUp}
              className="relative z-10 flex justify-center mt-auto pt-8 sm:pt-10 pb-10 sm:pb-12 md:pb-16"
            >
              <Link href="/contact">
                <button
                  className="inline-flex items-center font-display font-semibold px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base text-white hover:opacity-90 transition-all duration-150 cursor-pointer whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                    borderRadius: "16px",
                  }}
                >
                  {t.about.ctaButton}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
