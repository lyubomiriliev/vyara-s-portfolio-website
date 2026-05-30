"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowUpRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { fadeUp, staggerContainer } from "@/lib/animations";

// Group FAQ items into categories
const FAQ_CATEGORIES = [
  { key: "general", labelEn: "General", labelBg: "Общи въпроси", indices: [0, 2, 6, 8, 9] },
  { key: "results", labelEn: "Results & Timelines", labelBg: "Резултати и срокове", indices: [1] },
  { key: "approach", labelEn: "Our Approach", labelBg: "Нашият подход", indices: [3] },
  { key: "process", labelEn: "Process & Onboarding", labelBg: "Процес и старт", indices: [4, 7] },
  { key: "services", labelEn: "Services & Pricing", labelBg: "Услуги и цени", indices: [5, 6] },
];

function FAQItem({
  question,
  answer,
  index,
  globalIndex,
  accentColor,
}: {
  question: string;
  answer: string;
  index: number;
  globalIndex: number;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: index * 0.04 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left group"
        aria-expanded={open}
      >
        <div
          className="flex items-start justify-between gap-4 px-5 py-4 rounded-2xl transition-all duration-200"
          style={{
            background: open ? "rgba(224,64,160,0.06)" : "rgba(255,255,255,0.02)",
            border: open
              ? "1px solid rgba(224,64,160,0.22)"
              : "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-start gap-4 min-w-0">
            <span
              className="flex-shrink-0 text-[10px] font-bold tabular-nums mt-0.5"
              style={{ color: open ? accentColor : "rgba(255,255,255,0.18)" }}
            >
              {String(globalIndex + 1).padStart(2, "0")}
            </span>
            <span
              className="font-semibold text-[14.5px] leading-snug transition-colors duration-200 text-left"
              style={{ color: open ? "#fff" : "rgba(255,255,255,0.72)" }}
            >
              {question}
            </span>
          </div>
          <ChevronDown
            size={15}
            className="flex-shrink-0 mt-0.5 transition-transform duration-300"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color: open ? accentColor : "rgba(255,255,255,0.2)",
            }}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-5 pb-5 pt-1"
              style={{
                borderLeft: `1px solid rgba(224,64,160,0.15)`,
                borderRight: `1px solid rgba(224,64,160,0.15)`,
                borderBottom: `1px solid rgba(224,64,160,0.15)`,
                borderRadius: "0 0 16px 16px",
                background: "rgba(224,64,160,0.02)",
              }}
            >
              <div className="ml-8 pt-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <p
                  className="text-[13.5px] leading-[1.8]"
                  style={{ color: "rgba(255,255,255,0.52)" }}
                >
                  {answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const { t, locale } = useLang();
  const isBg = locale === "bg";
  const items = t.faq.items;

  const [activeCategory, setActiveCategory] = useState<string>("general");

  const currentCat = FAQ_CATEGORIES.find((c) => c.key === activeCategory) ?? FAQ_CATEGORIES[0];
  const visibleItems = currentCat.indices
    .filter((i) => i < items.length)
    .map((i) => ({ item: items[i], globalIndex: i }));

  return (
    <main className="min-h-screen" style={{ background: "#0A0A0F" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
        <Image
          src="/background-images/floating-wave-purple.webp"
          alt=""
          fill
          aria-hidden
          className="object-cover object-center pointer-events-none select-none"
          style={{ opacity: 0.07 }}
        />

        <div className="relative z-10 max-w-[760px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-7"
            style={{
              background: "rgba(224,64,160,0.08)",
              border: "1px solid rgba(224,64,160,0.2)",
              color: "#E040A0",
            }}
          >
            <MessageCircle size={11} />
            {t.faq.pageLabel}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.07 }}
            className="font-display font-extrabold text-[36px] md:text-[50px] lg:text-[60px] leading-[1.1] tracking-tight mb-5"
          >
            {t.faq.pageTitle}{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E040A0 0%, #FFB76C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.faq.pageTitleGradient}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.14 }}
            className="text-[16px] leading-relaxed max-w-[500px] mx-auto"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            {t.faq.pageSub}
          </motion.p>
        </div>
      </section>

      {/* Gradient divider */}
      <div
        className="w-full h-px mx-auto"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(224,64,160,0.3) 30%, rgba(255,183,108,0.22) 70%, transparent 100%)",
        }}
      />

      {/* ── Two-column FAQ ── */}
      <section className="relative py-20 lg:py-28">

        <div className="relative z-10 max-w-[1100px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

            {/* Left — category nav */}
            <aside className="lg:w-[220px] flex-shrink-0">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-5"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {isBg ? "Категории" : "Categories"}
              </p>
              <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto scrollbar-hide lg:overflow-visible">
                {FAQ_CATEGORIES.map((cat) => {
                  const isActive = cat.key === activeCategory;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className="flex-shrink-0 text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(224,64,160,0.12), rgba(255,183,108,0.08))"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(224,64,160,0.25)"
                          : "1px solid transparent",
                        color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {isBg ? cat.labelBg : cat.labelEn}
                    </button>
                  );
                })}
              </nav>

              {/* Count badge */}
              <div
                className="mt-8 px-4 py-3 rounded-xl hidden lg:block"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-1"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  {isBg ? "Общо" : "Total"}
                </p>
                <p className="font-display font-bold text-2xl text-white">
                  {items.length}
                </p>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {isBg ? "отговорени въпроса" : "questions answered"}
                </p>
              </div>
            </aside>

            {/* Right — questions */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28 }}
                  className="flex flex-col gap-2.5"
                >
                  {visibleItems.map(({ item, globalIndex }, localIdx) => (
                    <FAQItem
                      key={globalIndex}
                      question={item.q}
                      answer={item.a}
                      index={localIdx}
                      globalIndex={globalIndex}
                      accentColor="#E040A0"
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner — matches other pages style ── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
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
              {/* Accent lines */}
              <div
                aria-hidden
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, #FFB76C 0%, rgba(255,183,108,0.3) 20%, transparent 50%)",
                }}
              />
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
                <div className="relative p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 flex flex-col justify-center gap-6 sm:gap-8">
                  <div
                    aria-hidden
                    className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 0% 0%, rgba(255,183,108,0.07) 0%, transparent 70%)",
                    }}
                  />

                  <SectionLabel>{t.ctaBanner.label}</SectionLabel>

                  <div className="space-y-4">
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05]">
                      {t.faq.ctaTitle}
                      <br />
                      <span className="text-gradient-warm">
                        {t.faq.ctaTitleAccent}
                      </span>
                    </h2>
                    <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md">
                      {t.faq.ctaSub}
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <Link href="/contact">
                      <ButtonPrimary size="lg">
                        {t.faq.ctaButton} <ArrowUpRight size={16} />
                      </ButtonPrimary>
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6 lg:gap-8 pt-6 border-t border-white/[0.06]">
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
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(12,8,20,1) 0%, rgba(12,8,20,0.6) 25%, transparent 55%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(12,8,20,0.8) 0%, transparent 30%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(12,8,20,0.9) 0%, transparent 35%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(270deg, rgba(12,8,20,0.7) 0%, transparent 40%)",
                    }}
                  />
                  <Image
                    src="/background-images/rule-your-brand.webp"
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
