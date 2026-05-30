"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { useLang } from "@/lib/LanguageContext";

const clientLogos = [
  { logo: "/clients/elshisha.png", name: "El Shisha", accent: "#E040A0" },
  { logo: "/clients/pulsehomes2.png", name: "Pulse Homes", accent: "#FFB76C" },
  { logo: "/clients/coolfit.png", name: "CoolFit", accent: "#9B59F5" },
  { logo: "/clients/elwell.png", name: "ElWell", accent: "#E040A0" },
  { logo: "/clients/foxacademy.png", name: "Fox Academy", accent: "#FFB76C" },
  { logo: "/clients/lamaniere.png", name: "La Manière", accent: "#9B59F5" },
  { logo: "/clients/vapy.png", name: "Vapy", accent: "#E040A0" },
  { logo: "/clients/pulsekids.png", name: "Pulse Kids", accent: "#FFB76C" },
  { logo: "/clients/smart-strips-logo.png", name: "Smart Strips", accent: "#9B59F5" },
  { logo: "/clients/fine-design-logo.png", name: "Fine Design", accent: "#E040A0" },
  { logo: "/clients/dongfeng-logo-white.png", name: "Dongfeng", accent: "#FFB76C" },
  { logo: "/clients/chris-logo.png", name: "Chris", accent: "#9B59F5" },
  { logo: "/clients/fitty-logo.png", name: "Fitty", accent: "#FFB76C" },
  { logo: "/clients/under1roof-logo.png", name: "Under 1 Roof", accent: "#9B59F5" },
  { logo: "/clients/mbc-logo-white.png", name: "MBC", accent: "#E040A0" },
];

export default function Clients() {
  const { t } = useLang();
  const gridRef = useRef<HTMLDivElement>(null);

  // Lightweight random-pop loop: at most one card "popped" at a time,
  // direct DOM writes (no React state, no Framer Motion), pauses when off-screen
  // and when the user prefers reduced motion.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let inView = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    let currentEl: HTMLElement | null = null;

    const cards = () =>
      Array.from(grid.querySelectorAll<HTMLElement>(".client-card"));

    const pop = () => {
      const list = cards();
      if (!list.length) return;
      const el = list[Math.floor(Math.random() * list.length)];
      const accent = el.style.getPropertyValue("--accent").trim() || "#FFB76C";

      currentEl = el;
      el.style.border = `1px solid ${accent}55`;
      el.style.boxShadow = `0 8px 40px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.08)`;
      el.style.transform = "translateY(-3px)";
      const img = el.querySelector("img");
      if (img) {
        img.style.opacity = "1";
        img.style.filter = "grayscale(0)";
      }

      resetTimer = setTimeout(() => {
        if (currentEl === el) {
          el.style.border = "1px solid rgba(255,255,255,0.08)";
          el.style.boxShadow =
            "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)";
          el.style.transform = "translateY(0)";
          if (img) {
            img.style.opacity = "0.6";
            img.style.filter = "grayscale(0.2)";
          }
          currentEl = null;
        }
      }, 1600);
    };

    const schedule = () => {
      if (!inView) return;
      const delay = 1800 + Math.random() * 1400;
      timer = setTimeout(() => {
        pop();
        schedule();
      }, delay);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !timer) schedule();
        if (!inView && timer) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(grid);

    return () => {
      obs.disconnect();
      if (timer) clearTimeout(timer);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);

  return (
    <section
      id="clients"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.clients.sectionLabel}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white mt-4 mb-5 leading-tight"
          >
            {t.clients.sectionTitle}{" "}
            <span className="text-gradient-warm">
              {t.clients.sectionTitleAccent}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/55 text-base sm:text-lg leading-relaxed"
          >
            {t.clients.sectionSub}
          </motion.p>
        </motion.div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 3xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 3xl:gap-5 4xl:gap-6 mb-12 sm:mb-16"
        >
          {clientLogos.map((client) => (
            <div
              key={client.name}
              className="client-card group relative flex items-center justify-center rounded-[14px] sm:rounded-[18px] p-3 sm:p-4 md:p-6 aspect-[3/2] cursor-default overflow-hidden transition-all duration-300"
              style={{
                ["--accent" as string]: client.accent,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.border = `1px solid ${client.accent}40`;
                el.style.boxShadow = `0 8px 40px ${client.accent}26, inset 0 1px 0 rgba(255,255,255,0.08)`;
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.border = "1px solid rgba(255,255,255,0.08)";
                el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${client.accent}, transparent)`,
                }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                className="h-8 sm:h-10 md:h-12 lg:h-14 3xl:h-16 4xl:h-20 w-auto max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "grayscale(0.2)" }}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
            {clientLogos.length + 2}+{t.clients.brandCount}
          </p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <div className="text-center">
          <Link href="/clients">
            <ButtonOutline>{t.clients.seeAll}</ButtonOutline>
          </Link>
        </div>
      </div>
    </section>
  );
}
