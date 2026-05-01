"use client";

import { motion } from "framer-motion";
import { Sparkles, Code2, Megaphone, Palette } from "lucide-react";
import { FloatingCard } from "./FloatingCard";
import { useLang } from "@/lib/LanguageContext";

export function ServicesHeroFloatingCards() {
  const { t } = useLang();
  return (
    <>
      {/* Top right — AI Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-[18%] right-[4%] hidden lg:block z-10"
      >
        <FloatingCard
          icon={<Sparkles size={13} />}
          label={t.hero.floatingCards.aiContent.label}
          value={t.hero.floatingCards.aiContent.value}
          detail="AI-powered posts, reels & stories"
          accent="#E040A0"
          delay={0}
          href="/services"
          small
        />
      </motion.div>

      {/* Middle left — Web Dev */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-[30%] left-[3%] hidden lg:block z-10"
      >
        <FloatingCard
          icon={<Code2 size={13} />}
          label={t.hero.floatingCards.webDev.label}
          value={t.hero.floatingCards.webDev.value}
          detail="Next.js · React · Webflow"
          accent="#9B59F5"
          delay={1}
          floatDir="up"
          href="/services"
          small
        />
      </motion.div>

      {/* Bottom right — Paid Ads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-[10%] right-[5%] hidden lg:block z-10"
      >
        <FloatingCard
          icon={<Megaphone size={13} />}
          label={t.hero.floatingCards.paidAds.label}
          value={t.hero.floatingCards.paidAds.value}
          detail="Meta · Google · TikTok Ads"
          accent="#FFB76C"
          delay={2}
          href="/services"
          small
        />
      </motion.div>

      {/* Bottom left — Brand Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="absolute bottom-[8%] left-[4%] hidden xl:block z-10"
      >
        <FloatingCard
          icon={<Palette size={13} />}
          label={t.hero.floatingCards.brandDesign.label}
          value={t.hero.floatingCards.brandDesign.value}
          detail="Logos · UI · Brand kits"
          accent="#9B59F5"
          delay={0.5}
          floatDir="up"
          href="/services"
          small
        />
      </motion.div>
    </>
  );
}
