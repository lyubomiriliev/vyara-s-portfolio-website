"use client";

import { useLang } from "@/lib/LanguageContext";

const logos = [
  { name: "El Shisha", src: "/clients/elshisha.png" },
  { name: "El Well", src: "/clients/elwell.png" },
  { name: "Pulse Homes", src: "/clients/pulsehomes.png" },
  { name: "Pulse Kids", src: "/clients/pulsekids.png" },
  { name: "Fox Academy", src: "/clients/foxacademy.png" },
  { name: "La Maniere", src: "/clients/lamaniere.png" },
  { name: "CoolFit", src: "/clients/coolfit.png" },
  { name: "Vapy", src: "/clients/vapy.png" },
  { name: "Smart Strips", src: "/clients/smart-strips-logo.png" },
  { name: "Fine Design", src: "/clients/fine-design-logo.png" },
  { name: "Dongfeng", src: "/clients/dongfeng-logo-white.png" },
];

export default function MarqueeBanner() {
  const { t } = useLang();

  if (logos.length === 0) return null;
  return (
    <section className="relative py-16 border-y border-white/[0.06] overflow-hidden">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30 text-center mb-12">
        {t.marquee.label}
      </p>
      {/* Outer masks left/right edges */}
      <div
        className="overflow-hidden w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Inner — four identical copies for seamless -25% loop */}
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-14 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                className="h-14 w-auto object-contain opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
                style={{ maxWidth: "180px" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
