"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Glow } from "@/components/ui/Glow";
import { useLang } from "@/lib/LanguageContext";

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
      {/* Hover glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${item.glow} 0%, transparent 65%)`,
        }}
      />
      {/* Top accent */}
      <div
        className="absolute top-0 left-8 right-8 h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
        }}
      />

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: item.stars }).map((_, i) => (
          <Star key={i} size={13} fill={item.accent} style={{ color: item.accent }} />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/80 text-base leading-relaxed flex-1">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
        {item.photo ? (
          <Image
            src={item.photo}
            alt={item.name}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
            style={{
              background: `radial-gradient(circle, ${item.glow}, rgba(255,255,255,0.05))`,
              border: `1px solid ${item.border}`,
              color: item.accent,
            }}
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

export default function Testimonials() {
  const { t } = useLang();

  const testimonials: TestimonialItem[] = testimonialsMeta.map((meta, i) => ({
    ...meta,
    ...t.testimonialQuotes[i],
  }));

  const row1 = [...testimonials, ...testimonials];
  const row2 = [
    ...testimonials.slice(3),
    ...testimonials.slice(0, 3),
    ...testimonials.slice(3),
    ...testimonials.slice(0, 3),
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      <Glow color="pink" size={700} className="top-1/2 left-1/3" />
      <Glow color="orange" size={500} className="bottom-0 right-1/4" />

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

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

      <div className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-3xl mx-auto mb-16 px-6"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.testimonials.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-5 leading-tight"
          >
            {t.testimonials.title}
            <br />
            <span className="text-gradient-warm">{t.testimonials.titleAccent}</span>
          </motion.h2>
        </motion.div>

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
  );
}
