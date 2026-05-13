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
import {
  ArrowUpRight,
  Sparkles,
  Star,
  Share2,
  Brain,
  Target,
  Mail,
  Palette,
  Printer,
  Video,
  Film,
  PenLine,
  ImagePlay,
  Clapperboard,
  Search,
  Code2,
  Store,
  Smartphone,
  Layers,
  Server,
} from "lucide-react";
import { services as allServices } from "@/data/services";

const LUCIDE_ICONS: Record<string, React.ElementType> = {
  Share2,
  Brain,
  Target,
  Mail,
  Palette,
  Printer,
  Video,
  Film,
  PenLine,
  ImagePlay,
  Clapperboard,
  Search,
  Code2,
  Store,
  Smartphone,
  Layers,
  Server,
};

interface ClientStoryMeta {
  id: string;
  name: string;
  shortDesc: string;
  image: string;
  accent: string;
  accentRgb: string;
  serviceIds: string[];
  instagram?: string;
  facebook?: string;
  website?: string;
}

interface ClientStory extends ClientStoryMeta {
  industry: string;
  tagline: string;
  description: string;
}

const clientsMeta: ClientStoryMeta[] = [
  // 1 — Fine Design — purple
  {
    id: "fine-design",
    name: "Fine Design",
    shortDesc:
      "Interior architecture studio crafting bespoke spaces for discerning clients.",
    image: "/instagrams/fine-design.png",
    accent: "#ca6b99",
    accentRgb: "rgba(202,107,153,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "meta-ads-campaigns",
      "copywriting",
      "graphic-design",
      "video-filming",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
    ],
    instagram: "https://instagram.com/finedesign.bg",
    facebook: "https://facebook.com/finedesign",
    website: "https://finedesign.bg",
  },
  // 2 — Smart Strips — burgundy red
  {
    id: "smart-strips",
    name: "Smart Strips",
    shortDesc:
      "Consumer tech brand bringing smart LED solutions to the Bulgarian market.",
    image: "/instagrams/smart-strips.png",
    accent: "#c1ff72",
    accentRgb: "rgba(193,255,114,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "meta-ads-campaigns",
      "email-marketing",
      "copywriting",
      "seo-optimization",
      "graphic-design",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
      "online-store-ecommerce",
      "hosting-domain",
    ],
    instagram: "https://instagram.com/smartstrips.bg",
    facebook: "https://facebook.com/smartstrips",
    website: "https://smartstrips.bg",
  },
  // 3 — Dongfeng — red
  {
    id: "dongfeng",
    name: "Dongfeng Plovdiv",
    shortDesc:
      "Official Bulgarian importer of Dongfeng electric and hybrid vehicles.",
    image: "/instagrams/dongfeng.png",
    accent: "#E53E3E",
    accentRgb: "rgba(229,62,62,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "meta-ads-campaigns",
      "copywriting",
      "graphic-design",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
    ],
    instagram: "https://instagram.com/dongfeng.bg",
    facebook: "https://facebook.com/dongfeng.bg",
    website: "https://dongfeng.bg",
  },
  // 4 — CoolFit — blue
  {
    id: "coolfit",
    name: "CoolFit",
    shortDesc:
      "Corporate sports card giving access to 415+ fitness venues across Bulgaria.",
    image: "/instagrams/coolfit.png",
    accent: "#4A9EFF",
    accentRgb: "rgba(74,158,255,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "meta-ads-campaigns",
      "email-marketing",
      "copywriting",
      "graphic-design",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
    ],
    instagram: "https://instagram.com/coolfit.bg",
    facebook: "https://facebook.com/coolfit.bg",
    website: "https://coolfit.bg",
  },
  // 5 — Fox Academy — golden
  {
    id: "fox-academy",
    name: "Fox Academy",
    shortDesc:
      "Modern education platform bridging skills and career opportunities.",
    image: "/instagrams/fox-academy.png",
    accent: "#D4A017",
    accentRgb: "rgba(212,160,23,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "meta-ads-campaigns",
      "copywriting",
      "graphic-design",
      "video-filming",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
      "custom-websites-nextjs",
      "seo-optimization",
      "hosting-domain",
    ],
    instagram: "https://instagram.com/foxacademy",
    facebook: "https://facebook.com/foxacademy",
    website: "https://foxacademy.bg",
  },
  // 6 — El Shisha — emerald green
  {
    id: "elshisha",
    name: "El Shisha",
    shortDesc: "Premium shisha lounge brand in Sofia's nightlife scene.",
    image: "/instagrams/elshisha.png",
    accent: "#10B981",
    accentRgb: "rgba(16,185,129,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "meta-ads-campaigns",
      "email-marketing",
      "copywriting",
      "graphic-design",
      "print-materials",
      "video-filming",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
    ],
    instagram: "https://instagram.com/elshisha",
    facebook: "https://facebook.com/elshisha",
    website: "https://elshisha.bg",
  },
  // 7 — Pulse Homes — blue
  {
    id: "pulse-homes",
    name: "Pulse Homes",
    shortDesc:
      "Luxury real estate brand specialising in Sofia's prime districts.",
    image: "/instagrams/pulse-homes.png",
    accent: "#4A9EFF",
    accentRgb: "rgba(74,158,255,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "meta-ads-campaigns",
      "email-marketing",
      "copywriting",
      "graphic-design",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
    ],
    instagram: "https://instagram.com/pulsehomes",
    facebook: "https://facebook.com/pulsehomes",
    website: "https://pulsehomes.bg",
  },
  // 8 — El Well — light green
  {
    id: "el-well",
    name: "El Well",
    shortDesc: "Holistic wellness and beauty studio focused on mindful luxury.",
    image: "/instagrams/el-well.png",
    accent: "#4ADE80",
    accentRgb: "rgba(74,222,128,",
    serviceIds: [
      "social-media-management",
      "ai-powered-marketing",
      "copywriting",
      "graphic-design",
      "video-filming",
      "video-editing",
      "ai-image-generation",
      "ai-video-generation",
    ],
    instagram: "https://instagram.com/elwell.bg",
    facebook: "https://facebook.com/elwell",
    website: "https://elwell.bg",
  },
  // 9 — Christian Andon — yellow
  {
    id: "christian-andon",
    name: "CA Fragrances",
    shortDesc:
      "Executive personal brand for a high-profile business leader and entrepreneur.",
    image: "/instagrams/christian-andon.png",
    accent: "#FACC15",
    accentRgb: "rgba(250,204,21,",
    serviceIds: [
      "graphic-design",
      "online-store-ecommerce",
      "seo-optimization",
      "hosting-domain",
    ],
    instagram: "https://instagram.com/christianandon",
    facebook: "https://facebook.com/christianandon",
  },
];

