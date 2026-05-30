"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: index * 0.035 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div
          className="flex items-center justify-between gap-6 px-7 py-5 rounded-2xl transition-all duration-200"
          style={{
            background: open
              ? "rgba(255,183,108,0.06)"
              : "rgba(255,255,255,0.025)",
            border: open
              ? "1px solid rgba(224,64,160,0.25)"
              : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center gap-5">
            <span
              className="flex-shrink-0 text-[11px] font-bold tabular-nums"
              style={{
                color: open ? "#FFB76C" : "rgba(255,255,255,0.2)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-semibold text-[15px] leading-snug transition-colors duration-200"
              style={{ color: open ? "#fff" : "rgba(255,255,255,0.75)" }}
            >
              {question}
            </span>
          </div>
          <ChevronDown
            size={16}
            className="flex-shrink-0 transition-transform duration-300"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              color: open ? "#E040A0" : "rgba(255,255,255,0.25)",
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
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-7 pb-6 pt-1"
              style={{
                borderLeft: "1px solid rgba(224,64,160,0.18)",
                borderRight: "1px solid rgba(224,64,160,0.18)",
                borderBottom: "1px solid rgba(224,64,160,0.18)",
                borderRadius: "0 0 16px 16px",
                background: "rgba(224,64,160,0.025)",
              }}
            >
              <div
                className="ml-9 pt-4"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p
                  className="text-[14.5px] leading-[1.75]"
                  style={{ color: "rgba(255,255,255,0.58)" }}
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
  const { t } = useLang();

  return (
    <main className="min-h-screen" style={{ background: "#0A0A0F" }}>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
        {/* Warm glows */}
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 800,
            height: 800,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            background: "radial-gradient(circle, rgba(224,64,160,0.1) 0%, rgba(255,183,108,0.06) 45%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          aria-hidden
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 400,
            height: 400,
            bottom: 0,
            right: "15%",
            background: "radial-gradient(circle, rgba(255,183,108,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 max-w-[860px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10.5px] font-semibold uppercase tracking-[0.18em] mb-8"
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
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.07 }}
            className="font-display font-extrabold text-[42px] md:text-[56px] lg:text-[68px] leading-[1.08] tracking-tight mb-6"
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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="text-[17px] leading-relaxed max-w-[520px] mx-auto"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {t.faq.pageSub}
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div
        className="w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(224,64,160,0.3) 30%, rgba(255,183,108,0.25) 70%, transparent 100%)",
        }}
      />

      {/* ── FAQ Items ── */}
      <section className="relative py-24 lg:py-32">
        {/* Subtle side glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: 300,
            height: 600,
            top: "20%",
            left: 0,
            background: "radial-gradient(ellipse, rgba(224,64,160,0.05) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="relative z-10 max-w-[760px] mx-auto px-6">
          {/* Count label */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-semibold uppercase tracking-[0.16em] mb-10"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {t.faq.items.length} questions answered
          </motion.p>

          <div className="flex flex-col gap-2.5">
            {t.faq.items.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(224,64,160,0.08) 0%, rgba(255,183,108,0.04) 50%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="relative z-10 max-w-[640px] mx-auto px-6"
        >
          <div
            className="text-center rounded-3xl px-10 py-14"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Warm line accent */}
            <div
              className="w-10 h-0.5 mx-auto mb-7 rounded-full"
              style={{
                background: "linear-gradient(90deg, #E040A0, #FFB76C)",
              }}
            />

            <p
              className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-3"
              style={{ color: "rgba(255,183,108,0.7)" }}
            >
              {t.faq.ctaTitle}
            </p>

            <h2
              className="font-display font-bold text-3xl lg:text-4xl mb-4"
              style={{
                background: "linear-gradient(135deg, #E040A0 0%, #FFB76C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.faq.ctaTitleAccent}
            </h2>

            <p
              className="text-[15px] leading-relaxed mb-9 max-w-[400px] mx-auto"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {t.faq.ctaSub}
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{
                background: "linear-gradient(135deg, #E040A0 0%, #FFB76C 100%)",
              }}
            >
              {t.faq.ctaButton} <ArrowRight size={14} strokeWidth={2.5} />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
