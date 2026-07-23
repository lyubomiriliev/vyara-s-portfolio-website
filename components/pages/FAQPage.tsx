"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { SectionLabel } from "@/components/ui/SectionLabel";
import CTABanner from "@/components/sections/CTABanner";

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
  accentColor,
  defaultOpen,
}: {
  question: string;
  answer: string;
  index: number;
  accentColor: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);

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
              <div className="pt-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
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
            className="mb-7"
          >
            <SectionLabel>{t.faq.pageLabel}</SectionLabel>
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
                      key={`${activeCategory}-${globalIndex}`}
                      question={item.q}
                      answer={item.a}
                      index={localIdx}
                      accentColor="#E040A0"
                      defaultOpen={localIdx === 0}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner — shared component, matches other pages ── */}
      <CTABanner
        title={t.faq.ctaTitle}
        titleAccent={t.faq.ctaTitleAccent}
        sub={t.faq.ctaSub}
        button={t.faq.ctaButton}
        showCall={false}
      />
    </main>
  );
}
