"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";

const MagicRings = dynamic(
  () =>
    import("@/components/ui/MagicRings").then((m) => ({
      default: m.MagicRings,
    })),
  { ssr: false },
);

const phases = [
  {
    number: "01",
    title: "Strategy",
    titleBg: "Стратегия",
    short: "We define the foundation before anything is built.",
    shortBg: "Определяме основите, преди да се изгради каквото и да е.",
    image: "/websites/images/mbcenter3.webp",
    steps: [
      {
        title: "Research & Positioning",
        titleBg: "Проучване и позициониране",
        body: "Understanding your brand, audience, and competitors.",
        bodyBg: "Разбираме бранда, аудиторията и конкурентите ти.",
      },
      {
        title: "Structure & UX Planning",
        titleBg: "Структура и UX планиране",
        body: "Mapping the website flow, pages, and user journeys.",
        bodyBg: "Дефинираме структурата, страниците и потребителските пътища.",
      },
      {
        title: "Technical Direction",
        titleBg: "Технически избор",
        body: "Choosing between custom build or Shopify, defining architecture.",
        bodyBg:
          "Избираме между custom разработка или Shopify и дефинираме архитектурата.",
      },
      {
        title: "Conversion Strategy",
        titleBg: "Стратегия за конверсии",
        body: "Planning how the website will drive actions — sales, leads, engagement.",
        bodyBg:
          "Планираме как сайтът ще генерира продажби, запитвания и ангажираност.",
      },
    ],
    accent: "#E040A0",
    accentRgb: "224,64,160",
  },
  {
    number: "02",
    title: "Design & Build",
    titleBg: "Дизайн и разработка",
    short: "Where ideas turn into a functional, high-performing product.",
    shortBg: "Където идеите се превръщат в реален продукт.",
    image: "/websites/images/robohub.webp",
    steps: [
      {
        title: "UI Design System",
        titleBg: "UI дизайн система",
        body: "Creating a cohesive visual language tailored to your brand.",
        bodyBg: "Създаваме визуален език, съобразен с идентичността на бранда.",
      },
      {
        title: "High-Fidelity Design",
        titleBg: "Детайлен дизайн",
        body: "Designing all key pages with real content and interactions.",
        bodyBg:
          "Дизайн на всички ключови страници с реално съдържание и интеракции.",
      },
      {
        title: "Development",
        titleBg: "Разработка",
        body: "Building the site — custom code or Shopify — optimised and scalable.",
        bodyBg:
          "Изграждаме сайта (custom или Shopify), оптимизиран и мащабируем.",
      },
      {
        title: "Integrations",
        titleBg: "Интеграции",
        body: "Payments, tracking, apps, automations, and third-party tools.",
        bodyBg:
          "Плащания, проследяване, приложения, автоматизации и допълнителни инструменти.",
      },
    ],
    accent: "#FFB76C",
    accentRgb: "255,183,108",
  },
  {
    number: "03",
    title: "Launch & Growth",
    titleBg: "Пускане и растеж",
    short: "We refine, launch, and continuously improve performance.",
    shortBg: "Финализиране, лаунч и поддръжка",
    image: "/websites/images/activegym2.webp",
    steps: [
      {
        title: "Testing & Optimisation",
        titleBg: "Тестване и оптимизиране",
        body: "Speed, responsiveness, and cross-device testing.",
        bodyBg: "Скорост, адаптивност и тестване на всички устройства.",
      },
      {
        title: "Launch Setup",
        titleBg: "Пускане в живо",
        body: "Domain, hosting, SEO basics, analytics, and tracking.",
        bodyBg: "Домейн, хостинг, базов SEO, анализи и проследяване.",
      },
      {
        title: "Performance Monitoring",
        titleBg: "Проследяване на резултатите",
        body: "Tracking user behaviour and key metrics post-launch.",
        bodyBg: "Следим поведението на потребителите и ключовите метрики.",
      },
      {
        title: "Ongoing Improvements",
        titleBg: "Непрекъснато подобрение",
        body: "Iteration, A/B testing, and scaling based on real data.",
        bodyBg: "Итерация, A/B тестване и мащабиране на база реални данни.",
      },
    ],
    accent: "#9B59F5",
    accentRgb: "155,89,245",
  },
];

interface ProcessSectionProps {
  locale?: string;
}

