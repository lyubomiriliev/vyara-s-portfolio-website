"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Brain,
  RefreshCw,
  TrendingUp,
  ArrowRight,
  Lightbulb,
  Rocket,
  BarChart3,
  Repeat2,
} from "lucide-react";
import Link from "next/link";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
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


const processMeta = [
  {
    icon: Lightbulb,
    number: "01",
    accent: "#E040A0",
    border: "rgba(224,64,160,0.3)",
    glow: "rgba(224,64,160,0.12)",
  },
  {
    icon: Rocket,
    number: "02",
    accent: "#9B59F5",
    border: "rgba(155,89,245,0.3)",
    glow: "rgba(155,89,245,0.12)",
  },
  {
    icon: BarChart3,
    number: "03",
    accent: "#4A9EFF",
    border: "rgba(74,158,255,0.3)",
    glow: "rgba(74,158,255,0.12)",
  },
  {
    icon: Repeat2,
    number: "04",
    accent: "#FFB76C",
    border: "rgba(255,183,108,0.3)",
    glow: "rgba(255,183,108,0.12)",
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
      {/* ── Hero — full-bleed wallpaper + left text ── */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Full-bleed wallpaper — shifted right so subject is visible */}
        <Image
          src="/background-images/aviva-digital-wallpaper.png"
          alt=""
          aria-hidden
          fill
          className="pointer-events-none select-none object-cover object-left-center"
          style={{ filter: "brightness(0.65) saturate(1.15)" }}
        />

        {/* Strong left vignette — text zone dark, image breathes right */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,9,18,0.95) 21%, rgba(10,8,18,0.92) 22%, rgba(10,8,18,0.6) 44%, rgba(10,8,18,0.15) 62%, transparent 80%)",
          }}
        />

        {/* Smooth left-edge fade — dissolves the hard cut where image starts at 20% */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "50%",
            top: 0,
            bottom: 0,
            left: "15%",
            background:
              "linear-gradient(to right, rgb(10,8,18) 0%, rgb(10,8,18) 20%, rgba(10,8,18,0.85) 45%, rgba(10,8,18,0.4) 70%, transparent 100%)",
          }}
        />

        {/* Top + bottom fades */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,8,18,0.8) 0%, transparent 18%, transparent 72%, rgba(10,8,18,0.95) 100%)",
          }}
        />

        {/* Pink ambient glow behind headline */}
        <div
          aria-hidden
          className="absolute top-1/4 -left-24 w-[640px] h-[640px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(224,64,160,0.22) 0%, transparent 65%)",
            filter: "blur(90px)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-1/4 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(155,89,245,0.14) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Dot grid */}
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
          <div
            className="pt-32 pb-20 lg:pt-0 lg:pb-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center"
            style={{ maxWidth: "clamp(480px, 50vw, 720px)", marginLeft: 0 }}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{t.about.pageLabel}</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-extrabold tracking-tight text-white"
                style={{
                  fontSize: "clamp(58px, 8vw, 112px)",
                  lineHeight: "0.93",
                  letterSpacing: "-0.025em",
                }}
              >
                {t.about.teamTitle}
                <br />
                {t.about.teamTitleMid}
                <br />
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
                className="text-white/55 leading-relaxed"
                style={{
                  fontSize: "clamp(15px, 1.25vw, 17px)",
                  maxWidth: "440px",
                }}
              >
                {t.about.pageDescription}
              </motion.p>

              {/* Stat pills — big & bold */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-3 pt-1"
              >
                {[
                  { value: "7г+", label: t.clients.stats[1].label },
                  { value: "17+", label: t.clients.stats[0].label },
                  { value: "100%", label: t.clients.stats[2].label },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="relative flex flex-col gap-1.5 px-6 py-4 rounded-2xl overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.13)",
                      backdropFilter: "blur(18px)",
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(ellipse 90% 70% at 50% 110%, rgba(224,64,160,0.12), transparent)",
                      }}
                    />
                    <span
                      className="font-display font-extrabold relative z-10"
                      style={{
                        fontSize: "clamp(28px, 3.2vw, 42px)",
                        lineHeight: 1,
                        background: "linear-gradient(135deg, #FFB76C, #E040A0)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {s.value}
                    </span>
                    <span className="text-white/40 text-[11px] uppercase tracking-[0.18em] relative z-10 font-semibold whitespace-nowrap">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center gap-5 flex-wrap pt-1"
              >
                <Link href="/contact">
                  <ButtonPrimary size="lg">{t.about.ctaButton}</ButtonPrimary>
                </Link>
                <Link
                  href="/work"
                  className="text-sm font-semibold text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {t.portfolio.viewAll} <ArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Aviva cards ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "rgb(18,14,32)", isolation: "isolate" }}
      >
        {/* tool-stack.png blended right side */}
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

        <Glow color="pink" size={700} className="top-1/2 left-1/4" />
        <Glow color="orange" size={400} className="bottom-0 left-1/2" />
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
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.whyAviva.label}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-5 leading-tight"
            >
              {t.whyAviva.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg leading-relaxed"
            >
              {t.whyAviva.sub}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
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
                  variants={scaleIn}
                  className="glass-card group relative p-8 overflow-hidden cursor-default"
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[16px]"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[16px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${iconColor}, transparent)`,
                    }}
                  />
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
                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {body}
                  </p>
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

      {/* ── Our Process — ai-master-wallpaper.png background ── */}
      <section className="relative overflow-hidden section-padding">
        {/* Full-bleed wallpaper */}
        <Image
          src="/background-images/ai-prompt.png"
          alt=""
          aria-hidden
          fill
          className="object-cover object-center pointer-events-none select-none"
          style={{ filter: "brightness(0.35) saturate(1.2)" }}
        />

        {/* Dark overlays — keep text legible */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,8,18,0.85) 0%, rgba(10,8,18,0.5) 40%, rgba(10,8,18,0.5) 60%, rgba(10,8,18,0.92) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(10,8,18,0.6) 0%, transparent 35%, transparent 65%, rgba(10,8,18,0.6) 100%)",
          }}
        />

        {/* Pink/purple ambient glow from the image light source */}
        <div
          aria-hidden
          className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(224,64,160,0.18) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 80%, rgba(155,89,245,0.14) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container relative z-10">
          {/* Headline */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.about.teamLabel}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-5 leading-tight"
            >
              {t.about.processTitle} {t.about.processTitleMid}{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FFB76C 0%, #E040A0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.about.processTitleAccent}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/55 text-lg leading-relaxed"
            >
              {t.about.bio}
            </motion.p>
          </motion.div>

          {/* Process steps — 2×2 grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {processMeta.map(
              ({ icon: Icon, number, accent, border, glow }, i) => {
                const steps = [
                  {
                    title: t.whyAviva.cards[0].title,
                    body: t.whyAviva.cards[0].body,
                  },
                  {
                    title: t.whyAviva.cards[1].title,
                    body: t.whyAviva.cards[1].body,
                  },
                  {
                    title: t.whyAviva.cards[2].title,
                    body: t.whyAviva.cards[2].body,
                  },
                  { title: t.about.role, body: t.about.pageDescription },
                ];
                const step = steps[i];
                return (
                  <motion.div
                    key={number}
                    variants={scaleIn}
                    className="group relative rounded-[20px] p-7 flex flex-col gap-4 overflow-hidden cursor-default"
                    whileHover={{
                      y: -6,
                      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                    }}
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                      border: `1px solid ${border}`,
                      backdropFilter: "blur(16px)",
                    }}
                  >
                    {/* Hover inner glow */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 70%)`,
                      }}
                    />
                    {/* Top accent */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[20px]"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                      }}
                    />

                    {/* Number + icon */}
                    <div className="flex items-start justify-between">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${glow} 0%, rgba(255,255,255,0.04) 100%)`,
                          border: `1px solid ${border}`,
                        }}
                      >
                        <Icon size={20} style={{ color: accent }} />
                      </div>
                      <span
                        className="font-display font-bold text-5xl leading-none select-none opacity-10 group-hover:opacity-25 transition-opacity duration-300"
                        style={{ color: accent }}
                      >
                        {number}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed flex-1">
                      {step.body}
                    </p>

                    {/* Bottom accent line */}
                    <div
                      aria-hidden
                      className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                      }}
                    />
                  </motion.div>
                );
              },
            )}
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
            className="relative overflow-hidden rounded-[28px] p-14 md:p-28 text-center max-w-5xl mx-auto"
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
                className="font-display text-3xl md:text-4xl text-white mb-6 leading-tight"
              >
                {t.about.ctaTitle}
              </motion.h2>
              <motion.div variants={fadeUp}>
                <Link href="/contact">
                  <ButtonPrimary
                    size="lg"
                    className="inline-flex items-center gap-2"
                  >
                    {t.about.ctaButton}
                    <ArrowRight size={16} />
                  </ButtonPrimary>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
