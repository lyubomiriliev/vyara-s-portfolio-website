"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
    "По-бърз и модерен уебсайт",
    "По-иновативни AI интеграции",
    "По-красиви дизайни",
    "По-развити социални мрежи",
    "По-успешни Meta реклами",
    "По-интересни Имейл кампании",
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
        paddingBottom: "0.15em",
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
      className="relative group rounded-2xl transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        className="relative rounded-2xl px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-6 flex flex-col gap-1 sm:gap-2"
        style={{
          background: "rgba(14,14,20,0.85)",
          border: `1px solid ${accent}30`,
        }}
      >
        <span
          className="font-display font-extrabold leading-[1.05] tabular-nums text-xl sm:text-2xl md:text-3xl lg:text-4xl 3xl:text-5xl whitespace-nowrap"
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
      className="relative overflow-hidden min-h-screen flex items-center py-0 md:section-padding pt-14 md:pt-0"
    >
      {/* Layer 1 — full-bleed wave background. Native <picture> so mobile
         pulls the 14 KB version instead of the 52 KB desktop one. */}
      <picture
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.55 }}
      >
        <source
          media="(max-width: 768px)"
          srcSet="/background-images/ai-master-wallpaper-mobile.webp"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/background-images/ai-master-wallpaper.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </picture>

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
      <div className="container relative z-20 flex flex-col justify-center min-h-[calc(100svh)] pt-16 pb-8 md:py-24 lg:pb-28 lg:pt-48">
        {/* Left-aligned text block — max ~55% width so the hand stays visible */}
        <div className="flex flex-col items-start text-left gap-4 sm:gap-5 max-w-full md:max-w-[65%] lg:max-w-[75%] xl:max-w-[70%] 3xl:max-w-[50%] 4xl:max-w-[40%] overflow-visible">
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
              className="block w-full text-left text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] xl:text-[2.5rem] 3xl:text-[3rem] 4xl:text-[3.75rem] whitespace-nowrap"
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
              className="block w-max max-w-full text-left text-2xl sm:text-3xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] 3xl:text-[4.75rem] 4xl:text-[6rem]"
              style={{ minHeight: "1.15em", paddingBottom: "0.15em" }}
            >
              <TypewriterCycle
                words={CYCLING_WORDS[locale]}
                gradient="linear-gradient(135deg, #FFB76C 0%, #E040A0 100%)"
              />
            </motion.div>
            {t.hero.line3 && (
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
            )}
          </h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base md:text-lg xl:text-lg 3xl:text-xl pb-3 sm:pb-4 md:pb-6 text-white/65 max-w-md sm:max-w-lg 3xl:max-w-xl leading-relaxed text-left"
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
              <ButtonPrimary size="md">{t.hero.ctaPrimary}</ButtonPrimary>
            </Link>
            <Link href="/work">
              <ButtonOutline size="md">{t.hero.ctaSecondary}</ButtonOutline>
            </Link>
          </motion.div>

          {/* Stats — left-aligned below buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 sm:grid-cols-4 mt-6 sm:mt-8 4xl:mt-12 gap-2 sm:gap-3 md:gap-4 w-full"
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
