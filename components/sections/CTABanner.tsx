"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { useLang } from "@/lib/LanguageContext";

interface CTABannerProps {
  label?: string;
  title?: string;
  titleAccent?: string;
  sub?: string;
  button?: string;
  /** Set false to hide the "or call us" link (e.g. FAQ page) */
  showCall?: boolean;
}

export default function CTABanner({
  label,
  title,
  titleAccent,
  sub,
  button,
  showCall = true,
}: CTABannerProps = {}) {
  const { t } = useLang();

  const labelText = label ?? t.ctaBanner.label;
  const titleText = title ?? t.clients.ctaTitle;
  const titleAccentText = titleAccent ?? t.clients.ctaTitleAccent;
  const subText = sub ?? t.clients.ctaSub;
  const buttonText = button ?? t.clients.ctaButton;

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
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
            className="group relative rounded-[28px] overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(20,11,32,0.97) 0%, rgba(11,7,18,0.99) 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 28px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Top accent hairline */}
            <div
              aria-hidden
              className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,183,108,0.55) 18%, rgba(224,64,160,0.45) 55%, transparent 100%)",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] items-center">
              {/* Left — text */}
              <div className="relative p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center gap-5 sm:gap-6">
                {/* Subtle orange corner glow */}
                <div
                  aria-hidden
                  className="absolute top-0 left-0 w-72 h-72 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 0% 0%, rgba(255,183,108,0.08) 0%, transparent 65%)",
                  }}
                />

                <SectionLabel>{labelText}</SectionLabel>

                <div className="space-y-4">
                  <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] text-white leading-[1.08] tracking-tight">
                    {titleText}{" "}
                    <span className="text-gradient-warm">
                      {titleAccentText}
                    </span>
                  </h2>
                  <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md">
                    {subText}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href="/contact">
                    <ButtonPrimary size="lg">
                      {buttonText} <ArrowUpRight size={16} />
                    </ButtonPrimary>
                  </Link>
                  {showCall && (
                    <a
                      href="tel:+359888123456"
                      className="text-white/40 hover:text-white/70 transition-colors text-sm"
                    >
                      {t.clients.ctaCall}
                    </a>
                  )}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-5 border-t border-white/[0.07]">
                  {t.clients.stats.map((stat, i) => (
                    <div key={stat.label} className="flex flex-col gap-0.5">
                      <span
                        className="font-display font-bold text-xl sm:text-2xl"
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
                className="relative hidden lg:block self-stretch overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,183,108,0.04) 0%, rgba(224,64,160,0.06) 100%)",
                }}
              >
                {/* Left feather into the card */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(11,7,18,1) 0%, rgba(11,7,18,0.55) 22%, transparent 50%)",
                  }}
                />
                {/* Top / bottom feather */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,7,18,0.85) 0%, transparent 22%, transparent 78%, rgba(11,7,18,0.85) 100%)",
                  }}
                />
                <Image
                  src="/background-images/rule-your-brand.webp"
                  alt="Rule your brand"
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ filter: "brightness(0.85) saturate(1.1)" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