const testimonialsMeta = [
  {
    photo: "/images/review1.jpg",
    accent: "#E040A0",
    border: "rgba(224,64,160,0.3)",
    glow: "rgba(224,64,160,0.12)",
    stars: 5,
  },
  {
    photo: null,
    accent: "#9B59F5",
    border: "rgba(155,89,245,0.3)",
    glow: "rgba(155,89,245,0.12)",
    stars: 5,
  },
  {
    photo: null,
    accent: "#FFB76C",
    border: "rgba(255,183,108,0.3)",
    glow: "rgba(255,183,108,0.12)",
    stars: 5,
  },
  {
    photo: null,
    accent: "#E040A0",
    border: "rgba(224,64,160,0.3)",
    glow: "rgba(224,64,160,0.12)",
    stars: 5,
  },
  {
    photo: null,
    accent: "#9B59F5",
    border: "rgba(155,89,245,0.3)",
    glow: "rgba(155,89,245,0.12)",
    stars: 5,
  },
  {
    photo: null,
    accent: "#FFB76C",
    border: "rgba(255,183,108,0.3)",
    glow: "rgba(255,183,108,0.12)",
    stars: 5,
  },
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
      className="group relative flex-shrink-0 w-[88vw] sm:w-[460px] md:w-[640px] lg:w-[720px] min-h-[260px] rounded-[20px] p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 cursor-default transition-transform duration-300 hover:-translate-y-2"
      style={{
        background: `linear-gradient(135deg, ${item.glow}, rgba(255,255,255,0.03))`,
        border: `1px solid ${item.border}`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${item.glow} 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute top-0 left-8 right-8 h-[1px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)`,
        }}
      />
      <div className="flex gap-1">
        {Array.from({ length: item.stars }).map((_, i) => (
          <Star
            key={i}
            size={13}
            fill={item.accent}
            style={{ color: item.accent }}
          />
        ))}
      </div>
      <p className="text-white/80 text-sm sm:text-base leading-relaxed flex-1">
        &ldquo;{item.quote}&rdquo;
      </p>
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
          <div className="text-sm font-semibold text-white leading-tight">
            {item.name}
          </div>
          <div className="text-xs text-white/40 mt-0.5">{item.role}</div>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: TestimonialItem[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className="relative"
      style={{ overflowX: "hidden", overflowY: "visible" }}
      onMouseEnter={() => {
        if (trackRef.current)
          trackRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (trackRef.current)
          trackRef.current.style.animationPlayState = "running";
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0A0A0F, transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0A0A0F, transparent)" }}
      />
      <div
        ref={trackRef}
        className="flex gap-5 w-max py-4"
        style={{
          animation: `marquee${reverse ? "Reverse" : ""} ${reverse ? "160s" : "130s"} linear infinite`,
        }}
      >
        {items.map((item, i) => (
          <TestimonialCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

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

function ClientCard({ client }: { client: ClientStory }) {
  const { t } = useLang();
  const resolvedServices = client.serviceIds.map((id) => {
    const svc = allServices.find((s) => s.id === id);
    const translated = t.servicesList.find((s: { id: string }) => s.id === id);
    return {
      id,
      icon: svc?.icon ?? "Share2",
      title: translated?.title ?? svc?.title ?? id,
      category: svc?.category ?? "marketing",
    };
  });

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        background: `#0B0B12`,
        backgroundImage: `linear-gradient(135deg, ${client.accentRgb}0.10), rgba(11,11,18,1) 60%)`,
        border: `1px solid ${client.accentRgb}0.35)`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 80px ${client.accentRgb}0.18), inset 0 1px 0 rgba(255,255,255,0.06)`,
      }}
    >
      {/* Corner glows */}
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

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-0">
        {/* Left — image */}
        <div className="relative aspect-square lg:aspect-auto lg:min-h-[680px] xl:min-h-[820px] 2xl:min-h-[940px] overflow-hidden">
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
        </div>

        {/* Right — content */}
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-between gap-6 md:gap-8">
          {/* Top: name + industry pill + tagline + description + service tags */}
          <div className="flex flex-col gap-4">
            <h3 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white leading-[1.05]">
              {client.name}
            </h3>

            {/* Industry pill — right below name */}

            <span
              className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] uppercase tracking-[0.18em] font-medium"
              style={{
                background: "rgba(15,15,22,0.8)",
                backdropFilter: "blur(12px)",
                border: `1px solid ${client.accentRgb}0.5)`,
                color: client.accent,
              }}
            >
              <Sparkles size={11} />
              {client.industry}
            </span>
            <p className="text-base sm:text-lg md:text-xl font-display">
              <span
                style={{
                  background: `linear-gradient(135deg, #fff, ${client.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {client.tagline}
              </span>
            </p>
            <p className="text-white/60 text-sm md:text-base lg:text-lg leading-relaxed">
              {client.description}
            </p>

            {/* Separator above service tags */}
            <div className="border-t border-white/[0.08]" />

            {/* Service tags — categorized columns */}
            {(() => {
              const catLabels = (
                t.categoriesList as { id: string; label: string }[]
              ).map((c) =>
                c.id === "web" ? { ...c, label: "Уеб услуги" } : c,
              );
              const servicesWithWebSeo = resolvedServices.map((s) =>
                s.id === "seo-optimization"
                  ? { ...s, category: "web" as const }
                  : s,
              );
              const grouped = catLabels
                .map((cat) => ({
                  label: cat.label,
                  items: servicesWithWebSeo.filter(
                    (s) => s.category === cat.id,
                  ),
                }))
                .filter((g) => g.items.length > 0);
              if (grouped.length === 0) return null;
              return (
                <div
                  className="grid gap-x-4 gap-y-3 mt-1"
                  style={{
                    gridTemplateColumns: `repeat(${grouped.length}, minmax(0,1fr))`,
                  }}
                >
                  {grouped.map((group) => (
                    <div key={group.label} className="flex flex-col gap-1.5">
                      <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-white/30 mb-0.5">
                        {group.label}
                      </span>
                      {group.items.map(({ id, icon, title }) => {
                        const Icon = LUCIDE_ICONS[icon];
                        return (
                          <span
                            key={id}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[14px] tracking-wide font-medium text-white"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.15)",
                            }}
                          >
                            {Icon && (
                              <Icon
                                size={10}
                                className="opacity-60 flex-shrink-0"
                              />
                            )}
                            {title}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Bottom: social links */}
          <div className="flex flex-col gap-5 pt-6 border-t border-white/[0.08]">
            {/* Social / website buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-start sm:self-end">
              {client.instagram && (
                <a
                  href={client.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
              )}
              {client.facebook && (
                <a
                  href={client.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              )}
              {client.website && (
                <a
                  href={client.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const VISIBLE_STACK = 3;

export default function ClientsPage() {
  const { t } = useLang();
  const logoGridRef = useRef<HTMLDivElement>(null);
  const stackSectionRef = useRef<HTMLElement>(null);
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

  // Hide stack cards that are more than VISIBLE_STACK behind the current top card
  useEffect(() => {
    const section = stackSectionRef.current;
    if (!section) return;

    let cardOffsets: number[] = [];

    const measure = () => {
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(".scroll-stack-card"),
      );
      const saved = cards.map((c) => c.style.transform);
      cards.forEach((c) => (c.style.transform = "none"));
      cardOffsets = cards.map(
        (c) => c.getBoundingClientRect().top + window.scrollY,
      );
      cards.forEach((c, i) => (c.style.transform = saved[i]));
    };

    const applyVisibility = () => {
      const cards = Array.from(
        section.querySelectorAll<HTMLElement>(".scroll-stack-card"),
      );
      if (!cards.length || !cardOffsets.length) return;

      const scrollTop = window.scrollY;
      const stackPx = window.innerHeight * 0.05;

      let topIndex = 0;
      for (let i = 0; i < cardOffsets.length; i++) {
        const pinStart = cardOffsets[i] - stackPx - 32 * i;
        if (scrollTop >= pinStart) topIndex = i;
      }

      cards.forEach((card, i) => {
        const hide = i < topIndex - (VISIBLE_STACK - 1);
        card.style.visibility = hide ? "hidden" : "";
        card.style.pointerEvents = hide ? "none" : "";
      });
    };

    const timer = setTimeout(() => {
      measure();
      applyVisibility();
    }, 100);

    window.addEventListener("scroll", applyVisibility, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", applyVisibility);
      window.removeEventListener("resize", measure);
    };
  }, []);

  useRandomPop(clientLogos.length, logoGridInView);

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

  const clients: ClientStory[] = clientsMeta.map((meta, i) => {
    const story = t.clientStories[i];
    return {
      ...meta,
      industry: story.industry,
      tagline: story.tagline,
      description: story.description,
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
          <h1
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white mt-4 mb-6 leading-[1.02]"
            style={{
              textShadow:
                "0 2px 24px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {t.clients.pageTitle}
            <br />
            <span className="">{t.clients.pageTitleAccent}</span>
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-white/55 leading-relaxed max-w-2xl mx-auto"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
          >
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
      <section ref={stackSectionRef} className="relative">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12">
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
              className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white mt-4 leading-[1.05]"
            >
              {t.clients.showcaseTitle}
              <br />
              {t.clients.showcaseTitleAccent}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/55 text-base sm:text-lg mt-5 leading-relaxed"
            >
              {t.clients.showcaseSub}
            </motion.p>
          </motion.div>

          <ScrollStack
            itemDistance={120}
            itemStackDistance={32}
            stackPosition="5%"
            stackPositionStep={1}
            scaleEndPosition="2%"
            baseScale={0.88}
            itemScale={0.02}
            blurAmount={1.5}
            releaseDistance={500}
          >
            {clients.map((c) => (
              <ScrollStackItem key={c.id}>
                <ClientCard client={c} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* Testimonials marquee */}
      <section className="relative overflow-hidden pt-16 pb-6">
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
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white mt-4 mb-5 leading-tight"
            >
              {t.testimonials.title}
              <br />
              <span className="text-gradient-warm">
                {t.testimonials.titleAccent}
              </span>
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2.5fr_2fr] items-stretch">
                {/* Left — text */}
                <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10">
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
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white leading-[1.05]">
                      {t.clients.ctaTitle}
                      <br />
                      <span className="text-gradient-warm">
                        {t.clients.ctaTitleAccent}
                      </span>
                    </h2>
                    <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md">
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
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 pt-6 border-t border-white/[0.06]">
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
