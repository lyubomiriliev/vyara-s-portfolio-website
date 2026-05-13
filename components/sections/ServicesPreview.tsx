"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as Icons from "lucide-react";
import { fadeUp, staggerContainer, scaleIn } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonOutline } from "@/components/ui/ButtonOutline";
import { Glow } from "@/components/ui/Glow";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { services } from "@/data/services";
import { useLang } from "@/lib/LanguageContext";

const columnMeta = [
  {
    category: "marketing" as const,
    accent: "#E040A0",
    border: "rgba(224,64,160,0.3)",
    glow: "rgba(224,64,160,0.12)",
  },
  {
    category: "creative" as const,
    accent: "#9B59F5",
    border: "rgba(155,89,245,0.3)",
    glow: "rgba(155,89,245,0.12)",
  },
  {
    category: "web" as const,
    accent: "#4A9EFF",
    border: "rgba(74,158,255,0.3)",
    glow: "rgba(74,158,255,0.12)",
  },
];

export default function ServicesPreview() {
  const { t } = useLang();
  const columns = columnMeta.map((m, i) => ({
    ...m,
    label: t.services.columns[i].label,
  }));

  const localizedServices = services.map((s) => {
    const localized = t.servicesList.find((ls) => ls.id === s.id);
    return localized
      ? { ...s, title: localized.title, description: localized.description }
      : s;
  });

  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-[140px]"
    >
      {/* Atmospheric workflow background */}
      <SectionBackground
        src="/background-images/workflow.png"
        opacity={0.16}
        position="right center"
        vignetteIntensity={0.7}
        blur={4}
      />
      {/* Background glows */}
      <Glow color="pink" size={700} className="top-1/2 right-1/4" />
      <Glow color="orange" size={500} className="top-1/4 left-0" />
      <Glow color="pink" size={400} className="bottom-0 right-1/2" />

      {/* Subtle dot grid overlay */}
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
        {/* ── Headline ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t.services.label}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl text-white mt-4 mb-5 leading-tight"
          >
            {t.services.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-none"
          >
            {t.services.sub}
          </motion.p>
        </motion.div>

        {/* ── Columns ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16"
        >
          {columns.map(({ category, label, accent, border, glow }) => {
            const categoryServices = localizedServices
              .filter(
                (s) => s.category === category && s.id !== "print-materials",
              )
              .slice(0, 2);

            return (
              <motion.div
                key={category}
                variants={scaleIn}
                className="flex flex-col gap-4"
              >
                {/* Category header */}
                <div
                  className="flex items-start justify-between px-5 py-4 rounded-[14px]"
                  style={{
                    background: `linear-gradient(135deg, ${glow}, transparent)`,
                    border: `1px solid ${border}`,
                  }}
                >
                  <span
                    className="font-display font-bold text-sm uppercase tracking-[0.12em]] flex-1"
                    style={{ color: accent }}
                  >
                    {label}
                  </span>
                </div>

                {/* Service cards */}
                {categoryServices.map((service) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const IconComp = (Icons as any)[service.icon] as
                    | React.ElementType
                    | undefined;

                  return (
                    <motion.div
                      key={service.id}
                      className="group relative p-6 flex flex-col gap-3 overflow-hidden cursor-default flex-1 rounded-[16px]"
                      style={
                        {
                          background: "rgba(8, 6, 18, 0.75)",
                          border: `1px solid ${border}`,
                          backdropFilter: "blur(12px)",
                          "--card-border": border,
                        } as React.CSSProperties
                      }
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                      }}
                    >
                      {/* Hover glow */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[16px]"
                        style={{
                          background: `radial-gradient(circle at 50% 0%, ${glow} 0%, transparent 70%)`,
                        }}
                      />

                      {/* Top border accent */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-[16px]"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                        }}
                      />

                      {/* Icon */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${glow} 0%, rgba(255,255,255,0.04) 100%)`,
                          border: `1px solid ${border}`,
                        }}
                      >
                        {IconComp && (
                          <IconComp size={18} style={{ color: accent }} />
                        )}
                      </div>

                      <h3 className="font-display font-bold text-base text-white">
                        {service.title}
                      </h3>
                      <p className="text-sm text-white/70 leading-relaxed flex-1">
                        {service.description}
                      </p>

                      <Link
                        href="/services"
                        className="text-xs font-semibold transition-colors duration-200 w-fit"
                        style={{ color: `${accent}99` }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = accent)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = `${accent}99`)
                        }
                      >
                        {t.services.learnMore}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Divider ── */}
        <div className="flex items-center gap-6 mb-10">
          <div className="flex-1 h-px bg-white/[0.12]" />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-white/60 text-sm font-semibold uppercase tracking-[0.15em] whitespace-nowrap"
          >
            {t.services.across3}
          </motion.p>
          <div className="flex-1 h-px bg-white/[0.12]" />
        </div>

        {/* ── CTA ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/services">
            <ButtonOutline size="lg">{t.services.seeAll}</ButtonOutline>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
