"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { CurvedLoop } from "@/components/ui/CurvedLoop";
import { Glow } from "@/components/ui/Glow";
import { useLang } from "@/lib/LanguageContext";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";

interface ClientStoryMeta {
  id: string;
  name: string;
  image: string;
  metrics: { value: string }[];
  accent: string;
  accentRgb: string;
}

interface ClientStory extends ClientStoryMeta {
  industry: string;
  tagline: string;
  description: string;
  metrics: { value: string; label: string }[];
}

const clientsMeta: ClientStoryMeta[] = [
  { id: "elshisha",        name: "El Shisha",       image: "/instagrams/elshisha.png",        metrics: [{ value: "+340%" }, { value: "+40%" },  { value: "100K+" }], accent: "#E040A0", accentRgb: "rgba(224,64,160," },
  { id: "pulse-homes",     name: "Pulse Homes",     image: "/instagrams/pulse-homes.png",     metrics: [{ value: "+60%" },  { value: "2x" },    { value: "+40%" }],  accent: "#9B59F5", accentRgb: "rgba(155,89,245," },
  { id: "pulse-gym-shop",  name: "Pulse Gym Shop",  image: "/instagrams/pulse-gym-shop.png",  metrics: [{ value: "5.2x" },  { value: "+85%" },  { value: "+120%" }], accent: "#FFB76C", accentRgb: "rgba(255,183,108," },
  { id: "coolfit",         name: "CoolFit",         image: "/instagrams/coolfit.png",         metrics: [{ value: "+50%" },  { value: "1.8x" },  { value: "+35%" }],  accent: "#4A9EFF", accentRgb: "rgba(74,158,255," },
  { id: "el-well",         name: "El Well",         image: "/instagrams/el-well.png",         metrics: [{ value: "+55%" },  { value: "2x" },    { value: "+45%" }],  accent: "#E040A0", accentRgb: "rgba(224,64,160," },
  { id: "fox-academy",     name: "Fox Academy",     image: "/instagrams/fox-academy.png",     metrics: [{ value: "+45%" },  { value: "1.5x" },  { value: "+30%" }],  accent: "#9B59F5", accentRgb: "rgba(155,89,245," },
  { id: "fine-design",     name: "Fine Design",     image: "/instagrams/fine-design.png",     metrics: [{ value: "+70%" },  { value: "3.2x" },  { value: "+45%" }],  accent: "#FFB76C", accentRgb: "rgba(255,183,108," },
  { id: "smart-strips",    name: "Smart Strips",    image: "/instagrams/smart-strips.png",    metrics: [{ value: "4.8x" },  { value: "+200%" }, { value: "+90%" }],  accent: "#4A9EFF", accentRgb: "rgba(74,158,255," },
  { id: "christian-andon", name: "Christian Andon", image: "/instagrams/christian-andon.png", metrics: [{ value: "+250%" }, { value: "+180%" }, { value: "12x" }],   accent: "#E040A0", accentRgb: "rgba(224,64,160," },
  { id: "dongfeng",        name: "Dongfeng",        image: "/instagrams/dongfeng.png",        metrics: [{ value: "+65%" },  { value: "+120%" }, { value: "3.1x" }],  accent: "#9B59F5", accentRgb: "rgba(155,89,245," },
];

const testimonialsMeta = [
  { photo: "/images/review1.jpg", accent: "#E040A0", border: "rgba(224,64,160,0.3)", glow: "rgba(224,64,160,0.12)", stars: 5 },
  { photo: null,                  accent: "#9B59F5", border: "rgba(155,89,245,0.3)", glow: "rgba(155,89,245,0.12)", stars: 5 },
  { photo: null,                  accent: "#FFB76C", border: "rgba(255,183,108,0.3)", glow: "rgba(255,183,108,0.12)", stars: 5 },
  { photo: null,                  accent: "#E040A0", border: "rgba(224,64,160,0.3)", glow: "rgba(224,64,160,0.12)", stars: 5 },
  { photo: null,                  accent: "#9B59F5", border: "rgba(155,89,245,0.3)", glow: "rgba(155,89,245,0.12)", stars: 5 },
  { photo: null,                  accent: "#FFB76C", border: "rgba(255,183,108,0.3)", glow: "rgba(255,183,108,0.12)", stars: 5 },
];

interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  photo: string | null;
  accent: string;
  border: string;
  glow: string;
  stars: number;
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div
      className="group relative flex-shrink-0 w-[640px] md:w-[720px] min-h-[260px] rounded-[20px] p-10 flex flex-col gap-4 cursor-default transition-transform duration-300 hover:-translate-y-2"
      style={{
        background: `linear-gradient(135deg, ${item.glow}, rgba(255,255,255,0.03))`,
        border: `1px solid ${item.border}`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{ background: `radial-gradient(circle at 50% 0%, ${item.glow} 0%, transparent 65%)` }}
      />
      <div
        className="absolute top-0 left-8 right-8 h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
      />
      <div className="flex gap-1">
        {Array.from({ length: item.stars }).map((_, i) => (
          <Star key={i} size={13} fill={item.accent} style={{ color: item.accent }} />
        ))}
      </div>
      <p className="text-white/80 text-base leading-relaxed flex-1">&ldquo;{item.quote}&rdquo;</p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
        {item.photo ? (
          <Image src={item.photo} alt={item.name} width={36} height={36} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
            style={{ background: `radial-gradient(circle, ${item.glow}, rgba(255,255,255,0.05))`, border: `1px solid ${item.border}`, color: item.accent }}
          >
            {item.name[0]}
          </div>
        )}
        <div>
          <div className="text-sm font-semibold text-white leading-tight">{item.name}</div>
          <div className="text-xs text-white/40 mt-0.5">{item.role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: TestimonialItem[]; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative"
      style={{ overflowX: "hidden", overflowY: "visible" }}
      onMouseEnter={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "paused"; }}
      onMouseLeave={() => { if (trackRef.current) trackRef.current.style.animationPlayState = "running"; }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0A0A0F, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0A0A0F, transparent)" }} />
      <div
        ref={trackRef}
        className="flex gap-5 w-max py-4"
        style={{ animation: `marquee${reverse ? "Reverse" : ""} ${reverse ? "160s" : "130s"} linear infinite` }}
      >
        {items.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

const clientLogos = [
  { logo: "/clients/elshisha.png",          name: "El Shisha",    accent: "#E040A0" },
  { logo: "/clients/pulsehomes2.png",        name: "Pulse Homes",  accent: "#FFB76C" },
  { logo: "/clients/coolfit.png",            name: "CoolFit",      accent: "#9B59F5" },
  { logo: "/clients/elwell.png",             name: "ElWell",       accent: "#E040A0" },
  { logo: "/clients/foxacademy.png",         name: "Fox Academy",  accent: "#FFB76C" },
  { logo: "/clients/lamaniere.png",          name: "La Manière",   accent: "#9B59F5" },
  { logo: "/clients/vapy.png",               name: "Vapy",         accent: "#E040A0" },
  { logo: "/clients/pulsekids.png",          name: "Pulse Kids",   accent: "#FFB76C" },
  { logo: "/clients/smart-strips-logo.png",  name: "Smart Strips", accent: "#9B59F5" },
  { logo: "/clients/fine-design-logo.png",   name: "Fine Design",  accent: "#E040A0" },
  { logo: "/clients/dongfeng-logo-white.png",name: "Dongfeng",     accent: "#FFB76C" },
  { logo: "/clients/chris-logo.png",         name: "Chris",        accent: "#9B59F5" },
  { logo: "/clients/fitty-logo.png",         name: "Fitty",        accent: "#FFB76C" },
  { logo: "/clients/under1roof-logo.png",    name: "Under 1 Roof", accent: "#9B59F5" },
  { logo: "/clients/mbc-logo-white.png",     name: "MBC",          accent: "#E040A0" },
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

function ClientCard({
  client,
  caseStudyLabel,
}: {
  client: ClientStory;
  caseStudyLabel: string;
}) {
  return (
    <div
      className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden"
      style={{
        background: `#0B0B12`,
        backgroundImage: `linear-gradient(135deg, ${client.accentRgb}0.10), rgba(11,11,18,1) 60%)`,
        border: `1px solid ${client.accentRgb}0.35)`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${client.accentRgb}0.18), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Corner glow */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${client.accentRgb}0.30), transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle, ${client.accentRgb}0.20), transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-0">
        {/* Left — image */}
        <div className="relative aspect-square lg:aspect-auto lg:min-h-[520px] overflow-hidden">
          <Image
            src={client.image}
            alt={client.name}
            fill
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 0%, transparent 60%, rgba(15,15,22,0.6) 100%)`,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(180deg, transparent 60%, rgba(15,15,22,0.5) 100%)`,
            }}
          />
          {/* Industry tag */}
          <div className="absolute top-6 left-6">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium"
              style={{
                background: "rgba(15,15,22,0.7)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${client.accentRgb}0.4)`,
                color: client.accent,
              }}
            >
              <Sparkles size={11} />
              {client.industry}
            </span>
          </div>
        </div>

        {/* Right — content */}
        <div className="p-8 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <div className="text-white/40 text-xs uppercase tracking-[0.2em] mb-3">
              {caseStudyLabel}
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.05] mb-4">
              {client.name}
            </h3>
            <p
              className="text-lg md:text-xl font-display mb-5"
              style={{
                background: `linear-gradient(135deg, #fff, ${client.accent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {client.tagline}
            </p>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              {client.description}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/[0.08]">
            {client.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <div
                  className="font-display font-extrabold text-2xl md:text-3xl leading-none tabular-nums"
                  style={{
                    background: `linear-gradient(180deg, #fff, ${client.accent})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {m.value}
                </div>
                <div className="text-white/40 text-[10px] uppercase tracking-[0.15em]">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const { t } = useLang();
  const logoGridRef = useRef<HTMLDivElement>(null);
  const [logoGridInView, setLogoGridInView] = useState(false);

  useEffect(() => {
    const el = logoGridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setLogoGridInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const activeSet = useRandomPop(clientLogos.length, logoGridInView);

  const testimonials: TestimonialItem[] = testimonialsMeta.map((meta, i) => ({
    ...meta,
    ...t.testimonialQuotes[i],
  }));
  const row1 = [...testimonials, ...testimonials];
  const row2 = [
    ...testimonials.slice(3), ...testimonials.slice(0, 3),
    ...testimonials.slice(3), ...testimonials.slice(0, 3),
  ];

  const clients: ClientStory[] = clientsMeta.map((meta, i) => {
    const story = t.clientStories[i];
    return {
      ...meta,
      industry: story.industry,
      tagline: story.tagline,
      description: story.description,
      metrics: meta.metrics.map((m, j) => ({ value: m.value, label: story.metrics[j]?.label ?? "" })),
    };
  });

  return (
    <main>
      {/* Full-viewport hero */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Background image */}
        <Image
          src="/background-images/floating-wave.png"
          alt=""
          aria-hidden
          fill
          className="object-cover object-center pointer-events-none"
          style={{ filter: "brightness(0.45) saturate(1.1)" }}
        />
        {/* Dark vignette */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 20%, rgba(10,8,18,0.7) 70%, rgba(10,8,18,0.95) 100%)",
          }}
        />
        {/* Bottom fade into page */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(0deg, #0A0A0F 0%, transparent 100%)",
          }}
        />
        {/* Top fade */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,8,18,0.6) 0%, transparent 100%)",
          }}
        />
        {/* Pink glow left */}
        <div
          aria-hidden
          className="absolute top-1/3 left-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(224,64,160,0.18), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Orange glow right */}
        <div
          aria-hidden
          className="absolute bottom-1/3 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,183,108,0.14), transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 container text-center max-w-4xl mx-auto px-6 pt-24">
          <SectionLabel>{t.clients.pageLabel}</SectionLabel>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-8xl text-white mt-4 mb-6 leading-[1.02]">
            {t.clients.pageTitle}
            <br />
            <span className="text-gradient-warm">
              {t.clients.pageTitleAccent}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl mx-auto">
            {t.clients.pageSub}
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-white/30 text-[12px] uppercase tracking-[0.2em]">
            {t.clients.scrollCue}
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>

      {/* Curved loop marquee */}
      <div className="relative overflow-hidden py-12">
        <CurvedLoop
          text={t.clients.curvedText}
          fontSize={42}
          color="rgba(255,255,255,0.18)"
          speed={45}
        />
      </div>

      {/* ScrollStack — the showcase */}
      <section className="relative">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.clients.showcaseLabel}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mt-4 leading-[1.05]"
            >
              {t.clients.showcaseTitle}
              <br />
              {t.clients.showcaseTitleAccent}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/55 text-lg mt-5 leading-relaxed"
            >
              {t.clients.showcaseSub}
            </motion.p>
          </motion.div>

          <ScrollStack
            itemDistance={120}
            itemStackDistance={32}
            stackPosition="5%"
            scaleEndPosition="2%"
            baseScale={0.88}
            itemScale={0.02}
            blurAmount={1.5}
            releaseDistance={500}
          >
            {clients.map((c) => (
              <ScrollStackItem key={c.id}>
                <ClientCard client={c} caseStudyLabel={t.clients.caseStudy} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* Testimonials marquee — no title */}
      <section className="relative overflow-hidden pt-6 pb-6">
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeReverse {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}</style>
        <Glow color="pink" size={600} className="top-1/2 left-1/3" />
        <Glow color="orange" size={400} className="bottom-0 right-1/4" />
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <MarqueeRow items={row1} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <MarqueeRow items={row2} reverse />
          </motion.div>
        </div>
      </section>

      {/* Client logo grid */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <Glow color="pink" size={600} className="top-1/2 left-1/3" />
        <Glow color="orange" size={500} className="bottom-1/4 right-1/4" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            ref={logoGridRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-3 sm:grid-cols-5 gap-4"
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
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px] transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${client.accent}, transparent)`,
                      opacity: isPopped ? 1 : 0,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${client.accent}, transparent)`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none rounded-[18px] transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${client.accent}18, transparent 70%)`,
                      opacity: isPopped ? 1 : 0,
                    }}
                  />
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
                    className="h-10 w-auto max-w-full object-contain"
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
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding relative overflow-hidden">
        {/* Background glows */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #E040A0, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          <div
            className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, #FFB76C, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeUp}
              className="relative rounded-3xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(18,10,30,0.97) 0%, rgba(12,8,20,0.99) 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Orange accent: top-left corner line */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, #FFB76C 0%, rgba(255,183,108,0.3) 20%, transparent 50%)",
                }}
              />
              {/* Pink accent: bottom-right corner line */}
              <div
                aria-hidden
                className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 50%, rgba(224,64,160,0.3) 80%, #E040A0 100%)",
                }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_2fr] items-stretch">
                {/* Left — text */}
                <div className="relative p-12 md:p-16 flex flex-col justify-center gap-10">
                  {/* Subtle orange corner glow behind text */}
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 0% 0%, rgba(255,183,108,0.07) 0%, transparent 70%)",
                    }}
                  />

                  <SectionLabel>{t.ctaBanner.label}</SectionLabel>

                  <div className="space-y-5">
                    <h2 className="font-display font-bold text-5xl md:text-6xl text-white leading-[1.05]">
                      {t.clients.ctaTitle}
                      <br />
                      <span className="text-gradient-warm">
                        {t.clients.ctaTitleAccent}
                      </span>
                    </h2>
                    <p className="text-white/50 text-lg leading-relaxed max-w-md">
                      {t.clients.ctaSub}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <Link href="/contact">
                      <ButtonPrimary size="lg">
                        {t.clients.ctaButton} <ArrowUpRight size={16} />
                      </ButtonPrimary>
                    </Link>
                    <a
                      href="tel:+359888123456"
                      className="text-white/40 hover:text-white/70 transition-colors text-sm"
                    >
                      {t.clients.ctaCall}
                    </a>
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center gap-8 pt-6 border-t border-white/[0.06]">
                    {t.clients.stats.map((stat, i) => (
                      <div key={stat.label} className="flex flex-col gap-1">
                        <span
                          className="font-display font-bold text-2xl"
                          style={{
                            background:
                              i === 0
                                ? "linear-gradient(135deg, #E040A0, #FFB76C)"
                                : "linear-gradient(135deg, #fff, rgba(255,255,255,0.6))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >
                          {stat.value}
                        </span>
                        <span className="text-white/30 text-[10px] uppercase tracking-[0.18em]">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — image panel */}
                <div
                  className="relative hidden lg:flex items-end justify-center overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,183,108,0.04) 0%, rgba(224,64,160,0.06) 100%)",
                  }}
                >
                  {/* Left blend into content */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(12,8,20,1) 0%, rgba(12,8,20,0.6) 25%, transparent 55%)",
                    }}
                  />
                  {/* Top blend */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(12,8,20,0.8) 0%, transparent 30%)",
                    }}
                  />
                  {/* Bottom blend */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(12,8,20,0.9) 0%, transparent 35%)",
                    }}
                  />
                  {/* Right blend */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(270deg, rgba(12,8,20,0.7) 0%, transparent 40%)",
                    }}
                  />

                  <Image
                    src="/background-images/rule-your-brand.png"
                    alt="Rule your brand"
                    fill
                    className="object-cover object-center"
                    style={{ filter: "brightness(0.8) saturate(1.1)" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
