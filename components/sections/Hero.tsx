"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { useCountUp } from "@/lib/useCountUp";
import { useLang } from "@/lib/LanguageContext";

const CYCLING_WORDS: Record<"en" | "bg", string[]> = {
  en: [
    "Iconic Brands,",
    "Bold Visions,",
    "Digital Leaders,",
    "Viral Stories,",
    "Market Leaders,",
    "Lasting Impact,",
  ],
  bg: [
    "Силни брандове,",
    "Печеливши сайтове,",
    "Реклами с резултати,",
    "Онлайн магазини,",
    "Успешни кампании,",
    "Бързи решения,",
  ],
};

function TypewriterCycle({
  words,
  gradient,
}: {
  words: string[];
  gradient: string;
}) {
  const firstWord = words[0];
  const [index, setIndex] = useState(0);
  // Start with first word fully shown so no layout shift on mount
  const [charCount, setCharCount] = useState(firstWord.length);
  const [phase, setPhase] = useState<"typing" | "erasing">("erasing");
  // Delay before the first erase begins so the word is visible briefly
  const [active, setActive] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => setActive(true), 1800);
    return () => clearTimeout(delay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!active) return;
    const word = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < word.length) {
        timeout = setTimeout(() => setCharCount((c) => c + 1), 60);
      } else {
        timeout = setTimeout(() => setPhase("erasing"), 1800);
      }
    } else {
      if (charCount > 0) {
        timeout = setTimeout(() => setCharCount((c) => c - 1), 35);
      } else {
        setIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [charCount, phase, index, words, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayed = words[index].slice(0, charCount);

  return (
    <span
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        display: "inline-block",
        whiteSpace: "nowrap",
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
          opacity: active ? 1 : 0,
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
      className="relative group overflow-hidden rounded-2xl"
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
        className="relative rounded-2xl px-2.5 py-3 sm:px-3.5 sm:py-4 md:px-5 md:py-6 flex flex-col gap-1 sm:gap-2"
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
          className="font-display font-extrabold leading-[1.05] tabular-nums text-lg sm:text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl whitespace-nowrap"
          style={{
            background: `linear-gradient(180deg, #fff 0%, ${accent} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {count.toLocaleString()}
          {suffix}
        </span>
        <span className="text-white/45 text-[8px] sm:text-[9px] md:text-[10px] 3xl:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] md:tracking-[0.18em] font-medium whitespace-nowrap leading-tight">
          {label}
        </span>

        {/* Bottom accent line */}
        <div
          aria-hidden
          className="absolute bottom-0 left-4 right-4 h-px opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}

const statValues = [
  { value: 38712, delay: 0.9, accent: "#E040A0" },
  { value: 2493, delay: 1.05, accent: "#FFB76C" },
  { value: 214, delay: 1.2, accent: "#9B59F5" },
  { value: 17, delay: 1.35, accent: "#FFB76C" },
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
      className="relative overflow-hidden min-h-screen flex items-center py-0 md:section-padding"
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
      <div className="container relative z-20 flex flex-col justify-center min-h-screen md:py-24 lg:py-28">
        {/* Left-aligned text block — max ~55% width so the hand stays visible */}
        <div className="flex flex-col items-start text-left gap-4 sm:gap-5 max-w-full md:max-w-[68%] lg:max-w-[58%] xl:max-w-[52%] 3xl:max-w-[46%] 4xl:max-w-[40%] overflow-visible">
          {/* H1 — three rows slide up in clean sequence, typewriter starts after row 2 settles */}
          <h1 className="font-display flex flex-col gap-2 sm:gap-3 font-extrabold leading-[1.22] text-white w-full tracking-tight">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block w-full text-left text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] xl:text-[3.5rem] 3xl:text-[4.25rem] 4xl:text-[5.25rem]"
            >
              {t.hero.line1}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block w-max max-w-full text-left text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] 3xl:text-[6rem] 4xl:text-[7.5rem]"
              style={{ minHeight: "1.15em" }}
            >
              <TypewriterCycle
                words={CYCLING_WORDS[locale]}
                gradient="linear-gradient(135deg, #FFB76C 0%, #E040A0 100%)"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block w-full text-left text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] xl:text-[3.5rem] 3xl:text-[4.25rem] 4xl:text-[5.25rem]"
            >
              {t.hero.line3}
            </motion.div>
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg xl:text-lg 3xl:text-xl py-3 sm:py-4 md:py-6 text-white/65 max-w-md sm:max-w-lg 3xl:max-w-xl leading-relaxed text-left"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA buttons — left-aligned */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-start gap-3 sm:gap-4"
          >
            <Link href="/contact">
              <ButtonPrimary size="lg">{t.hero.ctaPrimary}</ButtonPrimary>
            </Link>
            <Link href="/work">
              <ButtonOutline size="lg">{t.hero.ctaSecondary}</ButtonOutline>
            </Link>
          </motion.div>

          {/* Stats — left-aligned below buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 mt-6 sm:mt-8 gap-2 sm:gap-3 md:gap-4 w-full max-w-2xl"
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
