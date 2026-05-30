"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { useLang } from "@/lib/LanguageContext";

export default function CTABanner() {
  const { t } = useLang();

  return (
    <section className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
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
                  "linear-gradient(90deg, transparent 0%, rgba(255,183,108,0.5) 20%, rgba(255,183,108,0.2) 50%, transparent 100%)",
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
              <div className="relative p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 flex flex-col justify-center gap-6 sm:gap-8">
                {/* Subtle orange corner glow */}
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
                  <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05]">
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
  );
}
