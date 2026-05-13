"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, staggerContainer } from "@/lib/animations";
import BorderGlow from "@/components/ui/BorderGlow";

export const toolLogos = [
  { name: "ChatGPT", src: "/tools/gpt1.png" },
  { name: "Claude AI", src: "/tools/claude1.png" },
  { name: "Gemini", src: "/tools/gemini1.png" },
  { name: "Instagram", src: "/tools/insta1.png" },
  { name: "Facebook", src: "/tools/facebook1.png" },
  { name: "Meta", src: "/tools/meta1.png" },
  { name: "TikTok", src: "/tools/tiktok1.png" },
  { name: "LinkedIn", src: "/tools/linkedin1.png" },
  { name: "Canva", src: "/tools/canva1.png" },
  { name: "Photoshop", src: "/tools/photoshop-logo.png" },
  { name: "CapCut", src: "/tools/capcut1.png" },
  { name: "Captions", src: "/tools/captions1.png" },
  { name: "Illustrator", src: "/tools/illustrator-logo.png" },
  { name: "Klaviyo", src: "/tools/klaviyo1.png" },
  { name: "Shopify", src: "/tools/shopify-logo.png" },
  { name: "VSCode", src: "/tools/vscode1.png" },
  { name: "Cursor", src: "/tools/cursor1.png" },
  { name: "Next.js", src: "/tools/next1.png" },
  { name: "React", src: "/tools/react1.png" },
  { name: "Supabase", src: "/tools/supabase1.png" },
];

interface ToolsGridProps {
  /** "bordered" wraps in a BorderGlow card (WhyAviva style). "plain" uses a simple glass panel (AboutPage style). */
  variant?: "bordered" | "plain";
}

export default function ToolsGrid({ variant = "bordered" }: ToolsGridProps) {
  const grid = (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={
        variant === "bordered"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 items-center justify-items-center px-4 py-6 sm:py-8"
          : "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 sm:gap-y-6 items-center justify-items-center py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8"
      }
    >
      {toolLogos.map((logo, i) => (
        <motion.div
          key={logo.name}
          variants={fadeUp}
          custom={i}
          className="group flex items-center justify-center"
          title={logo.name}
        >
          <Image
            src={logo.src}
            alt={logo.name}
            width={120}
            height={28}
            className={`w-auto object-contain opacity-30 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300 mx-auto ${
              variant === "bordered" ? "h-5 sm:h-6 md:h-7 lg:h-8 xl:h-9" : "h-4 sm:h-5 md:h-6 lg:h-7"
            }`}
          />
        </motion.div>
      ))}
    </motion.div>
  );

  if (variant === "bordered") {
    return (
      <BorderGlow
        borderRadius={24}
        backgroundColor="rgb(18,14,32)"
        colors={["#9B59F5", "#E040A0", "#c084fc"]}
        glowColor="270 80 70"
        glowIntensity={1.2}
        glowRadius={50}
        coneSpread={20}
        className="w-full"
      >
        {grid}
      </BorderGlow>
    );
  }

  return (
    <div
      className="rounded-3xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(8px)",
      }}
    >
      {grid}
    </div>
  );
}
