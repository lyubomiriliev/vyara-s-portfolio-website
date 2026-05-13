"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { useLang } from "@/lib/LanguageContext";

interface WebProject {
  id: string;
  name: string;
  client: string;
  logo: string;
  thumbnail: string;
  description: { en: string; bg: string };
  url: string;
  category: string;
  accentColor: string;
  tech: string[];
  showPrinceps: boolean;
}

const featuredProjects: WebProject[] = [
  {
    id: "mbcenter",
    name: "MB Center",
    client: "MB Center",
    logo: "/websites/mbc-logo-black.png",
    thumbnail: "/websites/images/mbcenter3.webp",
    description: {
      en: "Premium automotive service centre website with multi-language support, service booking flow, and a refined brand experience built for luxury clientele.",
      bg: "Уебсайт за премиум автомобилен сервиз с многоезична поддръжка, система за резервации и изискано брандиране за луксозна клиентела.",
    },
    url: "https://mbcenter.bg/bg/",
    category: "Auto Service",
    accentColor: "#E040A0",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "i18n"],
    showPrinceps: false,
  },
  {
    id: "smartstrips",
    name: "Smart Strips",
    client: "Smart Strips",
    logo: "/websites/smart-strips-logo.png",
    thumbnail: "/websites/images/smart-strips2.webp",
    description: {
      en: "Modern e-commerce store for smart LED lighting products — product configurator, comparison tools, and a clean UX that converts browsers into buyers.",
      bg: "Модерен e-commerce магазин за смарт LED осветление с конфигуратор на продукти и изчистен UX, ориентиран към продажби.",
    },
    url: "https://smartstrips.bg/bg",
    category: "E-Commerce",
    accentColor: "#FFB76C",
    tech: ["Next.js", "Shopify", "Tailwind CSS", "Analytics"],
    showPrinceps: true,
  },
  {
    id: "robohub",
    name: "RoboHub Pro",
    client: "RoboHub Pro",
    logo: "/websites/robohub-logo.png",
    thumbnail: "/websites/images/robohub.webp",
    description: {
      en: "A cutting-edge platform for robotics and automation products, featuring an immersive product showcase, technical specs display, and seamless e-commerce integration.",
      bg: "Платформа за роботика и автоматизация с продуктова витрина, технически спецификации и безпроблемна e-commerce интеграция.",
    },
    url: "https://robohubpro.com/en/",
    category: "Automation",
    accentColor: "#9B59F5",
    tech: ["Next.js", "Framer Motion", "TypeScript", "Stripe"],
    showPrinceps: true,
  },
];