export function ProcessSection({ locale = "en" }: ProcessSectionProps) {
  const [activePhase, setActivePhase] = useState(0);
  const isBg = locale === "bg";

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background rings — full viewport width, top-anchored inside section */}
      <div
        aria-hidden
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "100vw",
          maxHeight: 1000,
          zIndex: 0,
        }}
      >
        <MagicRings
          color={phases[activePhase].accent}
          colorTwo={
            activePhase === 0
              ? "#FFB76C"
              : activePhase === 1
                ? "#9B59F5"
                : "#E040A0"
          }
          speed={0.6}
          ringCount={7}
          attenuation={8}
          lineThickness={2.5}
          baseRadius={0.28}
          radiusStep={0.09}
          opacity={0.55}
          noiseAmount={0.06}
          followMouse={false}
          clickBurst={false}
        />
        {/* Fade bottom so rings don't bleed into the cards */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 25%, #0A0A0F 68%)",
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="container text-center mb-12 sm:mb-16 md:mb-20 lg:mb-28"
        >
          <span
            className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase mb-6 px-5 py-2 rounded-full"
            style={{
              background: "rgba(224,64,160,0.08)",
              border: "1px solid rgba(224,64,160,0.22)",
              color: "#f472b6",
            }}
          >
            {isBg ? "КАК РАБОТИМ" : "HOW WE WORK"}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white leading-[1.08] mb-6">
            {isBg ? (
              <>
                От идея до пускане —<br />
                <span className="text-gradient-warm">
                  ясен, структуриран процес
                </span>
              </>
            ) : (
              <>
                From idea to launch —<br />
                <span className="text-gradient-warm">
                  a clear, structured process
                </span>
              </>
            )}
          </h2>
          <p className="text-white/45 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            {isBg
              ? "Три фази. Всеки проект. Без изненади, без загубено време."
              : "Three phases. Every project. No surprises, no wasted time."}
          </p>
        </motion.div>

        {/* Phase cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden mx-4 sm:mx-6 md:mx-8 lg:mx-12 xl:mx-16 2xl:mx-20 3xl:mx-24"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {phases.map((phase, i) => {
            const isActive = activePhase === i;
            return (
              <div
                key={phase.number}
                onClick={() => setActivePhase(i)}
                className="relative cursor-pointer"
                style={{
                  background: "rgba(10,10,15,0.92)",
                  transition: "opacity 0.5s ease",
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                {/* Background image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={phase.image}
                    alt={phase.title}
                    fill
                    className="object-cover"
                    style={{
                      filter: isActive
                        ? "brightness(0.18) saturate(0.6)"
                        : "brightness(0.12) saturate(0.4)",
                      transform: isActive ? "scale(1.04)" : "scale(1.0)",
                      transition: "filter 0.6s ease, transform 0.6s ease",
                    }}
                  />
                </div>

                {/* Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isActive
                      ? "linear-gradient(to bottom, rgba(10,10,15,0.65) 0%, rgba(10,10,15,0.88) 100%)"
                      : "linear-gradient(to bottom, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.88) 100%)",
                    transition: "background 0.6s ease",
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${phase.accent}, transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                {/* Accent glow shimmer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(${phase.accentRgb},0.1), transparent)`,
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                />

                <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                  {/* Phase number */}
                  <div
                    className="font-display text-[56px] sm:text-[64px] md:text-[72px] lg:text-[96px] font-extrabold leading-none mb-4 select-none"
                    style={{
                      color: phase.accent,
                      opacity: isActive ? 0.35 : 0.12,
                      transition: "opacity 0.5s ease",
                    }}
                  >
                    {phase.number}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-xl sm:text-2xl lg:text-3xl font-bold mb-2 leading-tight"
                    style={{
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {isBg ? phase.titleBg : phase.title}
                  </h3>

                  {/* Short desc */}
                  <p
                    className="text-base sm:text-lg leading-relaxed mb-8"
                    style={{
                      color: isActive
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.28)",
                      transition: "color 0.5s ease",
                    }}
                  >
                    {isBg ? phase.shortBg : phase.short}
                  </p>

                  {/* Steps */}
                  <div
                    className="pt-7"
                    style={{
                      borderTop: `1px solid rgba(${phase.accentRgb},${isActive ? 0.25 : 0.1})`,
                      transition: "border-color 0.5s ease",
                    }}
                  >
                    {phase.steps.map((step, si) => (
                      <div
                        key={step.title}
                        className="flex gap-4 mb-6 last:mb-0"
                      >
                        <div
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                          style={{
                            background: `rgba(${phase.accentRgb},${isActive ? 0.15 : 0.06})`,
                            color: isActive
                              ? phase.accent
                              : "rgba(255,255,255,0.25)",
                            border: `1px solid rgba(${phase.accentRgb},${isActive ? 0.35 : 0.12})`,
                            transition: "all 0.5s ease",
                          }}
                        >
                          {si + 1}
                        </div>
                        <div>
                          <p
                            className="text-sm sm:text-base font-semibold leading-snug mb-1"
                            style={{
                              color: isActive
                                ? "rgba(255,255,255,1)"
                                : "rgba(255,255,255,0.3)",
                              transition: "color 0.5s ease",
                            }}
                          >
                            {isBg ? step.titleBg : step.title}
                          </p>
                          <p
                            className="text-sm leading-relaxed"
                            style={{
                              color: isActive
                                ? "rgba(255,255,255,0.8)"
                                : "rgba(255,255,255,0.18)",
                              transition: "color 0.5s ease",
                            }}
                          >
                            {isBg ? step.bodyBg : step.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
