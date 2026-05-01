"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Glow } from "@/components/ui/Glow";
import { useLang } from "@/lib/LanguageContext";

export default function CTABanner() {
  const { t } = useLang();

  return (
    <section className="section-padding py-32 md:py-40 relative overflow-hidden">
      {/* Tear divider at top */}
      <Glow color="pink" size={700} className="top-1/2 left-1/2" />
      <Glow color="orange" size={500} className="top-1/4 right-1/4" />

      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="container relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[28px] p-10 md:p-20 text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(224,64,160,0.07), rgba(155,89,245,0.07), rgba(74,158,255,0.05))",
            border: "1px solid rgba(224,64,160,0.2)",
          }}
        >
          {/* Background image inside card */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none rounded-[28px] overflow-hidden"
            style={{
              backgroundImage: "url(/background-images/ai-prompt.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.18,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none rounded-[28px]"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.85) 100%)",
            }}
          />
          {/* Inner corner glows */}
          <div
            aria-hidden
            className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(224,64,160,0.18) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(74,158,255,0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Top accent line */}
          <div
            className="absolute top-0 left-1/4 right-1/4 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(224,64,160,0.6), transparent)",
            }}
          />

          <div className="relative z-10">
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.ctaBanner.label}</SectionLabel>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-5 leading-tight"
            >
              {t.ctaBanner.title}
              <br />
              <span className="text-gradient-warm">
                {t.ctaBanner.titleAccent}
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed"
            >
              {t.ctaBanner.sub}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex gap-4 justify-center flex-wrap"
            >
              <Link href="/contact">
                <button
                  className="inline-flex items-center gap-2 font-display font-semibold rounded-pill px-9 py-4 text-base text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                  }}
                >
                  <MessageCircle size={16} />
                  {t.ctaBanner.ctaSecondary}
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