export default function ProjectsPreview() {
  const { locale } = useLang();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeProject = featuredProjects[activeIndex];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const pauseAutoplay = () => {
    setIsPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section
      className="relative overflow-hidden py-16 sm:py-20 md:py-24 lg:py-[120px] lg:pb-[160px]"
    >
      {/* Background glows */}
      <div
        aria-hidden
        className="absolute top-1/4 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${activeProject.accentColor}18 0%, transparent 70%)`,
          filter: "blur(80px)",
          transition: "background 0.8s ease",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(224,64,160,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container relative z-10">
        {/* Headline */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>УЕБ ПРОЕКТИ</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white mt-4 mb-5 leading-tight"
          >
            Сайтове, които{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E040A0, #FFB76C)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Конвертират и Печелят
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base sm:text-lg leading-relaxed"
          >
            Уебсайтове и уеб приложения, изградени за скорост, SEO и максимални
            конверсии.
          </motion.p>
        </motion.div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_480px] gap-4 lg:gap-6 items-stretch md:min-h-[600px] lg:min-h-[680px]">
          {/* Main featured card */}
          <div
            className="relative rounded-3xl overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeProject.thumbnail}
                  alt={activeProject.name}
                  fill
                  className="object-cover"
                  style={{ filter: "brightness(0.7)" }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,4,2,0.97) 0%, rgba(8,4,2,0.55) 45%, rgba(0,0,0,0.1) 80%, transparent 100%)",
              }}
            />

            {/* Top-left category badge */}
            <div
              className="absolute top-0 left-0 z-20 text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-2"
              style={{
                background: "rgba(10,10,15,0.80)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderTop: "none",
                borderLeft: "none",
                borderBottomRightRadius: "10px",
                color: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              {activeProject.category}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id + "-content"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.45,
                  delay: 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 flex flex-col justify-end p-8 z-10"
              >
                {/* Logo */}
                <div className="relative w-40 h-20 mb-4 flex items-center">
                  <Image
                    src={activeProject.logo}
                    alt={activeProject.name}
                    fill
                    className="object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>

                <p className="text-white/60 text-base leading-relaxed mb-5 max-w-lg">
                  {activeProject.description[locale as "en" | "bg"] ??
                    activeProject.description.en}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-md font-medium"
                      style={{
                        background: "rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background: "linear-gradient(135deg, #E040A0, #FFB76C)",
                    }}
                  >
                    <ExternalLink size={14} strokeWidth={2.5} />
                    Вижте сайта
                  </a>
                </div>

                {/* Princeps logo — bottom-right of big card */}
                {activeProject.showPrinceps && (
                  <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1">
                    <span className="text-white/35 text-[10px] font-medium tracking-[0.12em] uppercase">
                      Powered by Princeps Group
                    </span>
                    <Image
                      src="/websites/princeps-logo.png"
                      alt="Princeps Group"
                      width={110}
                      height={34}
                      className="h-8 w-auto object-contain"
                      style={{ opacity: 0.8 }}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Accent glow border bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-700"
              style={{
                background: `linear-gradient(90deg, transparent, ${activeProject.accentColor}, transparent)`,
              }}
            />
          </div>

          {/* Sidebar — project list */}
          <div className="grid grid-cols-3 lg:flex lg:flex-col gap-3">
            {featuredProjects.map((project, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.button
                  key={project.id}
                  onClick={() => {
                    pauseAutoplay();
                    setActiveIndex(i);
                  }}
                  animate={{ opacity: isActive ? 1 : 0.6 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative rounded-2xl overflow-hidden text-left cursor-pointer flex-1 min-h-[180px] lg:min-h-0"
                  style={{
                    border: isActive
                      ? `1px solid ${project.accentColor}55`
                      : "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(10,10,15,0.6)",
                    boxShadow: isActive
                      ? `0 0 30px ${project.accentColor}20`
                      : "none",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.35s ease",
                  }}
                >
                  {/* Full-card image */}
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    fill
                    className="object-cover transition-all duration-500"
                    style={{
                      filter: isActive
                        ? "brightness(0.75)"
                        : "brightness(0.45)",
                      transform: isActive ? "scale(1)" : "scale(1.04)",
                    }}
                  />

                  {/* Gradient — only bottom portion darkened */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.3) 35%, transparent 60%)",
                    }}
                  />

                  {/* Text pinned to bottom */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-4 z-10">
                    <span
                      className="block text-[10px] font-bold tracking-[0.16em] uppercase mb-1"
                      style={{
                        color: isActive
                          ? project.accentColor
                          : "rgba(255,255,255,0.35)",
                      }}
                    >
                      {project.category}
                    </span>
                    <h4
                      className="font-display font-bold text-sm leading-tight"
                      style={{
                        color: isActive
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {project.name}
                    </h4>
                  </div>

                  {/* Active indicator bar */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] z-20"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-2xl overflow-hidden mb-4"
              style={{ height: 460 }}
            >
              <Image
                src={activeProject.thumbnail}
                alt={activeProject.name}
                fill
                className="object-cover"
                style={{ filter: "brightness(0.65)" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.4) 60%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span
                  className="self-start text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1 rounded-full mb-3"
                  style={{
                    background: `${activeProject.accentColor}22`,
                    border: `1px solid ${activeProject.accentColor}44`,
                    color: activeProject.accentColor,
                  }}
                >
                  {activeProject.category}
                </span>
                <div className="relative w-16 h-10 mb-3">
                  <Image
                    src={activeProject.logo}
                    alt={activeProject.name}
                    fill
                    className="object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {activeProject.name}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed mb-4">
                  {activeProject.description[locale as "en" | "bg"] ??
                    activeProject.description.en}
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                    style={{
                      background: "linear-gradient(135deg, #E040A0, #FFB76C)",
                    }}
                  >
                    <ExternalLink size={13} />
                    Вижте сайта
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white/55"
                    style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                  >
                    Подобен проект
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile nav — dots only */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {featuredProjects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  pauseAutoplay();
                  setActiveIndex(i);
                }}
                className="transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  width: i === activeIndex ? 22 : 7,
                  height: 7,
                  background:
                    i === activeIndex
                      ? "linear-gradient(135deg, #E040A0, #FFB76C)"
                      : "rgba(255,255,255,0.18)",
                }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 mt-12 mb-10">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
            {featuredProjects.length} избрани проекта от 2 категории
          </p>
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
          <Link
            href="/work"
            onClick={() => {
              try {
                localStorage.setItem("work-filter", "Custom Websites");
              } catch {}
            }}
          >
            <ButtonOutline size="lg">Вижте всички проекти →</ButtonOutline>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
