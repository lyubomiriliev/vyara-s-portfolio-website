"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { services } from "@/data/services";
import MagicBento from "@/components/ui/MagicBento";
import ServicesAccordion from "@/components/ui/ServicesAccordion";

type FilterCategory = "all" | "marketing" | "creative" | "web";

const CATEGORY_CONFIG = {
  marketing: {
    glowColor: "255, 65, 157",
    accentColor: "#FF419D",
    gradient: "#FF419D",
  },
  creative: {
    glowColor: "255, 149, 60",
    accentColor: "#FF953C",
    gradient: "linear-gradient(135deg, #FFB76C, #FF6B2B)",
  },
  web: {
    glowColor: "56, 189, 248",
    accentColor: "#38BDF8",
    gradient: "linear-gradient(135deg, #38BDF8, #818CF8)",
  },
} as const;

function toAccordionCards(svcs: typeof services) {
  return svcs.map((s) => ({
    id: s.id,
    icon: s.icon,
    title: s.title,
    description: s.description,
    benefits: s.benefits,
  }));
}

function toBentoCards(svcs: typeof services) {
  return svcs.map((s) => ({
    id: s.id,
    icon: s.icon,
    title: s.title,
    description: s.description,
    benefits: s.benefits,
  }));
}

export default function ServicesPage() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const tabs: { id: FilterCategory; label: string }[] = [
    { id: "all", label: t.services.allServices },
    ...t.categoriesList.map((c) => ({
      id: c.id as FilterCategory,
      label: c.label,
    })),
  ];

  const translatedServices = services.map((s, i) => ({
    ...s,
    ...t.servicesList[i],
  }));

  const marketingServices = translatedServices.filter(
    (s) => s.categories?.includes("marketing") ?? s.category === "marketing",
  );
  const creativeServices = translatedServices.filter(
    (s) => s.categories?.includes("creative") ?? s.category === "creative",
  );
  const webServices = translatedServices.filter(
    (s) => s.categories?.includes("web") ?? s.category === "web",
  );

  const filteredSingle =
    activeFilter !== "all"
      ? translatedServices.filter(
          (s) =>
            s.categories?.includes(activeFilter) ?? s.category === activeFilter,
        )
      : [];

  const cfg = activeFilter !== "all" ? CATEGORY_CONFIG[activeFilter] : null;

  const ROW_HEIGHT = 62; // px per accordion row (py-3.5 + icon height)
  const maxRows = Math.max(
    marketingServices.length,
    creativeServices.length,
    webServices.length,
  );
  const accordionMinHeight = maxRows * ROW_HEIGHT;

  return (
    <section className="section-padding">
      <div className="max-w-[1600px] mx-auto">
        {/* Tab filter */}
        <div className="mb-14 flex justify-center">
          <div
            className="relative inline-flex items-center gap-1 p-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className="relative z-10 py-2 px-5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                style={{
                  color:
                    activeFilter === tab.id ? "#fff" : "rgba(255,255,255,0.45)",
                }}
              >
                {activeFilter === tab.id && (
                  <motion.span
                    layoutId="services-pill"
                    className="absolute inset-0 rounded-full z-[-1]"
                    style={{
                      background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {/* ALL — three accordion columns */}
          {activeFilter === "all" && (
            <motion.div
              key="all"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Marketing */}
                <div className="flex flex-col gap-4">
                  <CategoryHeader
                    label={t.categoriesList[0].label}
                    accentColor={CATEGORY_CONFIG.marketing.accentColor}
                    accentColorRgb={CATEGORY_CONFIG.marketing.glowColor}
                  />
                  <ServicesAccordion
                    services={toAccordionCards(marketingServices)}
                    accentColor={CATEGORY_CONFIG.marketing.accentColor}
                    accentColorRgb={CATEGORY_CONFIG.marketing.glowColor}
                    gradient={CATEGORY_CONFIG.marketing.gradient}
                    minHeight={accordionMinHeight}
                  />
                </div>

                {/* Creative */}
                <div className="flex flex-col gap-4">
                  <CategoryHeader
                    label={t.categoriesList[1].label}
                    accentColor={CATEGORY_CONFIG.creative.accentColor}
                    accentColorRgb={CATEGORY_CONFIG.creative.glowColor}
                  />
                  <ServicesAccordion
                    services={toAccordionCards(creativeServices)}
                    accentColor={CATEGORY_CONFIG.creative.accentColor}
                    accentColorRgb={CATEGORY_CONFIG.creative.glowColor}
                    gradient={CATEGORY_CONFIG.creative.gradient}
                    minHeight={accordionMinHeight}
                  />
                </div>

                {/* Web */}
                <div className="flex flex-col gap-4">
                  <CategoryHeader
                    label={t.categoriesList[2].label}
                    accentColor={CATEGORY_CONFIG.web.accentColor}
                    accentColorRgb={CATEGORY_CONFIG.web.glowColor}
                  />
                  <ServicesAccordion
                    services={toAccordionCards(webServices)}
                    accentColor={CATEGORY_CONFIG.web.accentColor}
                    accentColorRgb={CATEGORY_CONFIG.web.glowColor}
                    gradient={CATEGORY_CONFIG.web.gradient}
                    minHeight={accordionMinHeight}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Single category — bento */}
          {activeFilter !== "all" && cfg && (
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <MagicBento
                cards={toBentoCards(filteredSingle)}
                glowColor={cfg.glowColor}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function CategoryHeader({
  label,
}: {
  label: string;
  accentColor: string;
  accentColorRgb: string;
}) {
  return (
    <div className="px-1">
      <span className="text-base font-bold text-white">{label}</span>
    </div>
  );
}
