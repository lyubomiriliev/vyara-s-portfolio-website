"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { staggerContainer } from "@/lib/animations";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { useCountUp } from "@/lib/useCountUp";
import { useLang } from "@/lib/LanguageContext";
import { BlurText } from "@/components/ui/BlurText";

const CYCLING_WORDS: Record<"en" | "bg", string[]> = {
  en: [
    "Iconic Brands",
    "Bold Visions",
    "Digital Leaders",
    "Viral Stories",
    "Market Leaders",
    "Lasting Impact",
  ],
  bg: [
    "Силни брандове",
    "Печеливши сайтове",
    "Реклами с резултати",
    "Онлайн магазини",
    "Успешни кампании",
    "Бързи решения",
  ],
};

function TypewriterCycle({
  words,
  gradient,
}: {
  words: string[];
  gradient: string;
}) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing">(
    "typing",
  );
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => {
          if (!started) setStarted(true);
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 1800);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("erasing"), 0);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, index, words, started]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
        minWidth: "2ch",
      }}
    >
      {displayed}
      <span
        style={{
          WebkitTextFillColor: "transparent",
          background: gradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          opacity: started && phase !== "pausing" ? 1 : 0,
          marginLeft: "2px",
          animation: "blink 0.7s step-end infinite",
        }}
      >
        |
      </span>
    </span>
  );
}

function StatCard({
  value,
  suffix,
  label,
  delay,
  accent,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  accent: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative group"
    >
      {/* Animated gradient border ring */}
      <div
        aria-hidden
        className="absolute -inset-px rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 180deg at 50% 50%, transparent 0%, ${accent}80 25%, transparent 50%, ${accent}60 75%, transparent 100%)`,
          filter: "blur(0.5px)",
        }}
      />

      <div
        className="relative rounded-2xl px-4 py-5 md:px-5 md:py-6 flex flex-col gap-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,20,30,0.78) 0%, rgba(10,10,16,0.92) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Inner glow */}
        <div
          aria-hidden
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle, ${accent}50 0%, transparent 70%)`,
            filter: "blur(28px)",
          }}
        />

        <span
          className="font-display font-extrabold leading-[1.05] tabular-nums text-3xl md:text-4xl 3xl:text-5xl whitespace-nowrap"
          style={{
            background: `linear-gradient(180deg, #fff 0%, ${accent} 130%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count.toLocaleString()}
          {suffix}
        </span>
        <span className="text-white/45 text-[10px] 3xl:text-xs uppercase tracking-[0.18em] font-medium">
          {label}
        </span>

        {/* Bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-4 right-4 h-px opacity-50"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

const statValues = [
  { value: 32604, delay: 0.9, accent: "#E040A0" },
  { value: 1852, delay: 1.05, accent: "#FFB76C" },
  { value: 85, delay: 1.2, accent: "#9B59F5" },
  { value: 13, delay: 1.35, accent: "#FFB76C" },
];

export default function Hero() {
  const { t, locale } = useLang();

  const stats = statValues.map((s, i) => ({
    ...s,
    label: t.hero.stats[i].label,
  }));

  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center section-padding"
    >
      {/* Layer 1 — full-bleed wave background */}
      <Image
        src="/background-images/ai-master-wallpaper.png"
        alt=""
        aria-hidden
        fill
        priority
        className="object-cover object-center pointer-events-none"
        style={{ opacity: 0.55 }}
      />

      {/* Layer 2 — dark vignette, heavier on left for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(10,10,15,0.10) 0%, rgba(10,10,15,0.50) 60%, rgba(10,10,15,0.88) 100%)",
        }}
      />

      {/* ── Main content ── */}
      <div className="container relative z-20 flex flex-col min-h-screen py-20">
        {/* Left-aligned text block — max ~55% width so the hand stays visible */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left gap-5 max-w-[58%] lg:max-w-[52%] 3xl:max-w-[46%] mt-16"
        >
          {/* H1 with BlurText */}
          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] 3xl:text-[6rem] 4xl:text-[7.5rem] leading-[1.02] text-white w-full tracking-tight">
            <div className="block w-full text-left">
              <BlurText
                text={t.hero.line1}
                delay={0.1}
                stagger={0.08}
                animate="always"
              />
            </div>
            <div
              className="block w-full py-2 text-left"
              style={{ minHeight: "2.2em" }}
            >
              <TypewriterCycle
                words={CYCLING_WORDS[locale]}
                gradient="linear-gradient(135deg, #FFB76C 0%, #E040A0 100%)"
              />
            </div>
            <div className="block w-full text-left">
              <BlurText
                text={t.hero.line3}
                delay={0.7}
                stagger={0.05}
                animate="always"
              />
            </div>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-base md:text-lg xl:text-lg 3xl:text-xl text-white/65 max-w-lg 3xl:max-w-xl leading-relaxed text-left"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA buttons — left-aligned */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="flex items-center justify-start gap-4 flex-wrap"
          >
            <Link href="/contact">
              <ButtonPrimary size="lg">{t.hero.ctaPrimary}</ButtonPrimary>
            </Link>
            <Link href="/work">
              <ButtonOutline size="lg">{t.hero.ctaSecondary}</ButtonOutline>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Stats — centered at the bottom ── */}
        <div className="mt-16 pb-8 w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl 3xl:max-w-5xl mx-auto">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                value={s.value}
                label={s.label}
                delay={s.delay}
                accent={s.accent}
                suffix="+"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
