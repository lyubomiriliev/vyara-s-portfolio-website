"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";
import { CurvedLoop } from "@/components/ui/CurvedLoop";
import { useLang } from "@/lib/LanguageContext";
import { ArrowUpRight, Sparkles } from "lucide-react";

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={client.image}
            alt={client.name}
            loading="lazy"
            className="w-full h-full object-cover"
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/background-images/floating-wave.png"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
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

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/background-images/rule-your-brand.png"
                    alt="Rule your brand"
                    className="absolute inset-0 w-full h-full object-cover object-center"
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
