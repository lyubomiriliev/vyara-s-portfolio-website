"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { Glow } from "@/components/ui/Glow";
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
  {
    logo: "/clients/smart-strips-logo.png",
    name: "Smart Strips",
    accent: "#9B59F5",
  },
  {
    logo: "/clients/fine-design-logo.png",
    name: "Fine Design",
    accent: "#E040A0",
  },
  {
    logo: "/clients/dongfeng-logo-white.png",
    name: "Dongfeng",
    accent: "#FFB76C",
  },
  { logo: "/clients/chris-logo.png", name: "Chris", accent: "#9B59F5" },
  { logo: "/clients/fitty-logo.png", name: "Fitty", accent: "#FFB76C" },
  {
    logo: "/clients/under1roof-logo.png",
    name: "Under 1 Roof",
    accent: "#9B59F5",
  },
  { logo: "/clients/mbc-logo-white.png", name: "MBC", accent: "#E040A0" },
];

function useRandomPop(count: number, inView: boolean) {
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set());
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearAll = () => {
      if (rafId.current) clearTimeout(rafId.current);
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };

    if (!inView) {
      clearAll();
      setActiveSet(new Set());
      return;
    }

    const popBatch = () => {
      const batchSize = Math.random() < 0.4 ? 3 : 2;
      const picks: number[] = [];
      while (picks.length < batchSize) {
        const n = Math.floor(Math.random() * count);
        if (!picks.includes(n)) picks.push(n);
      }

      picks.forEach((idx, i) => {
        const staggerDelay = i * (700 + Math.random() * 800);
        const tOn = setTimeout(() => {
          setActiveSet((prev) => new Set([...prev, idx]));
        }, staggerDelay);
        timeouts.current.push(tOn);

        const holdMs = 1800 + Math.random() * 600;
        const tOff = setTimeout(() => {
          setActiveSet((prev) => {
            const next = new Set(prev);
            next.delete(idx);
            return next;
          });
        }, staggerDelay + holdMs);
        timeouts.current.push(tOff);
      });
    };

    const schedule = () => {
      const delay = 2500 + Math.random() * 1000;
      rafId.current = setTimeout(() => {
        popBatch();
        schedule();
      }, delay);
    };

    popBatch();
    schedule();

    return clearAll;
  }, [count, inView]);

  return activeSet;
}

export default function Clients() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const activeSet = useRandomPop(clientLogos.length, inView);

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="py-24 relative overflow-hidden"
    >
      <Glow color="pink" size={600} className="top-0 left-1/3" />
      <Glow color="orange" size={500} className="bottom-1/4 right-1/4" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="mx-auto max-w-[900px] 2xl:max-w-[1200px] relative z-10">
        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.clients.sectionLabel}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-5 leading-tight"
          >
            {t.clients.sectionTitle}{" "}
            <span className="text-gradient-warm">
              {t.clients.sectionTitleAccent}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/55 text-lg leading-relaxed"
          >
            {t.clients.sectionSub}
          </motion.p>
        </motion.div>

        {/* Logo grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-3 px-5 md:px-0 sm:grid-cols-5 gap-4 mb-16"
        >
          {clientLogos.map((client, i) => {
            const isPopped = activeSet.has(i);
            return (
              <motion.div
                key={client.name}
                variants={fadeUp}
                custom={i}
                animate={isPopped ? { y: -8, scale: 1.06 } : { y: 0, scale: 1 }}
                transition={{
                  y: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }}
                whileHover={{
                  y: -8,
                  scale: 1.06,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                className="group relative flex items-center justify-center rounded-[18px] glass-card p-6 aspect-[3/2] cursor-default overflow-hidden"
                style={{
                  transition: "box-shadow 0.6s ease, border-color 0.6s ease",
                  borderColor: isPopped ? `${client.accent}50` : undefined,
                  boxShadow: isPopped
                    ? `0 8px 32px ${client.accent}30, 0 0 0 1px ${client.accent}40, inset 0 1px 0 rgba(255,255,255,0.08)`
                    : undefined,
                }}
              >
                {/* Auto-pop top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px] transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${client.accent}, transparent)`,
                    opacity: isPopped ? 1 : 0,
                  }}
                />
                {/* Hover top accent line (CSS group-hover) */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${client.accent}, transparent)`,
                  }}
                />

                {/* Auto-pop glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-[18px] transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${client.accent}18, transparent 70%)`,
                    opacity: isPopped ? 1 : 0,
                  }}
                />
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-[18px]"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${client.accent}15, transparent 70%)`,
                  }}
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  src={client.logo}
                  alt={client.name}
                  loading="lazy"
                  className="h-14 w-auto max-w-full object-contain"
                  animate={{
                    opacity: isPopped ? 1 : 0.45,
                    filter: isPopped
                      ? "brightness(1.15) grayscale(0)"
                      : "brightness(1) grayscale(0.3)",
                  }}
                  whileHover={{
                    opacity: 1,
                    filter: "brightness(1.15) grayscale(0)",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Divider + count */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/30 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
          >
            {clientLogos.length + 2}+{t.clients.brandCount}
          </motion.p>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/clients">
            <ButtonOutline>{t.clients.seeAll}</ButtonOutline>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
